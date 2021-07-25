import { HttpClient } from '@angular/common/http';
import { Quote } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { apiAddress } from 'src/environments/environment';
import { World } from '../models/world.model';

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
    return this.http.get<[World]>(`${this.world_api_address}${name}`)
  }
  // 📝 get all worlds where a user is present
  getWorldByUserId(userId: string) {
    return this.http.get<[World]>(`${this.world_api_address}user/${userId}`)
  }

  // 📝 post a new world
  postWorld(world: World) {
    return this.http.post<World>(`${this.world_api_address}`, world)
  }
  // 📝 Update existing world 
  putWorld(worldId: string, world: World) {
    return this.http.put<World>(`${this.world_api_address}${worldId}`, world)
  }
  // 📝 delete a world by it's ID
  deleteWorld(worldId: string) {
    return this.http.delete<World>(`${this.world_api_address}${worldId}`)
  }


}
