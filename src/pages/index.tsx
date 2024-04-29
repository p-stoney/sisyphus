import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
// import { api } from "~/utils/api";
// import Image from "next/image";
// import { LoadingPage, LoadingSpinner } from "~/components/loading";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
import DistributorsPage from "~/pages/distributors";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <div>Loading...</div>;

  return (
    <>
      {isSignedIn ? (
        <DistributorsPage />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex w-full justify-center border-b border-slate-400 p-4">
            <SignInButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

//   return (
//     <PageLayout>
//       <div className="flex border-b border-slate-400 p-4">
//         {!isSignedIn && (
//           <div className="flex justify-center">
//             <SignInButton />
//           </div>
//         )}
//       </div>
//     </PageLayout>
//   );
// };
