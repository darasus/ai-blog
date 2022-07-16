import { MDXPost } from "../../types/Post";
import yaml from "yaml";

export function formatMarkdown(post: MDXPost) {
  const { content, ...rest } = post;
  return `---\n${yaml.stringify(rest)}---\n\n${content.trim()}\n`;
}
