import { Component,OnInit } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
export const API_URL='http://localhost:3000/';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-aync-await';
  name='Angular'
  employees: Array<Employee>;

    constructor(private employeeService:EmployeeService)
    {

    }

    ngOnInit(): void
    {
        this.getEmployees();
    }

    getEmployees()
    {
        let url=API_URL+'employees';
        this.employeeService.getEmployees(url).subscribe(
            data=>
            {
                this.employees=data;
            },
            error1 =>
            {
                console.log('Error');
            }
        )
    }

    employeesAvailable()
    {
        return this.employees!=undefined;
    }

    async createEmployee()
    {
        let url = API_URL + 'employees';
        let employee = new Employee();
        employee.id = Math.floor(Math.random() * 10000);
        employee.firstName = "John";
        employee.lastName = "McCain" + employee.id;

        let createdEmployee=await this.employeeService.createEmployee(url, employee);
        console.log('Created Employee: '+createdEmployee);
        this.getEmployees();
    }
}
