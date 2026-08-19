package com.driveease.repository;

import com.driveease.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {

    List<Car> findTop6ByIsActiveTrueOrderByRatingAvgDesc();

    Page<Car> findByIsActiveTrue(Pageable pageable);

    @Query("SELECT COUNT(c) FROM Car c WHERE c.isActive = true")
    long countActiveCars();
}
