import Link from "next/link";

export function Navbar() {
  return (
    <div className="py-4">
      <Link href="\">
        <a>Home</a>
      </Link>
    </div>
  );
}
