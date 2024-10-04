import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataInMemoryService } from './core/services/data-in-memory.service';
import { FirebaseService } from './core/services/firebase.service';

export function DataServiceFactory(backend:string){
  switch(backend){
    case 'InMemory':
      return new DataInMemoryService();
    case 'Firebase':
      return new FirebaseService();
    default:
      throw new Error("Not implemented");
  }
} 

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
