--------------------------------------------------------------------
--------------------------------------------------------------------
--- A Reference list of SQL Queries used in the Application
--------------------------------------------------------------------
--------------------------------------------------------------------


---
--- We need pgcrypto to handle passwords in postgres:
---
CREATE EXTENSION pgcrypto;


---
--- Create a new user in the coffee.users table
---
INSERT into coffee.users (name, email, password, enabled, is_admin)
VALUES (
    'coffeeadmin',
    'admin@coffeecoffee.me',
    crypt('', gen_salt('bf')),
    true,
    true
);

---
--- Update a password:
---
UPDATE coffee.users SET password = crypt('password',gen_salt('bf')) where gid = 1;


---
--- Check a password (eg login).
---
SELECT name, email, is_admin, shop_id FROM coffee.users
    WHERE password is NOT NULL
    AND enabled
    AND email = 'someone@home.com'
    AND password = crypt('password-to-test',password);
