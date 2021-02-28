![Github Actions](https://github.com/ohtuprojekti-medified/adminapp-medified/workflows/Node.js%20CI/badge.svg)

# Medified adminapp - Software engineering project course, spring 2021

## Admin application for viewing data collected from depressed patients

University of Helsinki Software engineering project course, spring 2021.

Adminapp is a wed-application for organizations to be able to easily view data collected from clients and app users in visual form.

### Application

#### Frontend

* [Code on GitHub](https://github.com/ohtuprojekti-medified/adminapp-medified/tree/master/frontend)
* Production (coming soon)

#### Backend

* [Code on GitHub](https://github.com/ohtuprojekti-medified/adminapp-medified/tree/master/backend)
* Production (coming soon)

### Documentation

[Product backlog and sprint backlogs](https://docs.google.com/spreadsheets/d/12SjSfmpHuiBGJR2jTG2uMZ6Wvu--zwmGLkGJ7036ziA/edit#gid=0)

[Working hours](https://docs.google.com/spreadsheets/d/12SjSfmpHuiBGJR2jTG2uMZ6Wvu--zwmGLkGJ7036ziA/edit#gid=82105203)

[Project meetings](https://docs.google.com/spreadsheets/d/1Iz9njk4EYOEunnRDfs3cAydd4zUapblLWb9VrtLpe2Y/edit#gid=0)

[Definition of done](https://github.com/ohtuprojekti-medified/adminapp-medified/wiki/Definition-of-Done)

### License

This project is licensed under the terms of the [MIT license](https://github.com/ohtuprojekti-medified/adminapp-medified/blob/master/LICENSE)

### Clone project locally

`git clone git@github.com:ohtuprojekti-medified/adminapp-medified.git`

#### Requirements

#### Run

adminapp-medified/frontend

`npm start`

adminapp-medified/backend

`npm start`

### Development Environment
The development environment is entirely configured in the docker-compose.yml file located in this repository. The file defines the containers/environments for:

- Frontend
- Backend

#### First time install
Run `install.sh` script for running `npm install` locally for both frontend and backend. You can also do this manually.

The project uses PrimeReact libraries. You might have to install the used libraries into the frontend-folder if you are using the app locally. The following installs are recommendated:

```
npm install primereact --save
npm install primeicons --save
npm install primeflex --save
```
#### Start the development environment
`docker-compose up`

#### Stop the development environment
`docker-compose down`

#### Add new npm package
Stop and restart docker-compose after running `npm install` in frontend/backend.

#### Upload database-dump to development environment

```
docker exec -u postgres adminapp-db psql -c "DROP DATABASE \"adminapp\""
docker exec -u postgres adminapp-db psql -c "CREATE DATABASE \"adminapp\""
docker exec -i -u postgres adminapp-db psql adminapp < PATH_TO_DUMP
```

You can go inside docker container to check that data is there:

`docker exec -it -u postgres adminapp-medified-db psql -d adminapp`

