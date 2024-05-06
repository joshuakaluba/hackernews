import Link from "next/link";
import { TStory } from "~/types/story";
import useStarredItems from "~/store/useStarredItems";
import { useEffect, useState } from "react";
import { StarIcon } from "~/icons";
import { prettyTime } from "~/helpers/time";

type Props = {
  story: TStory;
};

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time, domain },
    story,
  } = props;
  const [isStoryStarred, setIsStoryStarred] = useState(false);

  const { starStory, starred } = useStarredItems();

  useEffect(() => {
    setIsStoryStarred(starred?.some((story) => story.id === id));
  }, [starred, id]);

  const handleStar = () => {
    const isStoryStarred = starred?.some((story) => story.id === id);
    if (isStoryStarred) {
      const filteredStories = starred?.filter((story) => story.id !== id);
      starStory(filteredStories);
    } else {
      starStory([...starred, story]);
    }
  };

  return (
    <div className="py-2 flex flex-col w-full bg-transparent mb-2 duration-100 border-primary hover:border-secondary">
      <div className="flex items-center">
        <Link href={`/stories/${id}`} passHref>
          <h3
            className={`text-base text-primary whitespace-pre-line font-medium duration-100 cursor-default font-sans`}
          >
            {title}
          </h3>
        </Link>
        {domain && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs whitespace-nowrap font-normal ml-5 mb-0.5 border-b hover:text-primary border-primary w-fit font-mono text-secondary mt-0.5 focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            ({domain})
          </a>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex justify-between w-full mt-1`}>
          <div className="flex items-center">
            {points && user && (
              <div className="flex items-center p-1 pl-0">
                <span className="text-xs ml-1 text-secondary font-sans">
                  {`${points} points by ${user} ${prettyTime(time)} ago |`}
                </span>
              </div>
            )}

            {comments_count > 0 && (
              <div className="flex items-center mr-1 p-1 pl-0">
                <span className="text-xs ml-1 text-secondary font-sans">
                  {`${comments_count} comments |`}
                </span>
              </div>
            )}

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
                {isStoryStarred ? "Saved" : "Save"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryListItem;
