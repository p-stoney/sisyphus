import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import DistributorsPage from "~/pages/distributors";

const Home: NextPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      {!isSignedIn && (
        <div className="flex justify-center border border-slate-400 p-4">
          <SignInButton />
        </div>
      )}
      <>{isSignedIn && <DistributorsPage />}</>
    </div>
  );
};

export default Home;
