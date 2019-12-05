import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisVisitadosPage } from './mais-visitados.page';

describe('MaisVisitadosPage', () => {
  let component: MaisVisitadosPage;
  let fixture: ComponentFixture<MaisVisitadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaisVisitadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaisVisitadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
