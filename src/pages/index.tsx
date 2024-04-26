import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
// import { api } from "~/utils/api";
// import Image from "next/image";
// import { LoadingPage, LoadingSpinner } from "~/components/loading";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/PageLayout";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {!isSignedIn && (
          <div className="flex w-full justify-center border-b border-slate-400 p-4">
            <SignInButton />
          </div>
        )}
      </div>
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
