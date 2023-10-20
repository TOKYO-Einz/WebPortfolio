package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.dto.FavoriteDTO;

import java.util.List;

public interface FavoriteService {

    FavoriteDTO addFavorite(FavoriteDTO favoriteDTO);

    FavoriteDTO searchFavorite(Integer id);

    void deleteFavorite(Integer id_product, Integer id_user) throws ResourceNotFoundException;

    List<FavoriteDTO> listFavorites();


}

