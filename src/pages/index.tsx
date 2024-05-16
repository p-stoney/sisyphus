import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import DistributorsPage from "~/pages/distributors";

const Home: NextPage = () => {
  const { isSignedIn } = useUser();

  return <div>{isSignedIn && <DistributorsPage />}</div>;
};

export default Home;
