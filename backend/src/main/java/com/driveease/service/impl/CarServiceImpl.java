package com.driveease.service.impl;

import com.driveease.dto.request.CarSearchCriteria;
import com.driveease.dto.response.CarDetailResponse;
import com.driveease.dto.response.CarSummaryResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.entity.Car;
import com.driveease.exception.ResourceNotFoundException;
import com.driveease.mapper.CarMapper;
import com.driveease.repository.CarRepository;
import com.driveease.service.CarService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public CarServiceImpl(CarRepository carRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }

    @Override
    public PageResponse<CarSummaryResponse> searchCars(CarSearchCriteria criteria) {
        Sort.Direction direction = "desc".equalsIgnoreCase(criteria.getSortDir()) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(criteria.getPage(), criteria.getSize(), Sort.by(direction, criteria.getSortBy()));

        Specification<Car> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.isTrue(root.get("isActive")));

            if (criteria.getKeyword() != null && !criteria.getKeyword().isEmpty()) {
                String pattern = "%" + criteria.getKeyword().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("brand")), pattern),
                        cb.like(cb.lower(root.get("model")), pattern)
                ));
            }
            if (criteria.getCategory() != null) {
                predicates.add(cb.equal(root.get("category"), criteria.getCategory()));
            }
            if (criteria.getFuelType() != null) {
                predicates.add(cb.equal(root.get("fuelType"), criteria.getFuelType()));
            }
            if (criteria.getTransmission() != null) {
                predicates.add(cb.equal(root.get("transmission"), criteria.getTransmission()));
            }
            if (criteria.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("pricePerDay"), criteria.getMinPrice()));
            }
            if (criteria.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("pricePerDay"), criteria.getMaxPrice()));
            }
            if (criteria.getMinSeats() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("seats"), criteria.getMinSeats()));
            }
            if (criteria.getLocationId() != null) {
                predicates.add(cb.equal(root.get("location").get("id"), criteria.getLocationId()));
            }
            if (criteria.getAirConditioned() != null) {
                predicates.add(cb.equal(root.get("airConditioned"), criteria.getAirConditioned()));
            }
            if (criteria.getBrand() != null && !criteria.getBrand().isEmpty()) {
                predicates.add(cb.equal(cb.lower(root.get("brand")), criteria.getBrand().toLowerCase()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Car> carPage = carRepository.findAll(spec, pageable);
        List<CarSummaryResponse> summaries = carPage.getContent().stream()
                .map(carMapper::toSummary)
                .toList();

        return PageResponse.from(carPage, summaries);
    }

    @Override
    public CarDetailResponse getCarById(Long id) {
        Car car = carRepository.findById(id)
                .filter(Car::getIsActive)
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", id));
        return carMapper.toDetail(car);
    }
}
