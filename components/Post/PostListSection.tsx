import { BasePost } from '../../types'
import { Divider } from '../Divider'
import { Link } from '../Link'
import { PostExcerpt } from './PostExcerpt'

interface Props {
  posts: BasePost[]
  title?: string
}

export function PostListSection({ posts, title }: Props) {
  return (
    <>
      {title && (
        <div className="border-b border-b-gray-100 p-4 uppercase font-bold ">
          {title}
        </div>
      )}
      {posts.map((post, i: number) => {
        return (
          <Link hoverStyles={false} href={`/p/${post.slug}`} key={i}>
            <PostExcerpt
              loading={i === 0 || i === 1 ? 'eager' : 'lazy'}
              post={post}
            />
            <Divider />
          </Link>
        )
      })}
    </>
  )
}
