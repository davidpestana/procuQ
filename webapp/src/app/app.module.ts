import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

registerLocaleData(es);

import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { FullCalendarModule } from 'ng-fullcalendar';
import { NgPipesModule } from 'ngx-pipes';


import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';
import { MenuComponent } from './layout/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';


import { WorkCenterService,WorkerService,AlertsService,LidlFilesService } from './shared/services';


import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServiceManagerComponent } from './components/service-manager/service-manager.component';
import { WorkCenterSelectorComponent } from './components/work-center-selector/work-center-selector.component';
import { WorkCenterManagerComponent } from './components/work-center-manager/work-center-manager.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { WorkerManagerComponent } from './components/worker-manager/worker-manager.component';
import { WorkerSelectorComponent } from './components/worker-selector/worker-selector.component';
import { RecurrentWeekConfigComponent } from './components/recurrent-week-config/recurrent-week-config.component';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { AlertsComponent } from './layout/alerts/alerts.component';
import { MessagesComponent } from './layout/messages/messages.component';
import { LidlFileEventsParserComponent } from './components/lidl-file-events-parser/lidl-file-events-parser.component';
import { EventCreatorComponent } from './components/event-creator/event-creator.component';



const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'workers', component: WorkersPageComponent },

  
  // { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    MenuComponent,
    WelcomeComponent,
    ServicesComponent,
    ServiceManagerComponent,
    WorkCenterSelectorComponent,
    WorkCenterManagerComponent,
    EventEditorComponent,
    WorkerManagerComponent,
    WorkerSelectorComponent,
    RecurrentWeekConfigComponent,
    WorkersPageComponent,
    AlertsComponent,
    MessagesComponent,
    LidlFileEventsParserComponent,
    EventCreatorComponent
  ],
  entryComponents:[
    EventEditorComponent,
    EventCreatorComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot(),

    FullCalendarModule,
    NgPipesModule
  ],
  providers: [ {provide: LOCALE_ID, useValue: "es-ES"},WorkCenterService,WorkerService,AlertsService,LidlFilesService],
  bootstrap: [AppComponent]
})

export class AppModule { }
