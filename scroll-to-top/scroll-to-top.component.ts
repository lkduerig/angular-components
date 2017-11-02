import { Inject, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {

  @Input() scrollToTopVisible = false;

  constructor() { }

  ngOnInit() {
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
