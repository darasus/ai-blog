import { Link } from './Link'

export const Footer = () => {
  return (
    <div className="flex justify-center items-center w-full p-4">
      <span className="text-gray-700 text-sm">{`The AI Paper © ${new Date().getFullYear()}`}</span>
      <div className="mr-4" />
      <Link href="/" locale="en">
        <span className="capitalize text-gray-700 text-sm underline">
          {new Intl.DisplayNames(['en'], { type: 'language' }).of('en')}
        </span>
      </Link>
      <div className="mr-4" />
      <Link href="/" locale="es">
        <span className="capitalize text-gray-700 text-sm underline">
          {new Intl.DisplayNames(['es'], { type: 'language' }).of('es')}
        </span>
      </Link>
    </div>
  )
}
