import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";

export interface ILoginResponse extends IBasicResponse
{
    token:string;
    userId:string;
    refreshToken:string;
}