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

Setup the project:

```
$ yarn setup
```

Run the e2e tests:

```
$ detox build -c ios.debug
$ NODE_ENV=test detox test -c ios.debug
```

or

```
$ detox build -c ios.release
$ detox test -c ios.release
```

Note: `e2e` tests are currently broken. Need to be fixed.

## CI 

Currently, the CI Workflow expects a local `macos` runner. Pushes to `main` will trigger the Workflow.

