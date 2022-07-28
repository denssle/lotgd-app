@echo off

echo install ionic
call npm uninstall --location=global ionic
call npm install --location=global @ionic/cli

echo install angular
call npm uninstall --location=global angular/cli
call npm install --location=global @angular/cli

echo npm install
call npm i

echo npm ionic serve
call ionic serve

@pause
