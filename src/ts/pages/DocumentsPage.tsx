import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ReceivedDocuments from "../components/documents/ReceivedDocuments.tsx";
import UploadDocument from "../components/documents/UploadDocument.tsx";

const DocumentsPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Documents {username} !</h1>
            <ReceivedDocuments />
            <UploadDocument />
        </div>
    );
};

export default DocumentsPage;