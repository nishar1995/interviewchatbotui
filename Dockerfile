# Base image for Django
FROM python:3.10-slim-buster AS django-base

# Set the working directory
WORKDIR /

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files
COPY . .

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=djangointerviewbot.settings
ENV PYTHONUNBUFFERED=1

# Build the Angular project
FROM node:18 AS angular-build

# Set the working directory
WORKDIR /

# Copy the Angular project files
COPY client .

# Install dependencies and build the project
RUN npm install
RUN npm run build

# Final image
FROM django-base AS final

# Copy the built Angular project to Django's static files directory
COPY --from=angular-build /app/dist /app/myproject/static


# Expose the Django server port
EXPOSE 8000

# Start the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]