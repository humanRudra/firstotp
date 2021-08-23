
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  public submitted: boolean = false;
  mobile: any;
  otp: string;


  constructor(private fb: FormBuilder,
    private router: Router) { }

  login = this.fb.group({
    mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });

  verifylogin = this.fb.group({
    otp: ['']
  });

  ngOnInit() {
  }
  //get all formControls
  get f() {
    return this.login.controls;
  }

  //get login form input
  getOtp() {
    if (!this.login.invalid) {
      // console.log(this.login.value)
      this.mobile = this.login.value.mobileNumber
      this.submitted = true;
      this.otp = this.generateOTP();
    }
    else {
      alert('InValid Data');
    }
  }
  generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  
  verifyOtp() {
    console.log(this.verifylogin.value)
    if (this.verifylogin.value.otp === this.otp) {
      alert("Welcome to login");
      this.login.reset();
      this.verifylogin.reset();
      this.submitted = false;
    
    } else {
      alert("Invalid OTP");
    }
  }
}
