CREATE TABLE site (
                      id SERIAL PRIMARY KEY,
                      address TEXT,
                      name TEXT,
                        lat DOUBLE PRECISION,
                        lon DOUBLE PRECISION,
                        active BOOLEAN
);

CREATE TABLE driver (
                        id SERIAL PRIMARY KEY,
                        name TEXT,
                        date_of_birth TIMESTAMP,
                        home_site_id INT REFERENCES site(id),
                        active BOOLEAN
);

CREATE TABLE truck (
                       id SERIAL PRIMARY KEY,              -- ID is now an Integer
                       license_plate TEXT,                 -- Updated column name for license plate
                       type TEXT,
                       volume_capacity DOUBLE PRECISION,
                       weight_capacity DOUBLE PRECISION,
                        active BOOLEAN
);

CREATE TABLE transport (
                           id SERIAL PRIMARY KEY,
                           start_site_id INT REFERENCES site(id),
                           destination_site_id INT REFERENCES site(id),
                           start_time TIMESTAMP,
                           arrival_time TIMESTAMP,
                           truck_id INT REFERENCES truck(id)  -- Corrected reference to the truck table
);

CREATE TABLE transport_section (
                                   id SERIAL PRIMARY KEY,
                                   start_site_id INT REFERENCES site(id),
                                   destination_site_id INT REFERENCES site(id),
                                   start_time TIMESTAMP,
                                   arrival_time TIMESTAMP,
                                   driver_id INT REFERENCES driver(id),
                                   transport_id INT REFERENCES transport(id)
);

CREATE TABLE store (
                       id SERIAL PRIMARY KEY,
                        name TEXT,
                       lat DOUBLE PRECISION,
                       lon DOUBLE PRECISION,
                       address TEXT,
                       active BOOLEAN
);

CREATE TABLE cargo (
                       id SERIAL PRIMARY KEY,
                       name TEXT,
                       volume DOUBLE PRECISION,
                       weight DOUBLE PRECISION,
                       destination_id INT REFERENCES store(id),
                        delivered BOOLEAN,
                        active BOOLEAN
);


CREATE TABLE cargo_staying (
                               id SERIAL PRIMARY KEY,
                               site_id INT REFERENCES site(id),
                               cargo_id INT REFERENCES cargo(id),
                               arrival_transport_id INT REFERENCES transport(id),
                               arrival_time TIMESTAMP,
                               start_transport_id INT REFERENCES transport(id),
                               start_time TIMESTAMP
);

CREATE TABLE driver_staying (
                                id SERIAL PRIMARY KEY,
                                site_id INT REFERENCES site(id),
                                driver_id INT REFERENCES driver(id),
                                arrival_transport_section_id INT REFERENCES transport_section(id),
                                arrival_time TIMESTAMP,
                                start_transport_section_id INT REFERENCES transport_section(id),
                                start_time TIMESTAMP
);

CREATE TABLE truck_staying (
                               id SERIAL PRIMARY KEY,
                               site_id INT REFERENCES site(id),
                               truck_id INT REFERENCES truck(id),  -- Corrected reference to the truck table
                               arrival_transport_id INT REFERENCES transport(id),
                               arrival_time TIMESTAMP,
                               start_transport_id INT REFERENCES transport(id),
                               start_time TIMESTAMP
);




CREATE TABLE store_stop_points (
                                   id SERIAL PRIMARY KEY,
                                   transport_section_id INT REFERENCES transport_section(id),
                                   store_id INT REFERENCES store(id),
                                   arrival_time TIMESTAMP,
                                   order_in_section INT
);
