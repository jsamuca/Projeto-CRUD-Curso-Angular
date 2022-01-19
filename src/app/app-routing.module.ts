import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { CursoComponent } from './curso/curso/curso.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AlunoComponent } from './aluno/aluno/aluno.component';
import { MatriculaComponent } from './matricula/matricula/matricula.component';
import { NgModule } from '@angular/core';
import { CursoManterComponent } from './curso/curso-manter/curso-manter.component';
import { AlunoManterComponent } from './aluno/aluno-manter/aluno-manter.component';
import { MatriculaManterComponent } from './matricula/matricula-manter/matricula-manter.component';

const routes: Routes = [
  {
    path: 'curso',
    children: [
      {
        path: 'incluir',
        component: CursoManterComponent,
      },
      {
        path: 'alterar/:id/:nome',
        component: CursoManterComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CursoComponent,
      },
    ],
  },

  {
    path: 'layout',
    component: LayoutComponent,
    pathMatch: 'full',
  },

  {
    path: 'aluno',
    children: [
      {
        path: 'incluir',
        component: AlunoManterComponent,
      },
      {
        path: 'alterar/:id/:nome',
        component: AlunoManterComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: AlunoComponent,
      },
    ],
  },

  {
    path: 'matricula',
    children: [
      {
        path: 'incluir',
        component: MatriculaManterComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: MatriculaComponent,
      },
    ],
  },

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
