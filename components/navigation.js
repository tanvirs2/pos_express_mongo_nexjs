import {
  Nav,
  Navbar,
  Container,
  Button,
  Image,
  Dropdown,
  NavDropdown,
  Col,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <Navbar variant="light" expand="md">
        <Navbar.Brand className="pt-3 ps-2">
          <Link href="/">
            <a>
              <Image
                  src="/logo-ipsum.png"
                  alt="Grouparoo Logo"
                  width={150}
                  height={80}
              />
            </a>
          </Link>
          <span className="d-none">Company</span>
        </Navbar.Brand>

      </Navbar>
    </header>
  );
}
