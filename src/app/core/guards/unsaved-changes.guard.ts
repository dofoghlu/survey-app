import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard
  implements CanDeactivate<{ hasUnsavedChanges: boolean; confirmLeave: () => Promise<boolean> }>
{
  async canDeactivate(component: {
    hasUnsavedChanges: boolean;
    confirmLeave: () => Promise<boolean>;
  }) {
    if (!component.hasUnsavedChanges) return true;
    return component.confirmLeave();
  }
}
