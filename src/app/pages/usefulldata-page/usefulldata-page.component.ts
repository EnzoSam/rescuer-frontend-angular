import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUsefulData } from '../../admin/interfaces/iusefulData.interface';
import { UseflDataService } from '../../admin/services/usefulData.service';
import { IBasicResponse } from '../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../shared/services/ui.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usefulldata-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './usefulldata-page.component.html',
  styleUrl: './usefulldata-page.component.css'
})
export class UsefulldataPageComponent implements OnInit {

  usefullDatas: IUsefulData[]

  constructor(private _usefulDataService: UseflDataService,
    private _uiService: UiService
  ) {
    this.usefullDatas = []
  }

  ngOnInit(): void {
    this._usefulDataService.getAll()
      .then((response: IBasicResponse) => {
        this.usefullDatas = response.data;
      })
      .catch(error => 
        { this._uiService.setNewErrorStatus('Error al recuperar datos', error); }
      )
  }
}
