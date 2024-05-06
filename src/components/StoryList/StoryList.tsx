import { TStory } from "~/types/story";
import StoryListItem from "./StoryListItem";

interface StoryListProps {
  stories: TStory[];
}
const StoryList = (props: StoryListProps) => {
  const { stories } = props;

  return (
    <>
      {stories.map((story, i) => (
        <div key={i} className="flex">
          <div className="item-number">{`${i + 1}.`}</div>
          <StoryListItem story={story} />
        </div>
      ))}
    </>
  );
};

export default StoryList;
