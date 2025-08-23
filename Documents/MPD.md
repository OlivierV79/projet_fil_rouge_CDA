````mermaid
erDiagram
Admin ||--o{ Document : "envoie (owner_admin_id)"
Admin ||--o{ Document : "reçoit (receiver_admin_id)"
Member ||--o{ Document : "envoie (owner_member_id)"
Member ||--o{ Document : "reçoit (receiver_member_id)"
Member ||--o{ mentor_founder_relation : "mentor_id"
Member ||--o{ mentor_founder_relation : "founder_id"
Member ||--o{ Appointment : "mentor_id"
Member ||--o{ Appointment : "founder_id"
%% Tables definition
Admin {
BIGINT id PK
VARCHAR username
VARCHAR password
VARCHAR role
BOOLEAN enabled
VARCHAR email
VARCHAR photo
}
Member {
BIGINT id PK
VARCHAR username
VARCHAR password
VARCHAR role
BOOLEAN enabled
VARCHAR email
VARCHAR photo
VARCHAR firstName
VARCHAR lastName
INTEGER nbrOfFounders
BOOLEAN available
}
mentor_founder_relation {
BIGINT mentor_id FK "-> Member.id"
BIGINT founder_id FK "-> Member.id"
%% On pourrait déclarer (mentor_id, founder_id) comme PK composite
}
Document {
BIGINT id PK
VARCHAR name
VARCHAR type
VARCHAR mimeType
BYTEA data
BIGINT owner_member_id FK "-> Member.id"
BIGINT owner_admin_id FK "-> Admin.id"
BIGINT receiver_member_id FK "-> Member.id"
BIGINT receiver_admin_id FK "-> Admin.id"
}
Appointment {
BIGINT id PK
DATE date
TIME time
VARCHAR subject
TEXT summary
BIGINT mentor_id FK "-> Member.id"
BIGINT founder_id FK "-> Member.id"
}
````