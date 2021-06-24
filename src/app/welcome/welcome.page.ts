import { Component, OnInit } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  game_name = "FIND-ME";
  game_on: boolean = false;
  show_game_name: boolean = true;

  sound_on: boolean = true;
  _Howler = Howler;
  bgm_play_ref: any;

  bgm = new Howl(
    {
      autoplay: false,
      src: ['assets/music/aggressive-expansion.mp3'],
      sprite: {
        audible: [4000, 100000],
      }
    })

  public get sound_btn(): string { return (this.sound_on) ? "volume_up" : "volume_off" }

  constructor() { }

  ngOnInit() {

    this.bgm.once('unlock', function () {
      // console.log('bgm unlocked calling start game()');
      // this.start_game();
    })
    this.bgm.on('playerror', function () {
      console.log('bgm play error')
    })

  }

  start_game() {
    this.game_on = true;
    this.setEventHandler()
    this.play_bgm();
  }
  setEventHandler(callrepeat?: number) {
    setTimeout(() => {
      let t_div = document.getElementById("titleDiv");

      t_div.classList.add('fade_in');
      if (t_div) {

        (document as any).fonts.ready.then(() => {
          console.log('fonts loaded'); t_div.innerHTML = this.game_name;

        });
        t_div.addEventListener('animationend', () => {
          console.log('animation ended');
          t_div.classList.remove('fade_in');
          this.show_game_name = false
          console.log('classes found' + t_div.classList.value);

        })
      } else {
        // call itself till titleDiv is not loaded (max 5 times)
        (callrepeat < 5) ? this.setEventHandler(callrepeat ?? 0 + 1) : console.error('titleDiv id not loaded/found')
      }
    });
  }

  play_bgm() {
    if (!this.bgm_play_ref) {
      this.bgm_play_ref = this.bgm.play('audible');
      this.bgm.once('play', function () {
        console.log('bgm playing')
        this.sound_on = true;
      })
    }

  }
  toggle_sound() {
    if (this.sound_on) {
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
