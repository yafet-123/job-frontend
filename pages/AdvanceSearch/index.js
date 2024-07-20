import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/router';
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import { MainHeader } from '../../components/common/MainHeader';
import { CompanyJobs } from '../../components/jobs/CompanyJobs';
import RiseLoader from "react-spinners/RiseLoader";

export default function AdvanceSearch() {
  const router = useRouter();
  const shareUrl = router.asPath;
  const { searchName } = router.query;
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [getSearchValue, setGetSearchValue] = useState(searchName || "");
  const [searchValue, setSearchValue] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (getSearchValue.trim() === "") {
      setError("Please Insert a value");
      setSearchValue([]);
    } else {
      setLoading(true);
      try {
        const response = await axios.post(`/api/searchClientJob`, {
          searchName: getSearchValue,
        });
        const objOneData = response.data;
        if (Array.isArray(objOneData)) {
          setSearchValue(objOneData);
        } else {
          setSearchValue([objOneData]);
        }
        setError("");
      } catch (error) {
        console.error(error);
        setError("An error occurred while searching.");
      } finally {
        setLoading(false);
      }
    }
  }, [getSearchValue]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <React.Fragment>
      <MainHeader title="Hulu Media: Advance Search" />
      <div className="flex flex-col bg-[#e6e6e6] bg-opacity-100 dark:bg-[#02201D] pt-32 px-3 lg:px-72">
        <div className="!h-16 w-full dark:border-slate-800 px-2 my-10">
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <input
              value={getSearchValue}
              placeholder="Career level, Job Type, Company Name, Employment type"
              onChange={(e) => setGetSearchValue(e.target.value)}
              className="text-black dark:text-white placeholder:font-bold mb-5 lg:mb-0 duration-1000 ease-in-out h-16 focus:w-full w-[90%] lg:w-[70%] bg-white dark:bg-[#1B2637] outline-none md:pl-2 text-sm lg:text-lg border border[#009688] border-l-2 rounded-xl mr-2"
            />
            <div className="h-16 bg-[#009688] hover:bg-opacity-50 text-white lg:px-3 flex items-center justify-center border border[#009688] border-l-2 rounded-xl px-5">
              <AiOutlineSearch size={20} />
              <button
                onClick={handleSearch}
                className="font-bold text-xs md:text-xl text-white bg-transparent lg:px-3 flex items-center justify-center"
                disabled={loading}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center my-5">
          <RiseLoader
            color="#36d7b7"
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>

        {error === "" ? (
          <div>
            {searchValue.length === 0 ? (
              <h1 className="text-black dark:text-white text-xl font-bold text-center italic my-5">
                {loading ? "please wait ..." : "No data can be found"}
              </h1>
            ) : (
              <CompanyJobs jobs={searchValue} shareUrl={shareUrl} />
            )}
          </div>
        ) : (
          <h1 className="text-black dark:text-white text-xl font-bold text-center italic">
            {error}
          </h1>
        )}
      </div>
    </React.Fragment>
  );
}
