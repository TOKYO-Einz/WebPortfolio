package com.DigitalBooking.exceptions;

public class ProductNotFoundException extends Throwable {
    public ProductNotFoundException(Integer productId) {
        super("Product with id="+productId+" not found.");
    }

}

