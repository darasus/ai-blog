import * as dotenv from 'dotenv'
import { generateArticles } from './generateArticles'

dotenv.config()

async function generate() {
  console.log('🚀 Start generating...')

  await generateArticles()

  console.log('✅ All done!')
  process.exit(0)
}

generate()
