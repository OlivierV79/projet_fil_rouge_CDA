package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.model.Lieu;

@Data
public class LieuDTO {
    private Long id;
    private String departement;

    public Lieu toLieu() {
        Lieu lieu = new Lieu();
        lieu.setId(this.id);
        lieu.setDepartement(this.departement);
        return lieu;
    }
}
