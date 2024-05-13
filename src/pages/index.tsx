import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
// import { api } from "~/utils/api";
// import Image from "next/image";
// import { LoadingPage, LoadingSpinner } from "~/components/loading";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
import DistributorsPage from "~/pages/distributors";

const Home: NextPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
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
