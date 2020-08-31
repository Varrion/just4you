package com.example.just4you.repository;

import com.example.just4you.model.Item;
import com.example.just4you.model.enums.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Transactional
    List<Item> findAllByCategoryId(Long id);

    @Transactional
    List<Item> findAllByIsOnSale(Boolean isOnSale);

    @Transactional
    @Query(
            value = "SELECT item.* from item item \n" +
                    "INNER JOIN shopping_cart_items shoppingItems ON item.id = shoppingItems.items_id\n" +
                    "INNER JOIN shopping_cart cart ON cart.id = shoppingItems.shopping_carts_id \n" +
                    "WHERE cart.customer_username = ?1",
            nativeQuery = true)
    List<Item> findAllByShoppingCartUser(String username);

    @Transactional
    @Query(
            value = "SELECT sizes from item_size sizes\n" +
                    "WHERE sizes.item_id = ?1",
            nativeQuery = true)
    List<String> getAvailableSizesForItem(Long itemId);
}
