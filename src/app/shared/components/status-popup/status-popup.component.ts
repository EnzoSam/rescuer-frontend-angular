import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStatus } from '../../interfaces/status.interface';
import { UiService } from '../../services/ui.service';
import { Subscription, interval } from 'rxjs';
import { AppComponent } from '../../../app.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-status-popup',
  standalone: true,
  imports: [CommonModule, MatChipsModule,MatButtonModule],
  templateUrl: './status-popup.component.html',
  styleUrl: './status-popup.component.css'
})
export class StatusPopupComponent implements OnInit, OnDestroy {

  status?: IStatus
  statusSuscription: Subscription;
  intervalSubscription?: Subscription;
  color: string;

  constructor(private _uiService: UiService,
    private _appComponent: AppComponent) {

    this.color = 'accent';
    this.statusSuscription = _uiService.onSiteStatusChanged().subscribe
      ((_status: IStatus) => {
        if (this.intervalSubscription)
          this.hide();

        this.show();
        this.status = _status;
        if(this.status.code >= 200 && this.status.code <300)
          this.color = 'accent';
        else
          this.color = 'warn';
        console.log(_status)
        this.intervalSubscription = interval(3000)
          .subscribe(x => { this.hide(); });
      },
        error => {

        });
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {

    if (this.statusSuscription)
      this.statusSuscription.unsubscribe();
    if (this.intervalSubscription)
      this.statusSuscription.unsubscribe();
  }

  hide() {
    (document.getElementsByTagName("app-status-popup")[0] as HTMLElement).style.display = 'none';

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }
  }

  show() {
    (document.getElementsByTagName("app-status-popup")[0] as HTMLElement).style.display = 'flex';
  }
}
