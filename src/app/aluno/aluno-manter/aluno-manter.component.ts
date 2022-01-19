import { stringToDate } from './../../shared/functions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/aluno/aluno.service';

@Component({
  selector: 'app-aluno-manter',
  templateUrl: './aluno-manter.component.html',
  styleUrls: ['./aluno-manter.component.scss'],
})
export class AlunoManterComponent implements OnInit {
  public alunoForm: FormGroup;

  private subscriptions = new Subscription();
  private id: string;

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.alunoForm = formBuilder.group({
      codigo: '',
      nome: '',
      dataNascimento: '',
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
            this.alunoService.consultar(nome).subscribe((aluno) => {
              if (aluno.length) {
                const c = aluno.find((c) => c.codigo === parseInt(this.id, 10));
                this.alunoForm.setValue(c);
                this.alunoForm
                  .get('dataNascimento')
                  .setValue(this.changeDateFormat(new Date(c.dataNascimento)));
                console.log(this.changeDateFormat(new Date(c.dataNascimento)));
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
      this.alunoService
        .incluir(
          Object.assign(this.alunoForm.value, {
            dataNascimento: stringToDate(this.alunoForm.value.dataNascimento),
          })
        )
        .subscribe(async (response) => {
          await this.router.navigate(['/aluno']);
        })
    );
  }

  alterar() {
    this.subscriptions.add(
      this.alunoService
        .alterar(
          Object.assign(this.alunoForm.value, {
            dataNascimento: stringToDate(this.alunoForm.value.dataNascimento),
          })
        )
        .subscribe(async (response) => {
          await this.router.navigate(['/aluno']);
        })
    );
  }
  async voltar() {
    await this.router.navigate(['/aluno']);
  }

  changeDateFormat(date: Date): string {
    const dateString = date.toLocaleDateString('us').split('/');
    return `${dateString[2]}-${dateString[1]}-${dateString[0]}`;
  }
}
