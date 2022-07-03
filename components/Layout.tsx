import React from "react";
import { Navbar } from "./Navbar";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="max-w-4xl m-auto px-4 pb-2">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
