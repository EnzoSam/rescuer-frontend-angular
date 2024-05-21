import { IAtribute } from "../../admin/interfaces/iatribute.interface";
import { IPost } from "../interfaces/post.interface";

export class Animal implements IPost
{
    id:any
    name:string
    userId:string
    image?:string    
    description?:string
    atributes:IAtribute[]
    
    constructor(_id:any, _name:string, _userId:string) 
    {
        this.name = _name;
        this.userId = _userId;
        this.atributes = [];
    }
    getId() {
        return this.id;
    }

    getTitle(): string {
        return this.name;
    }
    getImage(): string | undefined {
        return this.image;
    }
    getDescription(): string | undefined {
        return this.description;
    }    

    setAtribute(_group:string, _atribute:IAtribute)
    {
        this.atributes = this.atributes.filter
            (a => a.group !== _group);

        if(_atribute)
            this.atributes.push(_atribute);       
    }

    setName(_name:string | undefined)
    {
        if(_name)
            this.name = _name;
        else
            this.name = '';
    }

    setImage(_image:string)
    {
        this.image = _image;
    }    
}