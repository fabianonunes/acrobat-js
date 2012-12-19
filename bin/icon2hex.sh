#!/bin/bash
CMD=$@
DIR=$(dirname "${BASH_SOURCE[0]}")
java -jar $DIR/icon2hex.jar $*