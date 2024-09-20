# Diagramme de cas d'utilisation

## Page Fil porteur

```mermaid
flowchart LR
    subgraph 'Page Fil porteur'
    uc1((visualiser parrain))
    uc2((visualiser details parrain))
    uc3((like parrain))
    uc4((s'authentifier))
    end

    pp--->uc1
    uc1--->uc2


    uc1 --> uc3
    uc2 --> uc3
    uc1 -. include .-> uc4
    

    ad[admin-departement 👤]
    ag[admin-general 👤]
    u[utilisateur 👤]
    pp[porteur de projet 👤]
    p[parrain 👤]
```

## Page Fil parrain
```mermaid
flowchart LR
    subgraph 'Paies ton match - page Fil parrain'
    uc1((visualiser porteur))
    uc2((visualiser details porteur))
    uc3((like porteur))
    uc4((s'authentifier))
    end

    pp--->uc1
    uc1--->uc2


    uc1 --> uc3
    uc2 --> uc3
    uc1 -. include .-> uc4
    

    ad[admin-departement 👤]
    ag[admin-general 👤]
    u[utilisateur 👤]
    pp[porteur de projet 👤]
    p[parrain 👤]
```

## Page Messagerie
```mermaid
flowchart LR
    subgraph 'Paies ton match - page Messages'
    uc1((discuter avec un interlocuteur))
    uc3((faire demande parrainage))
    uc4((s'authentifier))
    end


    pp--->uc1
    
    uc1 --> uc3
    
    uc1 -. include .-> uc4
    

    ad[admin-departement 👤]
    ag[admin-general 👤]
    u[utilisateur 👤]
    pp[porteur de projet 👤]
    p[parrain 👤]
```

## Page Accueil Login
```mermaid
flowchart LR
    subgraph 'Paies ton match - Accueil Login'
    uc1((se connecter))
    uc2((finaliser creation compte))
    uc3((initialisation du compte))
    end

    u--->uc1
    u--->uc2
    
    ad--->uc3
    
       
    uc1 -. extend[compte finalisé] .-> uc2
    uc2 -. extend[compte initialisé] .-> uc3
    
    ad[admin-departement 👤]
    ag[admin-general 👤]
    u[utilisateur 👤]
    pp[porteur de projet 👤]
    p[parrain 👤]
```

## Page Admin
```mermaid
flowchart LR
    subgraph 'Page Admin'
    uc1((initialisation du compte du compte porteur projet ))
    uc2((creation du code d'accès))
    uc3((visualiser les kpi))
    uc4((personaliser le footer))
    uc5((visualiser les match))
    uc6((visualiser les match))
    uc7((visualiser les rdv))
    uc8((creation du compte parrain))
    end

    ad--->uc1
    ad--->uc3
    ad--->uc4
    ad--->uc5
    ad--->uc6
    ad--->uc7
    ad--->uc8
              
    uc1 -. include .-> uc2
       
    ad[admin-departement 👤]
```