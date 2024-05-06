export type TStory = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  url: string;
  domain: string;
  comments_count: number;
  time_ago?: string;
  type?: string;
  content?: string;
  comments?: TComment[];
};

export type TComment = {
  id: number;
  user: string;
  time: number;
  time_ago: string;
  type: "comment";
  content: string;
  comments: TComment[];
  comments_count: number;
  level: number;
  url: string;
  deleted?: boolean;
};

export type PageProps = {
  data: TStory[];
  errorCode: false | number;
};
