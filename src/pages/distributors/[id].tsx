import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/PageLayout";
import Head from "next/head";
import { DistributorView } from "~/components/DistributorView";

const SingleDistributorPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.distributor.getById.useQuery({
    distributorId: id,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>Distributor: {`${data.name}`}</title>
      </Head>
      <PageLayout>
        <DistributorView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id as string;

  if (typeof id !== "string") throw new Error("no id");

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

// import { api } from "~/utils/api";
// import type { RouterOutputs } from "~/utils/api";

// export const SingleDistributorPage: NextPage<{ id: string }> = ({ id }) => {
//   const { data } = api.distributor.getById.useQuery({
//     distributorId: id,
//   });

//   if (!data) return <div>404</div>;

//   return (
//     <>
//       <Head>
//         <title>Distributor: {data.distributor.name}</title>
//       </Head>
//       <PageLayout>
//         <DistributorView {...data} />
//       </PageLayout>
//     </>
//   );
// };

// type Props = RouterOutputs["distributor"]["getById"];

// export const DistributorDetailPage: NextPage<Props> = ({ distributor }) => {
//   if (!distributor) return <p>Distributor not found.</p>;

//   return (
//     <>
//       <Head>
//         <title>Distributor: {distributor.name}</title>
//       </Head>
//       <PageLayout>
//         {/* <DistributorDetails distributor={distributor} /> */}
//       </PageLayout>
//     </>
//   );
// };
