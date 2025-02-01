package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.Role;
import reseauinitiativedeuxsevres.ttm.repository.RoleRepository;

import java.util.List;



@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> findAll () { return roleRepository.findAll();}
}