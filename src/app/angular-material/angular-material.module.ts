import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { WorkUnderProgressComponent } from '../work-under-progress/work-under-progress.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule } from '@angular/router';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [WorkUnderProgressComponent],
  exports: [
    MatExpansionModule,
    MatTooltipModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSliderModule,
    MatBadgeModule,
    MatMenuModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatChipsModule,

    FormsModule, 
    ReactiveFormsModule,
    ClipboardModule,
    WorkUnderProgressComponent

  ],

  imports: [
    RouterModule
  ],
})
export class AngularMaterialModule { }
