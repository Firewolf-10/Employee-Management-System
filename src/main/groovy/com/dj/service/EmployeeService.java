package com.dj.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dj.Model.Employee;
import com.dj.repository.EmployeeRepo;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	public boolean employeeSave(Employee employee) {
		try {
			employeeRepo.save(employee);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public Optional<Employee> getById(String id) {
		Long empid = Long.parseLong(id);
		return employeeRepo.findById(empid);
	}
	
	public List<Employee> getAllEmployee() {
		return (List<Employee>) employeeRepo.findAll();
	}
	
	public String updateEmployee(Employee employee, String id) {
		try {
			Long empid = Long.parseLong(id);
			Employee emp = employeeRepo.findById(empid).orElseThrow(() -> new Exception("Employee not exist with id: " + empid));

			emp.setFirstName(employee.getFirstName());
			emp.setLastName(employee.getLastName());
			emp.setDesignation(employee.getDesignation());
			emp.setPassword(employee.getPassword());
			emp.setSalary(employee.getSalary());

	        employeeRepo.save(emp);
			
			return "Employee updated Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "Employee not exist with id:" + id;
		}
	}
	
	public boolean deleteById(String id) {
		try {
			Long empid = Long.parseLong(id);
			employeeRepo.deleteById(empid);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
