FROM php:8.3-cli-alpine

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    curl \
    git \
    unzip \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application files
COPY . .

# Run composer install
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Expose port (Railway injects $PORT dynamically)
EXPOSE 8000

# Start command: migrate, cache, and serve with PHP built-in server
CMD ["sh", "-c", "php artisan storage:link --force || true && php artisan migrate --force || true && php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
