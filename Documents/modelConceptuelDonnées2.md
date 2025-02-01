````mermaid
classDiagram
    class Utilisateur{
        - Integer id
        - String nomUtilisateur
        - String mail    
        - String password
        - String nom
- String prenom
- Role role
- String Entreprise
- PlateformeInitiative plateformeInitiative
- LocalDateTime dateCreationCompte
- Boolean actif
- String disponibilites
- String contactPrefere
- List~Accompagnement~ accompagnements
- String description
- List~DomaineActivite~ domainesActivite
- List~Lieu~ lieux
+ se connecter()
+ se deconnecter()
}

    class Accompagnement {
        Integer id
        String nom
    }
        
    class DomaineActivite{
        Integer id
        String nom
    }
        
    class PlateformeInitiative{
        Integer id
        String nom
    }
        
    class Lieu{
        Integer id
        String nom
    }
        
    class Role{
        Integer id
        String nom
    }
        
    Utilisateur --> Accompagnement
    Utilisateur --> DomaineActivite
    Utilisateur --> Lieu
    Utilisateur --> PlateformeInitiative
    Utilisateur --> Role
````