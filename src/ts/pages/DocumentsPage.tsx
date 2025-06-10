import React from 'react';
import ReceivedDocuments from "../components/documents/ReceivedDocuments.tsx";
import UploadDocument from "../components/documents/UploadDocument.tsx";

const DocumentsPage: React.FC = () => {
    return (
        <div>
            <h1>Gestion des documents</h1>
            <ReceivedDocuments />
            <UploadDocument />
        </div>
    );
};

export default DocumentsPage;