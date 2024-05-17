import { Injectable } from "@angular/core";
import { BaseAuthService } from "../../core/service/baseAuth.service";
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";

@Injectable({
    providedIn: 'root'
})

export class UpladFilesService extends BaseAuthService {

    addPicture(name: string, file: File, url: string): Promise<IBasicResponse> {

        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('name', name);
            form.append('file', file);
            this._httpClient.post<Object>(url, form)
                .subscribe(data => {
                    resolve({ statusCode: 200, message: 'Ok', data });
                },
                error => {
                    reject({ statusCode: 500, message: 'Error', error })
                });
        });
    }

}