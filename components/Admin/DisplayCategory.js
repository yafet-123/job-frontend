import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';

export function DisplayCategory({categories}) {
    console.log(categories)
    return (
        <div className="m-2 lg:m-20">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-800 border-b-2 border-gray-200">
                        <tr>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Category Name</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                          <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.map((data,index)=>(
                            <tr key={index} className="bg-white dark:bg-slate-900">
                                <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                    <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.category_id}</p>
                                </td>
                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                    {data.CategoryName}
                                </td>
                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                    {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                </td>
                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                    {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                </td>

                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                    {data.userName}
                                </td>

                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                        Edit
                                    </button>
                                </td>

                                <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {categories.map((data,index)=>(
                    <div key={index} className="bg-white dark:bg-slate-800 space-y-3 p-4 rounded-lg shadow">
                        <div>
                            <p className="text-lg text-blue-500 dark:text-white font-bold hover:underline">{data.category_id}</p>
                        </div>
                        <div className="text-lg text-gray-700 dark:text-white font-bold">
                            Category Name : {data.CategoryName}
                        </div>
                        <div className="text-lg text-gray-700 dark:text-white font-bold">
                            Created By : {data.userName}
                        </div>
                        <div className="text-sm text-black dark:text-white">
                          createDate : {moment(data.createDate).utc().format('YYYY-MM-DD')}
                        </div>
                        <div className="text-sm text-black dark:text-white">
                          Modified Date : {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Edit
                            </button>

                            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
}
