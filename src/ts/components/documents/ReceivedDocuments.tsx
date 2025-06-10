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

    const deleteDocument = async (id: number) => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce document ?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:8080/api/documents/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Erreur lors de la suppression");

            // Supprime le document de l'état local
            setDocuments(prev => prev.filter(doc => doc.id !== id));
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression du document.");
        }
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
            <table>
                <thead>
                <tr>
                    <th>Nom du fichier</th>
                    <th>Type de document</th>
                    <th>Envoyé par</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {documents.length === 0 ? (
                    <tr>
                        <td colSpan={4}>Aucun document</td>
                    </tr>
                ) : (
                    documents.map((doc, index) => (
                        <tr key={index}>
                            <td>{doc.name}</td>
                            <td>{doc.type}</td>
                            <td>{renderSender(doc)}</td>
                            <td>
                                <button onClick={() => download(doc.id, doc.name)}>Télécharger</button>
                                <button onClick={() => deleteDocument(doc.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReceivedDocuments;

