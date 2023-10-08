import Navbar from "../components/navbar";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import ICD10Search from "../components/icd";

export default function Patients() {
   const [details, setDetails] = useState([]);

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
      {
         field: "firstName",
         headerName: "First name",
         flex: 0.5,
         minWidth: 200,
      },
      { field: "lastName", headerName: "Last name", flex: 0.5, minWidth: 200 },
      {
         field: "age",
         headerName: "Age",
         type: "number",
         flex: 0.5,
         minWidth: 200,
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

   const rows = [
      { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
      { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
      { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
      { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
      { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
      { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
      { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
      { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
      { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
   ];

   return (
      <>
         <Navbar />
         <div className="w-screen">
            <header>Data Generated From Django PostgreSQL</header>
            <hr />
            {details.map((patient, id) => (
               <div key={id}>
                  <div>
                     <h2>{patient.last_name}</h2>
                     <h3>{patient.first_name}</h3>
                     <h3>{patient.age}</h3>
                     <h3>{patient.id}</h3>
                  </div>
               </div>
            ))}
         </div>
         <div className="flex flex-col">
            <div className="flex justify-center pt-8 pb-4">
               {" "}
               <div className="flex justify-center">
                  <h3>Last Name:&nbsp;</h3>
                  <input className="border"></input>
                  <button className="navbarblue text-white">Submit</button>
               </div>
               <div className="flex justify-center">
                  <h3>First Name:&nbsp;</h3>
                  <input className="border"></input>
                  <button className="navbarblue text-white">Submit</button>
               </div>
               <div className="flex justify-center">
                  <h3>Age:&nbsp;</h3>
                  <input className="border"></input>
                  <button className="navbarblue text-white">Submit</button>
               </div>
               <div className="flex justify-center">
                  <ICD10Search />
               </div>
            </div>
            <div className="flex justify-center">
               <div className="flex flex-col w-screen">
                  <div className="flex">
                     <div className="flex text-3xl mb-4">Patients</div>
                     &nbsp; &nbsp;
                     <button className="flex m-2">+</button>
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
