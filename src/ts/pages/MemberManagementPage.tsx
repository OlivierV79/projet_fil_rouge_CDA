import React from 'react';
import AllMembers from "../components/member/AllMembers.tsx";
import { useNavigate } from "react-router-dom";


const MemberManagementPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <h1>Gestion des membres</h1>
            </div>
            <button onClick={() => navigate("/create-member")}>
                Créer un parrain ou un porteur de projet
            </button>

            <AllMembers />
        </>

    );
};

export default MemberManagementPage;