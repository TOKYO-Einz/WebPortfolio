package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Image;
import com.DigitalBooking.model.dto.ImageDTO;

import java.util.Set;

public interface ImageService {

    ImageDTO searchImage(Integer id);

    Set<ImageDTO> listImages();

    Image addImage(Image image);

    void editImage(ImageDTO imageDTO);

    void deleteImage(Integer id) throws ResourceNotFoundException;

}
