CREATE DATABASE lostandfound
    WITH 
    OWNER = postgres
    CONNECTION LIMIT = -1;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    isadmin BOOLEAN DEFAULT FALSE,
    username VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    pw VARCHAR(255),
    phone VARCHAR(50) UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users,
    img TEXT,
    petstatus VARCHAR(50),
    petlocation VARCHAR(255),
    species VARCHAR(255),
    petsize VARCHAR(50),
    breed VARCHAR(255),
    sex VARCHAR(50),
    color VARCHAR(255),
    age VARCHAR(50),
    uniquefeature VARCHAR(255),
    postdescription VARCHAR(255),
    since TIMESTAMP NOT NULL DEFAULT NOW(),
    until TIMESTAMP
);

-- Columns for detailed location:
    -- region VARCHAR(50),
    -- municipality VARCHAR(50),
    -- zip INT,
    -- district VARCHAR(50),
    -- street VARCHAR(50),