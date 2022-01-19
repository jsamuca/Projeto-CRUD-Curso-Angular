import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Curso{
  codigo: number;
  nome: string;
  cargaHoraria:	number;
  dataInicio:	Date;
  instrutor: string;
  local: string;

}

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(
    private http: HttpClient
  ) { }

    consultar(nome: string): Observable<Curso[]>
  {
    return this.http.get<Curso[]>(`https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/curso/consultar/${nome}`); 
  }

    incluir(curso: Curso)
    {
      return this.http.post("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/curso/incluir", curso); 
    }

    alterar(curso: Curso)
    {
      return this.http.patch("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/curso/alterarparcial", curso); 
    }

    remover(curso: Curso)
    {
      return this.http.post("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/curso/remover", curso); 
    }

}
