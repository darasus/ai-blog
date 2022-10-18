import React from 'react'
import { Badge } from '../Badge'

interface Props {
  date: string
  category: string
}

export const PostMeta: React.FC<Props> = ({ date, category }) => {
  return (
    <div className="flex items-center">
      <Badge className="mr-2">{category}</Badge>
      <span className="text-gray-700 uppercase text-xs font-bold">{date}</span>
    </div>
  )
}
