package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.model.Department;
import com.example.demo.model.Employee;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    @GetMapping("")
    public List<EmployeeDTO> findAll() {
        return repository
                .findAll()
                .stream()
                .map((Employee e) -> new EmployeeDTO(e, 0))
                .toList();
    }

    @GetMapping("/{id}")
    public Optional<EmployeeDTO> findById(@PathVariable("id") Long id) {
        return
                repository
                        .findById(id)
                        .map((Employee e) -> new EmployeeDTO(e, 1));
    }
}
