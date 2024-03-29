// Main Js file
$(document).ready(function() {
	bindHomePageEvents();
	
    $('.nav-link').off('click').on('click',function(){
		$('.nav-link').removeClass('active');
		$(this).addClass('active');
		let elementIndex = $(this).html()
		if(elementIndex == "Home"){
			$('.editEmployeePage').hide();
			$('.addEmployeePage').hide();
			$('.homePage').show();
			bindHomePageEvents();
		}
		if(elementIndex == "ADD EMPLOYEE"){
			$('.addEmployeePage').show();
			$('.homePage').hide();
			$('.editEmployeePage').hide();
			bindAddEmployeePageEvents();
		}
	});
});

function bindHomePageEvents(){
	$.get('/getAll', function (data) { 
    	console.log(data);
    	$('.employeeTbody').html('');
    	let tbody = $('.employeeTbody');
        for(let i = 0; i < data.length; i++) {
			let obj = data[i];
			let index = i+1;
			let tr = '<tr><td scope="row" style="display:none">'+obj.id+'</td><td>'+index+'</td><td>'+obj.firstName+'</td><td>'+obj.lastName+'</td><td>'+obj.designation+'</td><td>'+obj.password+'</td><td>'+obj.salary+'</td><td>'+obj.department+'</td>'
			+'<td><button type="button" class="btn btn-primary emp-update m-2">Update</button><button type="button" class="btn btn-danger emp-delete m-2">Delete</button></td></tr>'
			tbody.append(tr);
		}
    });
    
    $('.Employee-table').off('click').on('click','.emp-update',function(){
	     $('.addEmployeePage').hide();
		 $('.homePage').hide();
		 $('.editEmployeePage').show();
		 let myid = $(this).parent().parent().children().eq(0).html(); 
		 
		$.get('/get/'+myid, function (data) {
			console.log(data);
			$('#employee-id').html(data.id);
			$('#emp-edit-FirstName').val(data.firstName);
			$('#emp-edit-LastName').val(data.lastName);
			$('#emp-edit-Designation').val(data.designation);
			$('#emp-edit-Salary').val(data.salary);
			$('#emp-edit-Department').val(data.department);
			$('#emp-edit-password').val(data.password);
		});
		 
	});
	
	$('#employee-table-edit').off('click').on('click','.emp-delete',function(){
		 $(this).parent().parent().remove();
		 let id = $(this).parent().parent().children().eq(0).html();
	     $.ajax({
		    url: "/delete/" + id,
		    type: "DELETE",
		    success: function(data) {
		        console.log(data);
		        $('.nav-link').eq(0).trigger('click');
		    },
		    error: function() {
		    }
		});
	});
	
	$('#addEmployee').off('click').on('click',function(){
		
		let firstName = $('#empFirstName').val();
		let lastName = $('#empLastName').val();
		let designation = $('#empDesignation').val();
		let salary = $('#empSalary').val();
		let department = $('#empDepartment').val();
		let password = $('#emppassword').val();
		
		$.post('/save',   // url
		{ firstName : firstName, lastName : lastName, designation : designation, salary : salary, department : department, password : password  }, // data to be submit
		   function(data, status, jqXHR) {// success callback
		      console.log(data);
		      $('.nav-link').eq(0).trigger('click');
		})    
	});
	
	$('#employee-update').off('click').on('click',function(){
		
		let firstName = $('#emp-edit-FirstName').val();
		let lastName = $('#emp-edit-LastName').val();
		let designation = $('#emp-edit-Designation').val();
		let salary = $('#emp-edit-Salary').val();
		let department = $('#emp-edit-Department').val();
		let password = $('#emp-edit-password').val();
		
		let myid = $('#employee-id').html();
		let jsondata = {firstName : firstName, lastName : lastName, designation : designation, salary : salary, department : department, password : password};
		
		$.ajax({
		    url: "/update/"+myid,
		    type: "PUT",
		    data: jsondata,
		    success: function(data) {
		        console.log(data);
		        $('.nav-link').eq(0).trigger('click');
		    },
		    error: function() {
		    }
		});
		
		/*$.post('/update/'+myid,   // url
		{ firstName : firstName, lastName : lastName, designation : designation, salary : salary, department : department, password : password  }, // data to be submit
		   function(data, status, jqXHR) {// success callback
		      console.log(data);
		      $('.nav-link').eq(0).trigger('click');
		}) */   
	});
	
	
		
}

function bindAddEmployeePageEvents(){
	$('#empFirstName').val('');
	$('#empLastName').val('');
	$('#empDesignation').val('');
	$('#empSalary').val('');
	$('#empDepartment').val('');
	$('#emppassword').val('');
}