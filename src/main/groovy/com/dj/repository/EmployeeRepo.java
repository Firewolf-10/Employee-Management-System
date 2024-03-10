package com.dj.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dj.Model.Employee;

@Repository
public interface EmployeeRepo extends CrudRepository<Employee, Long>{
	
}
