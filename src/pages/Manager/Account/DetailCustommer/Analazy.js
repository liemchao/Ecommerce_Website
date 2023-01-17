import PageHeading from "../../../../components/PageHeading";
// import { Link, Redirect } from "react-router-dom";
import Bar from "../../../../components/Charts/Bar"
import React, { Component,useEffect,useState } from "react";


const Analazycustomer = ({ rowData }) => {


    return(
        <>
      
        <div className="row">
        <div className="col-xl-6 col-lg-6">
              <Bar title="Analysis by location"/>
            </div>
            <div className="col-xl-6 col-lg-6">
              <Bar title="Analysis by category "/>
            </div>
            </div>
          </>
    )






}
export default Analazycustomer;