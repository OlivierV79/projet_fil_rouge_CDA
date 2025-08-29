import React, {useEffect, useState} from "react";
import ShowMember from "./ShowMember.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";

const SearchMentor: React.FC = () => {
    const [assignedFounder, setAssignedFounder] = useState<string[]>([]);
    const { token } = useAuth();

    useEffect(() => {
            fetch('/api/mentors/founders-username', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                .then(res => res.status === 200 ? res.json() : null)
                .then(data => setAssignedFounder(data))
                .catch(() => setAssignedFounder([]));

    }, [token]);

console.log(assignedFounder)

    return (
        <>
            <div className="card">

                <h2>Mes porteurs de projet</h2>

                {assignedFounder.length > 0 ? (
                        <>
                            {assignedFounder.map(username => (
                                <div key={username}>
                                    <ShowMember username={username} />
                                </div>
                            ))}
                        </>
                ) : (
                    <>
                        <p>Pas encore de porteur de projet assigné</p>
                    </>
                )}
            </div>
        </>
    )
}
export default SearchMentor;