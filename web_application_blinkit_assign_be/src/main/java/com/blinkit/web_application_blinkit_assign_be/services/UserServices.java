package com.blinkit.web_application_blinkit_assign_be.services;

import com.blinkit.web_application_blinkit_assign_be.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserServices {

    boolean login(String email, String password);

    User signUp(String email, String password);

    boolean logout(String email);

    String uploadImages(String email, MultipartFile[] imagesList) throws IOException;
}
