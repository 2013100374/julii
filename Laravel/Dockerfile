FROM php:8.1-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    freetype-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory contents
COPY . /var/www/html

# Instala dependencias de Composer y ejecuta migraciones automáticamente
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && php artisan key:generate \
    && php artisan migrate --force || true

# Set permissions for writable directories (if they exist)
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html

# Expose port 8000
EXPOSE 8000

# Start PHP built-in server (since we might not have artisan)
CMD php -S 0.0.0.0:8000 -t /var/www/html

