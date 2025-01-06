package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.Lieu;
import reseauinitiativedeuxsevres.ttm.repository.LieuRepository;

import java.util.List;

@Service
public class LieuService {

    @Autowired
     private LieuRepository lieuRepository;

    public List<Lieu> findAll () { return lieuRepository.findAll();}
}
