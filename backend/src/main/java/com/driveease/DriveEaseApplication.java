package com.driveease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DriveEaseApplication {

    public static void main(String[] args) {
        SpringApplication.run(DriveEaseApplication.class, args);
    }
}
