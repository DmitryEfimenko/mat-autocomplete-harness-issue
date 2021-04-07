import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { provideValueAccessor } from '@s-libs/ng-core';

@Component({
  selector: 'app-simple-autocomplete',
  templateUrl: './simple-autocomplete.component.html',
  styleUrls: ['./simple-autocomplete.component.scss'],
  providers: [
    provideValueAccessor(SimpleAutocompleteComponent)
  ],
})
export class SimpleAutocompleteComponent implements OnInit, OnDestroy {
  private _options: AutocompleteOption[] = [];
  private onChange: (val: string) => void;
  private onTouched: () => void;
  private destroy$ = new Subject();
  
  formControl = new FormControl();
  filteredOptions: AutocompleteOption[];
  filteredOptions$: Observable<AutocompleteOption[]>;

  @Input()
  get options() {
    return this._options;
  }
  set options(val: AutocompleteOption[]) {
    this._options = val;
    this.filterOptions();
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.formControl.valueChanges.pipe(
      tap((val: string) => {
        this.filterOptions();
        const matchingOpt = this.options.find(x => x.label === val);
        if (matchingOpt) {
          this.onChange(matchingOpt.value);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  writeValue(val: any): void {
    this.formControl.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private filterOptions() {
    const value = this.formControl.value;
    if (value == null) {
      this.filteredOptions = this.options;
      this.cdr.detectChanges();
      return;
    }

    this.filteredOptions = this.options.filter((option) => option.label.toLowerCase().includes(value.toLowerCase()));
    console.log(this.filteredOptions);
    this.cdr.detectChanges();
  }
}

/**
 * Option interface for use with this autocomplete component
 */
export interface AutocompleteOption {
  /**
   * The value to return when a valid option is selected
   */
  value: string;
  /**
   * The translated label that should be shown in the autocomplete list.
   * This is the value that the input must match in order to be considered valid.
   */
  label: string;
  /**
   * Whether the value is preferred. Preferred values will be shown in bold
   * at the top of the autocomplete list.
   */
  preferred?: boolean;
}
