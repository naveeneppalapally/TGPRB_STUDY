import { defineEventHandler, getQuery } from 'h3'
import master from '../../data/pyq_enriched_master.json'
import media from '../../data/pyq_media.json'
import { buildPyqArchive } from '../../utils/pyq-archive'

export default defineEventHandler(event => buildPyqArchive(master, getQuery(event), media))
