---
audio: []
date: "2020-02-27"
description: Short guide on how to set up a clean install of PostgreSQL 12 on Fedora 31. Useful for new users struggling to follow multiple blogs and stackoverflow solutions.
image: ["img1.jpg"]
slug: "how-to-set-up-postgresql-12-on-fedora-31"
tags: ["code", "guide", "linux"]
title:  How to Set Up PostgreSQL 12 on Fedora 31
videos: []
draft: false
---

# Set Up PostgreSQL 12 on Fedora 31

## Remove PostgreSQL for a Clean Install

Only follow these steps if you need to completely remove PostgreSQL installaiton from your machine for a fresh install. This may be useful if you have changed many files while following other tutorials or stack overflow threads.

List all packages with 'post' in the name that are currently installed using rpm or yum.

```bash

    $ yum list installed | grep post
    # or
    $ rpm -qa | grep post

```

Remove each package installed with:

```bash

    rpm -e packageName

```

You will likely still have a system postgres user (this is fine). Switch to this user, and remove postgres older installation files with the following (assumes version 11 is installed).

```bash

    $ sudo -i -u postgres
    $ cd ~ 
    $ ls 
    $ rm -rf 11

```

You can confirm there are no other active services with:

```bash

    $ systemctl list-units --type=service | grep post

```

## Install PostgreSQL 12 on Fedora 31

These steps will guide you through a fresh install of PostgreSQL 12 on Fedora 31. The process is very similar if you require PostgreSQL 11 and/or are using Fedora 29, 30, 31. Change the version numbers as required.

### Install Vim Update and Reboot

```bash

    $ sudo dnf install -y vim bash-completion 
    $ sudo dnf update -y
    $ sudo reboot

```

### Add the PostgreSQL Repo and Install

Install the repo

```bash

    $ sudo dnf install <https://download.postgresql.org/pub/repos/yum/reporpms/F-31-x86_64/pgdg-fedora-repo-latest.noarch.rpm>

```

Install the software

```bash

    $ sudo dnf install postgresql12-server postgresql12

```

### Setup Initial Database and Enable the Service

```bash

    $ sudo /usr/pgsql-12/bin/postgresql-12-setup initdb

```


```bash

    $ sudo systemctl enable --now postgresql-12

```

Confirm the Service

```bash

    $ systemctl status postgresql-12

```


Allow Service over Firewall (for remote clients)

```bash

    $ sudo firewall-cmd --add-service=postgresql --permanent $ sudo firewall-cmd --reload

```

### Configure PostgresSQL Files

Login as the postgres user

```bash

    $ sudo -i -u postgres

```

Note: to return at anytime to your previous user while in bash use Ctrl + d

Set a Password for the postgres User

```bash

    $ psql -c "alter user postgres with password 'writeYourPasswordHere'"

```


Access postgres User Config Files

```bash

    $ cd ~ 
    $ pwd 
    $ cd /var/lib/pgsql/12/data/ 
    $ ls

```

Note: Fedora vs Ubuntu Config File Location

On Fedora the PostgreSQL config files may be found here:

```bash

    $ cd /var/lib/pgsql/12/data/

```


If using Ubuntu you may find the config files here:

```bash

    $ cd /etc/postgresql/12/main/

```

Edit postgresql.conf

```bash

    $ vim postgresql.conf

```

Note: while in the vim editor use i to access the insert tool, esc to exit the insert tool (enter command mode), and :wq to exit vim.

Change this line 

```text

    listen_addresses = 'localhost'
    to
    listen_addresses = '*'

```

Edit pg_hba.conf

```bash

    $ vim pg_hba.conf

```

Change ident methods to md5, add a custom line at file end (see below).

```text


    #
    # If you want to allow non-local connections, you need to add more
    # "host" records.  In that case you will also need to make PostgreSQL
    # listen on a non-local interface via the listen_addresses
    # configuration parameter, or via the -i or -h command line switches.



    # TYPE  DATABASE        USER            ADDRESS                 METHOD

    # "local" is for Unix domain socket connections only
    local   all             all                                     peer
    # IPv4 local connections:
    host    all             all             127.0.0.1/32            md5
    # IPv6 local connections:
    host    all             all             ::1/128                 md5
    # Allow replication connections from localhost, by a user with the
    # replication privilege.
    local   replication     all                                     peer
    host    replication     all             127.0.0.1/32            md5
    host    replication     all             ::1/128                 md5
    # custom line
    host    all             all            2.0.0.0/0                md5


```

Restart the postgres Service After Editing .config Files

```bash

    $ systemctl restart postgresql-12

```

### Create New PosgreSQL Role

Create New Role

If currently have access to postgres prompt you can create a new role with createuser --interactive --pwprompt. This will start a role wizard creation prompt.

```bash

    $ createuser --interactive --pwprompt

```


If you are in your default linux bash shell you can access the same postgres user prompt with sudo -u postgres createuser --interactive --pwprompt. The rest of the commands given are from the postgres user prompt (sudo -i -u postgres & Cntrl + d to exit).

```bash

    $ sudo -u postgres createuser --interactive --pwprompt

```

### Create New Database

The following commands will have a similar effect: create a new database called "myNewDb" and grant privileges to user "myPostgresUser"

```bash

    $ createdb -O myPostgresUser myNewDbName

    # or

    $ createdb --owner=myPostgresUser myNewDbName

    # or

    $ createdb myNewDBName
    $ psql
    $ psql=# grant all privileges on database myNewDbName to myPostGresUser;

```

Note: do not forget the ; is required to execute commands in the psql shell.

### Drop a Database

If needed a databse can be easily dropped from the psql shell.

```bash

    $ psql $ postgres=# drop database if exists "myNewDbName";

```

### List All Current Databases

Get a List of All Current Databse

```bash

    $ psql
    $ postgres=# \l

```

With that you should have a simple PosgreSQL 12 instance set up on Fedora 31, 
and understand some basic commands for navigating the terminal shell, and editing config files.