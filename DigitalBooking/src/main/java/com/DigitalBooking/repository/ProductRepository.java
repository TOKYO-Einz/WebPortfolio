package com.DigitalBooking.repository;
import com.DigitalBooking.model.Category;
import com.DigitalBooking.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

//    @Query(value = "SELECT * FROM products p inner join brands b.name WHERE p.name  LIKE %:value% OR b.name LIKE %:value%" , nativeQuery = true)
//    List<Product> findByProductNameOrBrand(@Param("value")String value);

    @Query(value = "SELECT p.*, b.name AS brand_name FROM products p LEFT JOIN brands b ON p.brands_id = b.id WHERE p.name LIKE '%<letras>%' OR b.name LIKE '%<letras>%'" , nativeQuery = true)
    List<Product> findByProductNameOrBrand(@Param("letras")String value);

    @Query("update Product p set p.deleted = true where p.id=?1 and p.deleted = false")
    @Modifying
    int softDelete(Integer id);

    @Query("SELECT COUNT(p) > 0 FROM Product p WHERE p.id = :id and p.deleted = false")
    boolean exists(@Param("id") Integer id);

    Page<Product> findByDeleted(Boolean deleted, Pageable pageable);




}
