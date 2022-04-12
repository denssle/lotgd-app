@echo off

echo install ionic global
call npm uninstall -g ionic
call npm install -g @ionic/cli

echo install angular global
call npm uninstall -g angular/cli
call npm install -g @angular/cli

echo npm install
call npm i

echo npm ionic serve
call ionic serve

@pause
