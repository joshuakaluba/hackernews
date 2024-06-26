import { TComment } from "~/types/story";
import { CenteredText } from "../Common/CenteredText";
import Comment from "./Comment";

type Props = {
  comments: TComment[];
  op: string;
};

const CommentList: React.FC<Props> = (props: Props) => {
  const { comments, op } = props;
  return (
    <div className="mt-4">
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} op={op} />
          ))}
        </>
      ) : (
        <CenteredText>No comments posted yet!</CenteredText>
      )}
    </div>
  );
};

export default CommentList;
