# Introduction
Sharpsignaljs is a JavaScript library that contains core functionality
 required in most JavaScript projects.

For usage check the usage examples in the unit tests.

# Getting Started
## 1.	Installation process
yarn add sharpsignaljs
or
npm install sharpsignaljs

## 2.	Software dependencies
Sharpsignaljs has no external dependencies.
See package.json for an overview of dev dependencies

## 3.	Latest releases
Version 0.1.0:
- Added KeyValueStore and KeyOfValueStore
- Added Results to handle returning of results and errors (inspired by DDD and Functional design principles as taught by Vladimir Khorikov on Pluralsight and neverthrow library by Gio Delgado)
- Available and tested:
Result,
Result,
ResultBase,
ValidResult,
InvalidResult,
InvalidResultBuilder
- In progress: Operation, OperationResult and OperationResultCollection (todo: tests, usage, ...)

# Build and Test
- yarn or npm i to install dependencies
- yarn build or npm run build to clean and build the solution
- yarn clean or npm clean to only clean the solution
- yarn test or npm run test to run the jest unit tests
(if using webstorm a configuration file is already included to run tests from the GUI.)
- yarn uml or npm run uml to generate uml diagram using tsuml service
- yarn tsviz or npm run tsviz to generate uml diagram images using tsviz. Note: check tsviz documentation for parameters and required external dependencies

# Notes
If using webstorm please vote for this UML class diagrams for Typescript feature: https://youtrack.jetbrains.com/issue/WEB-13063
