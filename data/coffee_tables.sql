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
    external_path text DEFAULT '',
    internal_path text DEFAULT '',
    xcoord double precision DEFAULT '-1',
    ycoord double precision DEFAULT '-1',
    location geometry,
    opening_hours text DEFAULT '',
    coffee1 text DEFAULT '',
    coffee2 text DEFAULT '',
    coffee3 text DEFAULT '',
    coffee4 text DEFAULT '',
    grinder1 text DEFAULT '',
    grinder2 text DEFAULT '',
    machine1 text DEFAULT '',
    machine2 text DEFAULT '',
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
    pastry boolean DEFAULT false,
    credit_card boolean DEFAULT false,
    last_update timestamp default now()
);

CREATE INDEX coffee_shop_name ON coffee.shops(name);
CREATE INDEX coffee_shop_location ON coffee.shops(location);

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


