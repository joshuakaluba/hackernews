import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PageProps } from "~/types/story";
import StoryList from "~/components/StoryList/StoryList";
import Head from "next/head";
import { useRouter } from "next/router";
import Pagination from "~/components/Common/Pagination";
import { CenteredText } from "~/components/Common/CenteredText";

const TopStoriesList: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { number } = router.query;
  const { data, errorCode } = props;

  if (errorCode)
    return <CenteredText>Oops! Something went wrong :(</CenteredText>;

  if (!data) return <CenteredText>Loading...</CenteredText>;

  const handlePageChange = (page: number) => {
    router.push(`/top/${page}`);
  };

  return (
    <>
      <Head>
        <title>HackerNews - Page {number}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex-1">
        <StoryList stories={data} />
        <Pagination
          currentPage={parseInt(number as string)}
          onChangePage={handlePageChange}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const number = params?.number || 1;

  const TOP_BASE_URL = "https://api.hnpwa.com/v0/news";
  const fetchUrl = `${TOP_BASE_URL}/${number}.json`;

  const response = await fetch(fetchUrl);
  const errorCode = response.ok ? false : response.status;

  const data = errorCode === false ? await response.json() : [];

  return {
    props: {
      errorCode,
      data,
    },

    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...Array(10)].map((x, idx) => ({
    params: { number: (idx + 1).toString() },
  }));
  return { paths, fallback: "blocking" };
};

export default TopStoriesList;
