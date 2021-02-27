import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ResetPasswordService } from '../../services/reset-password.service';

class ResetPasswordFormKey {
  public static readonly RESET_PASSWORD: string = 'resetPassword';
  public static readonly RESET_PASSWORD_VERIFICATION: string = 'resetPasswordVerification';
}

class ResetPasswordParam {
  public static readonly TOKEN: string = 'token';
}

@Component({
  selector: 'app-reset-password-container',
  templateUrl: './reset-password-container.component.html',
  styleUrls: ['./reset-password-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordContainerComponent implements OnInit {

  public token: string;
  public form: FormGroup;
  public ResetPasswordFormKey = ResetPasswordFormKey;
  public isUrlTokenValid$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams[ResetPasswordParam.TOKEN];
    if (this.token) {
      this.isUrlTokenValid$ = this.resetPasswordService.checkTokenValidity(this.token).pipe(
        map((isValid: boolean) => {
          if (isValid) {
            this.form = this.contructForm();
          }
          return isValid;
        })
      );
    }
  }

  public onSubmit(): void {
    console.log('send reset password data');
    this.resetPasswordService.resetPassword(this.form.get(ResetPasswordFormKey.RESET_PASSWORD).value, this.token)
      .pipe(
        take(1),
        catchError((e) => {
          console.log('Error', e);
          // TODO: Display error to user
          return e;
        })
      )
      .subscribe(async (success: boolean) => {
        console.log('Password has been updated ? ', success);
        if (success) {
          await this.router.navigateByUrl('/');
        } else {
          // TODO: Display error
        }
      });
  }

  private contructForm(): FormGroup {
    return this.formBuilder.group({
        [ResetPasswordFormKey.RESET_PASSWORD]: [null, [Validators.required, Validators.min(6)]],
        [ResetPasswordFormKey.RESET_PASSWORD_VERIFICATION]: [null, [Validators.required, Validators.min(6)]],
      }, {
        validators: [
          passwordMustBeEquals()
        ]
      }
    );
  }
}

function passwordMustBeEquals(): ValidatorFn {
  return (form: FormGroup): { [key: string]: any } | null => {
    const resetPassword = form.get(ResetPasswordFormKey.RESET_PASSWORD);
    const resetPasswordVerification = form.get(ResetPasswordFormKey.RESET_PASSWORD_VERIFICATION);

    if (resetPassword.value !== resetPasswordVerification.value) {
      return {
        ['passwordsNotMatch']: true
      } as ValidationErrors;
    }
    return null;
  };
}
