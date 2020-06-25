import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  login(){
    if(this.username === 'sadmin'){
      if(this.password === 'sadmin'){
        this.route.navigate(['/sadmin/home']);
      }
    }
  }
  
}
    
      
    

