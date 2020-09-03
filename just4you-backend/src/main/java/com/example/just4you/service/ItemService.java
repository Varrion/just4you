package com.example.just4you.service;

import com.example.just4you.model.Item;
import com.example.just4you.model.dto.ItemDto;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ItemService {
    List<Item> getAllItems();

    List<Item> getAllByCategoryId(Long id);

    List<Item> getAllItemsInUserShoppingCart(String username);

    List<Item> getAllItemsOnSale(Boolean isOnSale);

    Optional<Item> getOneItem(Long id);

    Item saveItem(ItemDto itemDto, MultipartFile itemPhoto) throws IOException, FileUploadException;

    Item editItem(ItemDto itemDto, MultipartFile itemPhoto, Long id) throws IOException;

    void changeAvailableItems(Map<Long, Integer> itemsToChange);

    void deleteItem(Long id);
}
