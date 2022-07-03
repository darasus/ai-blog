import type { NextPage } from "next";
import { AI } from "../lib/ai";

const Home: NextPage = ({ text }: any) => {
  return <p dangerouslySetInnerHTML={{ __html: text }} />;
};

export const getServerSideProps = async () => {
  const ai = new AI();

  const response = await ai.createCompletion(
    "Write article 1000 words long about dog training"
  );

  return {
    props: { text: response?.choices?.[0].text },
  };
};

export default Home;
