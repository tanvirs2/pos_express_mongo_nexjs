import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Layout from "../components/layouts/main";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.scss";
import "../styles/react-pro-sidebar_custom.scss";
import {Col, Container, Row} from "react-bootstrap";
import {FaGem, FaHeart} from "react-icons/fa";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
