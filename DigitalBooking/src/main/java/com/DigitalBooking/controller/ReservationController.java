package com.DigitalBooking.controller;
import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.Reservation;
import com.DigitalBooking.model.User;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.model.dto.ReservationDTO;
import com.DigitalBooking.model.dto.ReservationPageDTO;
import com.DigitalBooking.repository.ReservationRepository;
import com.DigitalBooking.service.interfaces.EmailService;
import com.DigitalBooking.service.interfaces.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;


@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final EmailService emailService;
    private final ReservationRepository reservationRepository;



    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Registrar nueva reserva")
    @PostMapping("/create")
    public ResponseEntity<Object> addReservation(@RequestBody ReservationDTO reservationDTO) {
        Reservation reservationR = reservationService.addReservation(reservationDTO);
        User userR = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        emailService.sendMail(userR.getEmail().toString(),"Reserva exitosa! ",
                "<h1 style='color:#f0572d;opacity: 0.8;'> Hola " +  userR.getName() + "</h1>"+
                        "<h3>Su reserva ha sido exitosa! Aquí están los detalles:</h3>"+
                        "<br>" +
                        "<table width='100%' border='1' align='center'>"+
                        "<tr align='center'>"+
                        "<td colspan= 6><b>Datos de la Reserva<b></td>"+
                        "</tr>"+
                        "<tr align='center'>"+
                        "<td>Producto</td>"+
                        "<td>Fecha Retiro</td>"+
                        "<td>Fecha Entrega</td>"+
                        "<td colspan= 2>Lugar Retiro</td>"+
                        "<td>Hora Retiro</td>"+
                        "</tr>" +
                        "<tr align='center'>"+
                        "<td>" + reservationR.getProduct().getName() + " </td>"+
                        "<td>" + reservationDTO.getStartDay() + " </td>"+
                        "<td>" + reservationDTO.getEndDay() + " </td>"+
                        "<td>" + reservationR.getProduct().getBranch().getName() + " </td>" +
                        "<td>" + reservationR.getProduct().getBranch().getAddress() + " </td>"+
                        "<td>" + reservationDTO.getPickUpTime() + " </td>"+
                        "</tr></table>" +
                        "<br>" +
                        "<p>Saludos cordiales, el equipo de Rock and Rent</p>" +
                        "<br><br>" +
                        "<p>NO RESPONDER ESTE MENSAJE </p>");
        return ResponseHandler.generateResponse("Reservation successfull added", HttpStatus.CREATED);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar reserva")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteReservation(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (reservationService.searchReservation(id) != null && reservationRepository.exists(id)) {
            reservationService.deleteReservation(id);
            response = ResponseHandler.generateResponse("Reservation successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Reservation not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar ID de reserva")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchReservation(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && reservationService.searchReservation(id) != null && reservationRepository.exists(id))
            response = ResponseEntity.ok(reservationService.searchReservation(id));
        else
            response = ResponseHandler.generateResponse("Reservation not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar reserva")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editReservation(@RequestBody ReservationDTO reservationDTO) {
        ResponseEntity<Object> response = null;

        if (reservationDTO.getId() != null && reservationService.searchReservation(reservationDTO.getId()) != null && reservationRepository.exists(reservationDTO.getId())) {
            reservationService.editReservation(reservationDTO);
            response = ResponseHandler.generateResponse("Rservation successfull edited", HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse("Rservation not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "obtener paginas de reservas",
            parameters = { @Parameter(in = ParameterIn.QUERY, name = "page", description = "Page"),
                    @Parameter(in = ParameterIn.QUERY, name = "size", description = "Size") },
            responses = {
                    @ApiResponse(responseCode = "200",description = "Successful Operation",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ReservationPageDTO.class)))})
    @GetMapping ("/list")
    public PageResponseDTO<ReservationDTO> getReservations(@PageableDefault(size = 10,page = 0) @ParameterObject Pageable pageable) {
        return reservationService.getReservations(pageable);
    }

     @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Listar todas las reserva")
     @GetMapping("/listAll")
     public ResponseEntity<Object> listReservations() {
     return ResponseEntity.ok(reservationService.listReservations());
     }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar reservas por ID de producto")
    @GetMapping("/searchProdRes/{id}")
    public ResponseEntity<Object> searchProductoReservations(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && reservationService.findByProduct(id) != null)
            response = ResponseEntity.ok(reservationService.findByProduct(id));
        else
            response = ResponseHandler.generateResponse("Reservations not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar reservas por ID de producto")
    @GetMapping("/searchUserRes/{id}")
    public ResponseEntity<Object> searchUserReservations(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && reservationService.findByUser(id) != null)
            response = ResponseEntity.ok(reservationService.findByUser(id));
        else
            response = ResponseHandler.generateResponse("Reservations not found", HttpStatus.NOT_FOUND);
        return response;
    }

}
