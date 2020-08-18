package com.example.just4you.model.dto;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Lob;
import java.sql.Date;

@Data
public class ItemDto {

    @NotNull
    String name;

    String description;

    Long categoryId;

    Long availableItems;

    Integer size;

    Long regularPrice;

    Boolean isOnSale;

    Long salePrice;

    Date saleStartDate;

    Date saleEndDate;

    Integer discountPercentage;

    @Lob
    byte[] picture;
}
