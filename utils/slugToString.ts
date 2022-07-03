export function slugToString(slug: string) {
  return slug.replace(/-/g, " ");
}

export function stringToSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
