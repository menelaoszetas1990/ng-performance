import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CityPipe } from './pipes/city.pipe';

@NgModule({
  imports: [FormsModule],
  declarations: [CityPipe],
  exports: [CityPipe, FormsModule]
})
export class SharedModule {}
