import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SelectTypeComponent } from '../select-type/select-type.component';
import { IAtribute } from '../../../admin/interfaces/iatribute.interface';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';
import { SelectAgeComponent } from '../select-age/select-age.component';
import { SelectGenderComponent } from '../select-gender/select-gender.component';
import { SelectImageComponent } from '../select-image/select-image.component';
import { SelectNameComponent } from '../select-name/select-name.component';
import { AtributesGroup } from '../../../admin/constants/atributes.constant';
import { UploadableFile } from '../../../shared/interfaces/uploadableFile';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { Router } from '@angular/router';
import { RescuersPaths } from '../../constants/rescuersPaths.constant';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-create-animal',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  imports: [CommonModule,
    SelectTypeComponent,
    SelectAgeComponent,
    SelectGenderComponent,
    SelectImageComponent,
    SelectNameComponent,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './create-animal.component.html',
  styleUrl: './create-animal.component.css'
})
export class CreateAnimalComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  @ViewChild('stepper') private myStepper!: MatStepper;

  animal:Animal;

  constructor(private _formBuilder: FormBuilder,
    private _animalService:AnimalService,
    private _router:Router,
    private _uiService:UiService
  ) {
    this.animal = this._animalService.new();
  }


  onTypeSelected(atribute:IAtribute)
  {
    this.animal.setAtribute(AtributesGroup.Type, atribute);
  }

  onAgeSelected(atribute:IAtribute)
  {
    this.animal.setAtribute(AtributesGroup.Age, atribute);
  }

  onGenederSelected(atribute:IAtribute)
  {
    this.animal.setAtribute(AtributesGroup.Gender, atribute);
  }

  onNameSelected(_name:string | undefined)
  {
    console.log(_name)
    this.animal.setName(_name);
  }  

  onImageSelected(file:UploadableFile)
  {
    this.animal.setImage(file.name);
  }   

  onSubmit()
  {
    this._animalService.create(this.animal)
    .then((response:IBasicResponse)=>
    {
        if(response.data)
        {
          this._router.navigate([
            RescuersPaths.publications + '/'+ 
            RescuersPaths.postAnimalDetail, response.data])
        }
        else
        {
          console.log(response)
          this._uiService.setNewErrorStatus('Error desconocido.', undefined);
        }
    })
    .catch(err=>
      {
        console.log(err)
        this._uiService.setNewErrorStatus('Error al crear publicación.',err)
      }
    )
  }
}
