#!/bin/bash
FILE=./latest-staging-anon-extreme.sql

populate_db() {
    if [[ -f "$FILE" ]]; then
        docker-compose down
        docker-compose up -d adminapp-medified-db
        sleep 5

        docker exec -u postgres adminapp-medified-db psql -c "DROP DATABASE \"adminapp\""
        docker exec -u postgres adminapp-medified-db psql -c "CREATE DATABASE \"adminapp\""
        docker exec -i -u postgres adminapp-medified-db psql adminapp < $FILE
    else 
        echo "$FILE does not exist."
    fi
}

echo "Populating db with $FILE"
populate_db