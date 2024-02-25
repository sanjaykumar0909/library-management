import React from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import UserLogin from './components/Login'
import AdminLogin from './components2/Login'
import Library from "./components/Library";
import AdminLibrary from "./components2/Library"

export default function(){
    // let routes= useRoutes([
    //     {
    //         path: "/",
    //         element: <UserLogin />
    //     },
    //     {
    //         path: "library/",
    //         element: <Library />
    //     },
    //     {
    //         path: "admin/",
    //         element: <AdminLogin />
    //     }
    // ])
return<>
{/* {routes} */}
    <Routes>
        <Route path="/" >
            <Route index exact element={<UserLogin />} />
            <Route path="library/" element={<Library />} />
            <Route path="dashboard/" element={<><h2>user dashboard</h2></>} />
        </Route>
        <Route path="/admin" >
            <Route index element={<AdminLogin />} />
            <Route path="library/" element={<AdminLibrary />} />
        </Route>
        
    </Routes>
</>
}