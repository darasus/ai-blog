import React from "react";
import { Navbar } from "./Navbar";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-start">
      <div className="bg-dark">
        <div className="max-w-4xl m-auto px-4 flex">
          <div className="shrink">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="max-w-4xl w-full mx-auto bg-white border-r border-l border-b border-gray-200">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
