import { NoSymbolIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="flex flex-col p-4 items-center">
      <div className="mb-4">
        <NoSymbolIcon width={100} height={100} />
      </div>
      <span>Opps... Something went wrong.</span>
    </div>
  )
}
