-- Insertion d'un Admin
INSERT INTO admin (id, username, password, role, enabled, email, photo) VALUES (1, 'admin', '$2a$12$VhFELwxCH38hNAhTPM9t1ehyWVeRD0VziRohX8/6sM5lhCI2zQVCi', 'ADMIN', true, 'admin@example.com', NULL);

-- Insertion de 2 Mentors
INSERT INTO member (id, username, password, role, enabled, email, photo, first_name, last_name, nbr_of_founders, available) VALUES (2, 'mentor1', '$2a$12$zw0HHsT.U2cUugjwqS/Veev6aM7lbEgepZPtM3zsO7mixuKEsA8Tu', 'MENTOR', true, 'mentor1@example.com', NULL, 'Jean', 'Mentor', 3, true), (3, 'mentor2', '$2a$12$zw0HHsT.U2cUugjwqS/Veev6aM7lbEgepZPtM3zsO7mixuKEsA8Tu', 'MENTOR', true, 'mentor2@example.com', NULL, 'Claire', 'Mentor', 3, true);

-- Insertion de 4 Founders
INSERT INTO member (id, username, password, role, enabled, email, photo, first_name, last_name, nbr_of_founders, available) VALUES (4, 'founder1', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder1@example.com', NULL, 'Alice', 'Founder', NULL, true), (5, 'founder2', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder2@example.com', NULL, 'Bob', 'Founder', NULL, true), (6, 'founder3', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder3@example.com', NULL, 'Eve', 'Founder', NULL, true), (7, 'founder4', '$2a$12$CIFoLRMqCFiIXz7D0B4tPOroLygnfwNh6nqI55zxqdGksLGXYM8Ca', 'FOUNDER', true, 'founder4@example.com', NULL, 'David', 'Founder', NULL, true);
