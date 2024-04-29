import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
// import { api } from "~/utils/api";
// import Image from "next/image";
// import { LoadingPage, LoadingSpinner } from "~/components/loading";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/PageLayout";
import DistributorsPage from "~/pages/distributors";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Return a loading or placeholder element until user info is loaded
  if (!userLoaded) return <div>Loading...</div>;

  return (
    <PageLayout>
      {isSignedIn ? (
        // Render DistributorsPage when the user is signed in
        <DistributorsPage />
      ) : (
        // Show the sign-in button if the user is not signed in
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex w-full justify-center border-b border-slate-400 p-4">
            <SignInButton />
          </div>
        </div>
      )}
    </PageLayout>
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
