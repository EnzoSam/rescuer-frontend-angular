import { PostStates } from "../constants/posts.constants"

export interface IFilter {
    pageIndex: number; 
    pageSize: number; 
    atributes: string[];
    state: PostStates;
    lost: boolean;
}