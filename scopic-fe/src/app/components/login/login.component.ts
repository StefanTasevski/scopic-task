import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	ngOnInit() {
		if (sessionStorage.getItem('userData')) {
			this.router.navigate(['/']);
		}
	}

	login() {
		const login = this.userService.login(this.loginForm.value);
		this.success(login);
	}

	success(data) {
		if (data.code === 200) {
			sessionStorage.setItem('userData', JSON.stringify(data.data));
			this.router.navigate(['/home']);
		}
		else {
			this.loginForm = this.formBuilder.group({
				email: ['', [Validators.required]],
				password: ['', [Validators.required]]
			});
		}
	}

}