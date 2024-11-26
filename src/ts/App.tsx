import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageTest from "./pages/PageTest";
import AdminG from "./pages/AdminG";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<PageTest/>}/>
                    <Route path={"/AdminG"} element={<AdminG/>}/>
                </Routes>
            </ BrowserRouter>
        </>

    );
}

export default App
