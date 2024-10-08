import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }

  // Método para guardar una persona
  setPerson(key: string, person: Person): Observable<void> {
    const personString = JSON.stringify(person);  // Convertir el objeto a una cadena JSON
    return from(Preferences.set({ key, value: personString }));
  }

  // Método para obtener una persona
  getPerson(key: string): Observable<Person | null> {
    return from(
      Preferences.get({ key }).then(result => {
        const personString = result.value;
        if (personString) {
          return JSON.parse(personString) as Person;  // Convertir la cadena JSON a un objeto Person
        } else {
          return null;
        }
      })
    );
  }

  // Método para eliminar una persona
  removePerson(key: string): Observable<void> {
    return from(Preferences.remove({ key }));
  }

  // Método para limpiar todas las personas
  clearAll(): Observable<void> {
    return from(Preferences.clear());
  }
}