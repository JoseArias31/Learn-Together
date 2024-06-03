import Link from 'next/link';
import '../src/app/globals.css'


export default function NavBar() {
return(

    <nav className="p-4" style={{background:'#0C0C1D'}}>
        
    <ul className="flex space-x-4" style={{justifyContent:'right'}}>
        
      <li>
        <Link href="/contact" className="text-white">
          Contact
        </Link>
      </li>
      <li>
        <Link href="/signin" className="text-white">
          Sign in
        </Link>
      </li>
   
    </ul>
   
  </nav>


)


}


