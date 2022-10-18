import { MDXRemote } from 'next-mdx-remote'
import * as mdx from '@mdx-js/react'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'

type Props = any

type Components = React.ComponentProps<typeof mdx.MDXProvider>['components']

const components: Components = {
  h1: (props) => (
    <h1
      className="font-bold sm:text-4xl md:text-6xl lg:text-6xl leading-none"
      {...props}
    />
  ),
  h2: (props) => (
    <h2 className="font-bold text-4xl leading-none mt-4" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-bold text-4xl leading-none mt-4" {...props} />
  ),
  h4: (props) => (
    <h4 className="font-bold text-4xl leading-none mt-4" {...props} />
  ),
  p: (props) => <p {...props} className="my-2 text-lg" />,
  ul: (props) => <ul className="mb-3" {...props} />,
  li: (props) => (
    <li {...props} className="flex">
      <ChevronDoubleRightIcon
        width={15}
        height={15}
        className="text-gray-500 mr-1 mt-1.5 flex-shrink-0"
      />
      <span className="text-lg">{props.children}</span>
    </li>
  ),
}

export function Markdown(props: Props) {
  return <MDXRemote {...props} components={components} />
}
