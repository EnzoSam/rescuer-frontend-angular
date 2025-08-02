import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUsefulData } from '../../admin/interfaces/iusefulData.interface';
import { UseflDataService } from '../../admin/services/usefulData.service';
import { IBasicResponse } from '../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../shared/services/ui.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IContact } from '../../admin/interfaces/icontact.interface';

@Component({
  selector: 'app-usefulldata-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,MatIconModule],
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

hasWhatsApp(contacts: IContact[]): boolean {
  return contacts?.some(c => c.type.toLowerCase().includes('whatsapp'));
}

openWhatsApp(data: IUsefulData) {
  const wa = data.contacts.find(c => c.type.toLowerCase().includes('whatsapp'));
  if (wa) {
    const phone = wa.contact.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  }
}

shareData(data: IUsefulData) {
  const text = `${data.data}\n${data.description}`;
  if (navigator.share) {
    navigator.share({ title: 'Dato útil', text });
  } else {
    navigator.clipboard.writeText(text);
    alert('Información copiada al portapapeles');
  }
}

}
