import { Aluno, AlunoService } from './../aluno.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'],
})
export class AlunoComponent implements OnInit, OnDestroy {
  alunos: Aluno[] = [];
  alunoSelecionado: Aluno;
  alunoIdSelecionado: number;

  private subscriptions = new Subscription();

  constructor(private router: Router, private alunoService: AlunoService) {}

  get hasAlunoIdSelecionado(): boolean {
    return this.alunoIdSelecionado !== undefined;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.alunoService.consultar('').subscribe((alunos) => {
        this.alunos = alunos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async incluir() {
    await this.router.navigate(['/aluno/incluir']);
  }

  async alterar() {
    await this.router.navigate([
      '/aluno/alterar',
      this.alunoIdSelecionado,
      this.alunoSelecionado.nome,
    ]);
  }

  excluir() {
    this.subscriptions.add(
      this.alunoService.remover(this.alunoSelecionado).subscribe(() => {
        this.alunos = this.alunos.filter(
          (aluno) => aluno.codigo !== this.alunoSelecionado.codigo
        );
        this.alunoSelecionado = undefined;
        this.alunoIdSelecionado = undefined;
      })
    );
  }

  onSelect($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.alunoIdSelecionado = parseInt(target.value, 10);
    this.alunoSelecionado = this.getAlunoById(this.alunoIdSelecionado);
  }

  getAlunoById(id: number): Aluno {
    return this.alunos.find((c) => c.codigo === this.alunoIdSelecionado);
  }

  onSearch(value: string) {
    this.subscriptions.add(
      this.alunoService.consultar(value).subscribe((alunos) => {
        this.alunos = alunos;
      })
    );
  }
}
