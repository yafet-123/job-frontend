import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';

export function DashBoard() {
    const [getSearchValue,setgetSearchValue] = useState("")
    const SearchList = [
        { type: 1, name: "User",},
        { type: 2, name: "Job",},
        { type: 3, name: "Category",},
        { type: 4, name: "Location",},
    ];

    // const searchaxios = axios.create({
    //     baseURL : api,
    // })
    

    async function handleSearch(e){
        const data = await axios.post(`api/searchAdmin`,{
            "searchName": getSearchValue,
            "type": e
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className="mt-10 mx-10">
            <div className="max-w-7xl mx-auto ">
                <div className="flex my-10 w-full">
                    <div className="relative flex-1">
                        <input 
                            id="search" 
                            type="text" 
                            className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={getSearchValue}
                            onChange={(e) => setgetSearchValue(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Search
                        </label>
                    </div>
                    <div className="mx-2">
                        <div className="dropdown inline-block relative">
                            <button className="flex justify-between rounded-xl w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl px-4 py-4 text-center inline-flex items-center">
                                <span className="mr-1">Search</span>
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                            </button>
                            <ul className="dropdown-menu absolute hidden text-black pt-1">
                                {SearchList.map((search, index) => (
                                    <li className="" key={index}>
                                        <button onClick={()=> handleSearch(search.type)} className="text-left text-xl w-32 bg-white hover:bg-gray-400 py-2 px-2">
                                            By {search.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>  
            </div>
            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                          <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                          <th class="p-3 text-sm font-semibold tracking-wide text-left">Details</th>
                          <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                          <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                          <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="bg-white">
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" class="font-bold text-blue-500 hover:underline">10001</a>
                          </td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Kring New Fit office chair, mesh + PU, black
                          </td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                            class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                          </td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
                        </tr>
                        <tr class="bg-gray-50">
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" class="font-bold text-blue-500 hover:underline">10002</a>
                          </td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">Kring New Fit office chair, mesh + PU, black</td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                            class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Shipped</span>
                          </td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
                        </tr>
                        <tr class="bg-white">
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" class="font-bold text-blue-500 hover:underline">10002</a>
                          </td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">Kring New Fit office chair, mesh + PU, black</td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                            class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Cancelled</span>
                          </td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
 
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                <div class="flex items-center space-x-2 text-sm">
                  <div>
                    <a href="#" class="text-blue-500 font-bold hover:underline">#1000</a>
                  </div>
                  <div class="text-gray-500">10/10/2021</div>
                  <div>
                    <span
                      class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                  </div>
                </div>
                <div class="text-sm text-gray-700">
                  Kring New Fit office chair, mesh + PU, black
                </div>
                <div class="text-sm font-medium text-black">
                  $200.00
                </div>
              </div>
              <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                <div class="flex items-center space-x-2 text-sm">
                  <div>
                    <a href="#" class="text-blue-500 font-bold hover:underline">#1001</a>
                  </div>
                  <div class="text-gray-500">10/10/2021</div>
                  <div>
                    <span
                      class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Shipped</span>
                  </div>
                </div>
                <div class="text-sm text-gray-700">
                  Kring New Fit office chair, mesh + PU, black
                </div>
                <div class="text-sm font-medium text-black">
                  $200.00
                </div>
              </div>
              <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                <div class="flex items-center space-x-2 text-sm">
                  <div>
                    <a href="#" class="text-blue-500 font-bold hover:underline">#1002</a>
                  </div>
                  <div class="text-gray-500">10/10/2021</div>
                  <div>
                    <span
                      class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Canceled</span>
                  </div>
                </div>
                <div class="text-sm text-gray-700">
                  Kring New Fit office chair, mesh + PU, black
                </div>
                <div class="text-sm font-medium text-black">
                  $200.00
                </div>
              </div>
            </div>
        </div>
  );
}
