import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/ApiService";

const ApplyList = () => {
  const { state } = useLocation();
  const [recruitment, setRecruitment] = useState([]);
  const [company, setCompany] = useState([]);
  const [applied, setApplied] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  const createTime = new Date(recruitment.createdTime).toDateString();
  const endTime = new Date(recruitment.endtime).toDateString();

  async function getApplyList(id, rows, currentPage) {
    setLoadingData(true);
    ApiService.getCandidateInRecruitment(id, rows, currentPage)
      .then((response) => {
        setApplied(response.data);
        setTotalPage(response.data.totalPage);
        setTotalRecords(response.data.totalEle);
        setLoadingData(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
        setLoadingData(false);
      });
  }

  async function getCompanyName(id) {
    ApiService.getCompanyById(id)
      .then((response) => {
        setCompany(response.data.data[0].name);
        console.log(company);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  useEffect(() => {
    if (typeof state != "undefined") {
      localStorage.setItem("ID", JSON.stringify(state));
    }
    const rowData = JSON.parse(localStorage.getItem("ID"));
    setRecruitment(rowData);
    getCompanyName(rowData.companyId);
    getApplyList(rowData.id, rows, currentPage);
    setLoadingData(false);
  }, []);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  const onPageInputKeyDown = (event, options, totalPage) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 0 || page > totalPage) {
        setPageInputTooltip(`Value must be between 1 and ${totalPage}.`);
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;
        setFirst(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const template = {
    layout: "CurrentPageReport PrevPageLink NextPageLink",
    CurrentPageReport: (options) => {
      return (
        <>
          <span
            className="p-mx-3"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Go to{" "}
            <InputText
              size="2"
              className="p-ml-1"
              value={currentPage}
              tooltip={pageInputTooltip}
              onKeyDown={(e) => onPageInputKeyDown(e, options, totalPage)}
              onChange={onPageInputChange}
            />
          </span>
          <span
            style={{
              color: "var(--text-color)",
              userSelect: "none",
              width: "120px",
              textAlign: "center",
            }}
          >
            {options.first} - {options.last} of {options.totalRecords}
          </span>
        </>
      );
    },
  };

  return (
    <div>
      <PageHeading title="Apply List" />
      {loadingData ? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card ">
                <div className="card-body">
                  <div className="d-flex flex-column">
                    This is the recruitment list for company: {company}
                  </div>
                  <ul className="d-flex flex-column">
                    <li>Description: {recruitment.description}</li>
                    <li>From: {createTime}</li>
                    <li>To: {endTime}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow mb-4">
                <DataTable
                  value={applied.data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="ID" field="userAccountId" />
                  <Column header="Name" field="name" />
                </DataTable>
                <Paginator
                  paginator
                  template={template}
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  onPageChange={onPageChange}
                  className="p-jc-end p-my-3"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyList;
