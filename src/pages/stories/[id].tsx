import { GetServerSideProps, NextPage } from "next";

import { useRouter } from "next/router";
import { TComment, TStory } from "~/types/story";
import { useEffect, useState } from "react";
import Head from "next/head";
import CommentList from "~/components/Comments/CommentList";
import { BackIcon, StarIcon } from "~/icons";
import useStarredItems from "~/store/useStarredItems";
import InnerHTMLText from "~/components/Common/InnerHTMLText";

type Props = {
  data: TStory;
  errorCode: false | number;
};

const Story: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const { data, errorCode } = props;
  const [isStoryStarred, setIsStoryStarred] = useState(false);
  const { starStory, starred } = useStarredItems();

  const { title, id, points, user, time, content, comments, domain } = data;
  let { url } = data;

  const onClickBack = () => {
    router.back();
  };

  if (url.startsWith("item?id=")) {
    url = url.replace("item?id=", "");
  }

  const story = {
    id,
    title,
    points,
    user,
    time,
    url,
    domain,
    comments_count: comments?.length,
  };

  const handleStar = () => {
    const isStoryStarred = starred?.some((story) => story.id === id);
    if (isStoryStarred) {
      const filteredStories = starred?.filter((story) => story.id !== id);
      starStory(filteredStories);
    } else {
      starStory([...starred, story as TStory]);
    }
  };

  useEffect(() => {
    setIsStoryStarred(starred?.some((story) => story.id === id));
  }, [starred, id]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-col flex-1 mb-8">
        <button
          className="px-2 py-1 bg-transparent rounded flex items-center mb-2 w-fit group hover:bg-hover focus-visible:ring-1 focus-visible:ring-blue-500"
          onClick={onClickBack}
        >
          <BackIcon className="w-3 h-3 text-icon group-hover:text-primary" />
          <span className="text-xs ml-1 font-mono text-secondary group-hover:text-primary">
            Back
          </span>
        </button>
        <div className="flex flex-col p-4 bg-primary border border-primary rounded">
          <div className="flex items-center">
            <h2 className="text-lg md:text-xl font-medium text-primary m-0 mb-1 font-sans">
              {title}
            </h2>
            <div className="flex items-center">
              {domain && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs mr-3 ml-3 max-w-[128px] md:max-w-full truncate md:whitespace-normal md:overflow-visible font-normal mb-0.5 border-b hover:text-primary border-primary w-fit font-mono text-secondary mt-0.5"
                >
                  ({domain})
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <button
              className="flex mr-2 p-1 w-fit items-center cursor-default rounded border-none hover:bg-hover focus-visible:ring-1 focus-visible:ring-blue-500"
              onClick={handleStar}
            >
              <StarIcon
                className={`h-3 w-3 ${
                  isStoryStarred ? "hacker-orange" : "text-icon"
                }`}
              />
              <span className="text-xs ml-1 text-secondary font-sans">
                {isStoryStarred ? "saved" : "save"}
              </span>
            </button>
          </div>
          {content && <InnerHTMLText content={content} isDescription />}
        </div>
        <CommentList comments={comments as TComment[]} op={user} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const ITEM_BASE_URL = "https://api.hnpwa.com/v0/item";

  const fetchUrl = `${ITEM_BASE_URL}/${id}.json`;

  const response = await fetch(fetchUrl);
  const errorCode = response.ok ? false : response.status;
  // Only run the json if the error is not present
  const data = errorCode === false ? await response.json() : [];

  return {
    props: {
      errorCode,
      data,
    },
  };
};

export default Story;
