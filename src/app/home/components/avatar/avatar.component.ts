import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-male-sprites';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})


export class AvatarComponent implements OnInit {

  private seedValue!: string;

  @Input() set seed(value: string) {
    this.seedValue = value;
    var temp=true
    while(temp){

      setTimeout(() => {
        if(this.avat){

          this.createAvat()
          temp=false
        }
        
      }, 500);
    }
  }

  get seed(): string {

    return this.seedValue;

  }

  @ViewChild('avat') avat!: ElementRef



  constructor() { }
  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  createAvat() {
    const svg = createAvatar(style, {
      seed: this.seed,
      // ... and other options
    });
    this.avat.nativeElement.innerHTML = svg
  }

}
