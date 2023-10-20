package com.DigitalBooking.config;


import com.DigitalBooking.jwt.JwtRequestFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static com.DigitalBooking.model.Role.ADMIN;
import static com.DigitalBooking.model.Role.USER;




@Configuration
@EnableWebSecurity
@AllArgsConstructor

public class SecurityConf {

    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        authorizeHttpRequestsCustomizer -> authorizeHttpRequestsCustomizer

                                //PUBLIC CLIENT

                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/login", "/api/sign-up").permitAll()
                                .requestMatchers(HttpMethod.GET,"/products/**", "/categories/**", "/branches/**", "/brands/**", "/reservations/list/**", "/reservations/searchProdRes/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/users/**").permitAll()

                                //LOGIN BY USER

                                .requestMatchers("/favorites/**").hasAuthority(USER.name())
                                .requestMatchers(HttpMethod.POST, "/scores/**", "/reservations/**","/favorites/**").hasAnyAuthority(USER.name(), ADMIN.name())
                                .requestMatchers(HttpMethod.PUT, "/reservations/**").hasAuthority(USER.name())
                                .requestMatchers(HttpMethod.DELETE, "/favorites/**").hasAuthority(USER.name())

                                //LOGIN BY ADMIN

                                .requestMatchers(HttpMethod.POST, "/products/**", "/categories/**", "/branches/**", "/brands/**", "/images/**", "/features/**","/users/**").hasAuthority(ADMIN.name())
                                .requestMatchers(HttpMethod.PUT,"/products/**","/categories/**", "/branches/**","/brands/**", "/images/**", "/features/**").hasAuthority(ADMIN.name())
                                .requestMatchers(HttpMethod.GET, "/users/list/**","/scores/**").hasAuthority(ADMIN.name())
                                .requestMatchers(HttpMethod.DELETE, "/products/**", "/categories/**", "/branches/**", "/brands/**", "/images/**", "/features/**","/users/**").hasAuthority(ADMIN.name())

                                //BOTH LOGINS

                                .requestMatchers(HttpMethod.DELETE, "/reservations/**", "/users/**").hasAnyAuthority(USER.name(), ADMIN.name())
                                .requestMatchers(HttpMethod.GET, "/reservations/searchUserRes/**", "/users/search/**", "/favorites/**").hasAnyAuthority(USER.name(), ADMIN.name())
                                .requestMatchers(HttpMethod.PUT, "/users/**").hasAnyAuthority(USER.name(), ADMIN.name())


                                .anyRequest().authenticated())
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3306"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
