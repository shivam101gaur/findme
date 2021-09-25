import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class MusicControllerService {

  _Howler = Howler;
  sound_on: boolean = false;
  
  //storing current playing music here
  bgm_play_ref: any;

  //initializing background music
  bgm = new Howl(
    {
      autoplay: false,
      src: ['assets/music/AltoAdventure.mp3'],
      sprite: {
        audible: [4000, 100000],
      }
    })



  constructor() { 
    this.bgm.on("play", ()=>{

      this.sound_on = true
      console.log('bgm playing')
    })
    this.bgm.on("pause", ()=>{

      this.sound_on = false
      console.log('bgm paused')
    })
  }

  //start the background music here
  play_bgm() {
    if (!this.bgm_play_ref) {
      this.bgm_play_ref = this.bgm.play('audible');
    }

  }

  //mute/unmute the music playing in howler
  toggle_sound() {
    if(!this.bgm_play_ref){
     this.play_bgm()
     return

    }
    if (this.sound_on) {
      // this.bgm_play_ref.
      //stop track / mute sound
      // this._Howler.volume(0)
      // this._Howler.mute(true)
      this.bgm.pause(this.bgm_play_ref)

    }
    else {
      //play track/unmute track
      // this._Howler.volume(1)
      // this._Howler.mute(false)
      this.bgm.play(this.bgm_play_ref)

    }
  }




}
