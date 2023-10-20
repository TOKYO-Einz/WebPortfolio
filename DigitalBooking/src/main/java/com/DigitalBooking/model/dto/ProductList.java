package com.DigitalBooking.model.dto;

import com.DigitalBooking.model.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductList {
    private List<Product> items;
    private long total;
}
