#!/bin/sh
rm -rf release &&
npm run build index &&
scp -r release/** root@113.108.79.80:/www/html/