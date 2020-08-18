package com.example.just4you.model;

import com.example.just4you.model.dto.ItemDto;
import com.example.just4you.model.enums.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.Optional;
import java.util.Set;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    @ManyToOne
    Category category;

    Long availableItems;

    Size size;

    Long regularPrice;

    Boolean isOnSale;

    Long salePrice;

    Date saleStartDate;

    Date saleEndDate;

    Integer discountPercentage;

    @Lob
    byte[] picture;

    @ManyToMany(mappedBy = "items")
    Set<ShoppingCart> shoppingCarts;

    public void UpdateItem(ItemDto itemDto, Optional<byte[]> itemPhoto, Category itemCategory) {
        picture = itemPhoto.orElse(null);
        name = itemDto.getName();
        description = itemDto.getDescription();
        availableItems = itemDto.getAvailableItems();
        category = itemCategory;

        Date today = new Date(System.currentTimeMillis());

        if (itemDto.getSaleStartDate() != null && itemDto.getSaleEndDate() != null && itemDto.getIsOnSale()) {
            isOnSale = itemDto.getIsOnSale();
            discountPercentage = itemDto.getDiscountPercentage();
            saleStartDate = itemDto.getSaleStartDate();
            saleEndDate = itemDto.getSaleEndDate();
            salePrice = itemDto.getSalePrice();
        }

        if (today.after(saleEndDate)) {
            isOnSale = false;
            discountPercentage = 0;
            saleStartDate = null;
            saleEndDate = null;
            salePrice = null;
        }

        regularPrice = itemDto.getRegularPrice();
        Size sizeEnum = Size.getSize(itemDto.getSize());
        size = sizeEnum;
    }
}
