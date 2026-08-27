
[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

## 1. PROJECT SETUP & INITIAL CONFIGURATION

### 1.1 Installation and Virtual Environment

Python virtual environments isolate project dependencies — always use one. Never install Django globally.

```bash
# Step 1 — Install pip (if not already available)
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py

# Step 2 — Install virtualenv
pip install virtualenv

# Step 3 — Create a project workspace
mkdir django-projects
cd django-projects

# Step 4 — Create and activate a virtual environment
virtualenv venv                   # Create venv
source venv/bin/activate          # Activate on Linux/macOS
venv\Scripts\activate             # Activate on Windows

# Verify the correct Python is being used
which python                      # Should point to venv/bin/python

# Step 5 — Install Django
pip install django                         # Latest stable
pip install "django==4.2"                  # Specific version (LTS recommended)
pip install django djangorestframework      # With Django REST Framework

# Verify installation
python -m django --version
```

---

### 1.2 Creating a Project and Application

Django distinguishes between a **project** (the whole site configuration) and an **app** (a reusable component of the site).

```bash
# Create the project directory structure
django-admin startproject myproject

# Project structure created:
# myproject/
#   manage.py              ← CLI entry point (use instead of django-admin after creation)
#   myproject/
#     __init__.py
#     settings.py          ← All configuration
#     urls.py              ← Root URL dispatcher
#     asgi.py              ← ASGI server entry point
#     wsgi.py              ← WSGI server entry point

# Navigate into the project
cd myproject

# Create a new Django application inside the project
django-admin startapp myapp
# Or equivalently:
python manage.py startapp myapp

# App structure created:
# myapp/
#   __init__.py
#   admin.py              ← Register models with Django Admin
#   apps.py               ← App configuration class
#   migrations/           ← Database migration files
#     __init__.py
#   models.py             ← Database model definitions
#   tests.py              ← Test cases
#   views.py              ← Request handlers
#   urls.py               ← (create manually) URL routing for this app

# Start the development server
python manage.py runserver
python manage.py runserver 8080         # Custom port
python manage.py runserver 0.0.0.0:8000 # Accessible on network
```

> **Note:** After creating a new app, always add it to `INSTALLED_APPS` in `settings.py`:
> 
> ```python
> INSTALLED_APPS = [
>     ...
>     'myapp',                    # Or the full dotted path: 'myapp.apps.MyappConfig'
> ]
> ```

---

### 1.3 Settings Configuration (`settings.py`)

```python
# settings.py — key configuration areas

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# --- SECURITY ---
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'dev-insecure-key')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost 127.0.0.1').split()

# --- INSTALLED APPS ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',       # Django REST Framework
    'myapp',                # Your app
]

# --- DATABASE ---
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',   # Dev
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# PostgreSQL (production recommended)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# --- STATIC AND MEDIA FILES ---
STATIC_URL  = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'   # collectstatic destination
MEDIA_URL   = '/media/'
MEDIA_ROOT  = BASE_DIR / 'media'

# --- EMAIL ---
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST    = 'smtp.gmail.com'
EMAIL_PORT    = 587
EMAIL_USE_TLS = True
```

View the full Laravel guide by subscribing to the premium ☕ [Membership](https://buymeacoffee.com/notescatalog/membership)