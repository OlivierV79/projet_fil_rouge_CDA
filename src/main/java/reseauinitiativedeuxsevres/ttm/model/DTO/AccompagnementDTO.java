package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.model.Accompagnement;
import reseauinitiativedeuxsevres.ttm.model.Lieu;

@Data
public class AccompagnementDTO {

    private Long id;

    public Accompagnement toAccompagnement() {
        Accompagnement accompagnement = new Accompagnement();
        accompagnement.setId(this.id);
        return accompagnement;
    }
}
