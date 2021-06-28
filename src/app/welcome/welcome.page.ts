import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicControllerService } from '../services/music-controller.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  game_name = "FIND-ME";
  game_on: boolean = false;


  
  
  



  public get sound_btn(): string { return (this.music_controller.sound_on) ? "volume_up" : "volume_off" }

  constructor(public music_controller:MusicControllerService,public router:Router,public activated_route:ActivatedRoute) { }

  ngOnInit() {

  }

  start_game() {
    this.game_on = true;
    this.setEventHandler();
    this.music_controller.play_bgm()
  }

  //controlling the game title animation here
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
          // t_div.classList.remove('fade_in');
          
          this.router.navigate(['../authentication'],{relativeTo:this.activated_route})
          
          

        })
      } else {
        // call itself till titleDiv is not loaded (max 5 times)
        (callrepeat < 5) ? this.setEventHandler(callrepeat ?? 0 + 1) : console.error('titleDiv id not loaded/found')
      }
    });
  }

  
  
  




}
