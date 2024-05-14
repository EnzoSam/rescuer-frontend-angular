import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { IZone } from '../../interfaces/izone.interface';
import { AdminPaths } from '../../constants/adminPaths.constant';
import { ZoneService } from '../../services/zone.service';
import { UiService } from '../../../shared/services/ui.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css',
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
export class ZonesComponent  implements OnInit {

  zones:IZone[];
  displayedColumns: string[] = ['code', 'name'];
  selectedZone: any | null;
  paths = AdminPaths;  

  constructor(private _zoneService:ZoneService,
    private _uiService: UiService)
  {
    this.zones = [];
  }
  ngOnInit(): void {
    
    this.load();
  }

  load()
  {
      this._zoneService.getAll()
      .then((response:IBasicResponse)=>{
        this.zones = response.data;
      }).catch((response:IBasicResponse)=>
      {
        this._uiService.setNewErrorStatus(response.message, response);
      })

  }

  delete()
  {
    if(this.selectedZone)
      {
        this._zoneService.delete(this.selectedZone)
        .then((response:IBasicResponse)=>{
          this.load();
        }).catch((response:IBasicResponse)=>
        {
          this._uiService.setNewErrorStatus(response.message, response);
        })
      }
  }

}

