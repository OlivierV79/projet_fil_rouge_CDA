package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.model.Lieu;
import reseauinitiativedeuxsevres.ttm.model.Role;


@Data
public class RoleDTO {
    private Long id;
    private String nom;

    public Role toRole() {
        Role role = new Role();
        role.setId(this.id);
        role.setNom(this.nom);
        return role;
    }
}
