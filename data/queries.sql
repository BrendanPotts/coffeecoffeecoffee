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
INSERT into coffee.users (name, email, password, enabled, is_admin, shop_id)
VALUES (
    'bob',
    'bob@home.com',
    crypt('password', gen_salt('bf'),
    true,
    false,
    1
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



---
--- Get all coffee shop features for map
---
SELECT
    shop_id, name, about, href, owner, address, phone, email, facebook,
    twitter, instagram, pinterest, icon_path, location,
FROM
    coffee.shops
WHERE
    published;


---
--- Get services and info available at a shop
---
SELECT * FROM coffee.shop_info WHERE shop_id = 1;


---
--- Get photos and thumbnails for a given shop
---
SELECT
    title
    thumbnail_path.
    img_path.
FROM
    coffee.shop_photos
WHERE
    shop_id = 1;



---
---
---
