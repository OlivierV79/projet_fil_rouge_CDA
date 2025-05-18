import React, { useEffect, useState } from "react";

interface ReceiverOption {
    id: number;
    fullName: string;
}

const UploadDocument: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [type, setType] = useState("adminDocument");
    const [receivers, setReceivers] = useState<ReceiverOption[]>([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8080/api/members/eligible", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const withAdmin = [{ id: -1, fullName: "Administrateur" }, ...data];
                setReceivers(withAdmin);
                if (withAdmin.length === 1) setReceiverId(withAdmin[0].id);
            })
            .catch(err => console.error("Erreur chargement destinataires :", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || receiverId === null) {
            alert("Veuillez sélectionner un fichier et un destinataire.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("receiverId", receiverId.toString());
        formData.append("type", type);

        try {
            const res = await fetch("http://localhost:8080/api/documents/send", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) throw new Error("Erreur lors de l'envoi");
            alert("Document envoyé avec succès !");
            setFile(null);
            setReceiverId(null);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'envoi du document.");
        }
    };

    return (
        <div className="card">
            <h2>Envoyer un document</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type de document :</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="adminDocument">Document administratif</option>
                        <option value="justificatif">Justificatif</option>
                        <option value="cv">CV</option>
                    </select>
                </div>

                <div>
                    <label>Destinataire :</label>
                    <select
                        value={receiverId ?? ""}
                        onChange={(e) => setReceiverId(Number(e.target.value))}
                    >
                        <option value="">-- Choisir un destinataire --</option>
                        {receivers.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Fichier :</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0]);
                            }
                        }}
                    />
                </div>

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default UploadDocument;
