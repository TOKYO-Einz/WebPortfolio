package com.DigitalBooking.repository;

import com.DigitalBooking.model.Category;
import com.DigitalBooking.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findOneByEmail(String email);

    @Query("from User u where u.name =:name")
    User getFirstByName(@Param("name") String name);

    @Query("from User u where u.email =:email")
    User getFirstByEmail(@Param("email") String email);

    Optional<User> findByEmailIgnoreCase(String email);
    boolean existsByEmail(String email);

    @Query("update User u set u.deleted = true where u.id=?1 and u.deleted = false")
    @Modifying
    int softDelete(Integer id);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.id = :id and u.deleted = false")
    boolean exists(@Param("id") Integer id);

    Page<User> findByDeleted(Boolean deleted, Pageable pageable);



}

