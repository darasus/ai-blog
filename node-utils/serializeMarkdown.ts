import { serialize } from 'next-mdx-remote/serialize'

export async function serializeMarkdown(content: string) {
  return serialize(content, {
    // parseFrontmatter: false,
    mdxOptions: {
      // remarkRehypeOptions: {},
    },
  })
}
