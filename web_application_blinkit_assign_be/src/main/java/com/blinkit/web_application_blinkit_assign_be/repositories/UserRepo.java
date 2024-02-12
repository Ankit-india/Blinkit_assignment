package com.blinkit.web_application_blinkit_assign_be.repositories;

import com.blinkit.web_application_blinkit_assign_be.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepo extends JpaRepository<User, Integer> {

    @Query(value = "Select * from user where email = ?1", nativeQuery = true)
    User getUserByEmail(String email);

}
