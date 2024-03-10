package com.dj.restcontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dj.Model.Employee;
import com.dj.service.EmployeeService;

@RestController
public class EmployeeRestcontroller {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/save")
	public boolean employeeSave(Employee employee) {
		System.out.println(employee);
		return employeeService.employeeSave(employee);
	}
	
	@GetMapping("/get/{myString}")
	public Optional<Employee> getById(@PathVariable(value = "myString") String myString) {
		System.out.println("id "+myString);
		return employeeService.getById(myString);
	}
	
	@GetMapping("/getAll")
	public List<Employee> getAllEmployee() {
		return employeeService.getAllEmployee();
	}
	
	@PutMapping("/update/{myString}")
	public String updateEmployee(@RequestBody Employee employee, @PathVariable(value = "myString") String myString) {
		System.out.println("Employee "+employee);
//		System.out.println("id "+id);
		return employeeService.updateEmployee(employee, myString);
	}
	
	@DeleteMapping("/delete/{myString}")
	public boolean deleteById(@PathVariable(value = "myString") String myString) {
		return employeeService.deleteById(myString);
	}

}
