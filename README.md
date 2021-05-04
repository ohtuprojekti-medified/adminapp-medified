![Github Actions](https://github.com/ohtuprojekti-medified/adminapp-medified/workflows/MASTER%20PUSH/badge.svg)

# Medified adminapp - Software engineering project course, spring 2021

## Admin application for viewing data collected from depressed patients

University of Helsinki Software engineering project course, spring 2021.

Adminapp is a wed-application for organizations to be able to easily view data collected from clients and app users in visual form.

### Application

* [Production](https://stats.medified.fi/)
* [Frontend code on GitHub](https://github.com/ohtuprojekti-medified/adminapp-medified/tree/master/frontend)
* [Backend code on GitHub](https://github.com/ohtuprojekti-medified/adminapp-medified/tree/master/backend)


## Documentation

[Product backlog and sprint backlogs](https://docs.google.com/spreadsheets/d/12SjSfmpHuiBGJR2jTG2uMZ6Wvu--zwmGLkGJ7036ziA/edit#gid=0)

[Working hours](https://docs.google.com/spreadsheets/d/12SjSfmpHuiBGJR2jTG2uMZ6Wvu--zwmGLkGJ7036ziA/edit#gid=82105203)

[Project meetings](https://docs.google.com/spreadsheets/d/1Iz9njk4EYOEunnRDfs3cAydd4zUapblLWb9VrtLpe2Y/edit#gid=0)

[Definition of done](https://github.com/ohtuprojekti-medified/adminapp-medified/wiki/Definition-of-Done)

[Backend API](https://github.com/ohtuprojekti-medified/adminapp-medified/wiki/Backend-API)

### License

This project is licensed under the terms of the [MIT license](https://github.com/ohtuprojekti-medified/adminapp-medified/blob/master/LICENSE)

## Requirements
To run adminapp locally, you will need:

1. [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/)
2. Local copy of this repository

## Installation

_All commands mentioned are run in project root._

Install project locally and/or add datadump (if you have it) to database with

`npm run initial` and follow instructions.

Add correct env variables by copying `.tmp.env` file as `.env` and filling out missing values.
## Development environment
The development environment is entirely configured in the docker-compose.yml file located in this repository. The file defines the containers/environments for:

- Frontend
- Backend

### Start development environment

Run development environment locally with

`npm start`

This runs `docker-compose up`.

### Stop development environment

Stop dev env from another terminal with

`npm stop`

which is the same as `docker-compose down`.

### Run tests

Run all tests with

`npm test` and follow instructions.

(E2E tests require that project is running in the background)

### Other commands

- `npm run lint` fixes linting for the project
- `npm run test:e2e` runs e2e tests (cypress)
- `npm run test:unit` runs unit tests

Check out `package.json` in root for all commands.


### Add new npm package

Stop and restart project after running `npm install` in frontend/backend.



