import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdDialogModule } from '@angular/material'; // @todo this came up with debug, don't know if it belongs here or not.
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FakeLoader } from '../';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdDialogModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        }),
      ], // @todo same as above.
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
