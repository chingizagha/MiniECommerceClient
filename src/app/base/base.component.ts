import { NgxSpinnerService, Spinner } from 'ngx-spinner';

export class BaseComponent{
  constructor(private spinner:NgxSpinnerService) {}

  showSpinner(spinnerType:SpinnerType){
    this.spinner.show(spinnerType);
    setTimeout(() => this.hideSpinner(spinnerType), 5000);
  }
  hideSpinner(spinnerType:SpinnerType){
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType{
  BallScaleMultiple="c1",
  BallAtom="c2",
  ballSpinClockwiseFadeRotating="c3"
}