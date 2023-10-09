import Navbar from "../components/navbar";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import PatientForm from "../components/patient-form";
import ICD10Search from "../components/icd";

export default function Patients() {
   const [details, setDetails] = useState([]);
   const [showForm, setShowForm] = useState(false);

   useEffect(() => {
      axios
         .get("http://localhost:8000/api/patients")
         .then((res) => {
            console.log({ res });
            const data = res.data;
            setDetails(data);
         })
         .catch((err) => {});
   }, []);
   const columns = [
      { field: "id", headerName: "ID", flex: 0.5, minWidth: 200 },
      { field: "lastName", headerName: "Last name", flex: 0.5, minWidth: 200 },
      {
         field: "firstName",
         headerName: "First name",
         flex: 0.5,
         minWidth: 200,
      },
      {
         field: "delete",
         headerName: "",
         type: "number",
         flex: 0.5,
         minWidth: 200,
         renderCell: (params) => (
            <button
               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
               onClick={() => handleButtonClick(params.row)}
            >
               Delete
            </button>
         ),
      },
      {
         field: "edit",
         headerName: "",
         type: "number",
         flex: 0.5,
         minWidth: 200,
         renderCell: (params) => (
            <button
               className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
               onClick={() => handleButtonClick(params.row)}
            >
               Edit
            </button>
         ),
      },
      {
         field: "diagnosis",
         headerName: "Diagnosis",
         description: "This column has a value getter and is not sortable.",
         sortable: false,
         flex: 0.5,
         minWidth: 200,
         // valueGetter: (params) =>
         //    `${params.row.firstName || ""} ${params.row.lastName || ""}`,
         renderCell: (params) => (
            <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
               onClick={() => handleButtonClick(params.row)}
            >
               Add Diagnosis
            </button>
         ),
      },
   ];

   const rows = details.map((patient) => ({
      id: patient.id,
      lastName: patient.last_name,
      firstName: patient.first_name,
      age: patient.age,
   }));

   // Define your rows and columns here

   const toggleForm = () => {
      setShowForm(!showForm);
   };

   return (
      <>
         <Navbar />
         <div className="flex flex-col">
            <div>
               <div className="flex justify-center pt-8 pb-4">
                  {showForm && <PatientForm />}
               </div>
            </div>
            <div className="flex justify-center">
               <div className="flex flex-col w-screen">
                  <div className="flex">
                     <div className="flex text-3xl mb-4">Patients</div>
                     &nbsp; &nbsp;
                     <button
                        className="flex m-2 navbarblue h-1/2 w-5 justify-center rounded text-white"
                        onClick={toggleForm}
                     >
                        {showForm ? "-" : "+"}
                     </button>
                  </div>
                  <div>
                     <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                           pagination: {
                              paginationModel: { page: 0, pageSize: 5 },
                           },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
