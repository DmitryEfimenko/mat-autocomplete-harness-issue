# MatAutocomplete - Harness issue

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

## Overview
This package was generated to demonstrate an issue observed when trying to run a unit test using Autocomplete Harness

## Steps to reproduce
* In the console: `npm run test`
* Make sure NOT to bring the opened Chrome window showing Jasmine tests into the visibility
  - If it opens in front, quickly click on some other window to bring the Chrome window to the background
* Observe: test succeeds
* make a small change in test (change spec name) to trigger test re-run
* Observe: test still succeeds
* Bring the Chrome window showing Jasmine tests into the visibility
* Observe: test fail

## Recording

https://user-images.githubusercontent.com/2098175/113951456-76f5b680-97c8-11eb-9893-5cca66ac1a8c.mp4

