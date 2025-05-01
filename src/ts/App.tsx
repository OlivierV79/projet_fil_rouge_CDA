import {Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Layout from "./components/layout/Layout";
import './App.css'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <AdminPage/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Layout>
    );
}

export default App;

