package com.example.just4you.model.dto;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Lob;

@Data
public class CategoryDto {

    @NotNull
    String name;

    String description;

    @Lob
    byte[] categoryPhoto;
}
