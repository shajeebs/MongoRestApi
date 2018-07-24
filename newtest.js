<h1>Accounts</h1>
<div>
  <table>
    <tr><th>AccountCode</th><th>AccountName</th><th>Description</th></tr>
    <tr *ngFor="let a of accounts"><td>{{a.AccountCode}}</td><td>{{a.AccountName}}</td><td>{{a.Description}}</td></tr>
  </table>
</div>
 
 
import { Component, OnInit } from '@angular/core';
import { DataService }  from '../../services/data.service';
 
import { Account } from '../../models/account';
 
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts:Account[];
 
  constructor(private ds:DataService) { }
 
  ngOnInit() {
    this.ds.getAccounts().subscribe((acts)=>{
      this.accounts = acts;
    });
  }
 
}
 
 
 
//--------------------
 
 
<h1>Posts</h1>
<div>
  <table><tr><th>Id</th><th>UserId</th><th>Title</th></tr>
    <tr *ngFor="let p of posts"><td>{{p.id}}</td><td>{{p.userId}}</td><td>{{p.title}}</td></tr>
  </table>
</div>
import { Component, OnInit } from '@angular/core';
import { DataService }  from '../../services/data.service';
 
import { Post } from '../../models/post';
 
@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  posts:Post[];
 
  constructor(private ds:DataService) {
   
   }
 
  ngOnInit() {
      this.ds.getPosts().subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
    });
  }
 
}
 
// interface Post{
//   id:number,
//   title:string,
//   body:string,
//   userId:number
// }
//-----------------
<p> Hello World...!</p>
<h1>{{name}}</h1>
<ul>
  <li>Age: {{age}}</li>
  <li>Email: {{email}}</li>
  <li>Address: {{address.street}}, {{address.city}}, {{address.state}}</li>
</ul>
<button (click)="onClick()">Click Me</button>
<button (click)="toggleEdit()">Show User Edit</button>
<div *ngIf=isEdit>
  <h1>Edit User</h1>
  <form>
    <span>
      <label for="name">Name: </label>
      <input type="text" [(ngModel)]="name" name="name">
    </span>
    <span>
      <label for="age">Age: </label>
      <input type="number" [(ngModel)]="age" name="age">
    </span>
    <span>
      <label for="email">Email: </label>
      <input type="text" [(ngModel)]="email" name="email">
    </span>
    <span>
      <label for="street">Street: </label>
      <input type="text" [(ngModel)]="address.street" name="street">
    </span>
    <span>
      <label for="city">City: </label>
      <input type="text" [(ngModel)]="address.city" name="city">
    </span>
    <span>
      <label for="state">State: </label>
      <input type="text" [(ngModel)]="address.state" name="state">
   </span>
  </form>
</div>
 
<h1>Hobbies</h1>
<form (submit)="addHobby(hobby.value)">
  <span>
    <label for="hobby"> Hobby: </label>
    <input type="text" #hobby>
  </span>
</form>
<ul>
  <li *ngFor="let hobby of hobbies; let i=index">
    {{i}}: {{hobby}} <button (click)="deleteHobby(hobby)">X</button>
    </li>
</ul>
 
import { Component, OnInit } from '@angular/core';
// import { DataService }  from '../../services/data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address:Address;
  hobbies:string[];
  isEdit:boolean = false;
 
  constructor() { //private dataService:DataService
    console.log('User Contructor ran...!');
  }
 
  ngOnInit() {
    console.log('ngOnInit ran...!');
    this.name='Bobby';
    this.age=34;
    this.email='almuhasiba@gmail.com';
    this.address={
      street:'No 1233',
      city:'Palakkad',
      state:'Kerala'
    }
    this.hobbies=['Reading', 'Outdoor games', 'Coding', 'Listening classes'];
   
}
 
  onClick(){
    console.log('Clicked Me....');
  }
//https://www.youtube.com/watch?v=KhzGSHNhnbI
  addHobby(hobby){
    //console.log('Passed value....'+hobby);
    this.hobbies.push(hobby);
    return false;
  }
 
  deleteHobby(hobby){
    for(let i=0; i< this.hobbies.length; i++){
      if(this.hobbies[i] == hobby){
        this.hobbies.splice(i, 1);
      }
    }
  }
  toggleEdit(){
    this.isEdit = !this.isEdit;
  }
}
 
interface Address{
  street:string,
  city:string,
  state:string
}
 
//--------------
/models/account.cs
export interface Account{
    AccountClassId : string,
    ParentAccountId : string,
    DrOrCrSide  :  number
    CompanyId : string,
    AccountCode : string,
    AccountName : string,
    Description : string,
    IsCash :  boolean,
    IsContraAccount :boolean,
    //TODO: Balance  :  { type:Number },
    //TODO: DebitBalance  :  { type:Number },
    //TODO: CreditBalance :  { type:Number },
    //TODO: TotalBalance  :  { type:Number }, GetTotalBalance()
    //TODO: TotalDebitBalance   :  { type:Number },GetTotalDebit()
    //TODO: TotalCreditBalance  :  { type:Number },GetTotalCredit()
    //TODO: ChildAccounts  :  { type:Number },
};
 
 
// export class Book {
//    id: number;
//    name: string;
//    constructor() {
//    }
// }
export interface Post{
  id:number,
  title:string,
  body:string,
  userId:number
}
 
//--------------------
/services/data.services.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {
 
  constructor(public http:Http) {
        console.log('Data Services connected...!');
  }
 
  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
    .map(res => res.json());
  }
 
  savePosts(posts){
    return this.http.post('https://jsonplaceholder.typicode.com/posts', posts).subscribe();
  }
 
  getAccounts(){
    return this.http.get('http://localhost:3000/Account')
    .map(res => res.json());
  }
 
}
 
//------------------app.component.html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <span><h3>
    Welcome to {{title}}!
  </h3></span>
  <!--<span>
  <img width="30" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNTAgMjUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAgMjUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojREQwMDMxO30NCgkuc3Qxe2ZpbGw6I0MzMDAyRjt9DQoJLnN0MntmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTI1LDMwIDEyNSwzMCAxMjUsMzAgMzEuOSw2My4yIDQ2LjEsMTg2LjMgMTI1LDIzMCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMjUsMzAgMTI1LDUyLjIgMTI1LDUyLjEgMTI1LDE1My40IDEyNSwxNTMuNCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAxMjUsMzAgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjUsNTIuMUw2Ni44LDE4Mi42aDBoMjEuN2gwbDExLjctMjkuMmg0OS40bDExLjcsMjkuMmgwaDIxLjdoMEwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMQ0KCQlMMTI1LDUyLjF6IE0xNDIsMTM1LjRIMTA4bDE3LTQwLjlMMTQyLDEzNS40eiIvPg0KPC9nPg0KPC9zdmc+DQo=">
  </span>-->
</div>
<!--<app-user></app-user>-->
<ul>
  <li> <a routerLink="/">User</a></li>
  <li> <a routerLink="/about">About</a></li>
  <li> <a routerLink="/blogpost">Blog Posts</a></li>
  <li> <a routerLink="/account">Accounts</a></li>
</ul>
<router-outlet></router-outlet>
 
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
 
 
 
//-------------app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
 
import { DataService } from './services/data.service';
import { AboutComponent } from './components/about/about.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { AccountComponent } from './components/account/account.component';
 
const appRoutes: Routes = [
  {path:'', component:UserComponent },
  {path:'about', component:AboutComponent },
  {path:'blogpost', component:BlogpostComponent },
  {path:'account', component:AccountComponent },
];
 
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    BlogpostComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }