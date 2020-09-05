package com.example.just4you.service.impl;

import com.example.just4you.model.Category;
import com.example.just4you.model.Item;
import com.example.just4you.model.ShoppingCart;
import com.example.just4you.model.dto.ItemDto;
import com.example.just4you.model.enums.Size;
import com.example.just4you.repository.ItemRepository;
import com.example.just4you.service.CategoryService;
import com.example.just4you.service.ItemService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.*;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final CategoryService categoryService;

    public ItemServiceImpl(ItemRepository itemRepository, CategoryService categoryService) {
        this.itemRepository = itemRepository;
        this.categoryService = categoryService;
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public List<Item> getAllByCategoryId(Long id) {
        return itemRepository.findAllByCategoryId(id);
    }

    @Override
    public List<Item> getAllItemsInUserShoppingCart(String username) {
        return itemRepository.findAllByShoppingCartUser(username);
    }

    @Override
    public List<Item> getAllItemsOnSale(Boolean isOnSale) {
        return itemRepository.findAllByIsOnSale(isOnSale);
    }

    @Override
    public Optional<Item> getOneItem(Long id) {
        Optional<Item> item = itemRepository.findById(id);

        if (item.isPresent()) {
            List<String> itemSizes = itemRepository.getAvailableSizesForItem(item.get().getId());
            Set<Size> sizeSet = new HashSet<>();
            for (String size : itemSizes) {
                Size sizeEnum = Size.valueOf(size);
                sizeSet.add(sizeEnum);
            }
            item.get().setSizes(sizeSet);
            return item;
        }

        return Optional.empty();
    }

    @Override
    public Item saveItem(ItemDto itemDto, MultipartFile itemPhoto) throws FileUploadException {
        try {

            Item item = new Item();

            if (itemPhoto != null) {
                item.setPicture(itemPhoto.getBytes());
            }
            item.setName(itemDto.getName());
            item.setDescription(itemDto.getDescription());
            item.setAvailableItems(itemDto.getAvailableItems());

            Optional<Category> optionalCategory = categoryService.getOneCategory(itemDto.getCategoryId());
            if (optionalCategory.isPresent()) {
                Category category = optionalCategory.get();
                item.setCategory(category);
            }

            Date today = new Date(System.currentTimeMillis());

            if (itemDto.getSaleStartDate() != null && itemDto.getSaleEndDate() != null && itemDto.getIsOnSale()) {
                item.setIsOnSale(itemDto.getIsOnSale());
                item.setDiscountPercentage(itemDto.getDiscountPercentage());
                item.setSaleStartDate(itemDto.getSaleStartDate());
                item.setSaleEndDate(itemDto.getSaleEndDate());
                item.setSalePrice(itemDto.getRegularPrice() - (itemDto.getRegularPrice() * itemDto.getDiscountPercentage() / 100));
            }

            if (item.getSaleStartDate() != null && today.after(item.getSaleEndDate())) {
                item.setIsOnSale(false);
                item.setDiscountPercentage(0);
                item.setSaleStartDate(null);
                item.setSaleEndDate(null);
                item.setSalePrice(null);
            }

            item.setRegularPrice(itemDto.getRegularPrice());
            Collection<Size> sizeSet = item.getSizes();
            if (sizeSet == null) {
                sizeSet = new HashSet<>();
            }

            if (itemDto.getSizes() != null) {
                for (Integer key : itemDto.getSizes()) {
                    Size sizeEnum = Size.getSize(key);
                    sizeSet.add(sizeEnum);
                }
            }

            item.setSizes(sizeSet);
            return itemRepository.save(item);
        } catch (IOException ex) {
            throw new FileUploadException("Could not store requested file. Please try again! ", ex);
        }
    }

    @Override
    public Item editItem(ItemDto itemDto, MultipartFile itemPhoto, Long id) throws IOException {

        Optional<Item> optionalItem = getOneItem(id);

        if (optionalItem.isPresent()) {
            Item editedItem = optionalItem.get();

            Optional<Category> optionalCategory = Optional.empty();
            if (itemDto.getCategoryId() != null) {
                optionalCategory = categoryService.getOneCategory(itemDto.getCategoryId());
            }
            editedItem.UpdateItem(itemDto, itemPhoto, optionalCategory.orElse(null));
            return itemRepository.save(editedItem);
        }
        return null;
    }

    @Override
    public void changeAvailableItems(Map<Long, Integer> itemsToChange) {

        itemsToChange.forEach((key, value) -> {
            Optional<Item> optionalItem = getOneItem(key);

            if (optionalItem.isPresent()) {
                Item item = optionalItem.get();
                item.substractAvailableItems(value);

                itemRepository.save(item);
            }
        });
    }

    @Override
    public void deleteItem(Long id) {
        Optional<Item> optionalItem = getOneItem(id);

        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();

            for (ShoppingCart shoppingCart : item.getShoppingCarts()) {
                shoppingCart.getItems().remove(item);
            }
            itemRepository.delete(item);
        }
    }
}
