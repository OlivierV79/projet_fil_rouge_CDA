import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageTest from "./pages/PageTest";
import AdminG from "./pages/AdminG";
import AdminD from "./pages/AdminD";
import Porteur from "./pages/Porteur";
import Parrain from "./pages/Parrain";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path={"/"} element={<PageTest/>}/>
                        <Route path={"/AdminG"} element={<AdminG/>}/>
                        <Route path={"/AdminD"} element={<AdminD/>}/>
                        <Route path={"/Porteur"} element={<Porteur/>}/>
                        <Route path={"/Parrain"} element={<Parrain/>}/>
                    </Routes>
                </Layout>

            </ BrowserRouter>
        </>

    );
}

export default App
