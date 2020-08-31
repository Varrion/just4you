package com.example.just4you.model;

import com.example.just4you.model.dto.ItemDto;
import com.example.just4you.model.enums.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    @ManyToOne
    @JsonIgnore
    Category category;

    Long availableItems;

    @ElementCollection(targetClass = Size.class)
    @CollectionTable(name = "item_size")
    @Enumerated(EnumType.STRING)
    @Fetch(value = FetchMode.SELECT)
    Collection<Size> sizes;

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
//        Collection<Size> sizeEnum = Size.getSize(itemDto.getSizes().);
//        sizes = sizeEnum;
    }
}
