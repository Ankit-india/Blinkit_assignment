package com.blinkit.web_application_blinkit_assign_be.controllers;

import com.blinkit.web_application_blinkit_assign_be.entities.User;
import com.blinkit.web_application_blinkit_assign_be.services.UserServices;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class Controllers {
    private Logger logger = LoggerFactory.getLogger(Controllers.class);

    @Autowired
    private UserServices userServices;

    @PostMapping("/login/{email}/{password}")
    public ResponseEntity<?> login(@PathVariable String email, @PathVariable String password) {
        boolean response = userServices.login(email, password);
        if (!response) {
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup/{email}/{password}")
    public ResponseEntity<?> signUp(@PathVariable String email, @PathVariable String password) {
        if(password.length() > 10) {
            return new ResponseEntity<>("Password should be less than 10", HttpStatus.BAD_REQUEST);
        }
        User user = userServices.signUp(email, password);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout/{email}")
    public ResponseEntity<?> logout(@PathVariable String email) {
        boolean response = userServices.logout(email);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/uploadImages/{email}")
    public ResponseEntity<?> uploadImages(@PathVariable String email, @RequestParam("images") MultipartFile[] imagesList) {
        try {
            userServices.uploadImages(email, imagesList);
        } catch (IOException e) {
            logger.error("File Not Uploaded Successfully", e);
            return new ResponseEntity<>("Internal server error file doesn't uploaded", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("{} files uploaded", imagesList.length);
        return ResponseEntity.ok("file Uploaded Successfully");
    }
}
