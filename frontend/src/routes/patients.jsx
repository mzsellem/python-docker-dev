import Navbar from "../components/navbar";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import PatientForm from "../components/patient-form";
import ICD10Search from "../components/icd";

export default function Patients() {
   const [details, setDetails] = useState([]); // State to store the patient data
   const [showForm, setShowForm] = useState(false);
   const [patientToUpdate, setPatientToUpdate] = useState(null); // State to store the patient data for editing
   const [selectedPatient, setSelectedPatient] = useState(null); // State to store the patient data for diagnosis
   const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
   const [isEditing, setIsEditing] = useState(false);

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
         renderCell: (params) => {
            //If there is a diagnosis, show it. If there isn't, display the "Add Diagnosis" button
            if (params.row.diagnosis) {
               return <div>{params.row.diagnosis}</div>;
            } else {
               return (
                  <button
                     className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
                     onClick={() => handleDiagnosisButtonClick(params.row)}
                  >
                     Add Diagnosis
                  </button>
               );
            }
         },
      },
   ];

   const rows = details.map((patient) => ({
      id: patient.id,
      lastName: patient.last_name,
      firstName: patient.first_name,
      age: patient.age,
      diagnosis: patient.diagnosis,
   }));

   //Get patients from the database
   useEffect(() => {
      axios
         .get("http://localhost:8000/api/patients")
         .then((res) => {
            const data = res.data;
            setDetails(data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   //Delete a patient
   const handleDelete = (patientId) => {
      axios
         .delete(`http://localhost:8000/api/patients/${patientId}`)
         .then((res) => {
            // Delete the patient from the frontend and display remaining patients
            setDetails((prevDetails) =>
               prevDetails.filter((patient) => patient.id !== patientId)
            );
            console.log("Patient removed.", res);
         })
         .catch((err) => {
            console.error("Error deleting patient:", err);
            if (err.response) {
               console.error("Server Response:", err.response.data);
            }
         });
   };

   // Update a patient
   const updatePatient = (updatedFormData) => {
      axios
         .put(`http://localhost:8000/api/patients/${patientToUpdate.id}/`, {
            //Reformat data: snake to camel case because of django backend and js frontend
            first_name: updatedFormData.firstName,
            last_name: updatedFormData.lastName,
            age: updatedFormData.age,
         })
         .then((res) => {
            // Update the patient data on the frontend with the updatedFormData
            setDetails((prevDetails) =>
               prevDetails.map((patient) =>
                  patient.id === patientToUpdate.id
                     ? { ...patient, ...updatedFormData }
                     : patient
               )
            );
            // Clear the patientToUpdate state and hide the form
            setPatientToUpdate(null);
            setIsEditing(false); // Set back to non-editing mode
            setShowForm(false);
         })
         .catch((err) => {
            console.error("Error updating patient:", err);
            if (err.response) {
               console.error("Server Response:", err.response.data);
            }
         });
   };

   // If the Edit button is clicked, set the patient to update and show the form
   const handleEdit = (patient) => {
      setPatientToUpdate(patient);
      setIsEditing(true);
      setShowForm(true);
   };

   const handleDiagnosisButtonClick = (patient) => {
      setSelectedPatient(patient.id);
      // Set the selected patient data
      setPatientToUpdate(patient);
   };

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
                        updatePatient={updatePatient}
                        patientToUpdate={patientToUpdate}
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
