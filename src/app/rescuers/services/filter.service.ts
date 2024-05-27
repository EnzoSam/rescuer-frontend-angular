import { Injectable } from "@angular/core";
import { IFilter } from "../interfaces/filter.interface";
import { PostStates } from "../constants/posts.constants";
import { FiltersDefaults } from "../constants/filters.constants";

@Injectable({
    providedIn: 'root'
  })
  export class FilterService {

    new():IFilter
    {
        return {
            pageFrom:FiltersDefaults.PageFrom,
            pageTo:FiltersDefaults.PageTo,
            state:PostStates.Published,
            atributes:[]  
        }
    }
  }