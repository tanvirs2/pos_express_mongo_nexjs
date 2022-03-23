import { Container, Jumbotron } from "react-bootstrap";
import {Fragment} from "react";

export default function Menu() {
  return (
    <Fragment>
      <Container>
        <Jumbotron className="mx-auto mt-5 w-auto text-center">
          <h1>Menu</h1>
          <p>This is the menu page.</p>
        </Jumbotron>
      </Container>
    </Fragment>
  );
}
