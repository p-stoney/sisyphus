import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import Head from "next/head";
import DistributorView from "~/components/distributors/DistributorView";

const SingleDistributorPage: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading, isError } = api.distributor.getById.useQuery({
    distributorId: id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Distributor not found</div>;

  return (
    <>
      <Head>
        <title>Distributor: {`${data.name}`}</title>
      </Head>
      <DistributorView {...data} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id as string;

  if (typeof id !== "string") throw new Error("Invalid or missing invoice ID.");

  await ssg.distributor.getById.prefetch({ distributorId: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SingleDistributorPage;
