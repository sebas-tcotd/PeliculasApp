import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response.interface';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
})
export class SlideShowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];
  mySwiper: Swiper;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  onSlideNext() {
    this.mySwiper.slideNext();
  }
  onSlidePrev() {
    this.mySwiper.slidePrev();
  }
}
