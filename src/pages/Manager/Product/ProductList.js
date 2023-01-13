import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";

// import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { InputText } from 'primereact/inputtext';
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateProduct from "../Product/ProductCreate"
import UpdateProduct from "../Product/Updateproduct";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { Tab,Tabs } from "react-bootstrap";
import ProductNoList from "./FliterProduct/ProductNo";
import ProductDeList from "./FliterProduct/ProductDe";
import ProductOhList from "./FliterProduct/ProductOh";
import ProductOsList from "./FliterProduct/ProductOs";
import ProductSoList from "./FliterProduct/ProductSo";
import ProductDeleList from "./FliterProduct/ProductDele";





const ProductList = () => {
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const [data, setData] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  // const [counter, setCounter] = useState(0);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );


  async function getPublicProduct() {
    setLoadingData(true);

    await ApiService.getPublicProduct(currentPage, rows)
      .then((response) => {
     
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        let  counter = 10 * (currentPage-1)
        listDataSet.map((obj, index) => {
        
          obj['indexNumber'] = (counter + ++index) 
         
        })
       
        setTotalRecords(response.data.totalRow);
        setData(listDataSet);
       
        setLoadingData(false);
      })
      .catch((error) => {
        if (error.response) {
        
        } else if (error.request) {
      
          console.log(error.request);
        } else {
      
        }
        console.log(error.config);
      });
  }

  useEffect(() => {
    getPublicProduct();
    
  }, [currentPage]);

  const refreshList = () => {
    setLoadingData(true);
    getPublicProduct();
  };
  


  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };
  const getCaId = (rowData)=>{
    return(
       rowData.category.productCategoryName
    )

  }
  const getStatus=(rowData)=>{
  
    if (rowData.productStatus=="On sale") {
      return <div className="badge badge-secondary mr-2"> On sale</div>;
    }
    if (rowData.productStatus === "Not open for sale") {
      return <div className="badge badge-dark mr-2">Not open for sale</div>
    }
    if (rowData.productStatus === "On hold") {
      return <div className="badge badge-warning mr-2">On hold</div>
    }
    if (rowData.productStatus === "Deposited") {
      return <div className="badge badge-info mr-2">Deposited</div>
    }
    if (rowData.productStatus === "Sold") {
      return <div className="badge badge-success mr-2">Sold</div>
    }
  }
  const getPrice = (rowData)=>{
    let num = rowData.price
    return(
       num.toLocaleString()
    )
  }


  async function handleDelete (e, rowData) {
    e.preventDefault();
    let confirm = window.confirm(
      "Are you sure you want to delete this Product?"
    );

    if (confirm) {
      console.log(rowData.id)
      await ApiService.deleteProduct(rowData.id)
        .then((response) => {
          window.alert(" Delete this Product sucsseful.")
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
          window.alert("Can't delete this Product.")
        });
    }
  };

  const customButton = (rowData) => {
    return (
      <>
      <div className="row">
      <Link
          to={{
            pathname: "/Dashboard/Manager/ProductDetail",
            state: rowData,
          }}
        >
         <Button icon="pi pi-filter-slash" style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faFileMedicalAlt} color="primary"/></Button>
        </Link>
        <UpdateProduct rowData={rowData} refreshList={refreshList} />
        <Button onClick={(e) => handleDelete(e, rowData)} style={{marginLeft:"3%"}} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
      </div>
      </>
    );
  };
  // const customImage = (rowData) => {
  //   return (
  //     <img
  //       style={{ width: "100px", height: "60px",marginRight:"2%"}}
  //       src={rowData.productImages[1].url}
  //       alt="product-image"
  //       className="img-fluid"
  //       onError={(e) =>
  //         (e.target.src =
  //           "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
  //       }
  //     />
  //   );
  // };
  const renderHeader1 = () => {
    console.log('sss')
    return (
      <div className="flex justify-content-between">
      <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" />
      <span className="p-input-icon-left">
          <i className="pi pi-search" />
          {/* <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" /> */}
      </span>
  </div>
    )
}
  
  const handleSearch = (e) =>{
    setQuery(e.target.value);
  
    if(e.target.value === ""){
      refreshList();
    }

  }

  async function searchProduct() {
    
    await ApiService.searchProduct(query)
      .then((response) => {
       
       
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count

        })
        setData(listDataSet);
        setLoadingData(false)
       
      })
      .catch((error) => {
        if(error.response.status == 404) {
          setData([]);
          setErrMsg(error.response.data)

        }
      
      });
  }
  
  const notFound =()=>{
    return <div className="badge badge-danger mr-2">Not Found</div>;
  }
  const getAddress = (rowData)=>{
    return(
      <div className="auto">{rowData.street},{rowData.district},{rowData.province}</div>
    )

  }


  const header1 = renderHeader1();

  return (
    <>
      {/* New DataTable */}
      <div>
       <PageHeading title="Product List" />
       <div style={{marginLeft:"85%", paddingLeft:"5%"}}className="d-sm-flex align-items-center justify-content-between">
        
        {/* Upload File Modal */}
        <CreateProduct refreshList={refreshList}
        
        />
        
      </div>
      <div className="row">
       <div style={{marginBottom:20}}>
       <input onChange={handleSearch}  style={{marginLeft:850,height:40,textAlign:"center"}}className="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
       <Button type="button" style={{height:40,width:100,marginTop:-7, marginLeft:10}}
       onClick={searchProduct}
       ><FontAwesomeIcon icon={faSearch} /></Button>
       </div>
       {data.length==0 ? (
       <div style={{marginTop:"2%"}}id="wrapper">
       <div className="container-fluid">
         <div className="card shadow mb-1">
           <DataTable
           emptyMessage="No Product Found."
           >
           <Column header="Result" body={notFound}/>
           </DataTable>
          </div>
          </div>
          </div>
          ) : (
            <Tabs
            defaultActiveKey="Detail"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Detail" title="All Product">
            <div id="wrapper">
            <div className="container-fluid">
              <div className="card shadow mb-4">
              <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                  rowHover={true}
                  sortMode="multiple"
                  filterDisplay="menu"
               
                  globalFilterFields={['name','No']}
                  filters={filters1}
                  showGridlines
                  
                >
              <Column style={{width: "7%" }} header="No" field="indexNumber"   />
                  <Column  style={{width: "20%" }} header="Name" field="name" sortable />
                  <Column header="Category" body={getCaId} />
                  {/* <Column header="Image" body={customImage} /> */}
                  <Column style={{width: "22%" ,header:"center"}} header="Address"   body={getAddress}  /> 
                  <Column style={{width: "12%" }}header="Price(VND)" body={getPrice}  />
                  <Column header="Status" body={getStatus}  />
                  <Column header="Action"  body={customButton}  />
                  </DataTable>
                <Paginator
                  paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  onPageChange={onPageChange}
                  className="p-jc-end p-my-3"
                />
              </div>
            </div>
          </div>

          </Tab>
          <Tab eventKey="Wa" title="Not Open">
            <ProductNoList/>
            
          </Tab>
          <Tab eventKey="Ac" title="On Sale ">
            <ProductOsList/>
        
          </Tab>
          <Tab eventKey="Re" title="On Hole">
           <ProductOhList/>
          </Tab>
          <Tab eventKey="Cu" title="Deposited">
            <ProductDeList/>
      
          </Tab>
          <Tab eventKey="Em" title="Sold">
            <ProductSoList/>
        
          </Tab>
          <Tab eventKey="De" title="Deleted">
            <ProductDeleList />
        
          </Tab>

          </Tabs>
           
        )}
         </div>
      </div>
    </>
  );
};

export default ProductList;
