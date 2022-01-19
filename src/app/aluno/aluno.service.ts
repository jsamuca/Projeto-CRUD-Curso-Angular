import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Aluno {
  codigo: number;
  nome: string;
  dataNascimento: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private http: HttpClient) {}

  consultar(nome: string): Observable<any> {
    /*return this.http.get(
      'https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/consultar/' +
        nome
    );*/
    return of([
      {
        codigo: 1,
        nome: 'João',
        dataNascimento: '1994-03-02T00:00:00.000+0000',
      },
      {
        codigo: 2,
        nome: 'José',
        dataNascimento: '1996-03-02T00:00:00.000+0000',
      },
      {
        codigo: 3,
        nome: 'Maria',
        dataNascimento: '1996-03-03T00:00:00.000+0000',
      },
      {
        codigo: 4,
        nome: 'Carla',
        dataNascimento: '1996-03-04T00:00:00.000+0000',
      },
      {
        codigo: 5,
        nome: 'karina',
        dataNascimento: '1996-03-05T00:00:00.000+0000',
      },
      {
        codigo: 6,
        nome: 'Joana',
        dataNascimento: '1996-03-06T00:00:00.000+0000',
      },
      {
        codigo: 7,
        nome: 'Joaquim',
        dataNascimento: '1996-03-07T00:00:00.000+0000',
      },
      {
        codigo: 8,
        nome: 'Lais',
        dataNascimento: '1996-03-08T00:00:00.000+0000',
      },
    ]);
  }

  incluir(aluno: Aluno) {
    return this.http.post(
      'https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/incluir',
      aluno
    );
  }

  alterar(aluno: Aluno) {
    return this.http.patch(
      'https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/alterarparcial',
      aluno
    );
  }

  remover(aluno: Aluno) {
    return this.http.post(
      'https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/remover',
      aluno
    );
  }
}
