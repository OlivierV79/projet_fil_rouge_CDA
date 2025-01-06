package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.model.DomaineActivite;

@Data
public class DomaineActiviteDTO {
    private Long id;

    public DomaineActivite toDomaineActivite() {
        DomaineActivite domaineActivite = new DomaineActivite();
        domaineActivite.setId(this.id);
        return domaineActivite;
    }
}
