import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-services';
import { Person } from '../interfaces/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor( private dataServ: DataService<Person>) {
    console.log("PeopleService created");
    this.dataServ.create({name:"Juan", surname:"García",age:47}).subscribe({
      next:(value)=>{
        console.log("Persona añadida corréctamente");
        console.log(value);
      },
      error:(err)=>{},
      complete:()=>{}
    });

    this.dataServ.create({name:"Juan", surname:"García",age:47}).subscribe({
      next:(value)=>{
        console.log("Persona añadida corréctamente");
        console.log(value);
      },
      error:(err)=>{},
      complete:()=>{}
    });

    this.dataServ.create({name:"Juan", surname:"García",age:47}).subscribe({
      next:(value)=>{
        console.log("Persona añadida corréctamente");
        console.log(value);
      },
      error:(err)=>{},
      complete:()=>{}
    });

    this.dataServ.create({name:"Juan", surname:"García",age:47}).subscribe({
      next:(value)=>{
        console.log("Persona añadida corréctamente");
        console.log(value);
      },
      error:(err)=>{},
      complete:()=>{}
    });
   }

  addPerson(person: Person):Observable<Person>{
    return this.dataServ.create(person);
  }

  deletePerson(id:string):Observable<Person|null>{
    return this.dataServ.delete(id);
  }

  updatePerson(id:string, person:Person):Observable<Person|null>{
    return this.dataServ.update(id, person);
  }

  getAll():Observable<Person[]>{
    return this.dataServ.requestAll();
  }

  getById(id: string):Observable<Person| null> {
      return this.dataServ.requestById(id)
  }
}
