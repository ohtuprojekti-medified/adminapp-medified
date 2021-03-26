#!/bin/bash

# stop on first error
set -e

PS3='Please enter your choice: '

options=(
    "Test all (project needs to be running!)."
    "Frontend unit tests."
    "Backend unit tests."
    "E2E tests (project needs to be running!)."
    "Quit."
)

while true; do
    select opt in "${options[@]}"; do
        case $opt in
            "Test all (project needs to be running!).")
                CI=true npm run test:unit && npm run test:e2e
                ;;
            "Frontend unit tests.")
                cd ./frontend
                npm run test
                cd ..
                ;;
            "Backend unit tests.")
                cd ./backend
                npm run test
                cd ..
                ;;
            "E2E tests (project needs to be running!).")
                npm run test:e2e
                ;;
            "Quit.")
                break 2
                ;;
            *) echo "Invalid option $REPLY";;
        esac
        break
    done
done