import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IPost } from '../../interfaces/post.interface'; // IPost debería tener más detalles
import { AnimalService } from '../../services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterPathParams } from '../../../shared/constants/routesPaths.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { Animal } from '../../models/animal.model';
import { UiService } from '../../../shared/services/ui.service';
import { Backend } from '../../../shared/constants/api.constant';
import { AuthService } from '../../../auth/services/auth.service'; // Aunque no se usa, lo mantengo si es relevante
import { PostUserDetailComponent } from '../post-user-detail/post-user-detail.component';

// --- Módulos de Angular Material para el nuevo diseño ---
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para el spinner de carga
import { MatChipsModule } from '@angular/material/chips'; // Para mostrar atributos (raza, color, etc.)
import { MatToolbarModule } from '@angular/material/toolbar'; // Opcional, para la cabecera
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from "@angular/material/divider"; // Para una galería de imágenes
import { PostService } from '../../services/post.service';
import { ContentsType } from '../../constants/posts.constants';

@Component({
  selector: 'app-publication-detail',
  standalone: true,
  imports: [
    CommonModule,
    PostUserDetailComponent,
    MatCardModule, // Nuevo
    MatButtonModule, // Nuevo
    MatIconModule, // Nuevo
    MatProgressSpinnerModule, // Nuevo
    MatChipsModule, // Nuevo
    MatToolbarModule, // Nuevo (opcional)
    MatGridListModule // Nuevo (opcional, para la galería)
    ,
    MatDividerModule
  ],
  templateUrl: './publication-detail.component.html',
  styleUrl: './publication-detail.component.css'
})
export class PublicationDetailComponent implements OnInit {
  post?: Animal;
  isLoading: boolean = true;
  mainImageUrl: string = '';
  showContact = false;

  constructor(
    private _animalService: AnimalService,
    private _activateRoute: ActivatedRoute,
    private _uiService: UiService,
    private _authService: AuthService,
    private _postService: PostService,
    private _location:Location
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    if (this._activateRoute.snapshot.paramMap.has(RouterPathParams.id)) {
      this._activateRoute.params.subscribe(params => {
        const idParam = params[RouterPathParams.id];
        if (idParam && idParam !== '') {
          this.load(idParam);
        } else {
          this._uiService.setNewErrorStatus('ID de publicación no encontrado.', {});
          this.isLoading = false;
        }
      });
    } else {
      this._uiService.setNewErrorStatus('ID de publicación no proporcionado en la URL.', {});
      this.isLoading = false;
    }
  }

  load(id: string): void {
    this._animalService.getById(id)
      .then((response: IBasicResponse) => {
        if (response.statusCode === 200 && response.data) {
          this.post = response.data as Animal;
          this.setMainImage(this.post.image);
        } else {
          this._uiService.setNewMessageStatus('Publicación no encontrada o datos inválidos.', {});
          this.post = undefined;
        }
      })
      .catch(error => {
        console.error('Error al cargar la publicación:', error);
        this._uiService.setNewErrorStatus('Error al recuperar la publicación.', error);
        this.post = undefined;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  getImageUrl(imageFileName: string | undefined): string {
    if (imageFileName) {
      return Backend.ResourcesUrl + 'animals/' + imageFileName;
    }
    return 'assets/placeholder.png';
  }

  setMainImage(imageFileName: string | undefined): void {
    this.mainImageUrl = this.getImageUrl(imageFileName);
  }

  contactPublisher(): void {
    this.showContact = true;
  }

  sharePublication(): void {
    if (navigator.share) {
      navigator.share({
        title: this.post?.name || 'Mascota en Adopción',
        text: this.post?.description || 'Encontrá a tu nuevo amigo!',
        url: window.location.href,
      })
        .then(() => this._uiService.setNewMessageStatus('¡Publicación compartida con éxito!', {}))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      this._uiService.setNewMessageStatus('Puedes copiar el enlace: ' + window.location.href, {});
    }
  }

  isPublicationOwner(): boolean {
    if (!this.post)
      return false;
    if (!this._uiService.getAuthentication())
      return false;

    return this._uiService.getAuthentication().userId === this.post?.userId;
  }

  deleteClick() {

    if (this.post) {
      this._postService.changeStateToArchive
      (this.post.id, ContentsType.Animal).then(data => {
      this._uiService.setNewErrorStatus('Publicación eliminada.',{});
        this._location.back();
      }
      ).catch(error=>
      {
        this._uiService.setNewErrorStatus('No se pudo eliminar.',{});
      }
      )
    }
  }
}