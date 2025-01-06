package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;
import reseauinitiativedeuxsevres.ttm.repository.PlateformeInitiativeRepository;

import java.util.List;



@Service
public class PlateformeInitiativeService {

    @Autowired
    private PlateformeInitiativeRepository plateformeInitiativeRepository;

    public List<PlateformeInitiative> findAll () {
        return plateformeInitiativeRepository.findAll();
    }

}
