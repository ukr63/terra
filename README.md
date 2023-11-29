### Deploy locally
 - git clone https://github.com/ukr63/terra.git terra
 - cd terra
 - docker-compose up -d
### Do in *PHP-FPM* docker container
 - docker exec -ti terra_php-fpm_1 bash `instead of terra_php-fpm_1 use name of you php-fpm container, look on docker ps NAMES tabs`
 - composer install
 - chmod -R 777 ./
 - php artisan migrate
 - php artisan passport:install
 - visit http://localhost:3000/ and register and you already can manage posts

# Servers
 - http://localhost:3000/ - **frontend**
 - http://localhost:8080/ - **backend**


