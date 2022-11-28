import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import PositionCreate from "../../../components/Modals/Position/PositionCreate";
import PositionUpdate from "../../../components/Modals/Position/PositionUpdate";
import ApiService from "../../../api/ApiService";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";

const RecruitmentList = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  async function getRecruitmentList(rows, currentPage) {
    setLoadingData(true);

    ApiService.getRecruitments(rows, currentPage)
      .then((response) => {
        console.log(response.data.data);
        // check if the data is populated
        setData(response.data.data);
        setTotalPage(response.data.totalPage);
        setTotalRecords(response.data.totalEle);
        // you tell it that you had the result
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
      });
  }

  useEffect(() => {
    getRecruitmentList(rows, currentPage);
  }, [currentPage]);

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

  const customButton = (rowData) => {
    return (
      <div style={{ display: "flex" }}>
        {/* Detail */}
        <Link
          style={{ paddingRight: "15px" }}
          to={{
            pathname: "/Dashboard/Admin/ApplyList",
            state: rowData,
          }}
        >
          Apply List
        </Link>
      </div>
    );
  };

  const refreshList = () => {
    getRecruitmentList(rows, currentPage);
  };

  const handleDelete = (e, rowData) => {
    e.preventDefault();
    let confirm = window.confirm(
      "Are you sure you want to delete this recruitments?"
    );

    if (confirm) {
      ApiService.deleteRecruitments(
        rowData
          .then((response) => {
            console.log(response.data);
            refreshList();
          })
          .catch((e) => {
            console.log(e);
          })
      );
    }
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
    <>
      {/* New DataTable */}
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <PageHeading title="Recruitment List" />
        </div>
        {!data ? (
          <p>No data to show...</p>
        ) : (
          <div id="wrapper">
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="ID" field="id" />
                  <Column header="Title" field="title" />
                  <Column header="Description" field="description" />
                  <Column header="Salary" field="salary" />
                  <Column header="End Time" field="endtime" />
                  <Column header="Action" body={customButton} />
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
        )}
      </div>
    </>
  );
};

export default RecruitmentList;
