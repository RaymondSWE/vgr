package org.vgr.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Namn är obligatoriskt")
    @Size(max = 100, message = "Namn kan inte överstiga 100 tecken")
    private String name;

    @NotNull(message = "Antal är obligatoriskt")
    @Min(value = 0, message = "Antal kan inte vara negativt")
    private Integer quantity;

    @NotBlank(message = "Enhet är obligatorisk")
    @Size(max = 50, message = "Enhet kan inte överstiga 50 tecken")
    private String unit;

    @Min(value = 1, message = "Lågt lager gräns måste vara minst 1")
    private Integer lowThreshold = 10;

}