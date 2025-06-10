-- Insertion d'un Admin
INSERT INTO admin (id, username, password, role, enabled, email, photo) VALUES (1001, 'admin', '$2a$12$VhFELwxCH38hNAhTPM9t1ehyWVeRD0VziRohX8/6sM5lhCI2zQVCi', 'ADMIN', true, 'admin@example.com', NULL);

-- Insertion de 2 Mentors
INSERT INTO member (id, username, password, role, enabled, email, photo, first_name, last_name, nbr_of_founders, available) VALUES (1002, 'mentor', '$2a$12$zw0HHsT.U2cUugjwqS/Veev6aM7lbEgepZPtM3zsO7mixuKEsA8Tu', 'MENTOR', true, 'mentor1@example.com', NULL, 'Olivier', 'VILLA', 3, true), (1003, 'mentor2', '$2a$12$zw0HHsT.U2cUugjwqS/Veev6aM7lbEgepZPtM3zsO7mixuKEsA8Tu', 'MENTOR', true, 'mentor2@example.com', NULL, 'Claire', 'STARK', 3, true);

-- Insertion de 4 Founders
INSERT INTO member (id, username, password, role, enabled, email, photo, first_name, last_name, nbr_of_founders, available) VALUES (1004, 'founder', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder1@example.com', NULL, 'Alice', 'BLEUVE', NULL, true), (1005, 'founder2', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder2@example.com', NULL, 'Bob', 'BIGARD', NULL, true), (1006, 'founder3', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder3@example.com', NULL, 'Eve', 'DOUX', NULL, true), (1007, 'founder4', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder4@example.com', NULL, 'David', 'CHARVET', NULL, true);

-- Insertion de 2 Appointement
INSERT INTO appointment (id, date, time, subject, mentor_id, founder_id) VALUES (1001, '2025-05-02', '10:00:00', 'Première prise de contact', 1002, 1004),(1002, '2025-05-03', '14:30:00', 'Finalisation de la demande de subvention à la CE dans le cadre du financement écologique solidaire', 1002, 1005);

-- Insertion de 2 mentorshipRelations
INSERT INTO mentor_founder_relation (founder_id, mentor_ID) VALUES (1004, 1002), (1005,1002);