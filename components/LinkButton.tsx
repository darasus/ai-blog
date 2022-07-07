import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";

type Props = React.PropsWithChildren<LinkProps & { active?: boolean }>;

export const LinkButton: React.FC<Props> = ({
  children,
  active = false,
  ...props
}) => {
  return (
    <Link {...props}>
      <a
        className={clsx(
          "py-2 px-3 border rounded border-gray-300 bg-gray-200 hover:border-gray-400 hover:bg-gray-300 mr-1 last:mr-0",
          { "bg-gray-900 text-gray-50 hover:bg-gray-700": active }
        )}
      >
        {children}
      </a>
    </Link>
  );
};
