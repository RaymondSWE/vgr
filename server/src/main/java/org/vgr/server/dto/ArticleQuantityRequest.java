package org.vgr.server.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateArticleQuantityRequest  {

    @NotNull(message = "Antal är obligatoriskt")
    @Min(value = 0, message = "Antal kan inte vara negativt")
    private Integer quantity;
}
