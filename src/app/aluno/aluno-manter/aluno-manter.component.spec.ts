import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoManterComponent } from './aluno-manter.component';

describe('AlunoManterComponent', () => {
  let component: AlunoManterComponent;
  let fixture: ComponentFixture<AlunoManterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoManterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
