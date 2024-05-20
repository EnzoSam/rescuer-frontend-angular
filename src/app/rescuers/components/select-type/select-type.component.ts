import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IAtribute } from '../../../admin/interfaces/iatribute.interface';
import { AtributeService } from '../../../admin/services/atributes.service';
import { AtributesGroup } from '../../../admin/constants/atributes.constant';
import { UiService } from '../../../shared/services/ui.service';
import {IBasicResponse} from '../../../core/interfaces/responses/basicresponse.interface'
import { Backend } from '../../../shared/constants/api.constant';

@Component({
  selector: 'app-select-type',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './select-type.component.html',
  styleUrl: './select-type.component.css'
})
export class SelectTypeComponent implements OnInit{

  types:IAtribute[]
  @Output() onTypeToogle:EventEmitter<IAtribute> = new EventEmitter<IAtribute>();
  constructor(private _atributesServices:AtributeService,
    private _uiService:UiService
  )
  {
    this.types = [];
  }

  ngOnInit(): void {
    
    this._atributesServices.getByType(AtributesGroup.Type)
      .then((response:IBasicResponse) =>
        {
          this.types = response.data;
        })
        .catch(error=>
        {
    
        }
        );
  }

  getUrlImage(image:string):string
  {
    return Backend.ResourcesUrl + 'atributes/' + image;
  }

  onCardToogle(type:IAtribute)
  {
    this.onTypeToogle.emit(type);
  }
}


