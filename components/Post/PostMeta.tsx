import React from "react";
import { capitalize } from "../../utils/capitalize";

interface Props {
  items: string[];
}

export const PostMeta: React.FC<Props> = ({ items }) => {
  return <span className="text-gray-400 text-xs">{items.join(" • ")}</span>;
};
