# Open Graph Image Generator Server

## Install Docker Engine

[Install Docker Engine](https://docs.docker.com/engine/install/)

## Install Docker-Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose
```

## Setup Virtual Host

### Add Apache config file

```bash
/etc/apache2/sites-available/api.DOMAIN_NAME.com.conf
```

```conf
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName api.DOMAIN_NAME.xyz
    ProxyPreserveHost On

    # setup the proxy
    <Proxy *>
        Order allow,deny
        Allow from all
    </Proxy>
    ProxyPass / http://IP_ADDRESS:8080/
    ProxyPassReverse / http://IP_ADDRESS:8080/
</VirtualHost>
```

### Create symlink

```bash
sudo ln -s /etc/apache2/sites-available/api.DOMAIN_NAME.com.conf /etc/apache2/sites-enabled
```

### Test config

```bash
sudo apachectl configtest
```

### Restart Apache

```bash
sudo service apache2 restart
```

<hr>

Reference: [How To Set Up Apache Virtual Hosts](https://linuxize.com/post/how-to-set-up-apache-virtual-hosts-on-ubuntu-20-04/#:~:text=A%20Virtual%20Host%20is%20an,SSL%20certificates%2C%20and%20much%20more.)
