package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;


@Data
public class PlateformeInitiativeDTO {
    private Long id;
    private String nom;

    public PlateformeInitiative toPlateformeInitiative() {
        PlateformeInitiative plateformeInitiative = new PlateformeInitiative();
        plateformeInitiative.setId(this.id);
        plateformeInitiative.setNom(this.nom);
        return plateformeInitiative;
    }
}