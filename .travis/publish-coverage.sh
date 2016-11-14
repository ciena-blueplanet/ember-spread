#!/bin/bash

if [ "$EMBER_TRY_SCENARIO" != "default" ]
then
  echo "Skipping coverage publish for EMBER_TRY_SCENARIO ${EMBER_TRY_SCENARIO}"
  exit 0
fi

cat coverage/lcov.info | coveralls
