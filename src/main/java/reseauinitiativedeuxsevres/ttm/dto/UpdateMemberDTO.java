package reseauinitiativedeuxsevres.ttm.dto;


import lombok.Data;

@Data
public class UpdateMemberDTO {

    private String firstName;

    private String lastName;

    private String email;

    private String password; // facultatif

    private String currentPassword;

    private Integer nbrOfFounders;

    private Boolean available;
}