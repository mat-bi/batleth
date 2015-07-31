#!/bin/bash

for i in `ls ~/batleth/lib`
do
if [[ $i =~ \.ex~$ ]]
then
rm -f ~/batleth/lib/$i
fi
done
