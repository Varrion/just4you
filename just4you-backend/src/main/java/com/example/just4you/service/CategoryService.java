package com.example.just4you.service;

import com.example.just4you.model.Category;
import com.example.just4you.model.dto.CategoryDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();

    Category saveCategory(CategoryDto categoryDto, MultipartFile categoryPicture) throws IOException;

    Optional<Category> getOneCategory(Long id);

    Category editCategory(CategoryDto categoryDto, MultipartFile categoryPicture, Long categoryId) throws IOException;

    void deleteCategory(Long id);
}
