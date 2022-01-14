import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AlunoComponent } from './aluno/aluno/aluno.component';
import { CursoComponent } from './curso/curso/curso.component';
import { MatriculaComponent } from './matricula/matricula/matricula.component';
import { CursoManterComponent } from './curso/curso-manter/curso-manter.component';

import { HttpClientModule } from '@angular/common/http';
import { AlunoManterComponent } from './aluno/aluno-manter/aluno-manter.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    AlunoComponent,
    CursoComponent,
    MatriculaComponent,
    CursoManterComponent,
    AlunoManterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
