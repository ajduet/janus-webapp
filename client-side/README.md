# TestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Further iterations: next steps

Find all hydra-(blank)-service repositories as they are all used by the Janus application, with the current exception of the Salesforce service which is as of yet unused.

For our showcase, this application and our microservices were run locally. Our first suggestion is to serve these onto an EC2 to make them available on more than a single machine. Many beans which were consolidated on the server-side of the architecture were not yet consolidated on the Angular side. Specifically, Minerva and Caliber will share data types on the Java side (among them: Trainer, Batch, and others). These should be consolidated into a single shared models.

Authentication / log-in should also be implemented.

Best of luck! -The January Batch