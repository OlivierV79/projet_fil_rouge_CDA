# Model Conceptuel de données

````mermaid
classDiagram
    class Utilisateur{
        <<abstract>>
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
        + se connecter()
        + se deconnecter()
    }
    
    
    
    class AdminGeneral{
        + creerAdminDepartemental()
    }
    
    class AdminDepartemental{
        + creerUtilisateur()        
    }
    
    class Acteurs{
        <<abstract>>
        - Boolean actif
        - String disponibilites / choix possibles
        - String contactPrefere /mobile ou mail
        - List~Accompgnement~ accompagnements
        - String description
        - List~DomaineActivite~ domainesActivité
        - List~lieu~ lieux
        + modifierProfil()
        }
        
    class Porteur{
        - LocalDateTime dateDebut
         }
    
    class Parrain{
        - Integer nombreParrainagePossible
        }
        
        class Accompgnement {
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
        
        


    Utilisateur <|-- AdminGeneral
    Utilisateur <|-- AdminDepartemental
    Utilisateur <|-- Acteurs
    Utilisateur --> PlateformeInitiative
    Utilisateur --> Role
    Acteurs <|-- Porteur
    Acteurs <|-- Parrain

    Porteur --> Accompgnement
    Porteur --> DomaineActivite
    Porteur --> Lieu

    Parrain --> Accompgnement
    Parrain --> DomaineActivite
    Parrain --> Lieu

  
    
    
    
    
    
    
    
````