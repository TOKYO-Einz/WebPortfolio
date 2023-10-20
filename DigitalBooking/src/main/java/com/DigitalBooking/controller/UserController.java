package com.DigitalBooking.controller;
import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.dto.FullUserDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.model.dto.UserPageDTO;
import com.DigitalBooking.jwt.payload.SignUpRequest;
import com.DigitalBooking.repository.UserRepository;
import com.DigitalBooking.service.interfaces.EmailService;
import com.DigitalBooking.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin (origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@Tag(name = "UserController ")
@RequestMapping("/users")
@Log4j2
public class UserController {

    private final UserService userService;
    private final EmailService emailService;
    private final UserRepository userRepository;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Get page of users",
            parameters = { @Parameter(in = ParameterIn.QUERY, name = "page", description = "Page"),
                    @Parameter(in = ParameterIn.QUERY, name = "size", description = "Size") },
            responses = {
                    @ApiResponse(responseCode = "200",description = "Successful Operation",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = UserPageDTO.class)))})
    @GetMapping ("/list")
    public PageResponseDTO<FullUserDTO> getUsers(@PageableDefault(size = 50,page = 0) @ParameterObject Pageable pageable) {
        return userService.getUsers(pageable);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar usuario por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchUser(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && userService.searchUser(id) != null && userRepository.exists(id))
             response = ResponseEntity.ok(userService.searchUser(id));
        else
            response = ResponseHandler.generateResponse("User not Found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar usuario")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editUser(@RequestBody FullUserDTO fullUserDTO) {
        ResponseEntity<Object> response = null;

        if (fullUserDTO.getId() != null && userService.searchUser(fullUserDTO.getId()) != null&& userRepository.exists(fullUserDTO.getId())) {
            userService.editUser(fullUserDTO);
            response = ResponseHandler.generateResponse("User successfully edited", HttpStatus.OK);
        }
        else
            response = ResponseHandler.generateResponse("User not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar usuario")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (userService.searchUser(id) != null && userRepository.exists(id)) {
            userService.deleteUser(id);
            response = ResponseHandler.generateResponse("User successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("User not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") }, summary = "Registrar nuevo usuario")
    @PostMapping("/create")
    public ResponseEntity<Object> addUser(@RequestBody SignUpRequest signUpRequest)  {
        if(userRepository.findByEmailIgnoreCase(signUpRequest.getEmail()).isPresent()) {
            log.info("email ya existe");
            return ResponseHandler.generateResponse("Error : Email is already taken!", HttpStatus.NOT_ACCEPTABLE);
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            log.info("elije un mail diferente");
            return ResponseHandler.generateResponse("Error : \n" +"Choose a different email please", HttpStatus.NOT_ACCEPTABLE);

        }else {
            log.info("Begin run");
            String linkValidator = "http://g2c5-frontnode.s3-website.us-east-2.amazonaws.com/user/login";
            userService.createUser(signUpRequest);
            emailService.sendMail(signUpRequest.getEmail().toString(), "Validación de cuenta", "<h1 style='color:#f0572d;opacity: 0.8;'> Hola, " + signUpRequest.getName() + "</h1>  " +
                    "<h3>Gracias por registrarte en nuestro sistema. Tu cuenta ha sido creada con éxito.</h3>" +
                    "<br>" +
                    "<p>Estamos encantados de tenerte como parte de nuestra comunidad. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>" +
                    "<p>Para validar tu cuenta hace click en el siguiente botón</p>" +
                    "<br>" +
                    "<a href= " + linkValidator + "  ><button style='background-color: #f0572d ;color: white; padding: 15px 32px; border-radius: 5px; opacity: 0.8;border: none;'>CLICK ACA</button></a>" +
                    "<p>¡Gracias de nuevo por unirte a nosotros!</p>" +
                    "<p>Saludos cordiales, el equipo de Rock and Rent</p>"
            );
            log.info("End run");
            return ResponseHandler.generateResponse("usuario creado", HttpStatus.CREATED);
        }
    }

}
