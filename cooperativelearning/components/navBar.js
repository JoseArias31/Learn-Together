import Link from 'next/link';

export default function NavBar() {
return(

    <nav className="bg-blue-500 p-4">
    <ul className="flex space-x-4">
      <li>
        <Link href="/contact">
          <a className="text-white">Contact</a>
        </Link>
      </li>
      <li>
        <Link href="/signin">
          <a className="text-white">Sign in</a>
        </Link>
      </li>
    </ul>
  </nav>


)


}