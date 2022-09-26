import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityPipe } from './pipes/city.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CityPipe],
  exports: [CityPipe, FormsModule]
})
export class SharedModule {}
