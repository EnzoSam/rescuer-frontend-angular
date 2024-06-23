import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICaregiver } from '../../interfaces/icaregiver.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CaregiverService } from '../../services/caregiver.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminPaths } from '../../../admin/constants/adminPaths.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { AuthPaths } from '../../constants/authPath.constant';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-caregiver-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatInputModule,
    MatButtonModule, MatFormFieldModule],
  templateUrl: './caregiver-profile.component.html',
  styleUrl: './caregiver-profile.component.css'
})
export class CaregiverProfileComponent {

  form: FormGroup;
  caregiver: ICaregiver;

  constructor(private _caregiverService: CaregiverService,
    private _router: Router,
    private _uiService: UiService,
    private _activateRoute: ActivatedRoute) {
    this.caregiver = this._caregiverService.new();
    this.form = new FormGroup({
      presentation: new FormControl('', [Validators.required])
    });
  }

  get presentation() { return this.form.get('presentation'); }

  submit(e: any): void {
    e.preventDefault();

    this.caregiver.presentation = this.form.value.presentation;
    this._caregiverService.createOrUpdeate(this.caregiver)
      .then((response: IBasicResponse) => {

        this._router.navigate(['../' +
          AdminPaths.dashboard + '/' + AuthPaths.UserProfile])

      }).catch(error => {
        this._uiService.setNewErrorStatus(error.message, error);
      });
  }

  ngOnInit(): void {

    this.load();

  }

  load() {
    const auth = this._uiService.getAuthentication();
    if (!auth)
      return;

    this._caregiverService.getByUserEmail(auth.userName)
      .then((response: IBasicResponse) => {
        if (response.data) {
          this.caregiver = response.data;
          this.form.patchValue({
            presentation: this.caregiver.presentation
          });
        }
      }).catch(error => {
        this._uiService.setNewErrorStatus(error.message, error);
      });
  }
}
