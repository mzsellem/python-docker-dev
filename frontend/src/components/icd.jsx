import React, { useState } from "react";
import axios from "axios";

const ICD10Search = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const [results, setResults] = useState([]);

   const handleSearch = async () => {
      try {
         const response = await axios.get(
            "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?df=code,name",
            {
               params: {
                  sf: "code,name",
                  df: "code,name",
                  terms: searchTerm, // Pass the search term here
               },
            }
         );
         console.log({ response });
         setResults(response.data.results);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   return (
      <>
         <div className="flex flex-row">
            <div className="flex mb-4">ICD-10 Code Search</div>
            <div className="flex">
               <input
                  className="border rounded-lg"
                  type="text"
                  placeholder="Enter search term"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               <button
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl p-2"
                  onClick={handleSearch}
               >
                  Search
               </button>
            </div>

            <ul>
               {results.map((result) => (
                  <li key={result.code}>
                     {result.code} - {result.name}
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};

export default ICD10Search;
