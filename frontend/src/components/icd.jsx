import React, { useState } from "react";
import axios from "axios";
import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from "@mui/material";

export default function ICD10Search() {
   const [searchTerm, setSearchTerm] = useState("");
   const [results, setResults] = useState([]);

   const handleSearch = async () => {
      try {
         const response = await axios.get(
            `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${searchTerm}`
         );
         console.log({ response });
         setResults(response.data[3]);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   return (
      <>
         <div className="flex flex-col ml-4">
            <div className="flex mb-4">
               <div className="flex items-center text-xl mr-2">
                  ICD-10 Code Search
               </div>
               <div className="flex">
                  <input
                     className="border rounded-lg"
                     type="text"
                     placeholder="Enter search term"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                     className="ml-4 bg-blue-500 hover:bg-blue-700 text-white rounded p-2"
                     onClick={handleSearch}
                  >
                     Search
                  </button>
               </div>
            </div>
            <div>
               <TableContainer component={Paper}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Code</TableCell>
                           <TableCell>Description</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {results.map((result) => (
                           <TableRow key={result[0]}>
                              <TableCell>{result[0]}</TableCell>
                              <TableCell>{result[1]}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            </div>
         </div>
      </>
   );
}
