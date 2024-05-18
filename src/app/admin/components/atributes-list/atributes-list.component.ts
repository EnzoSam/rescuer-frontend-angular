import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAtribute } from '../../interfaces/iatribute.interface';
import { AtributeService } from '../../services/atributes.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {AdminPaths} from '../../constants/adminPaths.constant';
import { RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-atributes-list',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './atributes-list.component.html',
  styleUrl: './atributes-list.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({
        height: '*',
        minHeight: ''
      })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class AtributesListComponent implements OnInit {

  atributes:IAtribute[];
  displayedColumns: string[] = ['name', 'group'];
  selectedAtribute?: IAtribute;
  paths = AdminPaths;

  constructor(private _atributeServices:AtributeService,
    private _uiService: UiService)
  {
    this.atributes = [];
  }
  ngOnInit(): void {
    
    this.load();
  }

  load()
  {
      this._atributeServices.getAll()
      .then((response:IBasicResponse)=>{
        this.atributes = response.data;
      }).catch((response:IBasicResponse)=>
      {
        this._uiService.setNewErrorStatus(response.message, response);
      })

  }

  delete() {
    if (this.selectedAtribute) {
      this._atributeServices.delete(this.selectedAtribute)
        .then((response: IBasicResponse) => {
          this.load();
        }).catch((response: IBasicResponse) => {
          this._uiService.setNewErrorStatus(response.message, response);
        })
    }
  }
}


