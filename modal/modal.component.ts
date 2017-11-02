import { LocalizedString } from './../i18n/i18n.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ContentfulService } from './../../core/contentful/contentful.service';
import { CategoryGroup, Card } from './../../core/contentful';
import { CategoriesService } from './../../core/categories';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalContent: ModalContent;
  @Input() modalIsVisible = false;
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    if (this.modalIsVisible) {
      this.openDialog(this.modalContent);
    }
  }

  openDialog(modalContent) {

    const dialogRef = this.dialog.open(ModalContentComponent, {
      width: '730px'
    });

    dialogRef.componentInstance.modalContent = modalContent;

    dialogRef.afterClosed().subscribe(res => this.modalClosed.emit(true));
  }
}

@Component({
  selector: 'app-modal-content',
  templateUrl: 'modal-content.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalContentComponent implements OnInit {
  @Input() modalContent: ModalContent;

  constructor(
    public dialogRef: MdDialogRef<ModalContentComponent>, private router: Router, private contentfulService: ContentfulService,
    private categoriesService: CategoriesService, private translate: TranslateService
  ) { }

  ngOnInit() {
    if (this.modalContent.type === 'Error') {
      // removes query params when when closed
      const currentUrlWithoutParams = this.router.url.split('?')[0];
      this.dialogRef.afterClosed().subscribe(() => {
        this.router.navigate([currentUrlWithoutParams]);
      });
    }
  }

  /**
   * @desc navigateToCardLinkedContent Fn navigates the user to the card's linked
   *       content. Depending on the card type the destination varies. RequestCards
   *       typically lead to a categoryGroup, FAQCard leads to faqs page.
   */
  navigateToCardLinkedContent() {
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.modalContent.type === 'RequestCard') {
        this.contentfulService.findCategoryGroup(this.modalContent.id).subscribe((group: CategoryGroup) => {
          this.categoriesService.updateCurrentCategoryGroup(group);
          this.router.navigate(['categoryGroup', group.id]);
          window.scrollTo(0, 0); // normalise the viewport
        });
      } else if (this.modalContent.type === 'FAQCard') {
        this.router.navigate(['faqs']);
        window.scrollTo(0, 0); // normalise the viewport
      }
    });
  };


  /**
   * @desc navigateToExternalLink Fn redirect user to another page outside the portal.
   * @param externalLink the link to be redirected to.
   */
  navigateToExternalLink(externalLink: LocalizedString) {
    if (externalLink[this.translate.currentLang]) {
      window.location.href = externalLink[this.translate.currentLang];
    }
  }

}

export interface ModalContent {
  id?: string;
  group?: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  type: 'GeneralCard' | 'FAQCard' | 'RequestCard' | 'Error';
  url?: LocalizedString;
}
