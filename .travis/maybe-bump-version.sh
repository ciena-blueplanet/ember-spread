#!/bin/bash

if [ "$TRAVIS_NODE_VERSION" != "6.9.1" ]
then
  echo "Skipping version bump for TRAVIS_NODE_VERSION ${TRAVIS_NODE_VERSION}"
  exit 0
fi

if [ "$EMBER_TRY_SCENARIO" != "ember-default" ]
then
  echo "Skipping version bump for EMBER_TRY_SCENARIO ${EMBER_TRY_SCENARIO}"
  exit 0
fi

$(npm root -g)/pr-bumper/.travis/maybe-bump-version.sh
