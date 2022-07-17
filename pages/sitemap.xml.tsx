import { GetServerSideProps } from "next";
import { sitemap } from "../sitemap";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
