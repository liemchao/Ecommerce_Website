import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { Card ,Button } from "react-bootstrap";


const FavoirteList = ({ rowData }) => {
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);




    async function getFavoirteList() {
        await ApiService.getFavoirteProduct(rowData.id)
            .then((response) => {
                setData(response.data.data);
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


    useEffect(() => {
        getFavoirteList();
    }, [currentPage]);




    return (
        <>
            {data ? (
                <div id="wrapper"  style={{overflow:"scroll",maxHeight: "31rem", marginLeft:"20%"}}>
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            {
                                   data.map((x, y) =>
                                   
                                   <Card style={{ width: '18rem',marginBottom:"1%"}}>
                                   <Card.Body>
                                     <Card.Title>Favorite Product</Card.Title>
                                     <Card.Text>
                                       Some quick example text to build on the card title and make up the
                                       bulk of the card's content.
                                     </Card.Text>
                                     <Button variant="primary">View Product</Button>
                                   </Card.Body>
                                 </Card>
                                  
                                   )
                               }


                        </div>
                    </div>
                </div>
            ) : (
                <div className="card shadow mb-4" style={{textAlign:"center"}}>
                <Card style={{ width: '18rem'}}>
                <Card.Body>
                <Card.Title>Favorite Product</Card.Title>
                  <Card.Text className="text-danger">
                  The customer no like any product.
                  </Card.Text>
                  <Button  disabled variant="primary">View Product</Button>
                </Card.Body>
              </Card>
              </div>

            )}
        </>
    );
};

export default FavoirteList;






