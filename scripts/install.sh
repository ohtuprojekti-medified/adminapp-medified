#!/bin/bash

install_local_npm_packages () {
    cd ./frontend
    echo $PWD
    npm install
    cd ../backend
    echo $PWD
    npm install
    cd ..
}

echo "Install local npm packages"
install_local_npm_packages
