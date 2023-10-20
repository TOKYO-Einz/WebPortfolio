package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.dto.FullUserDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.jwt.payload.SignUpRequest;
import com.DigitalBooking.model.User;
import com.DigitalBooking.repository.UserRepository;
import com.DigitalBooking.service.interfaces.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.core.convert.ConversionService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.util.Optional;

import static com.DigitalBooking.model.Role.USER;

@Service
@AllArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConversionService conversionService;
    private final ObjectMapper mapper;
    private static  final Logger log= Logger.getLogger(UserServiceImpl.class);


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails userDetails = userRepository.getFirstByEmail(email);
        if (userDetails ==null){
            throw new UsernameNotFoundException(email);
        }
        return userDetails;
    }


    @Override
    public UserDetails createUser(SignUpRequest signUpRequest) {
        try{
            log.info("User has been created");
            return userRepository.save(User.builder()
                    .name(signUpRequest.getName())
                            .lastname(signUpRequest.getLastname())
                    .password(passwordEncoder.encode(signUpRequest.getPassword()))
                            .email(signUpRequest.getEmail())
                    .age(signUpRequest.isAge())
                    .role(USER)
                            .deleted(false)
                    .build());
        }catch (DataIntegrityViolationException e){
            log.error("User already exist");
            throw new ErrorResponseException(HttpStatus.CONFLICT,
                    ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT,
                            "User already exist"),e);

        }

    }

    @Override
    public PageResponseDTO<FullUserDTO> getUsers(Pageable pageable) {

       var page = userRepository.findByDeleted(false, pageable);
        log.info("List of users has been created ");
        return new PageResponseDTO<>(
                page.getContent().stream()
                        .map(user -> conversionService.convert(user, FullUserDTO.class)).toList()
                , page.getPageable()
                , page.getTotalElements());
    }

    @Override
    public FullUserDTO searchUser (Integer id){
        Optional<User> user = userRepository.findById(id);
        FullUserDTO fullUserDTO = null;
        if (user.isPresent())
            fullUserDTO = mapper.convertValue(user, FullUserDTO.class);
        log.info("User "+id+" has been found");

        return fullUserDTO;
    }

    @Override
    public void editUser (FullUserDTO fullUserDTO){

        User user = mapper.convertValue(fullUserDTO, User.class);
        userRepository.save(user);
        log.info("User "+fullUserDTO.getId()+" has been updated");

    }

    @Override
    public void deleteUser (Integer id) throws ResourceNotFoundException {
        userRepository.softDelete(id);
        log.info("User "+id+" has been deleted");
        if (searchUser(id) == null)
            throw new ResourceNotFoundException("No existe usuario con id " + id);

    }

}
