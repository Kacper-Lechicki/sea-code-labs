import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  selector: 'sc-root',
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly title: string = 'portfolio';
}
