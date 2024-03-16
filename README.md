## Build and Run

```
$ yarn setup && yarn ios
```

or

```
$ yarn setup && yarn android
```

## e2e Test

Start the required services:

```
$ docker-compose up
```

Run the e2e tests:

```
$ detox build -c ios.test
$ detox test -c ios.test --reuse
```

## CI 

Currently, the CI Workflow expects a local `macos` runner. Pushes to `main` will trigger the Workflow.

