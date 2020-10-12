import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class StateService {
  private readonly _printer = new BehaviorSubject<string>("");

  // Expose the observable$ part of the _todos subject (read only stream)
  readonly printer$ = this._printer.asObservable();

  constructor() {}

  get printer(): string {
    return this._printer.getValue();
  }

  set printer(val: string) {
    this._printer.next(val);
  }

  
}
