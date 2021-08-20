##URL https://github.com/nodesource/distributions/blob/master/README.md
sudo apt install curl
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs

#OR

# Using Debian, as root
#curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
#apt-get install -y nodejs

##Check node
node --version

