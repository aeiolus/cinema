-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create role "postgres";

-- Drop database if it exists and create a new one
DROP DATABASE IF EXISTS cinema;
CREATE DATABASE cinema;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE cinema TO "postgres";
ALTER DATABASE cinema OWNER TO "postgres";
