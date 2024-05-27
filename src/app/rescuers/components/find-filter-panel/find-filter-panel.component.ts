import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAtribute } from '../../../admin/interfaces/iatribute.interface';
import { AtributeService } from '../../../admin/services/atributes.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IAtributeFilter } from '../../interfaces/iatributeFilter.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtributesGroup } from '../../../admin/constants/atributes.constant';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-find-filter-panel',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,
    MatSlideToggleModule, MatIconModule, MatButtonModule,
    MatSidenavModule,MatMenuModule],
  templateUrl: './find-filter-panel.component.html',
  styleUrl: './find-filter-panel.component.css'
})
export class FindFilterPanelComponent implements OnInit{

  types:IAtributeFilter[] = [];
  ages:IAtributeFilter[] = [];
  genders:IAtributeFilter[] = [];

  constructor(private _atributeService:AtributeService,
    private _uiService:UiService
  )
  {
  }

  ngOnInit(): void {
    
    this._atributeService.getAll()
    .then((response:IBasicResponse) =>
    {
      const atributes: IAtribute[] = response.data;
      this.types = atributes
      .filter(a=>a.group === AtributesGroup.Type)
      .map(a => ({
        ...a,
        checked: false 
        }));

        this.genders = atributes
        .filter(a=>a.group === AtributesGroup.Gender)
        .map(a => ({
          ...a,
          checked: false 
          }));  
          
          this.ages = atributes
          .filter(a=>a.group === AtributesGroup.Age)
          .map(a => ({
            ...a,
            checked: false 
            }));               
    })
    .catch(error=>
      {
        this._uiService.setNewErrorStatus('Error al obtener atributos', error);
      }
    )
  }
}
