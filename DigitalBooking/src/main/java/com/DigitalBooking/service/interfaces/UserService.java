package com.DigitalBooking.service.interfaces;
import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.dto.FullUserDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.jwt.payload.SignUpRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;



public interface UserService extends UserDetailsService {

    UserDetails createUser(SignUpRequest singUpRequest);

    FullUserDTO searchUser(Integer id);

    void editUser(FullUserDTO fullUserDTO);

    void deleteUser (Integer id) throws ResourceNotFoundException;

    PageResponseDTO<FullUserDTO> getUsers(Pageable pageable);

    /**PageResponseDTO<FullUserDTO> getFullUsers(Pageable pageable);**/

}
