import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email-info.component.html',
  styleUrl: './verify-email-info.component.css'
})
export class VerifyEmailInfoComponent implements OnInit{

  message:string;
  constructor(private _activateRoute:ActivatedRoute)
  {
    this.message = 'Revisa tu correo electronico, recibirás un email con un link para validar tu cuenta';
  }

  ngOnInit(): void {

    if(this._activateRoute.snapshot.paramMap.has('reset'))
    {
      this._activateRoute.params.subscribe(params => {
              
        const outP = params['reset'];
        if(outP && outP === '1')
        {
          this.message = 'Revisa tu correo electronico, recibirás un email con un link para resetear tu password';
        }
      });
    }
  }


}
