import { stringToDate } from './../../shared/functions';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Matricula,
  MatriculaService,
} from 'src/app/matricula/matricula.service';
import { Curso, CursoService } from 'src/app/curso/curso.service';
import { Aluno, AlunoService } from 'src/app/aluno/aluno.service';

@Component({
  selector: 'app-matricula-manter',
  templateUrl: './matricula-manter.component.html',
  styleUrls: ['./matricula-manter.component.scss'],
})
export class MatriculaManterComponent implements OnInit {
  public matriculaForm: FormGroup;

  private subscriptions = new Subscription();
  private id: string;

  cursos: Curso[];
  alunos: Aluno[];

  constructor(
    private router: Router,
    private matriculaService: MatriculaService,
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private cursoService: CursoService
  ) {
    this.matriculaForm = formBuilder.group({
      alunoCodigo: '',
      cursos: formBuilder.array([]),
      curso: formBuilder.group({
        codigo: ['', Validators.required],
        dataInicio: ['', Validators.required],
      }),
    });
  }

  get cursosControl(): FormArray {
    return this.matriculaForm.get('cursos') as FormArray;
  }

  get cursoGrupo(): FormGroup {
    return this.matriculaForm.get('curso') as FormGroup;
  }

  get codigo(): AbstractControl {
    return this.cursoGrupo.get('codigo');
  }

  get dataInicio(): AbstractControl {
    return this.cursoGrupo.get('dataInicio');
  }

  get hasId(): boolean {
    return this.id !== undefined;
  }

  get actionText(): string {
    return this.hasId ? 'Alterar' : 'Incluir';
  }

  get isCursoValido(): boolean {
    return this.codigo.valid && this.dataInicio.valid;
  }

  get alunoCodigo(): AbstractControl {
    return this.matriculaForm.get('alunoCodigo');
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.alunoService.consultar('').subscribe((alunos) => {
        this.alunos = alunos;
      })
    );
    this.subscriptions.add(
      this.cursoService.consultar('').subscribe((cursos) => {
        this.cursos = cursos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  incluir() {
    const matricula: Matricula = {
      codigo: parseInt(this.alunoCodigo.value, 10),
      aluno: this.alunos.find(
        (a) => a.codigo === parseInt(this.alunoCodigo.value, 10)
      ),
      listaMatriculaCurso: this.cursosControl.value,
    };
    console.log(matricula);
    this.subscriptions.add(
      this.matriculaService.incluir(matricula).subscribe(async (response) => {
        await this.router.navigate(['/matricula']);
      })
    );
  }

  async voltar() {
    await this.router.navigate(['/matricula']);
  }

  changeDateFormat(date: Date): string {
    const dateString = date.toLocaleDateString('us').split('/');
    return `${dateString[2]}-${dateString[1]}-${dateString[0]}`;
  }

  excluirCurso(index: number) {
    this.cursosControl.removeAt(index);
  }

  adicionarCurso() {
    const curso = this.cursos.find(
      (c) => c.codigo === parseInt(this.codigo.value, 10)
    );
    const control = this.formBuilder.group({
      curso,
      dataMatriculaCurso: this.dataInicio.value,
      codigo: this.cursosControl.length,
    });
    this.cursosControl.push(control);
    this.cursoGrupo.reset();
  }
}
