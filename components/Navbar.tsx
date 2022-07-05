import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="flex py-4 cursor-pointer">
      <Link href="\">
        <Image
          className="block"
          src={"/logo.svg"}
          width={154}
          height={33}
          alt="logo"
        />
      </Link>
    </div>
  );
}
