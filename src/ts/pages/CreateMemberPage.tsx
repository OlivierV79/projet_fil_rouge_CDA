// src/pages/CreateMemberPage.tsx
import React from "react";
import CreationMember from "../components/member/CreationMember";

const CreateMemberPage: React.FC = () => {
    return (
        <div>
            <h1>Créer un nouveau membre</h1>
            <CreationMember />
        </div>
    );
};

export default CreateMemberPage;
