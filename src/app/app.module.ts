import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './pages/interceptors/http.interceptor';
import {HTTP} from '@awesome-cordova-plugins/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 	{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  },
    HTTP,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
