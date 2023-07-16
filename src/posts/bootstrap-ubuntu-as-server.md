---
date: '2023-06-14'
title: Bootstrap ubuntu as server
description: Installing all the needed for home baked services
excerpt: How i setup ubuntu
categories:
  - technical
  - tutorial
published: true
---

screenshots to follow currently recreating the proccess

Used proxmox add additional notes into installing on other physical devices / vm

# Downloading Ubuntu

We are not savages so we are gonna use the LTS version, feel free to use other versions
as of the date of this writing the latest is **Ubuntu Server 22.04.2 LTS**

Go to this [page](https://ubuntu.com/download/server)

Click on the download button an ISO file will be downloaded for you.

Things to do when download is completed

- Link will be added here in the future after i write a specific guide using the following
- Bootable Flashdrive for physical installation
- VM using VMWare or VirtualBox
- Promox Instance

---

# Installing Ubuntu

1. Start the machine
2. Boot into the installation medium
3.

a-z 0-9 \_ and -

login and ssh

---

# Installing Docker and Portainer

```sh

sudo apt-get install ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
 "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
 "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
 sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose

sudo docker run -d -p 8000:8000 -p 9443:9443 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest

sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

```

# Installing Postgres and PgAdmin4

```sh

sudo docker volume create postgresqldata

sudo docker run -d -v postgresqldata:/data/db -e POSTGRES_PASSWORD=postgres --name postgres -p 5432:5432 postgres

sudo docker run --name pgadmin -e "PGADMIN_DEFAULT_EMAIL=mac@mkra.dev" -e "PGADMIN_DEFAULT_PASSWORD=somethingsecret" -p 8080:80 -d dpage/pgadmin4

sudo docker network create --driver bridge pgnetwork

sudo docker network connect pgnetwork pgadmin
sudo docker network connect pgnetwork postgres


docker network inspect pgnetwork

```

```sh

sudo apt install build-essentials cmake zsh
type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

clone dotfiles
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

```

```yaml
version: '3.9'

services:
  pg:
    container_name: postgres
    image: postgres
    # automatically restarts the container - Docker daemon on restart or
    # the container itself is manually restarted
    restart: always
    volumes:
      - postgresqldata:/data/db

    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    ports:
      - '5432:5432'
    networks:
      - bridge
      - pgnetwork

  pgadmin:
    container_name: pgadmin4
    image: dpage/pgadmin4
    restart: always

    environment:
      PGADMIN_DEFAULT_EMAIL: root@root.com
      PGADMIN_DEFAULT_PASSWORD: root

    ports:
      - '8080:80'
    networks:
      - bridge
      - pgnetwork

volumes:
  postgresqldata:

networks:
  bridge:
  pgnetwork:
```
