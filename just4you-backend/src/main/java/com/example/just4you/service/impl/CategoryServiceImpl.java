package com.example.just4you.service.impl;

import com.example.just4you.model.Category;
import com.example.just4you.model.dto.CategoryDto;
import com.example.just4you.repository.CategoryRepository;
import com.example.just4you.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    final private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getOneCategory(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category saveCategory(CategoryDto categoryDto, MultipartFile categoryPicture) throws IOException {
        Category category = new Category();

        if (categoryPicture != null) {
            category.setCategoryPhoto(categoryPicture.getBytes());
        }
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        return categoryRepository.save(category);
    }

    @Override
    public Category editCategory(CategoryDto categoryDto, MultipartFile categoryPicture, Long categoryId) throws IOException {

        Optional<Category> optionalCategory = getOneCategory(categoryId);

        if (optionalCategory.isPresent()) {

            Category editedCategory = optionalCategory.get();
            editedCategory.setName(categoryDto.getName());
            editedCategory.setDescription(categoryDto.getDescription());
            editedCategory.setCategoryPhoto(categoryPicture.getBytes());

            return categoryRepository.save(editedCategory);
        }
        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);

    }
}
