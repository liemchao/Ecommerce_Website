import React, { Component,useEffect,useState } from "react";
import CardInfo from "../../components/Cards/Info";
import ChartDonut from "../../components/Charts/Donut";
import ChartLine from "../../components/Charts/Line";
import PageHeading from "../../components/PageHeading";
// import ApiService from '../../api/ApiService';

class Dashboard extends Component {
  componentWillMount() {
    document.getElementById("body").className = "page-top";
  }
  // const [totalCompany, setTotalCompany] = useState(0);
  // const [totalWelfare, setTotalWelfare] = useState(1);
  render() {
    return (
      <>
        <PageHeading title="Dashboard" />
        {/* <!-- Content Row --> */}
        {/* <div className="row">
          <CardInfo
            title="Earnings (Monthly)"
            icon="calendar"
            color="primary"
            value="$40,000"
          />

          <CardInfo
            title="Earnings (Annual)"
            icon="calendar"
            color="success"
            value="215,000"
          />

          <CardInfo title="Tasks" icon="clipboard" color="info" value="50%" />

          <CardInfo
            title="Pending Requests"
            icon="comments"
            color="warning"
            value="18"
          />
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-6">
            <ChartLine />
          </div>
          <div className="col-xl-4 col-lg-6">
            <ChartDonut />
          </div>
        </div> */}
      </>
    );
  }
}

export default Dashboard;
