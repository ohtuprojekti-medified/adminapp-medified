#!/bin/bash

lint_project () {
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
