import * as dotenv from 'dotenv'
import { writeFileSync } from 'fs'
import sharp from 'sharp'
import { OpenAI } from '../lib/openai'

dotenv.config()

import { generateArticles } from './generateArticles'
import { generateRelatedArticles } from './generateRelatedArticles'
import { generateSitemap } from './generateSitemap'

async function generate() {
  console.log('🚀 Start generating...')

  await generateArticles()
  // await generateRelatedArticles()
  await generateSitemap()

  console.log('✅ All done!')
  process.exit(0)
}

generate()
