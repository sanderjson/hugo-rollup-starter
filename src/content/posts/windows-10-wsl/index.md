---
audio: []
date: "2019-12-30"
description: A short guide on how to add Windows Subsystem for Linux (WSL) to Windows 10. 
image: ["img1.jpg"]
tags: ["code", "guide"]
slug: "how-to-access-the-windows-subsystem-for-linux-wsl-on-windows-10"
title: How to Access the Windows Subsystem for Linux (WSL) on Windows 10
videos: []
draft: false
---

# How to Access the Windows Subsystem for Linux (WSL) on Windows 10

## Background Info

### What is WSL?

The Windows Subsystem for Linux (WSL) is a new Windows 10 feature that enables you to run native Linux command-line tools directly on Windows, alongside your traditional Windows desktop and modern store apps.

### What are the benefits?

WSL allows user access to Bash and other common Linux tools. There are many commands and build chains that are difficult and cumbersome to set up on Windows. With the WSL we can access these tools natively. The WSL is more effecient to run on Windows than an actual full virtual machine. Note the WSL does not support desktop applications (Gnome, KDE, etc.), it only allows access to Bash and core Linux xommand-line tools.

## Simple Guide

### Open Windows Power Shell as Admin

Click the Windows Start icon, and type 'powershell'. You should see the icon appear as you are typing. RIGHT click the powershell icon and select 'run as administrator'.

When the shell opens enter this command to enable the WSL.

``` posh
   
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

```

### Restart and Install Linux Distro

Restart the computer. Once your system has rebooted open the Windows Store (click Start icon and type 'store', then LEFT click to select the Windows Store icon). 

Seach 'wsl' inside the Windows Store app. Select Ubuntu, and install. 

When prompted create linux user account and password. You will need your password for 'sudo' access later. 

At this point you should have access to linux bash shell inside Windows 10. If you installed Ubuntu you can upgrade the system with these commands.

``` bash
   
    $ sudo apt update && sudo apt upgrade

```

## Useful Commands for WSL

See details of the Linux distro currently in use

``` bash
   
    $ lsb_release -a

```

Open windows explorer to bash location

``` bash
   
    $ explorer.exe .

```

Install nodejs

 ``` bash
   
    $ sudo apt-get install nodejs

```

Install npm

``` bash
   
    $ sudo apt-get install npm

```

There is also a useful vscode extension for WSL.