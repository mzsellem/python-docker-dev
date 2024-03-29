import React, { useState, useEffect } from "react";
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

export default function ICD10Search({
   //Pass this data from patients.jsx as props to use in icd.jsx
   selectedDiagnosis,
   setSelectedDiagnosis,
   patientId,
   setSelectedPatient,
   patientInfo,
   setDetails,
}) {
   const [searchTerm, setSearchTerm] = useState("");
   const [results, setResults] = useState([]); // State to store the results of diagnosis search

   const handleDiagnosisSelection = (code, description) => {
      setSelectedDiagnosis(code, description);
   };

   useEffect(() => {
      if (selectedDiagnosis) {
         // Send a PUT request to update the patient's diagnosis
         axios
            .put(`http://localhost:8000/api/patients/${patientId}/`, {
               diagnosis: selectedDiagnosis,
               //Reformat data: snake to camel case because of django backend and js frontend
               age: patientInfo.age,
               last_name: patientInfo.lastName,
               first_name: patientInfo.firstName,
            })
            .then((res) => {
               // Handle success: update the patient data in 'details' state with the updated diagnosis
               setDetails((prevDetails) =>
                  prevDetails.map((patient) =>
                     patient.id === patientId
                        ? { ...patient, diagnosis: selectedDiagnosis }
                        : patient
                  )
               );
               // Clear the selected patient and diagnosis
               setSelectedPatient(null);
               setSelectedDiagnosis(null);
            })
            .catch((err) => {
               console.error("Error adding diagnosis:", err);
               if (err.response) {
                  console.error("Server Response:", err.response.data);
               }
            });
      }
      //Watch for changes in diagnosis and patientId
   }, [selectedDiagnosis, patientId]);

   //Get data from third party api and set results (setResults)
   const handleSearch = async () => {
      try {
         const response = await axios.get(
            `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${searchTerm}`
         );
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
                        {/* Display results of ICD10 search */}
                        {results.map((result) => (
                           <TableRow key={result[0]}>
                              <TableCell>{result[0]}</TableCell>
                              <TableCell>{result[1]}</TableCell>
                              <TableCell>
                                 <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() =>
                                       handleDiagnosisSelection(
                                          result[0],
                                          result[1]
                                       )
                                    }
                                 >
                                    Select
                                 </button>
                              </TableCell>
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
