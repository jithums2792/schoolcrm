import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import   * as bcrypt from 'bcryptjs'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public username;
  public password;
  constructor(private route: Router) { }

  ngOnInit() {

  }
  async login(){
    if(this.username === 'sadmin' && this.password === 'sadmin'){
      localStorage.setItem('admin', this.password)
      this.route.navigate(['/sadmin/home']);
    }
  }
  
}
    
      
    

