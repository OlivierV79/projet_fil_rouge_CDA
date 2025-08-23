````mermaid
sequenceDiagram
    participant Porteur as Porteur de projet (Frontend)
    participant Front as Interface web
    participant API as Backend API
    participant Service as MemberService
    participant BD as Base de données

    Porteur->>Front: Choisit un parrain disponible
    Front->>API: POST /api/mentors/assign/{mentorUsername}
    API->>Service: assignMentor(founderUsername, mentorUsername)
    Service->>Service: Vérifie que le porteur de projet n’a pas déjà un parrain
    Service->>BD: Ajoute une relation parrain<->porteur<br/>(table **mentor_founder_relation**)
    Service-->>API: Succès ou erreur (exception)
    API-->>Front: Résultat de l’assignation (OK ou message d’erreur)
    Front-->>Porteur: Confirme en UI ("Parrain assigné avec succès" ou erreur)
````