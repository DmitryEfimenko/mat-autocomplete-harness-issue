import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAutocompleteComponent } from './simple-autocomplete.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { OverlayContainer } from '@angular/cdk/overlay';

const createOption = (value: string, label: string, preferred: boolean) => ({ value, label, preferred });
const inOption = createOption('IN', 'India', false);
const idOption = createOption('ID', 'Indonesia', false);
const ioOption = createOption('IO', 'British Indian Ocean Territory', false);
const options = [ioOption, inOption, idOption];

@Component({
  template: `
    <app-simple-autocomplete [options]="options" [formControl]="control" name="foo"></app-simple-autocomplete>
  `,
})
class HostTestComponent {
  options = options;
  control = new FormControl();
}

fdescribe('SimpleAutocompleteComponent', () => {
  let fixture: ComponentFixture<HostTestComponent>;
  // let component: SimpleAutocompleteComponent;
  let input: MatAutocompleteHarness;
  let overlayContainer: OverlayContainer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
      ],
      declarations: [
        HostTestComponent,
        SimpleAutocompleteComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostTestComponent);
    fixture.detectChanges();
    // component = fixture.componentInstance;
    const loader = TestbedHarnessEnvironment.loader(fixture);
    input = await loader.getHarness(MatAutocompleteHarness);
  });

  it('should have 3 options', async () => {
    await input.focus();
    const opts = await input.getOptions();
    console.log(opts);
    expect(opts.length).toEqual(3);
  });
});
