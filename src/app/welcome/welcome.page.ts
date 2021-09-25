import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Vara from 'vara';
import { MusicControllerService } from '../services/music-controller.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  game_name = "FIND-ME";
  game_on: boolean = false;

  public get sound_btn(): string { return (this.music_controller.sound_on) ? "volume_up": "volume_off"}

  constructor(public music_controller: MusicControllerService, public router: Router, public activated_route: ActivatedRoute) { }

  ngOnInit() {

  }

  start_game() {
    
    // document.getElementById('maincontainer').requestFullscreen().then(()=>{
    //   console.log('entered full screen');
    // })
    this.game_on = true;
    this.controlWelcomeAnimation();
    this.music_controller.play_bgm()
  }

  // 📄 controlling the game title animation here
  controlWelcomeAnimation(callrepeat?: number) {
   
    // Check Animation Fonts => https://github.com/akzhy/Vara/tree/master/fonts
    // shadowsIntoLightFont.json
    // ParisienneFont.json
    // SatisfySLFont.json
    // PacificoSLOFont.json
    const sigAnime = new Vara("#signatureContainer", "/assets/shadowsIntoLightFont.json", [
      {
        text: `. . . .shivamgaur`,
        color: "white",
        duration: 2000,
        id: "name",
        autoAnimation: false,
      }
    ], {
      fontSize: 20,
      strokeWidth: 3
    });


    setTimeout(() => {

      const title_div = document.getElementById("titleDiv");

      // if HTML DIV with id="titleDiv" is loaded and found and then stored in title_div variable
      if (title_div) {

        // 📄 adding and starting animation to title div
        title_div.classList.add('fade_in');

        (document as any).fonts.ready.then(() => {
          console.log('fonts loaded');
          //📄 inserting game title in DOM
          title_div.innerHTML = this.game_name;
        });

        // 📄 keeping track of when animation ends and then executing a callback fn
        title_div.addEventListener('animationend', () => {

          sigAnime.ready(() => {
            sigAnime.playAll()
          })
          sigAnime.playAll()
          sigAnime.animationEnd(() => {
            setTimeout(() => {
              title_div.classList.add('fade_out');
              setTimeout(() => {
                // 📑 " welcome already completed " Flag in session storage
                sessionStorage.setItem('welcomeCompleted', "true");
                this.router.navigate(['../authentication'], { relativeTo: this.activated_route })
              }, 2000);

            }, 1500);
          })
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
