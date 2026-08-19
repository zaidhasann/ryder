package com.driveease.controller;

import com.driveease.dto.request.CarSearchCriteria;
import com.driveease.dto.response.ApiResponse;
import com.driveease.dto.response.CarDetailResponse;
import com.driveease.dto.response.CarSummaryResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
@Tag(name = "Cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    @Operation(summary = "Search cars", description = "Public endpoint to search available cars")
    public ResponseEntity<ApiResponse<PageResponse<CarSummaryResponse>>> searchCars(
            @ModelAttribute CarSearchCriteria criteria) {
        PageResponse<CarSummaryResponse> response = carService.searchCars(criteria);
        return ResponseEntity.ok(ApiResponse.success(response, "Cars retrieved successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get car by id", description = "Public endpoint to get car details")
    public ResponseEntity<ApiResponse<CarDetailResponse>> getCarById(@PathVariable Long id) {
        CarDetailResponse response = carService.getCarById(id);
        return ResponseEntity.ok(ApiResponse.success(response, "Car details retrieved successfully"));
    }
}
