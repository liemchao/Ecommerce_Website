import React, { useEffect, useState } from "react";
import CardInfo from "../../components/Cards/Info";
// import ChartDonut from "../../components/Charts/Donut";
// import ChartLine from "../../components/Charts/Line";
// import Bar from "../../components/Charts/Bar"
import PageHeading from "../../components/PageHeading";
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import ApiService from "../../api/apiService";



const Dashboard = () => {
  const [errMsg, setErrMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user || user.Roles === "") {
      return <Redirect to="/Login" />;

    } else {
      getKPIPerforment();

    }
  }, []);

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

                    <CardInfo
                      title="Lead (To Customer) Ratio"
                      icon="calendar"
                      color="primary"
                      value={data.leadToCustomerRatio}
                      com=":1"
                    >

                      <CardInfo
                        title="Revenue"
                        icon="calendar"
                        color="primary"
                        value={data.revenue.toLocaleString()}
                      />

                      <Link>
                      </Link>

                      :1</CardInfo>


                    <CardInfo
                      title="Leads"
                      icon="calendar"
                      color="primary"
                      value={data.leads}
                    />
                    <CardInfo
                      title="Opportunitties"
                      icon="calendar"
                      color="success"
                      value={data.opportunities}
                    />

                    <CardInfo
                      title="Negotiation"
                      icon="calendar"
                      color="dark"
                      value={data.negotiation}
                    />

                    <CardInfo title="Wins" icon="clipboard" color="info" value={data.wins} />

                    <CardInfo
                      title="Loses"
                      icon="comments"
                      color="danger"
                      value={data.loses}

                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="card">
                  <div className="card-body">

                    <CardInfo
                      title="Lead(To Opportunity Ratio)"
                      icon="calendar"
                      color="primary"
                      value={data.leadToOpportunityRatioInPercent}
                      com="%"
                    >%</CardInfo>

                    <CardInfo
                      title="Opportunity (To Win Ratio)"
                      icon="calendar"
                      color="primary"
                      value={data.opportunityToWinRatioInPercent}
                      com="%"
                    >%</CardInfo>

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
