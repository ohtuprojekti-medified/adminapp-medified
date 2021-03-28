#!/bin/bash

# stop on first error
set -e

run_unit_tests () {
    cd ./frontend
    echo $PWD
    npm test
    cd ../backend
    echo $PWD
    npm test
    cd ..
}

echo "Running unit tests"
run_unit_tests