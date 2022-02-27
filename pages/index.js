import Head from "next/head";
import Link from "next/link";
import React, {Fragment} from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "../components/icons";
import BigMenu from "../components/layouts/big_menu";
import menus from "../utilities/menu";


export default function Home() {
  return (
    <Fragment>

      <main>

        <Container>
          <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 pt-5">
            {
              menus.map((menu, index)=>{
                return (
                    <Col key={index} className="mb-4">

                      <BigMenu compData={{...menu}}/>

                    </Col>
                );
              })
            }


          </Row>
        </Container>


      </main>
      <footer className="footer mt-auto mx-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted text-center">
            2021 React Bootstrap/NextJS Boilerplate -- Teal Larson
          </span>
        </div>
      </footer>
    </Fragment>
  );
}
