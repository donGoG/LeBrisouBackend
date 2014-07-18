#!/usr/bin/env bash

function help {
	echo "# ./install.sh domain name"
	exit 1
}

if [[ $# -lt 1 ]]
then
	help
fi


BASE_DIR=`pwd`

echo "# Install Node.js plugins"
npm install
echo "# changing directory : plugins/"
cd $BASE_DIR/plugins

PLUGINS_DIR=$BASE_DIR/plugins
for dir in `ls ${PLUGINS_DIR}`
do
	echo "# cd ${dir}"
	cd $PLUGINS_DIR/$dir 
	echo "# into ${PLUGINS_DIR}/${dir}"
	echo "# npm install"
	npm install
	echo "# cd .."
	cd ..
done


function genCert {
	#Required
	domain=$1
	commonname=$domain
	 
	#Change to your company details
	country=GB
	state=Nottingham
	locality=Nottinghamshire
	organization=Jamescoyle.net
	organizationalunit=IT
	email=administrator@jamescoyle.net
	 
	#Optional
	password=dummypassword
	 
	if [ -z "$domain" ]
	then
	    echo "# Argument not present."
	    echo "# Usage $0 [common name]"
	 
	    exit 99
	fi
	 
	echo "# Generating key request for $domain"
	 
	#Generate a key
	openssl genrsa -des3 -passout pass:$password -out $domain.key 2048 -noout
	 
	#Remove passphrase from the key. Comment the line out to keep the passphrase
	echo "# Removing passphrase from key"
	openssl rsa -in $domain.key -passin pass:$password -out $domain.key
	 
	#Create the request
	echo "# Creating CSR"
	openssl req -new -key $domain.key -out $domain.csr -passin pass:$password \
	    -subj "/C=$country/ST=$state/L=$locality/O=$organization/OU=$organizationalunit/CN=$commonname/emailAddress=$email"
	 
	echo "# Signing CRT"
	openssl x509 -req -days 365 -in $domain.csr -signkey $domain.key -out $domain.crt
	
	echo "# ---------------------------"
	echo "# -----Below is your CSR-----"
	echo "# ---------------------------"
	echo
	cat $domain.csr
	 
	echo
	echo "# ---------------------------"
	echo "# -----Below is your Key-----"
	echo "# ---------------------------"
	echo
	cat $domain.key
}

echo "# cd ${PLUGINS_DIR}/dictionary-api"
cd ${PLUGINS_DIR}/dictionary-api
if [ ! -d ${PLUGINS_DIR}/dictionary-api/cert ]
then
	echo "# creating ${PLUGINS_DIR}/dictionary-api/cert"
	mkdir ${PLUGINS_DIR}/dictionary-api/cert
fi

if [ ! -z "$1" ]
then
	echo "# generating certs"
	echo "# cd ${PLUGINS_DIR}/dictionary-api/cert"
	cd ${PLUGINS_DIR}/dictionary-api/cert
	genCert $1
fi

echo "# Getting back to ${BASE_DIR}"
cd ${BASE_DIR}
if [ ! -d ${BASE_DIR}/logs ]
then
	echo "# creating logs directory"
	mkdir logs
else
	echo "# logs directory already exists : skipping creation"
fi

