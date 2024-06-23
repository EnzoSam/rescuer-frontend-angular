import { PostStates } from "../../rescuers/constants/posts.constants";

export interface ICaregiver
{
    id:any
    userId: any
    presentation:string
    state:PostStates    
}