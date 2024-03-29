#!/bin/bash

install_local_npm_packages () {
    cd ./frontend
    echo $PWD
    npm ci
    cd ../backend
    echo $PWD
    npm ci
    cd ..
    echo $PWD
    npm ci
}

echo "Install local npm packages"
install_local_npm_packages
