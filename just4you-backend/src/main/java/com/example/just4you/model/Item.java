package com.example.just4you.model;

import com.example.just4you.model.dto.ItemDto;
import com.example.just4you.model.enums.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;
import java.sql.Date;
import java.util.Collection;
import java.util.HashSet;
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
    @Cascade(value = org.hibernate.annotations.CascadeType.DELETE)
    @JsonIgnore
    Set<ShoppingCart> shoppingCarts;

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Item)) {
            return false;
        }

        Item course = (Item) o;

        return course.name.equals(name) &&
                course.id.equals(id);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        result = 31 * result + description.hashCode();
        return result;
    }

    public void UpdateItem(ItemDto itemDto, MultipartFile itemPhoto, Category itemCategory) throws IOException {

        if (itemPhoto != null) {
            picture = itemPhoto.getBytes();
        }

        name = itemDto.getName();
        description = itemDto.getDescription();
        availableItems = itemDto.getAvailableItems();

        if (itemCategory != null) {
            category = itemCategory;
        }

        Date today = new Date(System.currentTimeMillis());

        if (itemDto.getSaleStartDate() != null && itemDto.getSaleEndDate() != null && itemDto.getIsOnSale()) {
            isOnSale = itemDto.getIsOnSale();
            discountPercentage = itemDto.getDiscountPercentage();
            saleStartDate = itemDto.getSaleStartDate();
            saleEndDate = itemDto.getSaleEndDate();
            salePrice = itemDto.getSalePrice();
        } else {
            isOnSale = false;
        }

        if (saleEndDate != null && today.after(saleEndDate)) {
            isOnSale = false;
            discountPercentage = 0;
            saleStartDate = null;
            saleEndDate = null;
            salePrice = null;
        }

        regularPrice = itemDto.getRegularPrice();

        Collection<Size> sizeSet = new HashSet<>();
        if (itemDto.getSizes() != null) {

            for (Integer key : itemDto.getSizes()) {
                Size sizeEnum = Size.getSize(key);
                sizeSet.add(sizeEnum);
            }
        }
        sizes = sizeSet;
    }

    public void substractAvailableItems(Integer quantityToSubstract) {
        if (quantityToSubstract != null) {
            availableItems -= quantityToSubstract;
            if (availableItems < 0) {
                availableItems = 0L;
            }
        }
    }
}
