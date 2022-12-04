import React from "react";
import { useState,useEffect, useContext} from 'react'

export function AddCategory() {
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-black text-4xl font-bold text-center italic">Add Category</h1>
            <div className="flex items-center my-10">
                <input 
                    className="shadow appearance-none border w-full py-4 px-3 text-xl text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="Category" 
                    type="text"
                    placeholder="Category"
                />
                <button 
                    className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-lg px-4 py-4 text-center inline-flex items-center"
                >
                    Submit
                </button>
            </div>

            
        </div>
  );
}
