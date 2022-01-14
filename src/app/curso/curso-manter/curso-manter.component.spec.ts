import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoManterComponent } from './curso-manter.component';

describe('CursoManterComponent', () => {
  let component: CursoManterComponent;
  let fixture: ComponentFixture<CursoManterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoManterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
