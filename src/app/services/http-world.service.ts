import { HttpClient } from '@angular/common/http';
import { Quote } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { apiAddress } from 'src/environments/environment';
import { Message, World } from '../models/world.model';

@Injectable({
  providedIn: 'root'
})
export class HttpWorldService {

  world_api_address: string = `${apiAddress}worlds/`

  constructor(private http: HttpClient) { }

  // 📝 get all worlds 
  getAllWorlds() {
    return this.http.get<[World]>(this.world_api_address);
  }
  // 📝 get world by world name
  getWorldByName(name: string) {
    return this.http.get<World>(`${this.world_api_address}${name}`)
  }
  // 📝 get all worlds where a user is present / is a member of that world
  getWorldByUserId(userId: string) {
    return this.http.get<[World]>(`${this.world_api_address}member/${userId}`)
  }
  // 📝❌ get all worlds where a user is not present / is not a member of that world
  getNewWorldForUserByUserId(userId: string) {
    return this.http.get<[World]>(`${this.world_api_address}notamember/${userId}`)
  }

  // 📝 post a new world
  postWorld(world: World) {
    return this.http.post<World>(`${this.world_api_address}`, world)
  }
  // 📝 Update existing world 
  putWorld(worldId: string, world: World) {
    return this.http.put<World>(`${this.world_api_address}${worldId}`, world)
  }

  // add new  member to existing world
  addMembersToWorld(members: string[], worldId: string) {
    return this.http.put<World>(`${this.world_api_address}addmember/${worldId}`, { members })
  }
  //remove user from world 
  removeUserFromWorld(worldId: string, userId: string) {
    return this.http.delete<World>(`${this.world_api_address}removemember/${worldId}/${userId}`)
  }
  // 📝 delete a world by it's ID
  deleteWorld(worldId: string) {
    return this.http.delete<World>(`${this.world_api_address}${worldId}`)
  }

  deleteMessage(worldId: string, messageId: string) {
    return this.http.delete<World>(`${this.world_api_address}message/${worldId}/${messageId}`)
  }

  postMessage(worldId:string,message:Message){
    return this.http.post<World>(`${this.world_api_address}postmessage/${worldId}`,message)
  }


}
