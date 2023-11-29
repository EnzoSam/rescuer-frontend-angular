import { IAnimalType } from "./animalType.interface";
import { IGender } from "./gender.interface";

export interface IFilter
{
    types:IAnimalType[];
    genders:IGender[];    
}