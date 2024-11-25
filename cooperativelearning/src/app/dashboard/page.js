
"use client";

import Link from "next/link";
// import useUserProfile from './useUserProfile';
// import ButtonGoHome from './ButtonGoHome';

import useCharts from "../../scripts/dashboard/useCharts";
import useSidebarToggle from "../../scripts/dashboard/useSidebarToggle";
import Image from 'next/image';
import logo from '../../../public/Logo.png'
import ImageCarousel from "../components/ProgramCarousel";
import CategoryCarousel from "../components/CategoryCarousel";
const Dashboard = () => {

  const { isSidebarVisible, toggleSidebar } = useSidebarToggle();

  // Initialize charts
  useCharts();
  return (
    <div className="bg-gray-900 text-gray-100 overflow-x-clip">
      {/* Header Section */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            id="menuButton"
            className="text-gray-100 text-3xl lg:hidden hover:text-gray-400"
            aria-label="Open Menu"
          >
            <i className="bx bx-menu"></i>
          </button>
          <div className="flex items-center gap-2 text-teal-400 cursor-pointer">
            <i className="bx bx-infinite text-3xl"></i>
            {/* remove background logo */}
            <Image className='relative z-10' src={logo} alt="Logo" width={41} />
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative hidden lg:flex w-[500px]">
            <input
              type="text"
              placeholder="What should I study?"
              className="w-full py-2 pl-10 pr-4 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 font-medium">Hello John Doe!</span>
          
        </div>
      </header>

      <div className="flex p-3 gap-4">
        {/* Sidebar Section */}
        <aside
          id="sidebar"
          className="w-42 hidden lg:block rounded-lg bg-gray-800 p-2 py-5 fixed lg:relative lg:translate-x-0 transform -translate-x-full transition-transform duration-200 ease-in-out"
        >
          <nav className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-home-alt text-teal-400"></i>
              <span>Home</span>
            </Link>
            <Link
              href="/programs"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-line-chart text-teal-400"></i>
              <span>My Programs</span>
            </Link>
            <Link
              href="/ai-assistance"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-wallet text-teal-400"></i>
              <span>AI Assistance</span>
            </Link>
            
            <Link
              href="/settings"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-cog text-teal-400"></i>
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Section */}
        <main className="flex-1 bg-gray-900 flex gap-4 flex-col lg:flex-row ml-0 lg:ml-42">
          <section className="w-full lg:flex-1 p-4 space-y-6 bg-gray-800 flex flex-col rounded-lg">
            {/* Revenue Flow Card */}
            {/* <div className="bg-gray-700 p-5 rounded-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <i className="bx bx-trending-up text-teal-400 text-2xl"></i>
                  <h2 className="text-lg font-semibold text-gray-100">
                    Revenue Flow
                  </h2>
                </div>
                <span className="text-xl font-bold text-gray-100">$24,300</span>
              </div>
              <canvas id="revenueFlowChart" className="w-full"></canvas>
            </div> */}
<ImageCarousel />
<CategoryCarousel />


            <div className="flex gap-4 flex-col md:flex-row">
              {/* Income Card */}
              <div className="bg-gray-700 p-5 flex-1 rounded-md flex items-center justify-between">
                <div className="flex md:items-center gap-2 flex-col lg:flex-row items-start">
                  <i className="bx bx-dollar-circle text-teal-400 text-2xl"></i>
                  <h2 className="text-sm md:text-lg font-semibold text-gray-100">
                    Income
                  </h2>
                </div>
                <div className="text-xl font-bold text-gray-100 flex flex-col items-end lg:flex-row lg:items-center gap-2">
                  <span className="text-sm lg:text-lg">$15,200</span>
                  <span className="text-green-400 text-sm">+8%</span>
                </div>
              </div>

              {/* Expense Card */}
              <div className="bg-gray-700 p-4 md:p-5 flex-1 rounded-md flex items-center justify-between">
                <div className="flex md:items-center gap-2 flex-col lg:flex-row items-start">
                  <i className="bx bx-cart text-teal-400 text-2xl"></i>
                  <h2 className="text-sm md:text-lg font-semibold text-gray-100">
                    Expenses
                  </h2>
                </div>
                <div className="text-xl font-bold text-gray-100 flex flex-col items-end lg:flex-row lg:items-center gap-2">
                  <span className="text-sm lg:text-lg">$6,700</span>
                  <span className="text-red-400 text-sm">-5%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Side Content */}
          <section className="w-full lg:w-[300px] p-4 flex flex-col justify-between gap-4 bg-gray-800 rounded-lg">
            {/* Credit Card */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-5 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-2">Programs Registered</h3>
              <p className="text-sm mb-4">Front-end Web Development</p>
              <p className="text-sm mb-4">Data Bases</p>
              <p className="text-sm mb-4">English</p>
              <div className="flex justify-center text-blue-500 hover:text-blue-700 ">
                <Link href="/programs">
              <div className="hover:scale-110 transition duration-300">
              <Image 
         
              src="/add sign.png"
              alt="add simbol"
              width={30}
              height={30}

              ></Image>
           </div>
           </Link>
           </div>           
            </div>

            {/* Available Balance */}
            <div className="flex bg-gray-700 p-3 rounded-md overflow-hidden flex-row justify-between">
              <div className="flex flex-col justify-between mb-4">
                
                <h2 className="text-base font-semibold text-gray-100">
                  Account Status
                </h2>
                <br></br>
                <h2 className="text-base font-semibold text-gray-100">
                  Membership
                </h2>
                <br></br>
                <h2 className="text-base font-semibold text-gray-100">
                  Subscription
                </h2>
                <br></br>
                <h2 className="text-base font-semibold text-gray-100">
                  Programs Completed
                </h2>

              </div>
              <div className="flex flex-col justify-between mb-4">

<h3 className="text-sm">Active</h3>
<h3 className="text-sm">Student</h3>
<h3 className="text-sm">Montly</h3>
<h3 className="text-sm">2</h3>

              </div>
              
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
