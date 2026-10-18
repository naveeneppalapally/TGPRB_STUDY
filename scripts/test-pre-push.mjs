import assert from 'node:assert/strict'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = mkdtempSync(path.join(tmpdir(), 'studyos-push-hook-'))
const checkout = path.join(root, 'checkout'), remote = path.join(root, 'remote.git')
const bin = path.join(root, 'bin'), marker = path.join(root, 'integrity-runs')
const hook = path.resolve('.githooks/pre-push')
const environment = { ...process.env, PATH: `${bin}${path.delimiter}${process.env.PATH}`, TEST_HOOK_MARKER: marker }
const run = (command, args, overrides = {}) => {
  const result = spawnSync(command, args, { cwd: checkout, env: { ...environment, ...overrides }, encoding: 'utf8' })
  if (result.error) throw result.error
  return result
}
const git = (...args) => {
  const result = run('git', args)
  assert.equal(result.status, 0, result.stderr + result.stdout)
  return result.stdout.trim()
}
try {
  mkdirSync(checkout)
  mkdirSync(bin)
  // Only the integrity command is stubbed. Git transports, commits, pulls,
  // branch discovery and the actual installed pre-push hook all run normally.
  writeFileSync(path.join(bin, 'npm'), '#!/bin/sh\n[ "$*" = "run verify:integrity" ] || exit 9\necho checked >> "$TEST_HOOK_MARKER"\nexit "${TEST_HOOK_INTEGRITY_EXIT:-0}"\n', { mode: 0o755 })
  git('init', '--bare', '--initial-branch=main', remote)
  git('init', '--initial-branch=review-test')
  git('config', 'user.name', 'Hook fixture')
  git('config', 'user.email', 'fixture@example.test')
  git('config', 'core.hooksPath', '.git/hooks')
  git('remote', 'add', 'origin', remote)
  writeFileSync(path.join(checkout, 'fixture.txt'), 'First revision\n')
  git('add', 'fixture.txt')
  git('commit', '-m', 'Initial fixture')
  copyFileSync(hook, path.join(checkout, '.git/hooks/pre-push'))

  git('push', '--set-upstream', 'origin', 'review-test')
  assert.equal(git('--git-dir', remote, 'rev-parse', 'refs/heads/review-test'), git('rev-parse', 'HEAD'))
  assert.equal(readFileSync(marker, 'utf8').trim().split('\n').length, 1)

  writeFileSync(path.join(checkout, 'fixture.txt'), 'Second revision\n')
  git('commit', '-am', 'Existing branch fixture')
  git('push', 'origin', 'review-test')
  const accepted = git('--git-dir', remote, 'rev-parse', 'refs/heads/review-test')
  assert.equal(accepted, git('rev-parse', 'HEAD'))
  assert.equal(readFileSync(marker, 'utf8').trim().split('\n').length, 2)

  writeFileSync(path.join(checkout, 'fixture.txt'), 'Rejected revision\n')
  git('commit', '-am', 'Rejected fixture')
  const rejected = run('git', ['push', 'origin', 'review-test'], { TEST_HOOK_INTEGRITY_EXIT: '1' })
  assert.notEqual(rejected.status, 0)
  assert.ok((rejected.stderr + rejected.stdout).includes('topic integrity verification failed'))
  assert.equal(git('--git-dir', remote, 'rev-parse', 'refs/heads/review-test'), accepted)

  git('remote', 'set-url', 'origin', path.join(root, 'missing.git'))
  const runsBeforeFailure = readFileSync(marker, 'utf8')
  const unavailable = run('bash', [hook, 'origin'])
  assert.notEqual(unavailable.status, 0)
  assert.ok(unavailable.stdout.includes('could not check the remote branch'))
  assert.equal(readFileSync(marker, 'utf8'), runsBeforeFailure)
  console.log('PASS: real Git first/existing branch pushes, required integrity checks and remote failure handling.')
} finally {
  rmSync(root, { recursive: true, force: true })
}
