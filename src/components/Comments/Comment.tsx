import { prettyTime } from "~/helpers/time";
import { useEffect, useState } from "react";
import { TComment } from "~/types/story";
import { ChevronDownIcon, ChevronUpIcon } from "~/icons";
import { contains } from "~/helpers/contains";
import InnerHTMLText from "~/components/Common/InnerHTMLText";

type Props = {
  comment: TComment;
  op: string;
};

const Comment: React.FC<Props> = (props: Props) => {
  const {
    comment: {
      user,
      content,
      time,
      deleted,
      level,
      comments,
      comments_count,
      id,
    },
    op,
  } = props;
  const isCommenterOP = user === op;
  const [collapsed, setCollapsed] = useState<Boolean>(false);

  useEffect(() => {
    contains("p", ">", "quotes");
  }, []);

  const margin = 16;

  if (collapsed)
    return (
      <div className="flex">
        <section
          className={`pt-0 pr-2 pb-1 pl-3 flex flex-col my-2 relative w-full border-l-2 border-primary`}
          style={{ marginLeft: `calc(${margin}px * ${level})` }}
        >
          <div className="flex justify-between">
            <span
              className={`text-xs text-secondary font-mono py-1 px-2 rounded flex items-center ${
                isCommenterOP ? "bg-op" : "bg-secondary"
              }`}
            >
              {user}
            </span>
            <div className="flex items-center">
              <span className="py-0.5 px-1.5 text-secondary font-mono bg-tertiary rounded text-[10px]">
                {comments_count}
              </span>
              <button
                className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                onClick={() => setCollapsed(false)}
              >
                <ChevronDownIcon className="h-3 w-3 text-icon group-hover:text-primary" />
              </button>
            </div>
          </div>
        </section>
      </div>
    );

  return (
    <>
      <div style={{ display: "flex" }}>
        <section
          className={`pt-0 pr-2 pb-1 pl-3 flex flex-col my-2 relative w-full border-l-2  border-primary`}
          style={{ marginLeft: `calc(${margin}px * ${level})` }}
        >
          {!deleted && (
            <div className="flex justify-between mb-2">
              <span
                className={`text-xs text-secondary font-mono py-1 px-2 rounded flex items-center ${
                  isCommenterOP ? "bg-op" : "bg-secondary"
                }`}
              >
                {user}
              </span>
              <div className="flex items-center">
                <span className="text-secondary font-mono text-[10px]">
                  {prettyTime(time)}
                </span>
                <button
                  className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                  onClick={() => setCollapsed(true)}
                >
                  <ChevronUpIcon className="h-3 w-3 text-icon group-hover:text-primary" />
                </button>
              </div>
            </div>
          )}
          {deleted ? (
            <p className="font-mono text-secondary text-sm">
              Comment was deleted :(
            </p>
          ) : (
            <InnerHTMLText content={content} />
          )}
        </section>
      </div>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} op={op} />
      ))}
    </>
  );
};

export default Comment;
