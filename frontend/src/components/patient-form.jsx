// src/Form.js
import React, { useState } from "react";

export default function Form() {
   const [formData, setFormData] = useState({
      lastName: "",
      firstName: "",
      age: "",
      diagnosis: "",
      // Add more form fields as needed
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here, e.g., send data to a server
      console.log(formData);
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="flex items-center space-x-4">
            <div>
               <label>Last Name:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="lastname"
                  value={formData.name}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>First Name:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="firstname"
                  value={formData.email}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Age:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="age"
                  value={formData.email}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Diagnosis:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="diagnosis"
                  value={formData.email}
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
