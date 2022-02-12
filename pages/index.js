import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "../components/icons";
import BigMenu from "../components/layouts/big_menu";


export default function Home() {
  return (
    <>

      <main>

        <Container>
          <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 pt-5">
            <Col className="mb-4">

              <BigMenu compData={{name:"Category", link: "/category"}}/>

            </Col>

            <Col className="mb-4">

              <BigMenu compData={{name:"Product", link: "/product"}}/>

            </Col>

            <Col className="mb-4">

              <BigMenu compData={{name:"Stock", link: "/stock"}}/>

            </Col>

            <Col className="mb-4 offset-md-3 offset-xl-0">

              <BigMenu compData={{name:"Customer", link: "/customer"}}/>

            </Col>

            <Col className="mb-4 offset-md-3 offset-xl-0">

              <BigMenu compData={{name:"Sell", link: "/sell"}}/>

            </Col>
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
    </>
  );
}
