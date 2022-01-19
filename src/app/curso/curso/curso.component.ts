import { Subscription } from 'node_modules/rxjs';
import { CursoService } from './../curso.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Curso } from '../curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit, OnDestroy {
  cursos: Curso[] = [];
  cursoSelecionado: Curso;
  cursoIdSelecionado: number;

  private subscriptions = new Subscription();

  constructor(private router: Router, private cursoService: CursoService) {}

  get hasCursoIdSelecionado(): boolean {
    return this.cursoIdSelecionado !== undefined;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.cursoService.consultar('').subscribe((cursos) => {
        this.cursos = cursos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async incluir() {
    await this.router.navigate(['/curso/incluir']);
  }

  async alterar() {
    await this.router.navigate([
      '/curso/alterar',
      this.cursoSelecionado.codigo,
      this.cursoSelecionado.nome,
    ]);
  }

  onSelect($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.cursoIdSelecionado = parseInt(target.value, 10);
    this.cursoSelecionado = this.getCursoById(this.cursoIdSelecionado);
  }

  excluir() {
    this.subscriptions.add(
      this.cursoService.remover(this.cursoSelecionado).subscribe(() => {
        this.cursos = this.cursos.filter(
          (curso) => curso.codigo !== this.cursoSelecionado.codigo
        );
        this.cursoSelecionado = undefined;
        this.cursoIdSelecionado = undefined;
      })
    );
  }

  getCursoById(id: number): Curso {
    return this.cursos.find((c) => c.codigo === this.cursoIdSelecionado);
  }

  onSearch(value: string) {
    this.subscriptions.add(
      this.cursoService.consultar(value).subscribe((cursos) => {
        this.cursos = cursos;
      })
    );
  }
}
