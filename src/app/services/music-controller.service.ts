import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class MusicControllerService {

  _Howler = Howler;
  sound_on: boolean = true;
  
  //storing current playing music here
  bgm_play_ref: any;

  //initializing background music
  bgm = new Howl(
    {
      autoplay: false,
      src: ['assets/music/aggressive-expansion.mp3'],
      sprite: {
        audible: [4000, 100000],
      }
    })



  constructor() { }

  //start the background music here
  play_bgm() {
    if (!this.bgm_play_ref) {
      this.bgm_play_ref = this.bgm.play('audible');
      this.bgm.once('play', function () {
        console.log('bgm playing')
        this.sound_on = true;
      })
    }

  }

  //mute/unmute the music playing in howler
  toggle_sound() {
    if (this.sound_on) {
      // this.bgm_play_ref.
      //stop track / mute sound
      // this._Howler.volume(0)
      // this._Howler.mute(true)
      this.bgm.pause(this.bgm_play_ref)
      this.sound_on = false;
    }
    else {
      //play track/unmute track
      // this._Howler.volume(1)
      // this._Howler.mute(false)
      this.bgm.play(this.bgm_play_ref)
      this.sound_on = true
    }
  }




}
