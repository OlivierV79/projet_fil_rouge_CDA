package reseauinitiativedeuxsevres.ttm.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
public class Member extends User {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = true)
    private Integer nbrOfFounders;

    @Column(nullable = false)
    private boolean available = true;

    @ManyToMany
    @JoinTable(
            name = "mentor_founder_relation",
            joinColumns = @JoinColumn(name = "mentor_id"),
            inverseJoinColumns = @JoinColumn(name = "founder_id")
    )

    private Set<Member> mentorshipRelations;

}
