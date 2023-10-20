package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Image;
import com.DigitalBooking.model.dto.ImageDTO;
import com.DigitalBooking.repository.ImageRepository;
import com.DigitalBooking.service.interfaces.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ObjectMapper mapper;
    private static  final Logger log= Logger.getLogger(ImageServiceImpl.class);

    @Override
    public ImageDTO searchImage(Integer id) {
        Optional<Image> image = imageRepository.findById(id);
        ImageDTO imageDTO = null;
        if(image.isPresent())
            imageDTO = mapper.convertValue(image, ImageDTO.class);
        log.info("Image "+id+" has been found");
        return imageDTO;
    }

    @Override
    public Set<ImageDTO> listImages() {
        List<Image> images = imageRepository.findAll();
        Set<ImageDTO> imagesDTO = new HashSet<>();

        for (Image image:images) {
            imagesDTO.add(mapper.convertValue(image, ImageDTO.class));
        }
        log.info("Image list has been created");

        return  imagesDTO;
    }

    @Override
    public Image addImage(Image image) {
        Image imagex = null;
        if(image.getId() != null) {
            imagex = imageRepository.findById(image.getId()).orElse(null);
        }
        if(imagex == null) {
            imagex = mapper.convertValue(image,Image.class);
            log.info("Image has been created");
            imagex = imageRepository.save(imagex);
        }
        return imagex;
    }

    @Override
    public void editImage(ImageDTO imageDTO) {
        Image image = mapper.convertValue(imageDTO,Image.class);
        log.info("Image "+imageDTO.getId()+" has been updated");
        imageRepository.save(image);
    }

    @Override
    public void deleteImage(Integer id) throws ResourceNotFoundException {
        if (searchImage(id) == null)
            throw new ResourceNotFoundException("No existe imagen con id "+id);
        log.info("Image "+id+" has been created");
        imageRepository.deleteById(id);
    }
}
