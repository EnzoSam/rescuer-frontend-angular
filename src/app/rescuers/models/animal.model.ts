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
}