package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.DomaineActivite;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;
import reseauinitiativedeuxsevres.ttm.repository.DomaineActiviteRepository;
import reseauinitiativedeuxsevres.ttm.repository.PlateformeInitiativeRepository;

import java.util.List;


@Service
public class DomaineActiviteService {

    @Autowired
    private DomaineActiviteRepository domaineActiviteRepository;

    public List<DomaineActivite> findAll () {
        return domaineActiviteRepository.findAll();
    }

}
