# Model Conceptuel de données

````mermaid
classDiagram
    class User{
        <<abstract>>
        - Integer id
        - String nomUtilisateur
        - String mail    
        - String password
        - String nom
        - String prenom
        - Type type
        - String Entreprise
        - String plateformeInitiative
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
        
        class Lieu{
            Integer id
            String nom
        }


    User <|-- AdminGeneral
    User <|-- AdminDepartemental
    User <|-- Acteurs
    Acteurs <|-- Porteur
    Acteurs <|-- Parrain

    Acteurs --> Accompgnement
    Acteurs --> DomaineActivite
    Acteurs --> Lieu

  
    
    
    
    
    
    
    
````