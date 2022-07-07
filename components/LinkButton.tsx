import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";

type Props = React.PropsWithChildren<LinkProps>;

export const LinkButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <a
        className={clsx(
          "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        )}
      >
        {children}
      </a>
    </Link>
  );
};
