#!/bin/bash
CMD=$@
DIR=$(dirname "${BASH_SOURCE[0]}")
ls $DIR/../icons/*png | parallel "echo {/.} : \(\\\"\$(../bin/icon2hex.sh -i {})\\\"\),"