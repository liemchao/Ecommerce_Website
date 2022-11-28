import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import ApiService from "../../../api/ApiService";

import PageHeading from "../../../components/PageHeading";

const CompanyDetail = () => {
  const { state } = useLocation();
  const [company, setCompany] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingData, setLoadingData] = useState(true);

  const getEmployeeInCompany = async (id, rows, currentPage) => {
    setLoadingData(true);
    try {
      await ApiService.getEmloyeeInCompany(id, rows, currentPage).then(
        (response) => {
          setEmployee(response.data.data);
          setTotalPage(response.data.totalPage);
          setTotalRecords(response.data.totalEle);
        }
      );
    } catch (error) {
      console.log("Fail To Load Employee List: " + error);
    }
  };

  useEffect(() => {
    if (typeof state != "undefined") {
      localStorage.setItem("Temp", JSON.stringify(state));
    }
    const storageEvent = JSON.parse(localStorage.getItem("Temp"));
    setCompany(storageEvent);
    getEmployeeInCompany(storageEvent.id, rows, currentPage);
    setLoadingData(false);
  }, []);

  const customEmpImg = (rowData) => {
    return (
      <React.Fragment>
        <img
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
          src={rowData.image}
          alt={rowData.image}
          className="event-image"
        />
        <span>{rowData.userName}</span>
      </React.Fragment>
    );
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  const onPageInputKeyDown = (event, options, totalPage) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      const first = currentPage ? options.rows * (page - 1) : 0;
      setFirst(first);
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
            <input
              size="2"
              className="p-ml-1"
              value={currentPage}
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
      <PageHeading title="Company Detail" />
      {loadingData ? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <img
                  src={company.image}
                  alt="user_avatar"
                  className="p-1 bg-primary img-thumbnail rounded mx-auto d-block"
                  width={200}
                />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">Description</h5>
                  <p className="card-text">{company.description}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card">
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="profile" title="Profile">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {company.name}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {company.email}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {company.phone}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Address:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {company.address}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Joined Since:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {company.createdTime}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {company.status ? (
                            <div className="badge badge-primary mr-2">
                              Active
                            </div>
                          ) : (
                            <div className="badge badge-danger mr-2">
                              Inactive
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="employeelist" title="Employee List">
                    <div className="card-body">
                      <DataTable
                        value={employee}
                        loading={loadingData}
                        responsiveLayout="scroll"
                      >
                        <Column header="ID" field="id" />
                        <Column header="Avatar" field={customEmpImg} />
                        <Column header="Name" field="name" />
                        <Column header="Birth Day" field="birthday" />
                        <Column header="Address" field="address" />
                        <Column header="Joined since" field="createdTime" />
                        <Column header="Status" field="status" />
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
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
