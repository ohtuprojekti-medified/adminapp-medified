#!/bin/bash

PS3='Please enter your choice: '

options=(
    "Initial set up (install locally and populate db)."
    "Install locally."
    "Populate db."
    "Quit."
)

while true; do
    select opt in "${options[@]}"; do
        case $opt in
            "Initial set up (install locally and populate db).")
                echo "Initial set up"
                ./scripts/install.sh
                echo "Populate db"
                ./scripts/populate-db.sh
                ;;
            "Install locally.")
                ./scripts/install.sh
                ;;
            "Populate db.")
                ./scripts/populate-db.sh
                ;;
            "Quit.")
                break 2
                ;;
            *) echo "Invalid option $REPLY";;
        esac
        break
    done
done