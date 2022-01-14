import { AlunoService } from './../aluno.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit, OnDestroy {

  private subscriptions= new Subscription()

  constructor(private router:Router, private alunoService:AlunoService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.alunoService.consultar("").subscribe(console.log))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  async incluir(){
    await this.router.navigate(['/aluno/incluir']);
  }

  async alterar(){
    await this.router.navigate(['/aluno/alterar/1']);
  }

}
