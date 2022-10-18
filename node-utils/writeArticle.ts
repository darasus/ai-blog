import { writeFileSync } from 'fs'
import { join } from 'path'
import { Post } from '../types'
import { postsPath } from './paths'

export async function writeArticle(post: Post) {
  writeFileSync(
    join(postsPath, `${post.slug}.json`),
    JSON.stringify(post, null, 2)
  )
}
