package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Favorite;
import com.DigitalBooking.model.dto.FavoriteDTO;
import com.DigitalBooking.repository.FavoriteRepository;
import com.DigitalBooking.service.interfaces.FavoriteService;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    private static  final Logger log= Logger.getLogger(FavoriteServiceImpl.class);


    @Override
    public FavoriteDTO addFavorite(FavoriteDTO favoriteDTO) {
        Favorite favorite = favoriteRepository.save(favoriteDTO.toEntity());
        log.info("Product has been added to favorite");
        return favorite.toDTO();

    }

    @Override
    public FavoriteDTO searchFavorite(Integer id) {
        return null;
    }


    @Override
    public void deleteFavorite(Integer id_product, Integer id_user) throws ResourceNotFoundException {
        List<Favorite> favorites= favoriteRepository.findAll();
        for (Favorite favorite : favorites){
            if (favorite.getProduct().getId().equals(id_product) && favorite.getUser().getId().equals(id_user))
                favoriteRepository.deleteById(favorite.getId());
        }
        log.info("Favorite has been deleted");
    }

    @Override
    public List<FavoriteDTO> listFavorites() {
        List<Favorite>favorites= favoriteRepository.findAll();
        List<FavoriteDTO>favoritesDTO= new ArrayList<>();
        for (Favorite favorite : favorites){
            favoritesDTO.add(favorite.toDTO());
        }
        log.info("Favorite list has been created");
        return favoritesDTO;
    }
}





