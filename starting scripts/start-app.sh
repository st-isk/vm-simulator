#!/bin/bash

# Check for Node.js and npm
if ! command -v node &> /dev/null
then
    echo "Node.js not found. Installing Node.js..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if ! command -v brew &> /dev/null
        then
            echo "Homebrew not found. Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            echo "Homebrew installed. Please restart your terminal and run the script again."
            exit 1
        fi
        brew install node
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Debian/Ubuntu
        if command -v apt-get &> /dev/null
        then
            sudo apt-get update
            sudo apt-get install -y nodejs npm
        # Red Hat/CentOS
        elif command -v yum &> /dev/null
        then
            sudo yum install -y nodejs npm
        # Arch Linux
        elif command -v pacman &> /dev/null
        then
            sudo pacman -S nodejs npm
        else
            echo "Unsupported Linux distribution. Please install Node.js manually."
            exit 1
        fi
    else
        echo "Unsupported OS. Please install Node.js manually."
        exit 1
    fi
fi

if ! command -v npm &> /dev/null
then
    echo "npm not found. Please install Node.js and try again."
    exit 1
fi

# Check if http-server is already installed
if ! npm list -g http-server &> /dev/null
then
    # Install http-server
    echo "Installing http-server..."
    npm install -g http-server
else
    echo "http-server is already installed."
fi

# Open the default browser
echo "Opening the browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:3000
else
    echo "Unsupported OS. Please open http://localhost:3000 manually."
fi

# Start the server
echo "Starting the server..."
http-server -p 3000