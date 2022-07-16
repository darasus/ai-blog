import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-start">
      <div className="bg-dark">
        <div className="max-w-5xl m-auto px-4 flex">
          <div className="shrink">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="max-w-5xl w-full mx-auto mb-4 mt-4">
        <div className="p-4 bg-yellow-500 border border-yellow-600 text-gray-50 mx-4 lg:mx-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {`All articles from "The AI Paper" are carefully crafted by advanced Artificial Intelligence models and should not be taken as truth.`}
        </div>
      </div>
      <div className="max-w-5xl w-full mx-auto bg-white border-y lg:border-x border-gray-200">
        <main className="w-full">{children}</main>
      </div>
      <div className="max-w-5xl w-full mx-auto my-4">
        <Footer />
      </div>
    </div>
  );
}
