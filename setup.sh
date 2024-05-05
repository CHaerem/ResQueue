#!/bin/bash

# Determine OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="LINUX"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="MAC"
else
    echo "Unsupported OS. This script supports Linux and macOS only."
    exit 1
fi

# Step 1: Install Homebrew on macOS if it's not already installed
if [[ "$OS" == "MAC" ]]; then
    if ! command -v brew &> /dev/null
    then
        echo "Homebrew is not installed. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        echo "Homebrew is already installed."
    fi
fi

# Step 2: Update package lists for upgrades and new package installations on Linux
if [[ "$OS" == "LINUX" ]]; then
    sudo apt-get update
fi

# Step 3: Install Docker if it's not already installed
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Installing Docker..."
    if [[ "$OS" == "MAC" ]]; then
        brew install --cask docker
        open /Applications/Docker.app
    elif [[ "$OS" == "LINUX" ]]; then
        sudo apt-get install -y docker.io
    fi
else
    echo "Docker is already installed."
fi

# Step 4: Install OpenSSL if it's not already installed
if ! command -v openssl &> /dev/null
then
    echo "OpenSSL is not installed. Installing OpenSSL..."
    if [[ "$OS" == "MAC" ]]; then
        brew install openssl
    elif [[ "$OS" == "LINUX" ]]; then
        sudo apt-get install -y openssl
    fi
else
    echo "OpenSSL is already installed."
fi

# Step 5: Run the SSL setup script to generate a self-signed SSL certificate
echo "Generating a self-signed SSL certificate..."
chmod +x generate-ssl.sh
./generate-ssl.sh