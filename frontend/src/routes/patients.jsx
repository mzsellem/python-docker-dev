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
   const [patientToUpdate, setPatientToUpdate] = useState(null); // State to store the patient data for editing
   const [selectedPatient, setSelectedPatient] = useState(null);
   const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

   // Handle the "Add Diagnosis" button click
   //click assigns patientID
   const handleDiagnosisButtonClick = (patient) => {
      console.log({ patient });
      // Set the selected patient ID
      setSelectedPatient(patient.id);
      setPatientToUpdate(patient);
   };

   useEffect(() => {
      axios
         .get("http://localhost:8000/api/patients")
         .then((res) => {
            const data = res.data;
            setDetails(data);
         })
         .catch((err) => {});
   }, []);

   const handleDelete = (patientId) => {
      axios
         .delete(`http://localhost:8000/api/patients/${patientId}`)
         .then((res) => {
            // Handle success (e.g., remove the patient from the UI)
            setDetails((prevDetails) =>
               prevDetails.filter((patient) => patient.id !== patientId)
            );
            console.log("Patient removed.", res);
         })
         .catch((err) => {
            console.error("Error deleting patient:", err);
            if (err.response) {
               // Log the server response if available
               console.error("Server Response:", err.response.data);
            }
            // Handle the error, e.g., display an error message
         });
   };

   const handleEdit = (patient) => {
      // Set the patient data to be updated in the state
      setPatientToUpdate(patient);
      // Show the form for editing
      setShowForm(true);
   };

   const updatePatient = (updatedFormData) => {
      console.log({ updatedFormData });
      // Send a PUT request to update the patient data
      axios
         .put(`http://localhost:8000/api/patients/${patientToUpdate.id}/`, {
            first_name: updatedFormData.firstName,
            last_name: updatedFormData.lastName,
            age: updatedFormData.age,
         })
         .then((res) => {
            // Handle success (e.g., update the patient data in the UI)
            console.log("Success!", res);
            // Here, you can update the patient data in 'details' state with the updatedData
            setDetails((prevDetails) =>
               prevDetails.map((patient) =>
                  patient.id === patientToUpdate.id
                     ? { ...patient, ...updatedFormData }
                     : patient
               )
            );
            // Clear the patientToUpdate state and hide the form
            setPatientToUpdate(null);
            setShowForm(false);
            console.log("Patient updated.", res);
         })
         .catch((err) => {
            console.error("Error updating patient:", err);
            if (err.response) {
               // Log the server response if available
               console.error("Server Response:", err.response.data);
            }
            // Handle the error, e.g., display an error message
         });
   };

   const columns = [
      { field: "id", headerName: "ID", flex: 0.5, minWidth: 150 },
      { field: "lastName", headerName: "Last name", flex: 0.5, minWidth: 150 },
      {
         field: "firstName",
         headerName: "First name",
         flex: 0.5,
         minWidth: 150,
      },
      {
         field: "age",
         headerName: "Age",
         flex: 0.5,
         minWidth: 100,
      },
      {
         field: "delete",
         headerName: "",
         type: "number",
         flex: 0.5,
         minWidth: 100,
         renderCell: (params) => (
            <button
               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
               onClick={() => handleDelete(params.row.id)}
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
         minWidth: 100,
         renderCell: (params) => (
            <button
               className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
               onClick={() => handleEdit(params.row)}
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
         minWidth: 150,
         // valueGetter: (params) =>
         //    `${params.row.firstName || ""} ${params.row.lastName || ""}`,
         renderCell: (params) => (
            <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
               onClick={() => handleDiagnosisButtonClick(params.row)}
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
      diagnosis: patient.diagnosis,
   }));

   const toggleForm = () => {
      setShowForm(!showForm);
   };

   return (
      <>
         <Navbar />
         <div className="flex flex-col">
            <div>
               <div className="flex justify-center pt-8 pb-4">
                  {showForm && (
                     <PatientForm
                        updatePatient={updatePatient} // Pass the updatePatient function to the form component
                        patientToUpdate={patientToUpdate} // Pass the patient data for editing
                     />
                  )}
               </div>
            </div>
         </div>
         <div className="flex justify-center">
            <div className="flex flex-col w-screen">
               <div className="flex w-screen">
                  <div className="flex text-3xl mb-4">Patients</div>
                  &nbsp; &nbsp;
                  <div className="flex">
                     <button
                        className="flex m-2 navbarblue h-1/2 w-5 justify-center rounded text-white"
                        onClick={toggleForm}
                     >
                        {showForm ? "-" : "+"}
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex w-screen">
            <div className="flex w-2/3">
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
            <div className="flex w-1/3">
               <ICD10Search
                  selectedDiagnosis={selectedDiagnosis}
                  setSelectedDiagnosis={setSelectedDiagnosis}
                  patientId={selectedPatient}
                  setSelectedPatient={setSelectedPatient}
                  patientInfo={patientToUpdate}
                  setDetails={setDetails}
               />
            </div>
         </div>
      </>
   );
}
