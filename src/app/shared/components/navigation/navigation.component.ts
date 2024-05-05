// Angular imports
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

// Services
import { ResponsiveBreakpointService } from '@services/responsive-breakpoint.service';
import { NavigationService } from '@services/navigation.service';
import { AuthService } from '@services/auth.service';

// Models
import { NavButton, NavButtonObj } from '@models/nav-button.model';

// Custom Icons
import { homeIcon } from '@components/svg-icon/icons';
import { bellIcon } from '@components/svg-icon/icons';
import { searchIcon } from '@components/svg-icon/icons';
import { bookmarkIcon } from '@components/svg-icon/icons';
import { paperPlaneIcon } from '@components/svg-icon/icons';

// Components
import { NavButtonsComponent } from '@components/nav-buttons/nav-buttons.component';
import { AvatarComponent } from '@components/avatar/avatar.component';

// 3rd party imports
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';

@Component({
  selector: 'App-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    AsyncPipe,
    RouterLink,
    NavButtonsComponent,
    AvatarComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    JsonPipe,
  ],
})
export class NavigationComponent {
  // Service
  public authService = inject(AuthService);
  public navService = inject(NavigationService);
  public screenSize = inject(ResponsiveBreakpointService);

  currentUser = this.authService.auth_user;
  navigationState = this.navService.navState;
  navigationIconState = this.navService.iconState;

  changeState(e: any) {
    this.navService.navState.set(e);

    this.navigationIconState.set(
      this.navigationIconState().map((item, i) => {
        if (item.alias !== e) {
          return {
            ...this.navigationIconState()[i],
            iconSelected: false,
          };
        } else {
          return {
            ...this.navigationIconState()[i],
            iconSelected: true,
          };
        }
      }),
    );
  }
}
