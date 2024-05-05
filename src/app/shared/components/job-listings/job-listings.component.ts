// Angular imports
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, inject, signal } from '@angular/core';

// Services
import { AuthService } from '@services/auth.service';

// Spartan-ng imports
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogCloseDirective,
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

// Icons
import googleIcon from '@svg/google-icon';
import appleIcon from '@svg/apple-icon';
import { DialogStateService } from '@services/dialog-state.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'App-job-listings',
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmDialogComponent,
    HlmButtonDirective,
    ReactiveFormsModule,
    HlmDialogTitleDirective,
    BrnDialogCloseDirective,
    HlmDialogHeaderComponent,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
  ],
  templateUrl: './job-listings.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListingsComponent {
  // Service
  authService = inject(AuthService);
  dialogStateService = inject(DialogStateService);
  private formBuilder = inject(FormBuilder);

  // HTML element reference
  @ViewChild('page1') page1?: ElementRef;
  @ViewChild('page2') page2?: ElementRef;
  @ViewChild('page3') page3?: ElementRef;
  @ViewChild('closeDialog') closeDialog?: ElementRef;

  public emailForm!: FormGroup; // variable is created of type FormGroup is created
  first_name: string = ''; // Variable is created to show the input value below the button

  // Icons
  googleIcon = googleIcon;
  appleIcon = appleIcon;

  // Shorthand services
  currentUser = this.authService.auth_user;
  slideNum = this.dialogStateService.slideNum;
  googleAuth = () => this.authService.googleAuth();
  sendEmailLinkAuth = (email: string) => {
    this.authService.sendEmailLinkAuth(email);
  };

  constructor() {
    // Form element defined below
    this.emailForm = this.formBuilder.group({
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
    });

    effect(
      () => {
        // Close dialog after user logged in
        if (this.authService.auth_user()) {
          this.triggerClick();
        }
      },
      { allowSignalWrites: true },
    );
  }

  // Change slide animation
  changeSlide(currentSlide: number, email?: string, back?: boolean, submit?: boolean) {
    console.log(email);

    if (currentSlide === 1) {
      this.slideNum.set(2);
      this.page1?.nativeElement.classList.remove('translate-x-0');
      this.page1?.nativeElement.classList.add('-translate-x-full');
      this.page2?.nativeElement.classList.remove('translate-x-full');
      this.page2?.nativeElement.classList.add('translate-x-0');
      this.page3?.nativeElement.classList.remove('translate-x-[200%]');
      this.page3?.nativeElement.classList.add('translate-x-full');
    } else if (currentSlide === 2) {
      if (back) {
        this.slideNum.set(1);
        this.page1?.nativeElement.classList.remove('translate-x-full');
        this.page1?.nativeElement.classList.add('translate-x-0');
        this.page2?.nativeElement.classList.remove('translate-x-0');
        this.page2?.nativeElement.classList.add('translate-x-full');
        this.page3?.nativeElement.classList.remove('translate-x-full');
        this.page3?.nativeElement.classList.add('translate-x-[200%]');
      } else if (submit) {
        this.slideNum.set(3);
        this.sendEmailLinkAuth(email!);
        this.page1?.nativeElement.classList.remove('-translate-x-full');
        this.page1?.nativeElement.classList.add('-translate-x-[200%]');
        this.page2?.nativeElement.classList.remove('translate-x-0');
        this.page2?.nativeElement.classList.add('-translate-x-full');
        this.page3?.nativeElement.classList.remove('translate-x-full');
        this.page3?.nativeElement.classList.add('translate-x-0');
      }
    } else if (currentSlide === 3) {
      this.slideNum.set(2);
      this.page1?.nativeElement.classList.remove('-translate-x-[200%]');
      this.page1?.nativeElement.classList.add('-translate-x-full');
      this.page2?.nativeElement.classList.remove('translate-x-full');
      this.page2?.nativeElement.classList.add('translate-x-0');
      this.page3?.nativeElement.classList.remove('translate-x-0');
      this.page3?.nativeElement.classList.add('translate-x-full');
    }
  }

  triggerClick() {
    this.closeDialog?.nativeElement.click();
    this.slideNum.set(1);
  }
}
