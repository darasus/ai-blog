import { useRouter } from "next/router";
import React from "react";
import { LinkButton } from "./LinkButton";

interface Props {
  totalPages: number;
}

export const Pagination: React.FC<Props> = ({ totalPages }) => {
  const router = useRouter();
  const currentPage = Number(router.query.page);

  return (
    <div className="bg-white p-4 flex items-center">
      <div className="flex-1 flex">
        {currentPage !== 1 && (
          <LinkButton href={`/posts/${currentPage - 1}`}>Previous</LinkButton>
        )}
        <div className="flex-1" />
        {currentPage !== totalPages && (
          <LinkButton href={`/posts/${currentPage + 1}`}>Next</LinkButton>
        )}
      </div>
    </div>
  );
};
