import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { AdminPaths } from '../../constants/adminPaths.constant';
import { AtributeService } from '../../services/atributes.service';
import { IUsefulData } from '../../interfaces/iusefulData.interface';
import { UseflDataService } from '../../services/usefulData.service';

@Component({
  selector: 'app-usefull-data-list',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './usefull-data-list.component.html',
  styleUrl: './usefull-data-list.component.css',
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
export class UsefullDataListComponent implements OnInit {

  usefulDatas:IUsefulData[];
  displayedColumns: string[] = ['data'];
  selectedAtribute?: IUsefulData;
  paths = AdminPaths;

  constructor(private _usefulData:UseflDataService,
    private _uiService: UiService)
  {
    this.usefulDatas = [];
  }
  ngOnInit(): void {
    
    this.load();
  }

  load()
  {
      this._usefulData.getAll()
      .then((response:IBasicResponse)=>{
        this.usefulDatas = response.data;
      }).catch((response:IBasicResponse)=>
      {
        this._uiService.setNewErrorStatus(response.message, response);
      })

  }

  delete() {
    if (this.selectedAtribute) {
      this._usefulData.delete(this.selectedAtribute)
        .then((response: IBasicResponse) => {
          this.load();
        }).catch((response: IBasicResponse) => {
          this._uiService.setNewErrorStatus(response.message, response);
        })
    }
  }
}


