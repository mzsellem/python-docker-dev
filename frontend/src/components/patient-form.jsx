// src/Form.js
import React, { useState } from "react";
import axios from "axios";

export default function Form({ initialData }) {
   const [formData, setFormData] = useState({ ...initialData } || {});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   async function handleSubmit(e) {
      // Handle form submission here, e.g., send data to a server
      axios
         .post("http://localhost:8000/api/patients/", {
            first_name: formData.firstName,
            last_name: formData.lastName,
            age: formData.age,
         })
         .then((res) => console.log("Success!", res))
         .catch((err) => console.log("Error!", err));
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="flex items-center space-x-4">
            <div>
               <label>Last Name:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>First Name:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Age:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Diagnosis:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
               />
            </div>
            <button className="navbarblue rounded text-white p-2" type="submit">
               Submit
            </button>
         </div>
      </form>
   );
}
