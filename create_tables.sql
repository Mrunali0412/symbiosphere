-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the locations table
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    location_name VARCHAR(255) NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the environmental_data table
CREATE TABLE environmental_data (
    data_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    location_id INTEGER REFERENCES locations(location_id),
    temperature DECIMAL,
    humidity DECIMAL,
    air_quality VARCHAR(255),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);