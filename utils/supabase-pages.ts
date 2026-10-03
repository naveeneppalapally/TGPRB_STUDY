/** Supabase's default row limit must not truncate append-only learning history. */
export async function readAllRows<T>(page: (from: number, to: number) => PromiseLike<{data: T[] | null; error: {message: string} | null}>) {
  const data: T[] = []
  for (let from = 0; ; from += 1000) {
    const result = await page(from, from + 999)
    if (result.error) return {data: null, error: result.error}
    data.push(...(result.data || []))
    if (!result.data || result.data.length < 1000) return {data, error: null}
  }
}
