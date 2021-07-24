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

  constructor(public music_controller: MusicControllerService, public router: Router, public activated_route: ActivatedRoute) { }

  ngOnInit() {
  }

  start_game() {
    this.game_on = true;
    this.controlWelcomeAnimation();
    this.music_controller.play_bgm()
  }

  // 📄 controlling the game title animation here
  controlWelcomeAnimation(callrepeat?: number) {

    setTimeout(() => {

      const title_div = document.getElementById("titleDiv");
      // 📄 adding and starting animation to title div
      title_div.classList.add('fade_in');
      
      // if HTML DIV with id="titleDiv" is loaded and found and then stored in title_div variable
      if (title_div) {

        (document as any).fonts.ready.then(() => {
          console.log('fonts loaded'); 
          //📄 inserting game title in DOM
          title_div.innerHTML = this.game_name;
        });

        // 📄 keeping track of when animation ends and then executing a callback fn
        title_div.addEventListener('animationend', () => {

          // 📄 removing animation class from title DIV
          // FIXME removing fade in class, brings back the white font color of title after animation!!
          // title_div.classList.remove('fade_in');

          // 📑 " welcome already completed " Flag in session storage
          sessionStorage.setItem('welcomeCompleted',"true"); 

          // 📄 routing to authentication module
          this.router.navigate(['../authentication'], { relativeTo: this.activated_route })

        })
      } 
      // keep trying till HTML div with id="titleDiv" is loaded n found
      else {
        // call itself till titleDiv is not loaded (max 5 times)
        (callrepeat < 5) ? this.controlWelcomeAnimation(callrepeat ?? 0 + 1) : console.error('titleDiv id not loaded/found')
      }
    });

  }








}
