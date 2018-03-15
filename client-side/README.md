# Further iterations: next steps

To run the current application:
1. Find all hydra-(blank)-service repositories as they are all used by the Janus application, with the current exception of the Salesforce, Unavailable, and Authentication services which are as of yet unused.
2. Run them (on the dev branches) in this order: Config, Discovery, Gateway, the rest
3. ng serve this application and navigate to localhost:4200

For our showcase, this application and our microservices were run locally. Our first suggestion is to serve these onto an EC2 to make them available on more than a single machine. The changes on this Angular side should be minimal (changing the url in URLService to point to the EC2 rather than localhost for example).

The beans which were consolidated on the server-side of the architecture were not yet consolidated on the Angular side. Specifically, Minerva and Caliber will share data types on the Java side (among them: Trainer, Batch, and others). Many errors which you see on the Angular side are due to the application being unable to parse the input from the server into a form it understands - this should be resolved by making a single shared model between them where they have changed.

Replogic service and the Calendar component are currently nonfunctional but should be implemented. Uncomment the Calendar component from the Minerva-nav.component file to add it back to navigation. Authentication / log-in should also be implemented.

The services do not currently point to the correct endpoints. If you get a 404, that's the reason. Check the hydra-(blank)-service controllers for the correct endpoints. We recommend changing those because some are rather silly.

Also Minerva may be referred to as AssignForce in other places - we were told to change it so we did.

Best of luck! -The January Batch

## TestApp

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
