import Link from "next/link";
import Image from "next/future/image";

export function Navbar() {
  return (
    <div className="flex py-4 cursor-pointer">
      <Link href="/">
        <a>
          <Image
            className="block"
            src={"/logo.svg"}
            width={154}
            height={30.8}
            alt="logo"
          />
        </a>
      </Link>
    </div>
  );
}
