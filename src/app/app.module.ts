import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutService } from './adminor/shared/services/layout.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgxColorsModule } from 'ngx-colors';
import { LayoutComponent } from './holder/shared/layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HolderModule } from './holder/holder.module';
import { AdminorRoutingModule } from './adminor/adminor-routing.module';
import { FormModule } from './adminor/component/forms/forms.module';
import { WorkSpaceComponent } from './work-space/work-space.component';
import { AddTravailComponent } from './work-space/add-travail/add-travail.component';
import { AgentDetailComponent } from './work-space/agent-detail/agent-detail.component';
import { FormsModule } from '@angular/forms';
import { WorkSpaceRoutingModule } from './work-space/work-space-routing.module';
import { HeaderComponent } from './holder/shared/header/header.component';
import { SidebarComponent } from './holder/shared/sidebar/sidebar.component';
import { GridComponent } from './holder/shared/grid/grid.component';
import { LayoutModulesComponent } from './modules/shared/layout-modules/layout-modules.component';
import { ConfirmeComponent } from './work-space/confirme/confirme.component';
import { ModulesModule } from './modules/modules.module';
import { AccueilComponent } from './modules/accueil/accueil.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AgentsComponent } from './modules/agents/agents.component';
import { ResidenceComponent } from './modules/residence/residence.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { SyndicComponent } from './modules/syndic/syndic.component';
import { EspaceTravailComponent } from './modules/accueil/espace-travail/espace-travail.component';
import { PageRedirectComponent } from './page-redirect/page-redirect.component';
import { DashboardComponent } from './modules/syndic/dashboard/dashboard.component';
import { ResidencesComponent } from './modules/syndic/residences/residences.component';
import { DatePipe } from '@angular/common';
import { ListResidencesComponent } from './modules/residence/list-residences/list-residences.component';
import { AddResidenceComponent } from './modules/syndic/residences/add-residence/add-residence.component';
import { DetailResidenceComponent } from './modules/residence/detail-residence/detail-residence.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    WorkSpaceComponent,
    HeaderComponent,
    AgentDetailComponent,
    SidebarComponent,
    AddTravailComponent,
    GridComponent,
    LayoutModulesComponent,
    ConfirmeComponent,
    AccueilComponent,
    AdminComponent,
    AgentsComponent,
    SyndicComponent,
    ResidenceComponent,
    TasksComponent,
    EspaceTravailComponent,
    PageRedirectComponent,
    DashboardComponent,
    ResidencesComponent,
    ListResidencesComponent,
    AddResidenceComponent,
    DetailResidenceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxColorsModule,
    CommonModule,
    NgbModule,
    HolderModule,
    WorkSpaceRoutingModule,
    AdminorRoutingModule,
    FormModule,
    ModulesModule,
  ],

  providers: [LayoutService, ToastrService,DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
