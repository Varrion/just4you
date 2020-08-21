package com.example.just4you.controller;

import com.example.just4you.model.Item;
import com.example.just4you.model.dto.ItemDto;
import com.example.just4you.service.ItemService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/items")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping()
    List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/category/{id}")
    List<Item> getAllByCategoryId(@PathVariable Long id) {
        return itemService.getAllByCategoryId(id);
    }

    @GetMapping("/{id}")
    Optional<Item> getItem(@PathVariable Long id) {
        return itemService.getOneItem(id);
    }

    @PostMapping
    Item addItem(@RequestPart("itemDto") ItemDto itemDto,
                 @RequestPart("itemPicture") Optional<MultipartFile> itemPicture) throws IOException, FileUploadException {
        return itemService.saveItem(itemDto, itemPicture.orElse(null));
    }

    @PutMapping("/{id}")
    Item editedItem(@RequestPart("itemDto") ItemDto itemDto,
                    @RequestPart("itemPicture") MultipartFile itemPicture, @PathVariable Long id) throws IOException {
        return itemService.editItem(itemDto, itemPicture, id);
    }

    @DeleteMapping("/{id}")
    void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }

    @GetMapping("/{username}/cart")
    List<Item> getAllItemsInUserShoppingCart(@PathVariable String username) {
        return itemService.getAllItemsInUserShoppingCart(username);
    }
}
