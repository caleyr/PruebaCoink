import { HttpParams } from '@angular/common/http';
import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Character } from '../../../../models/Character';
import { CharapterService } from '../../../../services/charapter.service';

@Component({
  selector: 'app-list-charapter',
  templateUrl: './list-charapter.component.html',
  styleUrls: ['./list-charapter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListCharapterComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Especie', 'Tipo'];
  listSelected: Character[] = [];

  color = '#00493f'

  cantidad: number;
  pageIndex: number = 1;
  pageSize: number = 20;


  name: string;
  type: string;

  constructor(
    private charapterService: CharapterService
  ) {

  }

  ngOnInit() {
    this.getDataList();
  }

  changePage(e: any) {
    this.pageIndex = ++e.pageIndex;
    this.getDataList();
  }

  clearInput(e: any){
    if( !e ){   
      this.getDataList();
    }
  }

  clearData(){
    this.name = '';
    this.type = '';
    this.getDataList();
  }

  getDataList() {
    let params = new HttpParams().set('page', this.pageIndex);

    if(this.name != ' ' && this.name){
      params = params.append('name', this.name);
    }

    if(this.type != ' ' && this.type){
      params = params.append('type', this.type);
    }

    this.charapterService.getListCharapter(params).subscribe({
      next: (data: any) => {
        this.cantidad = data.info.count;
        this.listSelected = data.results;
      }
    })
  }
}
