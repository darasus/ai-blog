import { format } from 'date-fns'
import React from 'react'
import { Badge } from '../Badge'

interface Props {
  date: Date
  category: string
}

export const PostMeta: React.FC<Props> = ({ date, category }) => {
  return (
    <div className="flex items-center">
      <Badge className="mr-2">{category}</Badge>
      <span className="text-gray-700 uppercase text-xs font-bold">
        {format(new Date(date), 'MMMM dd, yyyy')}
      </span>
    </div>
  )
}
