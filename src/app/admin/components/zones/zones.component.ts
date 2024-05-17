import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { IZone } from '../../interfaces/izone.interface';
import { AdminParamPaths, AdminPaths } from '../../constants/adminPaths.constant';
import { ZoneService } from '../../services/zone.service';
import { UiService } from '../../../shared/services/ui.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ZoneType } from '../../constants/zones.constants';

@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({
        height: '*',
        minHeight: ''
      })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class ZonesComponent implements OnInit {

  parentZone?:IZone;
  zones: IZone[];
  displayedColumns: string[] = ['code', 'name'];
  selectedZone?: IZone;
  paths = AdminPaths;
  zoneType: string;
  adminParamPaths = AdminParamPaths;
  constructor(private _zoneService: ZoneService,
    private _uiService: UiService,
    private _activateRoute: ActivatedRoute) {
    this.zones = [];
    this.zoneType = ZoneType.Country;
  }
  ngOnInit(): void {

    this.load();
  }

  load() {
    if (this._activateRoute.snapshot.paramMap.has(this.adminParamPaths.parentId)) {
      this._activateRoute.params.subscribe(params => {
        const idParam = params[this.adminParamPaths.parentId];
        if (idParam && idParam != '') {

          this._zoneService.getById(idParam)
            .then((response: IBasicResponse) => {
              this.parentZone = response.data;
            }).catch((response: IBasicResponse) => {
              this._uiService.setNewErrorStatus(response.message, response);
            })
          

          this._zoneService.getByParent(idParam)
            .then((response: IBasicResponse) => {
              this.zones = response.data;
            }).catch((response: IBasicResponse) => {
              this._uiService.setNewErrorStatus(response.message, response);
            })
        }
      });
    }
    else {
      this._zoneService.getRoots()
        .then((response: IBasicResponse) => {
          this.zones = response.data;
        }).catch((response: IBasicResponse) => {
          this._uiService.setNewErrorStatus(response.message, response);
        })
    }
  }

  delete() {
    if (this.selectedZone) {
      this._zoneService.delete(this.selectedZone)
        .then((response: IBasicResponse) => {
          this.load();
        }).catch((response: IBasicResponse) => {
          this._uiService.setNewErrorStatus(response.message, response);
        })
    }
  }

  getChildTypeName(): string {
    if (this.selectedZone) {
      return this._zoneService.getName
        (this._zoneService.getChildType(this.selectedZone.zoneType));
    }
    else {
      return '';
    }

  }
}

