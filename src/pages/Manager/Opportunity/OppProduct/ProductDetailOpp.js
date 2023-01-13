import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Button, Figure } from "react-bootstrap";
import PageHeading from "../../../../components/PageHeading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'

import ApiService from "../../../../api/apiService";

const ProductInfor = () => {
    const { state } = useLocation();
    const [Product, setProduct] = useState([]);
    const [id, setid] = useState(state);

    const [loadingData, setLoadingData] = useState(true);

    async function getProduct() {

        setLoadingData(true);
        await ApiService.getProductById(id)
            .then((response) => {

                setProduct(response.data.data);
                console.log(response.data.data)


                setLoadingData(false);
            })
            .catch((error) => {
                if (error.response) {

                } else if (error.request) {
                    // no response
                    console.log(error.request);
                } else {

                }
                console.log(error.config);
            });
    }

    useEffect(() => {

        getProduct();
    }, []);



    return (
        <div>
            <PageHeading title="Product Detail" />
            {loadingData ? (
                <p>Loading, please wait...</p>
            ) : (
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">

                            {
                                Product[0].productImages.map((x, y) =>
                                    <div style={{ textAlign: "center" }} className="card">
                                        <Figure style={{ margin: "2%" }}>
                                            <Figure.Image
                                                width={180}
                                                height={180}
                                                alt="171x180"
                                                src={x.url}
                                                className="img-thumbnail"

                                            />
                                        </Figure>
                                    </div>
                                )}



                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <Tabs
                                    defaultActiveKey="Detail"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="Detail" title="Product Detail">
                                        <div className="card-body">

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].name}</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Category</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].category.productCategoryName}</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Price</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].price}(VND)</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Description</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <textarea>{Product[0].description}</textarea>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Width</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].width}m</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Length</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].length}m</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Area</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].area}m&#178;</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Tab>
                                    <Tab eventKey="Product" title="Product Local">
                                        <div className="card-body">

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Street</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].street}</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">District</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].district}</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Province</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].province}</p>
                                                </div>
                                            </div>


                                        </div>
                                    </Tab>

                                    <Tab eventKey="Status" title="Product Status">
                                        <div className="card-body">

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Number of Bedroom</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].noBedroom}</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Number of Toilet</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].noToilet}</p>
                                                </div>
                                            </div>


                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Number of Floor</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].noFloor}</p>
                                                </div>
                                            </div>


                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Facade</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <p>{Product[0].facade}</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Furniture</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {Product[0].isFurniture ? (
                                                        <div className="badge badge-primary mr-2">
                                                            Active
                                                        </div>
                                                    ) : (
                                                        <div className="badge badge-danger mr-2">
                                                            Not Avaliable
                                                        </div>
                                                    )}
                                                </div>
                                            </div>


                                        </div>
                                    </Tab>
                                    <Tab eventKey="Ower" title="Product Ower" >
                    <div className="card-body">
                     <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name Ower:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
          
                  
                      
                        <p>{Product[0].productOwner.name} 
                    </p>
                          </div>
                        </div>
                       
                      </div>


                    </Tab>

                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <Link
                    to="/Dashboard/Manager/OpportunityList"
                >
                    <Button style={{ marginTop: "2%" }}>
                        <FontAwesomeIcon icon={faStepBackward} /> Back to

                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProductInfor;