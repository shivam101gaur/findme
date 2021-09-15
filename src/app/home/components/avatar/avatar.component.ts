import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-male-sprites';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})


export class AvatarComponent implements OnInit {

  private seedValue: string = 'rick';

  @Input() set seed(value: string) {
    this.seedValue = value;
    this.createAvat()
  }

  get seed(): string {

    return this.seedValue;

  }

  @ViewChild('avat',{ static:true }) avat!: ElementRef



  constructor() { }
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.createAvat()
  }

  createAvat() {
    const svg = createAvatar(style, {
      seed: this.seed,
      // ... and other options
    });
    this.avat.nativeElement.innerHTML = svg
  }

}
