#!/bin/bash

echo "                    ##   .                 
              ## ## ##       ==            
           ## ## ## ##      ===            
       /""""""""""""""""\___/ ===        
  ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~   
       \______ o          __/            
         \    \        __/             
          \____\______/                
 
          |          |
       __ |  __   __ | _  __   _
      /  \| /  \ /   |/  / _\ | 
      \__/| \__/ \__ |\_ \__  |"

echo -e "\n############ Building ############\n"
sudo docker build -t auditor ./image-auditor
sudo docker build -t musician ./image-musician

echo -e "\n############ Removing running containers ############\n"
sudo docker rm -f auditor1
sudo docker rm -f musician1
sudo docker rm -f musician2

echo -e "\n############ Starting containers ############\n"
sudo docker run -d --name musician1 musician piano
sudo docker run -d --name musician2 musician violin

sudo docker run -d --name auditor1 auditor

echo -e "\n[+] Auditor IP : $(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' auditor1)"
echo -e "[+] Musician1 IP : $(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' musician1)"
echo -e "[+] Musician2 IP : $(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' musician2)"
