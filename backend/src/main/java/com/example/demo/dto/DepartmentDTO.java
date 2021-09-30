package com.example.demo.dto;

import com.example.demo.model.Department;
import com.example.demo.model.Employee;

import java.util.ArrayList;
import java.util.List;

public class DepartmentDTO {

    private Long id;
    private String name;
    private List<EmployeeDTO> employees;

    public DepartmentDTO(Department d, int depth) {
        this.id = d.getId();
        this.name = d.getName();
        if (depth > 0) {
            this.employees = d.getEmployees()
                    .stream()
                    .map(e -> new EmployeeDTO(e, depth - 1))
                    .toList();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<EmployeeDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeDTO> employees) {
        this.employees = employees;
    }
}
