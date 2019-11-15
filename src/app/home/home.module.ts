import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule,
    SharedModule, Angulartics2Module,
    HomeRoutingModule,NgZorroAntdModule],
  declarations: [HomeComponent],
  providers: [QuoteService]
})
export class HomeModule { }
