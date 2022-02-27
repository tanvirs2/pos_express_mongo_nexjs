import Head from "next/head";
import Navigation from "../navigation";
import { useRouter } from "next/router";
import {Col, Container, Row} from "react-bootstrap";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {FaEllipsisH, FaEllipsisV, FaGem, FaHeart} from "react-icons/fa";
import {useState} from "react";
import Link from "next/link";
import menus from "../../utilities/menu";

function PageTemplate({ children }) {
  const router = useRouter();

    let [sidebarCollapse, setSidebarCollapse] = useState(false);

    const handleSidebarCollapse = () => {
        sidebarCollapse ? setSidebarCollapse(false) : setSidebarCollapse(true);
    }

    return (
        <>
            <Head>
                <title>React Bootstrap Mega Menu</title>

                <meta name="viewport" content="width=device-width"/>
            </Head>

            <div className="main">


                <Container fluid className="ps-0">
                    <div className="d-flex flex-row">

                        <div className="px-0">

                            <ProSidebar collapsed={sidebarCollapse} style={{minHeight: "100vh"}}>
                                <SidebarHeader>
                                    <div className="w-100 bg-secondary bg-opacity-10 text-white">
                                        <a className="ms-4">{
                                            sidebarCollapse ?
                                                <FaEllipsisH onClick={handleSidebarCollapse}/>
                                                :
                                                <FaEllipsisV onClick={handleSidebarCollapse}/>
                                        }</a>
                                    </div>
                                    <Navigation/>
                                    {/**
                                     *  You can add a header for the sidebar ex: logo
                                     */}
                                </SidebarHeader>
                                <SidebarContent>
                                    {/**
                                     *  You can add the content of the sidebar ex: menu, profile details, ...
                                     */}
                                    <Menu iconShape="square">
                                        <MenuItem icon={<FaGem/>}>
                                            <Link href="/">
                                                <a>
                                                    Dashboard
                                                </a>
                                            </Link>
                                        </MenuItem>
                                        <SubMenu title="Modules" icon={<FaHeart/>}>

                                            {
                                                menus.map((menu, index)=>{
                                                    return (
                                                        <MenuItem key={index}>
                                                            <Link href={menu.link}>
                                                                <a>
                                                                    {menu.name}
                                                                </a>
                                                            </Link>
                                                        </MenuItem>
                                                    )
                                                })
                                            }

                                        </SubMenu>
                                    </Menu>
                                </SidebarContent>

                                <SidebarFooter>
                                    {/**
                                     *  You can add a footer for the sidebar ex: copyright
                                     */}
                                </SidebarFooter>

                            </ProSidebar>


                        </div>

                        <div className="w-100">

                            {children}

                        </div>
                    </div>

                </Container>


            </div>
        </>
    );
}

export default PageTemplate;
