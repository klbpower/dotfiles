##APACHE
sudo apt install apache2

sudo service apache2 start

sudo service apache2 stop

sudo apt install software-properties-common


##Php

sudo apt install php8.0 php8.0-common php8.0-cli

sudo apt install php8.0-curl php8.0-gd php8.0-json php8.0-mbstring php8.0-gettext
sudo apt install php8.0-intl php8.0-xmlrpc php8.0-soap  php8.0-bcmath 


##Mariadb

sudo apt install mariadb-server mariadb-client

##Phpmyadmin change password and exit

sudo /etc/init.d/mysql start

sudo mysql -u root -p
exit

## exit mariadb/mysql

sudo mysql_secure_installation ##same password


##Update same password protection

use mysql;

update user set plugin='' where user='root';

flush privileges;

sudo /etc/init.d/mysql restart

##Install phpmyadmin


sudo apt install phpmyadmin 

sudo apt install 

sudo ln -s /usr/share/phpmyadmin /var/www/html


sudo /etc/init.d/apache2 restart