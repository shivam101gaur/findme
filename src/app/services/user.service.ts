import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { apiAddress } from 'src/environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user_api_address:string = `${apiAddress}/users/`

  current_user = this.socket.fromEvent<any>('user');
 
  users = this.socket.fromEvent<User[]>('users');

  constructor(private socket:Socket,private http:HttpClient) { }

  //📝 fetch all users 
  getAllUsers(){
  return this.http.get<User>(this.user_api_address);

  }

 
  //📝get user based upon name 
  getUserByName(name:string){
    return this.http.get<User>(`${this.user_api_address}/${name}`)
  }

  //📝get user based upon id
  getUserById(id:string){
    return this.http.get<User>(`${this.user_api_address}/${id}`)
  }

  //📝 post user 
  postUser(user:User){
    return this.http.post<User>(`${this.user_api_address}`,user)
  }

  putUser(user:User){
    return this.http.put<User>(`${this.user_api_address}/${user._id}`,user)
  }

  deleteUser(id:string){
    return this.http.delete<User>(`${this.user_api_address}/${id}`)
    
  }

}


