import React, { useEffect, useState } from "react";

interface DocumentItem {
    id: number;
    name: string;
    mimeType: string;
    type: string;
    ownerMember?: { firstName: string; lastName: string; username: string };
    ownerAdmin?: { username: string };
}

const ReceivedDocuments: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8080/api/documents/received", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(setDocuments)
            .catch(err => console.error(err));
    }, []);

    const download = (id: number, filename: string) => {
        fetch(`http://localhost:8080/api/documents/download/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                link.click();
            });
    };

    const renderSender = (doc: DocumentItem) => {
        if (doc.ownerMember) {
            return `${doc.ownerMember.firstName} ${doc.ownerMember.lastName}`;
        } else if (doc.ownerAdmin) {
            return `Administrateur (${doc.ownerAdmin.username})`;
        } else {
            return "Inconnu";
        }
    };

    return (
        <div className="card">
            <h2>Documents reçus</h2>
            {documents.length === 0 ? (
                <p>Aucun document reçu.</p>
            ) : (
                <ul>
                    {documents.map(doc => (
                        <li key={doc.id}>
                            {doc.name} — envoyé par {renderSender(doc)}{" "}
                            <button onClick={() => download(doc.id, doc.name)}>Télécharger</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReceivedDocuments;
