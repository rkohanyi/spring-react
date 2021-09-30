package com.example.demo.dto;

import com.example.demo.model.Department;
import com.example.demo.model.Employee;

import java.util.ArrayList;
import java.util.List;

public class EmployeeDTO {

    private Long id;
    private String name;
    private List<DepartmentDTO> departments;

    public EmployeeDTO(Employee e, int depth) {
        this.id = e.getId();
        this.name = e.getName();
        if (depth > 0) {
            this.departments = e.getDepartments()
                    .stream()
                    .map(d -> new DepartmentDTO(d, depth - 1))
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

    public List<DepartmentDTO> getDepartments() {
        return departments;
    }

    public void setDepartments(List<DepartmentDTO> departments) {
        this.departments = departments;
    }
}
