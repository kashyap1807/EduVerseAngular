// can-deactivate.guard.ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

// can-deactivate.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FormComponent } from '../video-request/form/form.component';

@Injectable({
  providedIn: 'root',
})
export class canDeactivateGuard
  implements CanDeactivate<FormComponent>
{
  canDeactivate(
    component: FormComponent
  ): boolean | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
