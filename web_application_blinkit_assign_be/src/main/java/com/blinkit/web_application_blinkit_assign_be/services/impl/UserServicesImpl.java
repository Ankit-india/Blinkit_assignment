package com.blinkit.web_application_blinkit_assign_be.services.impl;

import com.blinkit.web_application_blinkit_assign_be.entities.User;
import com.blinkit.web_application_blinkit_assign_be.repositories.UserRepo;
import com.blinkit.web_application_blinkit_assign_be.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UserServicesImpl implements UserServices {
    @Value("${project.images}")
    private String path;

    @Autowired
    private UserRepo userRepo;

    @Override
    public boolean login(String email, String password) {
        User user = userRepo.getUserByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            user.setLoggedIn(true);
            userRepo.save(user);
            return true;
        }
        return false;
    }

    @Override
    public User signUp(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setLoggedIn(false);
        userRepo.save(user);
        return user;
    }

    @Override
    public boolean logout(String email) {
        User user = userRepo.getUserByEmail(email);
        if (user != null) {
            user.setLoggedIn(false);
            userRepo.save(user);
            return true;
        }
        return false;
    }

    @Override
    public String uploadImages(String email, MultipartFile[] imagesList)
            throws IOException {
        User user = userRepo.getUserByEmail(email);
        if(!user.isLoggedIn()) {
            return "Not LoggedIn please log in again";
        }
        String folderName = (user.getImages() == null) ? UUID.randomUUID().toString() : user.getImages();
        path = path + File.separator + folderName;
        for (MultipartFile image : imagesList) {
            String imgName = image.getOriginalFilename();
            String randomId = UUID.randomUUID().toString();
            String newImageName = randomId.concat(imgName.substring(imgName.lastIndexOf(".")));
            String filePath = path + File.separator + newImageName;
            File f = new File(path);

            if (!f.exists()) {
                f.mkdir();
            }
            Files.copy(image.getInputStream(), Paths.get(filePath));
        }
        user.setImages(folderName);
        userRepo.save(user);
        path = "images";
        return folderName;
    }
}
