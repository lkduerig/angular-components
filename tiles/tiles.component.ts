import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../core';
import { BREAKPOINTS } from '../../shared/constants';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})

export class TilesComponent implements OnInit {

  @Input()
  tiles: Card[] = [];

  // tiles column sizes based on screen sizes
  mediumColSize = 2;
  smallColSize = 1;
  largeColSize = 3;

  // used to control AM grid list's column size
  tilesColSize = this.largeColSize;

  constructor() { }

  ngOnInit() {
    this.adjustTileColSize(document.body.clientWidth);
  }

  /**
   * @desc Searches through the colors map and based on the order of the card
   *       the color is identified.
   * @param cardOrder: is the order of the card
   * @return Hex code color for the card.
   */
  findTileColor(cardOrder: number): string {
    // @TODO refactor this into more generic map and remove it into its own file.
    const colorsMap = {
      1: '#0f7575',
      2: '#9f2140',
      3: '#ff6b00',
      4: '#6a1b32',
      5: '#0f7575',
      6: '#320071',
      7: '#6a1b32'
    }

    const defaultColor = '#6a1b32';
    const colorMapCount = Object.keys(colorsMap).length;

    // while the order is not found in the map
    while (cardOrder > colorMapCount) {
      // e.g card's number is 22
      // the card number will be reduced every time by 7 (map's count)
      // ending up to be 1 and matched with color 1 in the colorsMap
      cardOrder = cardOrder - colorMapCount;
    }

    return colorsMap[cardOrder];
  }

  /**
   * @desc adjustTileColSize Fn readjust the tile's column size based on the screen width
   * @param width is the screen width
   */
  adjustTileColSize(screenWidth: number) {

    if (screenWidth < BREAKPOINTS.medium.max && screenWidth > BREAKPOINTS.small.max) {
      // screen size = medium
      this.tilesColSize = this.mediumColSize;
    } else if (screenWidth < BREAKPOINTS.small.max) {
      // screen size = size
      this.tilesColSize = this.smallColSize;
    } else {
      this.tilesColSize = this.largeColSize;
    }
  }

}
