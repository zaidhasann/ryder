package com.driveease.service.impl;

import com.driveease.dto.response.CarSummaryResponse;
import com.driveease.entity.Car;
import com.driveease.entity.User;
import com.driveease.entity.Wishlist;
import com.driveease.exception.ResourceNotFoundException;
import com.driveease.mapper.CarMapper;
import com.driveease.repository.CarRepository;
import com.driveease.repository.UserRepository;
import com.driveease.repository.WishlistRepository;
import com.driveease.service.WishlistService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public WishlistServiceImpl(WishlistRepository wishlistRepository,
                               UserRepository userRepository,
                               CarRepository carRepository,
                               CarMapper carMapper) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }

    @Override
    public List<CarSummaryResponse> getUserWishlist(Long userId) {
        List<Wishlist> wishlists = wishlistRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return wishlists.stream().map(w -> {
            CarSummaryResponse response = carMapper.toSummary(w.getCar());
            response.setIsWishlisted(true);
            return response;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addToWishlist(Long userId, Long carId) {
        if (wishlistRepository.existsByUserIdAndCarId(userId, carId)) {
            return;
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", carId));

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setCar(car);
        wishlist.setCreatedAt(Instant.now());
        wishlistRepository.save(wishlist);
    }

    @Override
    @Transactional
    public void removeFromWishlist(Long userId, Long carId) {
        wishlistRepository.deleteByUserIdAndCarId(userId, carId);
    }

    @Override
    public boolean isCarWishlisted(Long userId, Long carId) {
        return wishlistRepository.existsByUserIdAndCarId(userId, carId);
    }
}
