'use client'
import React from 'react'
import { LinkButton } from './LinkButton'

interface Props {
  totalPages: number
  currentPage: number
}

export const Pagination: React.FC<Props> = ({ totalPages, currentPage }) => {
  return (
    <div className="flex bg-white p-4 items-center">
      <div className="flex grow">
        {currentPage !== 1 && (
          <LinkButton href={`/posts/${currentPage - 1}`}>Previous</LinkButton>
        )}
        <div className="grow" />
        {currentPage !== totalPages && (
          <LinkButton href={`/posts/${currentPage + 1}`}>Next</LinkButton>
        )}
      </div>
    </div>
  )
}
