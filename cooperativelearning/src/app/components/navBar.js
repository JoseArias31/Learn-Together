import Link from 'next/link';
import '../globals.css'
import Image from 'next/image'
import logo from '../../../public/Logo.png';


export default function NavBar() {


  return(

    <nav className="p-4 flex justify-start items-center" style={{background:'#0C0C1D', justifyContent:'space-between'}}>

<div className='flex items-center gap-4'>
    <Image className='relative z-10' src={logo} alt="Logo" width={41} />
    <h1 className='text-white' style={{fontSize:'1.875rem'}}>Learn Together</h1>
    </div>


       
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


