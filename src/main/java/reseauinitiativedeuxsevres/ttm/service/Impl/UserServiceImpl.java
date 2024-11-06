package reseauinitiativedeuxsevres.ttm.service.Impl;

import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;

import java.util.Optional;

public interface UserServiceImpl {

    String enregistrerAdminDepartemental(AdminDepartemental adminDepartemental);

    Optional<AdminDepartemental> rechercherAdminDepartemental(AdminDepartemental adminDepartemental79);
}
