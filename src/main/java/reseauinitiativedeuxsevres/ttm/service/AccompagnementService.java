package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.Accompagnement;
import reseauinitiativedeuxsevres.ttm.model.DomaineActivite;
import reseauinitiativedeuxsevres.ttm.repository.AccompagnementRepository;
import reseauinitiativedeuxsevres.ttm.repository.DomaineActiviteRepository;

import java.util.List;


@Service
public class AccompagnementService {

    @Autowired
    private AccompagnementRepository accompagnementRepository;

    public List<Accompagnement> findAll () {
        return accompagnementRepository.findAll();
    }

}
