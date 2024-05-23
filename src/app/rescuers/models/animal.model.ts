import { IAtribute } from "../../admin/interfaces/iatribute.interface";
import { IPost } from "../interfaces/post.interface";

export class Animal
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