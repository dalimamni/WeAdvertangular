import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-login-agencies',
  templateUrl: './login-agencies.component.html',
  styleUrls: ['./login-agencies.component.css']
})
export class LoginAgenciesComponent implements OnInit {
  loginForm = new FormGroup({
    

    email : new FormControl('', [Validators.required, Validators.maxLength(5)])

  })
  get name() { return this.loginForm.get('email'); }
  constructor(private service: MailService) { }

  ngOnInit(): void {
  }
  loginagencies(data:any){
    console.log(data);
    this.service.loginagencies(data);
  }
}
