package com.driveease.controller;

import com.driveease.dto.response.AddonResponse;
import com.driveease.dto.response.ApiResponse;
import com.driveease.mapper.CarMapper;
import com.driveease.repository.AddonRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/addons")
@Tag(name = "Addons")
public class AddonController {

    private final AddonRepository addonRepository;
    private final CarMapper carMapper;

    public AddonController(AddonRepository addonRepository, CarMapper carMapper) {
        this.addonRepository = addonRepository;
        this.carMapper = carMapper;
    }

    @GetMapping
    @Operation(summary = "Get all active addons", description = "Public endpoint to get all active addons")
    public ResponseEntity<ApiResponse<List<AddonResponse>>> getActiveAddons() {
        List<AddonResponse> responses = addonRepository.findByIsActiveTrue().stream()
                .map(carMapper::toAddonResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(responses, "Addons retrieved successfully"));
    }
}
