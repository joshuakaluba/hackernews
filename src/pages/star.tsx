import { NextPage } from "next";
import { TStory } from "~/types/story";
import StoryList from "~/components/StoryList/StoryList";
import Head from "next/head";
import useStarredItems from "~/store/useStarredItems";
import dynamic from "next/dynamic";

type PageProps = {
  response: TStory[];
};

const Star: NextPage<PageProps> = () => {
  const { starred } = useStarredItems();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h3 className="text-lg mt-4 text-secondary font-medium">
        You starred <span className="text-bold hacker-orange">{starred?.length}</span>{" "}
        You starred <span className="text-bold hacker-orange">{starred?.length}</span>{" "}
        stories
      </h3>
      <div className="flex flex-col mt-8">
        <StoryList stories={starred} />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Star), {
  ssr: false,
});
