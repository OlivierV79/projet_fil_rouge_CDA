import {Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Layout from "./components/layout/Layout";
import './App.css'
import ProfilePage from "./pages/ProfilePage.tsx";
import AppointmentTrackingPage from "./pages/AppointmentTrackingPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import DocumentsPage from "./pages/DocumentsPage.tsx";
import FounderPage from "./pages/FounderPage.tsx";
import MemberManagementPage from "./pages/MemberManagementPage.tsx";
import MentorPage from "./pages/MentorPage.tsx";
import StatisticsPage from "./pages/StatisticsPage.tsx";
import CreateMemberPage from "./pages/CreateMemberPage.tsx";

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
                <Route
                    path="/profil"
                    element={
                        <PrivateRoute>
                            <ProfilePage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/appointmentTracking"
                    element={
                        <PrivateRoute>
                            <AppointmentTrackingPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <ChatPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/documents"
                    element={
                        <PrivateRoute>
                            <DocumentsPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/founder"
                    element={
                        <PrivateRoute>
                            <FounderPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/memberManagement"
                    element={
                        <PrivateRoute>
                            <MemberManagementPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-member"
                    element={
                        <PrivateRoute>
                            <CreateMemberPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/mentor"
                    element={
                        <PrivateRoute>
                            <MentorPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/statistics"
                    element={
                        <PrivateRoute>
                            <StatisticsPage/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Layout>
    );
}

export default App;

