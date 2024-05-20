import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAtribute } from '../../../admin/interfaces/iatribute.interface';
import { AtributeService } from '../../../admin/services/atributes.service';
import { UiService } from '../../../shared/services/ui.service';
import { AtributesGroup } from '../../../admin/constants/atributes.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { Backend } from '../../../shared/constants/api.constant';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-select-age',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './select-age.component.html',
  styleUrl: './select-age.component.css'
})
export class SelectAgeComponent  implements OnInit{

  ages:IAtribute[]
  @Output() onTypeToogle:EventEmitter<IAtribute> = new EventEmitter<IAtribute>();
  constructor(private _atributesServices:AtributeService,
    private _uiService:UiService
  )
  {
    this.ages = [];
  }

  ngOnInit(): void {
    
    this._atributesServices.getByType(AtributesGroup.Age)
      .then((response:IBasicResponse) =>
        {
          this.ages = response.data;
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


