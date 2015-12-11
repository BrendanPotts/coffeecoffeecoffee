CREATE SCHEMA coffee;

---
--- Coffee Shop Table
---
CREATE TABLE coffee.shops(
    shop_id SERIAL,
    name text DEFAULT '',
    about text DEFAULT '',
    href text DEFAULT '',
    owner text DEFAULT '',
    address text DEFAULT '',
    phone text DEFAULT '',
    email text DEFAULT '',
    facebook text DEFAULT '',
    twitter text DEFAULT '',
    instagram text DEFAULT '',
    pinterest text DEFAULT '',
    icon_path text DEFAULT '',
    x double precision DEFAULT '-1',
    y double precision DEFAULT '-1',
    location geometry,
    published boolean DEFAULT true,
    last_update timestamp default now()
);

CREATE INDEX coffee_shop_name ON coffee.shops(name);
CREATE INDEX coffee_shop_location ON coffee.shops(location);
CREATE INDEX coffee_shop_published coffee.shops(published);

---
--- Coffee Shop Services
---
CREATE TABLE coffee.shop_info(
    gid serial,
    shop_id int,
    coffee1 text,
    coffee2 text,
    coffee3 text,
    coffee4 text,
    grinder1 text,
    grinder2 text,
    machine1 text,
    machine2 text
    seating boolean DEFAULT false,
    dedicated boolean DEFAULT false,
    wifi boolean DEFAULT false,
    service boolean DEFAULT false,
    loyality boolean DEFAULT false,
    child_friendly boolean DEFAULT false,
    work_friendly boolean DEFAULT false,
    hot_food boolean DEFAULT false,
    lunch boolean DEFAULT false,
    breakfast boolean DEFAULT false,
    kitchen boolean DEFAULT false,
    credit_card boolean DEFAULT false
);
CREATE INDEX coffee_shop_services_id ON coffee.shop_services(shop_id);

---
--- Shop Photos
---
CREATE TABLE coffee.shop_photos(
    gid serial,
    shop_id int,
    title text,
    thumbnail_path text,
    img_path text
);
CREATE INDEX coffee_shop_photo_id ON coffee.shop_photos(shop_id);

---
--- Opening Hours table for each shop
---
CREATE TABLE coffee.opening_hours(
    gid SERIAL,
    shop_id int,
    monday_opening time DEFAULT '08:00:00'::time,
    monday_closing time DEFAULT '18:00:00'::time,

    tuesday_opening time DEFAULT '08:00:00'::time,
    tuesday_closing time DEFAULT '18:00:00'::time,

    wednesday_opening time DEFAULT '08:00:00'::time,
    wednesday_closing time DEFAULT '18:00:00'::time,

    thursday_opening time DEFAULT '08:00:00'::time,
    thursday_closing time DEFAULT '18:00:00'::time,

    friday_opening time DEFAULT '08:00:00'::time,
    friday_closing time DEFAULT '18:00:00'::time,

    saturday_opening time DEFAULT '08:00:00'::time,
    saturday_closing time DEFAULT '18:00:00'::time,

    sunday_opening time DEFAULT '08:00:00'::time,
    sunday_closing time DEFAULT '18:00:00'::time,

    bankhol_opening time DEFAULT '10:00:00'::time,
    bankhol_closing time DEFAULT '14:00:00'::time
);
CREATE INDEX coffee_shop_hours_id ON coffee.opening_hours(shop_id);


--------------------------------------------------------------------
--------------------------------------------------------------------
--- Application Specific Tables
--------------------------------------------------------------------
--------------------------------------------------------------------

CREATE TABLE coffee.users (
    gid serial,
    name text DEFAULT '',
    email text,
    password text,
    enabled boolean DEFAULT false,
    is_admin boolean DEFAULT false,
    shop_id int
);
