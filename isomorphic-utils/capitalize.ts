import title from "title";

export const capitalize = (string: string) => {
  return title(string, { special: ["AI"] });
};
