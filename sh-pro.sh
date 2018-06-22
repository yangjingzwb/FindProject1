#!/bin/sh
rm -rf release &&
npm run build index &&
# scp -r release/** root@47.96.181.38:/www/html/h5/
scp -r release/** root@www.ifruit.org:/www/html/hebao1/