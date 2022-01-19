import { CursoService } from './../curso.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { stringToDate } from 'src/app/shared/functions';

@Component({
  selector: 'app-curso-manter',
  templateUrl: './curso-manter.component.html',
  styleUrls: ['./curso-manter.component.scss'],
})
export class CursoManterComponent implements OnInit, OnDestroy {
  public cursoForm: FormGroup;

  private subscriptions = new Subscription();
  private id: string;

  constructor(
    private router: Router,
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.cursoForm = formBuilder.group({
      codigo: '',
      nome: '',
      cargaHoraria: '',
      dataInicio: '',
      instrutor: '',
      local: '',
    });
  }

  get hasId(): boolean {
    return this.id !== undefined;
  }

  get actionText(): string {
    return this.hasId ? 'Alterar' : 'Incluir';
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe(({ id, nome }) => {
        if (id !== undefined) {
          this.id = id;

          this.subscriptions.add(
            this.cursoService.consultar(nome).subscribe((curso) => {
              if (curso.length) {
                const c = curso.find((c) => c.codigo === parseInt(this.id, 10));
                this.cursoForm.setValue(c);
                this.cursoForm
                  .get('dataInicio')
                  .setValue(this.changeDateFormat(new Date(c.dataInicio)));
                console.log(this.changeDateFormat(new Date(c.dataInicio)));
              }
            })
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  incluir() {
    this.subscriptions.add(
      this.cursoService
        .incluir(
          Object.assign(this.cursoForm.value, {
            dataNascimento: stringToDate(this.cursoForm.value.dataNascimento),
          })
        )
        .subscribe(async (response) => {
          await this.router.navigate(['/curso']);
        })
    );
  }

  alterar() {
    this.subscriptions.add(
      this.cursoService
        .alterar(
          Object.assign(this.cursoForm.value, {
            dataNascimento: stringToDate(this.cursoForm.value.dataNascimento),
          })
        )
        .subscribe(async (response) => {
          await this.router.navigate(['/curso']);
        })
    );
  }
  async voltar() {
    await this.router.navigate(['/curso']);
  }

  changeDateFormat(date: Date): string {
    const dateString = date.toLocaleDateString('us').split('/');
    return `${dateString[2]}-${dateString[1]}-${dateString[0]}`;
  }
}
