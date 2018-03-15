# janus-webapp
Janus is a gateway to other applications such as Caliber or Assign Force. This is the webapp portion of the application which contains all of the angular code as well as a simple spring boot server to host the application in production.

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
