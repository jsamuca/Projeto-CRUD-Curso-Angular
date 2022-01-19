import { Aluno, AlunoService } from './../../aluno/aluno.service';
import { Matricula, MatriculaService } from './../matricula.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss'],
})
export class MatriculaComponent implements OnInit, OnDestroy {
  alunos: Aluno[] = [];
  matriculas: Matricula[] = [];
  matriculaSelecionada: Matricula;
  matriculaIdSelecionada: number;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private matriculaService: MatriculaService,
    private alunoService: AlunoService
  ) {}

  get hasMatriculaIdSelecionada(): boolean {
    return this.matriculaIdSelecionada !== undefined;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.alunoService.consultar('').subscribe((alunos) => {
        this.alunos = alunos;
      })
    );
    this.subscriptions.add(
      this.matriculaService.consultar('').subscribe((matriculas) => {
        this.matriculas = matriculas;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async incluir() {
    await this.router.navigate(['/matricula/incluir']);
  }
  excluir() {
    this.subscriptions.add(
      this.matriculaService.remover(this.matriculaSelecionada).subscribe(
        () => {
          this.matriculas = this.matriculas.filter(
            (matricula) => matricula.codigo !== this.matriculaSelecionada.codigo
          );
          this.matriculaSelecionada = undefined;
          this.matriculaIdSelecionada = undefined;
        },
        () => alert('Não foi possível excluir, tente novamente depois.')
      )
    );
  }

  onSelect($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.matriculaIdSelecionada = parseInt(target.value, 10);
    this.matriculaSelecionada = this.getMatriculaById(
      this.matriculaIdSelecionada
    );
  }

  getMatriculaById(id: number): Matricula {
    return this.matriculas.find(
      (c) => c.codigo === this.matriculaIdSelecionada
    );
  }

  onSearch(value: string) {
    this.subscriptions.add(
      this.matriculaService.consultar(value).subscribe((matriculas) => {
        this.matriculas = matriculas;
      })
    );
  }
}
