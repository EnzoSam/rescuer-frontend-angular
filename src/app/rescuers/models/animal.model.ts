import { AtributesGroup } from "../../admin/constants/atributes.constant";
import { IAtribute } from "../../admin/interfaces/iatribute.interface";

export class Animal
{
    id:any
    name:string
    userId:string
    lost:boolean
    image?:string        
    description?:string
    atributesModels:IAtribute[]
    atributes:any[]
    state:number = 0;
    constructor(_id:any, _name:string, _userId:string) 
    {
        this.name = _name;
        this.userId = _userId;
        this.atributesModels = [];
        this.atributes = [];
        this.lost = false;
    }    

    setAtribute(_group:string, _atribute:IAtribute)
    {
        this.atributesModels = this.atributesModels.filter
            (a => a.group !== _group);

        if(_atribute)
            this.atributesModels.push(_atribute);  
        
        this.atributes = this.atributesModels.map(a=>a.id);
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
    
    getAttribute(_group:string):IAtribute | undefined    
    {    
        if(!this.atributesModels)
            return     undefined
        return this.atributesModels.find(a=>a.group === _group)
    }

    haveAtribute(_group:string):boolean{
        
        if(this.getAttribute(_group))
            return true

    return false;
    }

    isValid():boolean
    {
        return  this.haveAtribute(AtributesGroup.Type) &&    
        this.haveAtribute(AtributesGroup.Age) &&
        this.haveAtribute(AtributesGroup.Gender) &&
        (this.image != null && this.image.length > 0);
    }
}