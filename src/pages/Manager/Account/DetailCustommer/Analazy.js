import React, { Component,useEffect,useState } from "react";
import ChartCategoryBar from "../ChartAnalaysis/ChartCategory";
import ChartLocationBar from "../ChartAnalaysis/ChartLocation";

const Analazycustomer = ({ rowData }) => {
    return(
        <>
      
        <div className="row">
        <div className="col-xl-6 col-lg-6">
              <ChartCategoryBar/>
            </div>
            <div className="col-xl-6 col-lg-6">
              <ChartLocationBar/>
            </div>
            </div>
          </>
    )






}
export default Analazycustomer;