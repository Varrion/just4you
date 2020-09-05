package com.example.just4you.model.dto;

import com.sun.istack.NotNull;
import lombok.Data;

import java.sql.Date;

@Data
public class ItemDto {

    @NotNull
    String name;

    String description;

    @NotNull
    Long categoryId;

    Long availableItems;

    @NotNull
    Long regularPrice;

    Boolean isOnSale;

    Long salePrice;

    Date saleStartDate;

    Date saleEndDate;

    Integer discountPercentage;

    int[] sizes;
}
