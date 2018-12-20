#!/bin/bash
#
# chmod u+x runonce.sh
# 
# aanroepen voorbeeld:
# 
# ./runonce.sh
#######################

# Maak nieuwe schema's aan in de database. Log in als de PostgreSQL gebruiker "geo":
# http://petereisentraut.blogspot.nl/2010/03/running-sql-scripts-with-psql.html

#######################
# General preparations:
#######################

# Set connection Variables
export PGDATABASE=test
export PGHOST=localhost
export PGPORT=5432
export PGUSER=postgres
export PGPASSWORD=postgres


PGCONF="-d ${PGDATABASE} -U ${PGUSER}"

PGOPTIONS='--client-min-messages=warning' psql $PGCONF -q -f init-db.sql

# Add specific functions:

PGOPTIONS='--client-min-messages=warning' psql $PGCONF -q -f isovist-function.sql
