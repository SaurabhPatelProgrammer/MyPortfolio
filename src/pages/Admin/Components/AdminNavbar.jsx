import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Adminnavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white bg-opacity-5 backdrop-blur-xl text-white w-full z-10 fixed top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">Logo</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Project
              </a>
              <a
                href="#"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Skill
              </a>
              <a
                href="#"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                All Projects
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <button className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Create Project
            </a>
            <a
              href="#"
              className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Create Skill
            </a>
            <a
              href="#"
              className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              All Projects
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2">
              <button className="block w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
