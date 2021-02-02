![Github Actions](https://github.com/ohtuprojekti-medified/adminapp-medified/workflows/Node.js%20CI/badge.svg)

# Ohjelmistotuotantoprojekti, kevät 2021

## Admin-sovellus depressiopotilailta kerätyn datan tarkasteluun

Kevään 2021 Helsingin yliopiston ohjelmistotuotantoprojekti. Projekti koostuu kahdesta kansiosta, toinen frontendille ja toinen backendille. Kummankin kansion alla on asennusohjeet omassa readme-tiedostossaan.

Projektissa toteutetaan web-sovellus, jolla organisaatiot pääsevät katsomaan asiakkaiden tallentamaa dataa ja sovelluksen käyttötietoja helposti ja selkeässä muodossa.

Projektin backlogit:
[Backlogs](https://docs.google.com/spreadsheets/d/12SjSfmpHuiBGJR2jTG2uMZ6Wvu--zwmGLkGJ7036ziA/edit#gid=0)

Projektin aikana pidetyt palaverit:
[Palaverit](https://docs.google.com/spreadsheets/d/1Iz9njk4EYOEunnRDfs3cAydd4zUapblLWb9VrtLpe2Y/edit#gid=0)

### Definition of done (luonnos, tiimin hyväksyttävänä)

* Unit tests passed
* Code reviewed
* Acceptance criteria met
* Functional tests passed
* Non-Functional requirements met
* Team accepts the User Story (tavallisesti Product owner)
* Code is documented (?)
* Help documentation is updated (?)

## Development Environment
The development environment is entirely configured in the docker-compose.yml file located in this repository. The file defines the containers/environments for:

- Frontend
- Backend
- The database used by the services

The environment variables are defined in .env file. You need to edit .tmp.env file for your local environment (e.g. add 'postgres' for the missing variables).

### Start the development environment
`docker-compose up`

### Stop the development environment
`docker-compose down`
