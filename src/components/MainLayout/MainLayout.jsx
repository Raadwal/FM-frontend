import MainNavigation from "./MainNavigation";

import { Outlet } from "react-router-dom";


import classes from "../css/MainNavigation.module.css"

function MainLayout(props) {
    return (
        <div>
            <MainNavigation />
            <Outlet />
        </div>
    )
}

export default MainLayout;