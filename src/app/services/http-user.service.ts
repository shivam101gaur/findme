import { Injectable } from '@angular/core';
import { apiAddress } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  user_api_address: string = `${apiAddress}users/`



  constructor(private http: HttpClient) { }

  //📝 fetch all users 
  getAllUsers() {
    return this.http.get<[User]>(this.user_api_address);

  }

  //📝get user based upon name 
  getUserByName(name: string) {
    return this.http.get<[User]>(`${this.user_api_address}${name}`)
  }

  // 📝 get all users whoose id's are present in member's  array
  getUsersInList(members:string[]){
    // 🤪 using POST here instead of GET , to pass the body , which is not allowed in GET Method
    return this.http.post<User[]>(`${this.user_api_address}in/list`,{members})
  }

  //📝 post user 
  postUser(user: User) {
    return this.http.post<User>(`${this.user_api_address}`, user)
  }

  //📝 edit user 
  putUser(user: User) {
    return this.http.put<User>(`${this.user_api_address}/${user._id}`, user)
  }
  //📝 DELETE user 
  deleteUser(id: string) {
    return this.http.delete<User>(`${this.user_api_address}/${id}`)

  }
}
