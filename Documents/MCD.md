````mermaid
classDiagram
    class Utilisateur {
        + id : Long
        + username : String
        + password : String
        + email : String
        + role : String
    }
    <<abstract>> Utilisateur

    class Administrateur {
        + id : Long
        + username : String
        + password : String
        + email : String
        + role : String = "ADMIN"
    }
    Administrateur --|> Utilisateur

    class Membre {
        + id : Long
        + username : String
        + password : String
        + email : String
        + role : String
        + firstName : String
        + lastName : String
        + nbrOfFounders : Integer
        + available : Boolean
    }
    Membre --|> Utilisateur

    class Mentor {
<<role MENTOR>>
}
Mentor --|> Membre

class PorteurDeProjet {
<<role FOUNDER>>
}
PorteurDeProjet --|> Membre

class RendezVous {
+ date : Date
+ heure : Time
+ sujet : String
+ compteRendu : String
    }
class Document {
+ name : String
+ type : String
+ mimeType : String
+ data : Fichier
    }

%% Relations
Mentor "0..*" -- "0..1" PorteurDeProjet : mentorat
Mentor "1" --> "0..*" RendezVous : planifie
PorteurDeProjet "1" --> "0..*" RendezVous : assiste à
Mentor "0..*" --> "0..*" Document : envoie/reçoit
PorteurDeProjet "0..*" --> "0..*" Document : envoie/reçoit
Administrateur "0..*" --> "0..*" Document : envoie/reçoit


````