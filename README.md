Batleth
===============

# Bat'leth is damn sharp battery monitor written in Elixir

App uses Amnesia - a simple wrapper of mnesia from Erlang. 
It consists of two umbrella apps - a module to write the status of the battery and a server. 

Batleth

-> Batleth.ex -> main module

-> BatteryReader -> a module to read the status of the battery

-> Clock.ex -> a module to read the time

-> DatabaseAccess.ex -> a module to use the database

-> Loger.ex -> logger of the app

##First run
Use file make.sh to install the app. It copies the files, creates directories etc. It must be run by a root - otherwise it won't do anything.

Terminal:

    ./make.sh install


Issues:
+ Monitoring in one minute interval
+ File to start and stop the app in Ubuntu
- Can be only run by a root
- Running with the start of the system 
