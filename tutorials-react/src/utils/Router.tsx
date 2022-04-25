import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Index from "../views";

const AppRouter = (isLoggedIn: boolean) =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />} />
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter;