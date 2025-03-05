"use client";

import { useRouter } from "next/navigation";

const ButtonGoHome = () => {
  const router = useRouter();

  const HandleGoHomeButton = () => {
    router.push("/");
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      onClick={HandleGoHomeButton}
    >
      Go Home
    </button>
  );
};

export default ButtonGoHome;
