import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-services';
import { Person } from '../interfaces/person';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model } from '../interfaces/model';

export abstract class generic<T>{
  public abstract method1<T>():void;
}

export class DataInMemoryService<T extends Model> extends DataService<T>{

  private generarCodigoAlfanumerico(): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 10; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indiceAleatorio];
    }
    return codigo;
  }

  constructor() { 
    super();
  }

  // 
  public override create(value: T): Observable<T> {

    return new Observable((observer)=>{
      value.id = this.generarCodigoAlfanumerico();
      const _records = this._records.value;
      this._records.next([..._records, value]);
      observer.next(value);
      observer.complete();
  });

  }


  public override delete(id: string): Observable<T | null> {

    return new Observable((observer) => {
      const records = this._records.value;
      const index = records.findIndex(item => item.id === id);
      if (index !== -1) {
          const deletedRecord = records[index];
          this._records.next(records.filter(item => item.id !== id));
          observer.next(deletedRecord);
      } else {
          observer.next(null);
      }
      observer.complete();
  });
    
  }


  public override update(id: string, value: T): Observable<T | null> {
    return new Observable((observer) => {
      const records = this._records.value;
      const index = records.findIndex(item => item.id === id);
      if (index !== -1) {
          records[index] = { ...records[index], ...value };
          this._records.next([...records]);
          observer.next(records[index]);
      } else {
          observer.next(null);
      }
      observer.complete();
  });
  }


  public override requestAll(): Observable<T[]> {
    return this.records$
  }


  public override requestById(id: string): Observable<T | null> {
    return new Observable((observer) => {
      const record = this._records.value.find(item => item.id === id) || null;
      observer.next(record);
      observer.complete();
  });
  }
}
