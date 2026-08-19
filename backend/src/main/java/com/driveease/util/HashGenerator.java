package com.driveease.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
        System.out.println("Admin@123 -> " + encoder.encode("Admin@123"));
        System.out.println("User@123 -> " + encoder.encode("User@123"));
    }
}
