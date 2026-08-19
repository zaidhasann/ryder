package com.driveease.service;

import com.driveease.dto.request.CarSearchCriteria;
import com.driveease.dto.response.CarDetailResponse;
import com.driveease.dto.response.CarSummaryResponse;
import com.driveease.dto.response.PageResponse;

public interface CarService {
    PageResponse<CarSummaryResponse> searchCars(CarSearchCriteria criteria);
    CarDetailResponse getCarById(Long id);
}
