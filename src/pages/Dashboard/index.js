import React, { useEffect,useState } from "react";
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
import { CSVLink} from 'react-csv';



const Dashboard = () => {
  const [errMsg, setErrMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user || user.Roles === "") {
      return <Redirect to="/Login" />;
  
    }else{
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
         


<li className="nav-item dropdown no-arrow"  style={{ marginTop:"-7%",float: "right", listStyle:"none"}} >
           <a 
            className="nav-link dropdown-toggle"
            href="/#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
              <Button
    
    style={{ marginTop:"10%",float: "right"}}
    className="btn btn-primary" 
>   <FontAwesomeIcon icon={faIdCard} /> Action KPI</Button> 
            </a>
          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="/Dashboard/Manager/CreateKPI">
               Create Template

            </Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/Dashboard/Manager/UpdateKPI">
               Update Template

            </Link>
            {/* <div className="dropdown-divider"></div> */}
            {/* <CSVLink data={file} filename="PerformanceReport"  className="btn btn-primary"><FontAwesomeIcon icon={faDownload} />Generate Report</CSVLink> */}

          </div>
        </li>


{data.length==0?(<></>):(<>

  <div className="row">


  <CardInfo
  title="Revenue"
  icon="calendar"
  color="primary"
  value={data.revenue.toLocaleString()}
/>
  
            
<CardInfo
  title="Lead (To Customer) Ratio"
  icon="calendar"
  color="primary"
  value={data.leadToCustomerRatio}
  com=":1"
> 

<Link>
</Link>

:1</CardInfo>



<CardInfo
  title="Lead (To Qualified Lead) Ratio"
  icon="calendar"
  color="primary"
  value={data.leadToQualifiedLeadRatio}
  com=":1"
> 
<Link>
</Link>
:1
</CardInfo>



<CardInfo
  title="Lead(To Opportunity Ratio)In Percent"
  icon="calendar"
  color="primary"
  value={data.leadToOpportunityRatioInPercent}
  com="%"
>%</CardInfo>

<CardInfo
  title="Opportunity (To Win Ratio) In Percent"
  icon="calendar"
  color="primary"
  value={data.opportunityToWinRatioInPercent}
  com="%"
>%</CardInfo>

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
</>)}

         
       
          </>

        )}
    
       
      </>
    );
  }
export default Dashboard;
