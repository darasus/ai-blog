import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="py-4">
      <Link href="\">
        <a>
          <Image src={"/logo.svg"} width={154} height={33} alt="logo" />
        </a>
      </Link>
    </div>
  );
}
