import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaManterComponent } from './matricula-manter.component';

describe('MatriculaManterComponent', () => {
  let component: MatriculaManterComponent;
  let fixture: ComponentFixture<MatriculaManterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriculaManterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculaManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
