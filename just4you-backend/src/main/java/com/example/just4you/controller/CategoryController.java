package com.example.just4you.controller;

import com.example.just4you.model.Category;
import com.example.just4you.model.dto.CategoryDto;
import com.example.just4you.model.dto.ItemDto;
import com.example.just4you.service.CategoryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    Optional<Category> getOneCategory(@PathVariable Long id){
        return categoryService.getOneCategory(id);
    }

    @PostMapping
    Category addCategory(@RequestParam("categoryDto") CategoryDto categoryDto,
                         @RequestParam("categoryPicture") MultipartFile categoryPicture) throws IOException {
        return  categoryService.saveCategory(categoryDto, categoryPicture);
    }

    @PutMapping("/{id}")
    Category editedCategory(@RequestParam("categoryDto") CategoryDto categoryDto,
                            @RequestParam("categoryPicture") MultipartFile categoryPicture, @PathVariable Long id) throws IOException {
        return categoryService.editCategory(categoryDto, categoryPicture, id);
    }

    @DeleteMapping("/{id}")
    void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }
}
