import React from "react";

type Props = React.PropsWithChildren<{
  type?: "h1" | "h2";
}>;

export const PostTitle: React.FC<Props> = ({ type = "h1", children }) => {
  const props = { className: "mt-1 mb-2" };

  if (type === "h1") return <h1 {...props}>{children}</h1>;
  if (type === "h2") return <h2 {...props}>{children}</h2>;

  return null;
};
