package com.example.demo.controller;

import com.example.demo.dto.DepartmentDTO;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.model.Department;
import com.example.demo.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentRepository repository;

    @GetMapping("")
    public List<DepartmentDTO> findAll(Principal principal) {
        String user = principal.getName();
        return repository.findAllByEmployeesName(user).stream()
                .map((Department d) -> new DepartmentDTO(d, 1))
                .toList();
    }

    @GetMapping("/{id}")
    public Optional<DepartmentDTO> findById(@PathVariable("id") Long id) {
        return
                repository
                        .findById(id)
                        .map((Department d) -> new DepartmentDTO(d, 1));
    }
}
