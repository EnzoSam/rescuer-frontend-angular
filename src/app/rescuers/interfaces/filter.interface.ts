import { PostStates } from "../constants/posts.constants"

export interface IFilter
{
    pageFrom:number
    pageTo:number
    atributes:string[]  
    state:PostStates
    lost:boolean
}