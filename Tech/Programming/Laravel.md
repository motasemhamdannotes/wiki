

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)


> **Domain:** PHP Backend Framework | MVC Architecture | Eloquent ORM | REST API Development  
> **Relevance:** Web Application Development, REST API Development, Laravel/PHP Security Testing (many enterprise targets run Laravel), OSCP Web Modules, Bug Bounty

- [[#1. ARTISAN CLI : THE LARAVEL COMMAND-LINE INTERFACE|1. ARTISAN CLI : THE LARAVEL COMMAND-LINE INTERFACE]]
	- [[#1. ARTISAN CLI : THE LARAVEL COMMAND-LINE INTERFACE#1.1 Core Application Commands|1.1 Core Application Commands]]
	- [[#1. ARTISAN CLI : THE LARAVEL COMMAND-LINE INTERFACE#1.2 Code Generation — `make:*` Commands|1.2 Code Generation — `make:*` Commands]]
	- [[#1. ARTISAN CLI : THE LARAVEL COMMAND-LINE INTERFACE#1.3 Database Commands|1.3 Database Commands]]

## 1. ARTISAN CLI : THE LARAVEL COMMAND-LINE INTERFACE

Artisan is Laravel's built-in CLI tool. It automates repetitive tasks: generating boilerplate code, running migrations, managing caches, and interacting with your application at runtime. Every Laravel developer must be fluent with Artisan.

### 1.1 Core Application Commands

```bash
# --- MAIN COMMANDS ---
php artisan list                     # Show all available Artisan commands
php artisan help <command>           # Show help for a specific command
php artisan env                      # Display the current environment (local, production, etc.)
php artisan inspire                  # Display an inspiring quote (Easter egg)

# --- APPLICATION LIFECYCLE ---
php artisan serve                    # Start the built-in PHP development server (http://localhost:8000)
php artisan serve --port=8080        # Serve on a custom port
php artisan tinker                   # Open an interactive REPL (Read-Eval-Print Loop) — run PHP/Eloquent live
php artisan down                     # Put app into maintenance mode (returns 503 to users)
php artisan down --secret="bypass"   # Maintenance mode with a bypass token
php artisan up                       # Bring app out of maintenance mode

# --- OPTIMISATION ---
php artisan optimize                 # Cache bootstrap files (config, routes, views) for production
php artisan optimize:clear           # Remove all cached bootstrap files

# --- APPLICATION SETUP ---
php artisan key:generate             # Generate the APP_KEY (required for encryption — run after cloning)
php artisan app:name                 # Set the application namespace
php artisan clear-compiled           # Remove the compiled class file
```

> **Note:** `php artisan tinker` is one of the most powerful debugging and development tools in Laravel. It opens a REPL where you can interact with your Eloquent models, test queries, fire events, and inspect data live — without writing a temporary PHP file. In production debugging, `tinker` is indispensable.

---

### 1.2 Code Generation — `make:*` Commands

The `make:*` family generates boilerplate code files from stubs and places them in the correct directory. This is how you create every component in a Laravel application.

```bash
# --- CONTROLLERS & REQUESTS ---
php artisan make:controller UserController               # Basic controller
php artisan make:controller UserController --resource    # RESTful resource controller (index, create, store, show, edit, update, destroy)
php artisan make:controller UserController --api        # API resource controller (no create/edit — no HTML forms)
php artisan make:controller UserController --model=User # Resource controller with model injection
php artisan make:request StoreUserRequest               # Form request class (validation + authorisation)

# --- MODELS & RELATIONSHIPS ---
php artisan make:model User                             # Eloquent model
php artisan make:model User -m                          # Model + migration
php artisan make:model User -mc                         # Model + migration + controller
php artisan make:model User -mcs                        # Model + migration + controller + seeder
php artisan make:model User --all                       # Model + migration + factory + seeder + controller + policy
php artisan make:factory UserFactory                    # Model factory for test data
php artisan make:seeder UserSeeder                      # Database seeder
php artisan make:observer UserObserver --model=User     # Model observer (lifecycle hooks)

# --- AUTHENTICATION & AUTHORISATION ---
php artisan make:middleware AuthenticateAdmin            # Middleware class
php artisan make:policy UserPolicy --model=User         # Authorisation policy
php artisan make:rule UniqueEmailPerDomain              # Custom validation rule

# --- DATABASE ---
php artisan make:migration create_users_table           # New migration file
php artisan make:migration add_phone_to_users_table --table=users  # Migration on existing table
php artisan make:cast Json                              # Custom Eloquent cast class
php artisan make:scope ActiveScope                      # Reusable Eloquent query scope

# --- EVENTS & QUEUES ---
php artisan make:event UserRegistered                   # Event class
php artisan make:listener SendWelcomeEmail --event=UserRegistered  # Event listener
php artisan make:job SendWelcomeEmail                   # Queueable job class
php artisan make:notification InvoicePaid               # Notification class (email, SMS, Slack)
php artisan make:channel OrderChannel                   # Broadcasting channel

# --- TESTING & UTILITIES ---
php artisan make:test UserTest                          # PHPUnit test class
php artisan make:test UserTest --unit                   # Unit test (not a Feature test)
php artisan make:exception CustomException              # Custom exception class
php artisan make:command SendEmails                     # Custom Artisan command
php artisan make:provider AppServiceProvider            # Service provider
php artisan make:resource UserResource                  # API resource transformer
php artisan make:component Alert                        # Blade view component (PHP class)
php artisan make:mail WelcomeEmail                      # Mailable class
php artisan make:event:generate                         # Generate missing events/listeners from EventServiceProvider
```

---

### 1.3 Database Commands

```bash
# --- MIGRATIONS ---
php artisan migrate                      # Run all pending migrations
php artisan migrate --force              # Force migration in production (bypasses confirmation)
php artisan migrate:fresh                # DROP all tables + re-run all migrations (use in dev only)
php artisan migrate:refresh              # Rollback all + re-run all migrations
php artisan migrate:rollback             # Rollback the last migration batch
php artisan migrate:rollback --step=3   # Rollback last 3 batches
php artisan migrate:reset                # Rollback all migrations (to blank state)
php artisan migrate:install              # Create the migrations tracking table
php artisan migrate:status               # Show status of each migration (pending/ran)

# --- SEEDING ---
php artisan db:seed                      # Run all seeders (DatabaseSeeder)
php artisan db:seed --class=UserSeeder  # Run a specific seeder class
php artisan migrate:fresh --seed         # Fresh migration + seed (common dev workflow)

# --- DATABASE INSPECTION ---
php artisan db                           # Start an interactive database CLI session
php artisan db:show                      # Display overview info about the database
php artisan db:table users               # Display column info for a specific table
php artisan db:wipe                      # Drop all tables, views, and types
php artisan schema:dump                  # Export current schema to a SQL dump file
php artisan model:prune                  # Delete models matching a prunable condition
php artisan model:show User              # Display info about an Eloquent model
```

View the full Laravel guide by subscribing to the premium ☕ [Membership](https://buymeacoffee.com/notescatalog/membership)
