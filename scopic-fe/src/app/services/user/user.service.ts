import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

	constructor() { }

	login(data){
		if (data.email === "admin" && data.password === "admin") {
			data.role = "ADMIN"
			return {
				code : 200,
				message : "Login Successful",
				data : data
			};
		}
		else if(data.email === "user" && data.password === "user"){
			data.role = "USER"
			return {
				code : 200,
				message : "Login Successful",
				data : data
			};
		}
		else{
			return {
				code : 503,
				message : "Invalid Credentials",
				data : null
			};
		}
	}
}