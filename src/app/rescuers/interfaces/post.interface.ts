import { ContentsType, PostStates } from "../constants/posts.constants"

export interface IPost
{
    id:any
    title:string
    image:string |  undefined
    description:string | undefined
    contentType:ContentsType
    state:PostStates
    postCategory?:string
}

