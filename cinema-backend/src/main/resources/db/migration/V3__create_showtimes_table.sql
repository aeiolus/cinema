CREATE TABLE IF NOT EXISTS showtimes (
    id SERIAL PRIMARY KEY,
    film_id BIGINT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
);

-- Create index for faster date-based queries
CREATE INDEX idx_showtimes_start_time ON showtimes(start_time);
