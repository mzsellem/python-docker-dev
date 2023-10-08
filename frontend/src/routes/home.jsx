// import Navbar from "../components/navbar";
// import { Worker } from "@react-pdf-viewer/core";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
// import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

// import * as React from "react";
import React, { useState, useEffect } from "react";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

export default function Home() {
   //    const pageNavigationPluginInstance = pageNavigationPlugin();

   //    const { CurrentPageInput, GoToNextPageButton, GoToPreviousPage } =
   //       pageNavigationPluginInstance;

   return (
      <>
         {/* <Navbar /> */}
         {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
               fileUrl="resume.pdf"
               plugins={[pageNavigationPluginInstance]}
            />
         </Worker>
         <div className="flex flex-row w-full justify-between p-6">
            <div className="flex flex-col border w-1/2">
               <div className="flex justify-center text-3xl"></div>
               <div className="flex justify-center">
                  <Stack spacing={2}>
                     <Pagination count={2} color="primary" />
                  </Stack>
               </div>
            </div> */}
         <div className="flex text-3xl border justify-center rounded">
            Hello BeyondMD!
         </div>
         {/* </div> */}
      </>
   );
}
