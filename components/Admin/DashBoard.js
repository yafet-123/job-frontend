import React from "react";
export function DashBoard() {
    return (
        <div className="flex items-center justify-center mt-10">
            <input 
                class="shadow appearance-none border rounded w-1/2 py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="username" 
                type="text"
                placeholder="Search by"
            />
            <button 
                id="dropdownDefault" 
                data-dropdown-toggle="dropdown" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
            >
                Dropdown button 
                <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                  <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                  </li>
                </ul>
            </div>
        </div>
  );
}