// Angular imports
import { RouterLink } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  input,
} from '@angular/core';

// Model
import { NavButtonObj } from '@models/nav-button.model';

// Components
import { SvgIconComponent } from '@components/svg-icon/svg-icon.component';

// Spartan-ng imports
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { homeIcon } from '@components/svg-icon/icons';
import { NavigationService } from '@services/navigation.service';

@Component({
  selector: 'App-nav-buttons',
  standalone: true,
  imports: [
    RouterLink,
    SvgIconComponent,
    HlmButtonDirective,
    HlmDialogComponent,
    HlmTooltipComponent,
    HlmDialogTitleDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogContentComponent,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    BrnTooltipContentDirective,
    HlmTooltipTriggerDirective,
    HlmDialogDescriptionDirective,
  ],
  templateUrl: './nav-buttons.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavButtonsComponent {
  navService = inject(NavigationService);

  icon = input.required<NavButtonObj>();
  // icon = this.navService.iconState;
  iconType = input<string>();
  iconSelected = input<boolean>();

  @Output() onClick = new EventEmitter<string>();
  @Output() openDialog = new EventEmitter();

  routeTo(route: string) {
    this.onClick.emit(route);
  }
}
