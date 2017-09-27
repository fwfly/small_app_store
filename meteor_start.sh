#!/bin/sh

ip=$1

if [[ -z $ip ]];then
  echo "Please enter a IP like "
  echo "./meteor_start.sh <IP>"
  exit 0
fi

meteor --port=$ip:3000
