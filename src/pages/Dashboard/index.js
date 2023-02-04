import React, { useEffect, useState } from "react";
import CardInfo from "../../components/Cards/Info";

import PageHeading from "../../components/PageHeading";

import { Link, Redirect } from "react-router-dom";
import ApiService from "../../api/apiService";

import { CSVLink } from "react-csv";
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from "react-bootstrap";

const Dashboard = () => {
  const [dataaccount, setAccount] = useState([]);

  const [errMsg, setErrMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [ad, setAd] = useState();
  const [em, setEm] = useState();
  const [ma, setMa] = useState();
  const [totalRecords, setTotalRecords] = useState();


  useEffect(() => {
    if (!user || user.Roles === "") {
      return <Redirect to="/Login" />;

    } else {
      getKPIPerforment();
    }
  }, []);


  useEffect(() => {
    setLoadingData(true)
    getAccountAdmin()
    getAccountEmployee()
    getAccountManager()
    getAccountSystem()
  }, [ad]);



  async function getAccountSystem() {
    await ApiService.getAllAccountSystem()
      .then((response) => {
        // check if the data is populated
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        setAccount(listDataSet);
        setTotalRecords(response.data.totalRow);
        setLoadingData(false)
      })
      .catch((error) => {
        if (error.response) {

        } else if (error.request) {


        } else {

          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }


  async function getKPIPerforment() {

    await ApiService.getKPIPerformance()
      .then((response) => {

        setData(response.data.data)
      })
      .catch((error) => {
        if (error.request) {
          setErrMsg(error.request)
        } else if (error.request) {

          setErrMsg(error.request);
        } else {
          setErrMsg(error.config);

        }
      });
  }

  async function getAccountAdmin() {
    await ApiService.getAccountAdmin(currentPage, rows)
      .then((response) => {
        setAd(response.data.totalRow);
        setLoadingData(false)
      })
      .catch((error) => {
        if (error.response) {

        } else if (error.request) {

        } else {

          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function getAccountEmployee() {
    await ApiService.getEmployeeAccount(currentPage, rows)
      .then((response) => {

        setEm(response.data.totalRow);
        setLoadingData(false)

      })
      .catch((error) => {
        if (error.response) {

        } else if (error.request) {

        } else {

          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function getAccountManager() {
    await ApiService.getAccountManager(currentPage, rows)
      .then((response) => {
        setMa(response.data.totalRow);
        setLoadingData(false)
      })
      .catch((error) => {
        if (error.response) {

        } else if (error.request) {

        } else {

          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }






  return (
    <>
      {(user.role.includes("Manager")) && (
        <>
          <PageHeading title="Performance dasboard" />

          {data.length == 0 ? (<></>) : (<>

            <div className="row">

              <div className="col-lg-5">
                <div className="card">
                  <div className="card-body">
                    <Link style={{ textDecoration: "none" }} to="/Dashboard/Manager/AccountList">
                      <CardInfo
                        title="Lead (To Customer)"
                        icon="calendar"
                        color="primary"
                        value={data.leadToCustomerRatio}
                        com=":1"
                      >
                      </CardInfo>
                    </Link>
                    <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/KPIList">

                      <CardInfo

                        title="Revenue"
                        icon="calendar"
                        color="primary"
                        value={data.revenue.toLocaleString()}
                      >

                      </CardInfo>
                    </Link>


                    <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/OpportunityList">
                      <CardInfo
                        title="Negotiation"
                        icon="calendar"
                        color="dark"
                        value={data.negotiation}
                      />
                    </Link>
                    <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/OpportunityList">
                      <CardInfo title="Wins" icon="clipboard" color="info" value={data.wins} />
                    </Link>
                    <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/OpportunityList">
                      <CardInfo
                        title="Loses"
                        icon="comments"
                        color="danger"
                        value={data.loses}
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="card">
                  <div className="card-body">
                  <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/OpportunityList">
                    <CardInfo
                      title="Lead(To Opportunity Ratio)"
                      icon="calendar"
                      color="primary"
                      value={data.leadToOpportunityRatioInPercent}
                      com="%"
                    ></CardInfo>
                    </Link>

                    <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/OpportunityList">
                      <CardInfo
                        title="Opportunity (To Win Ratio)"
                        icon="calendar"
                        color="primary"
                        value={data.opportunityToWinRatioInPercent}
                        com="%"
                      ></CardInfo>
                    </Link>

                    <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/LeadList">
                      <CardInfo
                        title="Leads"
                        icon="calendar"
                        color="warning"
                        value={data.leads}
                      />
                    </Link>

                    <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Manager/OpportunityList">
                      <CardInfo
                        title="Opportunitties"
                        icon="calendar"
                        color="success"
                        value={data.opportunities}
                      />
                    </Link>

                  </div>

                </div>
              </div>
            </div>



          </>)}



        </>

      )}

      {(user.role.includes("Admin")) && (
        <>
          <PageHeading title="Account dashboard" />

          {loadingData ? (<></>) : (<>
            <CSVLink style={{ marginTop: "-5%", float: "right", opacity: 0 }} data={dataaccount} filename="Account" className="btn btn-primary"><FontAwesomeIcon icon={faDownload} />Generate Excel</CSVLink>

            <div className="row">


              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
             <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Admin/AccountList">
                    <CardInfo
                      title="Number of Admin Account "
                      icon="calendar"
                      color="danger"
                      value={ad}
                    />
                    </Link>



                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                  <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Admin/AccountList">
                    <CardInfo
                      title="Number of Manager Account "
                      icon="calendar"
                      color="warning"

                      value={ma}
                    ></CardInfo>
                    </Link>
                  </div>

                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                  <Link style={{ textDecoration: "none" }}
                      to="/Dashboard/Admin/AccountList">
                    <CardInfo
                      title="Number of Employee Account "
                      icon="calendar"
                      color="success"
                      value={em}

                    />
                    </Link>




                  </div>

                </div>
              </div>
            </div>





          </>)}



        </>

      )}


    </>
  );
}
export default Dashboard;
