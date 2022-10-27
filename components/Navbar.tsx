import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  return (
    <div className="py-4 cursor-pointer">
      <Link href="/">
        <Image src={'/logo.svg'} width={154} height={30.8} alt="logo" />
      </Link>
    </div>
  )
}
