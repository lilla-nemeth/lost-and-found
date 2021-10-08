CREATE DATABASE lostandfound
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    pw VARCHAR(255),
    phone VARCHAR(50) UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    modified TIMESTAMP NOT NULL DEFAULT NOW()
);

-- add place for object
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users,
    img TEXT,
    petstatus VARCHAR(50),
    petlocation VARCHAR(50),
    species VARCHAR(50),
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

    -- region VARCHAR(50),
    -- municipality VARCHAR(50),
    -- zip INT,
    -- district VARCHAR(50),
    -- street VARCHAR(50),


-- CREATE TABLE images (
--     id SERIAL NOT NULL PRIMARY KEY,
--     petId INT NOT NULL REFERENCES pets,
--     filename TEXT UNIQUE NOT NULL,
--     filepath TEXT NOT NULL,
--     mimetype TEXT NOT NULL,
--     size BIGINT NOT NULL
-- );


-- CREATE TABLE post (
--     id SERIAL NOT NULL PRIMARY KEY,
--     content VARCHAR(255),
--     imgHERE TEXT NOT NULL
-- );

    -- img TEXT NOT NULL,