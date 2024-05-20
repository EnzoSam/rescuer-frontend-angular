import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtributesGroup } from '../../../admin/constants/atributes.constant';
import { IAtribute } from '../../../admin/interfaces/iatribute.interface';
import { AtributeService } from '../../../admin/services/atributes.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { Backend } from '../../../shared/constants/api.constant';
import { UiService } from '../../../shared/services/ui.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-select-gender',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './select-gender.component.html',
  styleUrl: './select-gender.component.css'
})
export class SelectGenderComponent implements OnInit{

  genders:IAtribute[]
  @Output() onTypeToogle:EventEmitter<IAtribute> = new EventEmitter<IAtribute>();
  constructor(private _atributesServices:AtributeService,
    private _uiService:UiService
  )
  {
    this.genders = [];
  }

  ngOnInit(): void {
    
    this._atributesServices.getByType(AtributesGroup.Gender)
      .then((response:IBasicResponse) =>
        {
          this.genders = response.data;
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


