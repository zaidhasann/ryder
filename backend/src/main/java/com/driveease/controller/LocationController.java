package com.driveease.controller;

import com.driveease.dto.response.ApiResponse;
import com.driveease.dto.response.LocationResponse;
import com.driveease.mapper.CarMapper;
import com.driveease.repository.LocationRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locations")
@Tag(name = "Locations")
public class LocationController {

    private final LocationRepository locationRepository;
    private final CarMapper carMapper;

    public LocationController(LocationRepository locationRepository, CarMapper carMapper) {
        this.locationRepository = locationRepository;
        this.carMapper = carMapper;
    }

    @GetMapping
    @Operation(summary = "Get all active locations", description = "Public endpoint to get all active locations")
    public ResponseEntity<ApiResponse<List<LocationResponse>>> getActiveLocations() {
        List<LocationResponse> responses = locationRepository.findByIsActiveTrue().stream()
                .map(carMapper::toLocationResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(responses, "Locations retrieved successfully"));
    }
}
