import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userData={
    email:'',
    password:''
  }
  resultMsg = {
    body:'',
    display:false,
    resultType:false
  }

  constructor(private router:Router,private _Http:HttpClient) { }

  ngOnInit() {
  }


  submitLogin(){
    this._Http.post('http://localhost:3200/login',this.userData).subscribe(
      
      data=>{
              this.resultMsg.display = true;
              if(data["result"] == "success"){
                  this.resultMsg.resultType = true;
                  this.resultMsg.body = data["message"];
                  localStorage.setItem('token',data['token']);
                  setTimeout(()=>{
                            this.router.navigate(['/dashboard']);
                  },1000)
                  window.scrollTo(0,0);
              }else{
                this.resultMsg.resultType = false;
                if(data["errors"])
                  this.resultMsg.body = data["errors"]["msg"];
                else
                  this.resultMsg.body = data["message"];
                  window.scrollTo(0,0);
                  
              }
              console.log(data);
      },

      err=>{
              console.log(err);
      }
    );

  }




}
