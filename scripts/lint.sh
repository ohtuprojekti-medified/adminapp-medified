#!/bin/bash

lint_project () {
    echo $PWD
    npm run lint-fix
    cd ./frontend
    echo $PWD
    npm run lint-fix
    cd ../backend
    echo $PWD
    npm run lint-fix
    cd ..
}

echo "Fix linting for project"
lint_project
