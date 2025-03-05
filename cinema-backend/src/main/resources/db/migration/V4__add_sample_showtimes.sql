-- Function to generate sample showtimes for each movie
CREATE OR REPLACE FUNCTION generate_sample_showtimes()
RETURNS void AS $$
DECLARE
    film_rec RECORD;
    _current_date DATE;
    start_date DATE;
    end_date DATE;
    showtime1 TIME;
    showtime2 TIME;
    base_times TIME[] := ARRAY['14:30:00'::TIME, '18:00:00'::TIME, '20:30:00'::TIME];
    time_offset INTERVAL;
    film_count INTEGER;
BEGIN
    -- Set date range (1 year before and 1 year after current date)
    start_date := CURRENT_DATE - INTERVAL '1 year';
    end_date := CURRENT_DATE + INTERVAL '1 year';
    
    -- Count total number of films
    SELECT COUNT(*) INTO film_count FROM films;
    
    -- Exit if no films exist
    IF film_count = 0 THEN
        RAISE NOTICE 'No films found in the database';
        RETURN;
    END IF;
    
    -- Loop through each film
    FOR film_rec IN SELECT id FROM films LOOP
        -- Loop through each day in the date range
        _current_date := start_date;
        
        WHILE _current_date <= end_date LOOP
            -- Calculate time offset based on film_id to distribute movies throughout the day
            time_offset := (film_rec.id % film_count) * INTERVAL '30 minutes';
            
            -- Create at least two showtimes for each film per day
            FOR i IN 1..array_length(base_times, 1) LOOP
                -- Add the showtime with the offset
                INSERT INTO showtimes (film_id, start_time)
                VALUES (
                    film_rec.id,
                    (_current_date + base_times[i] + time_offset)::timestamp with time zone
                );
            END LOOP;
            
            _current_date := _current_date + INTERVAL '1 day';
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute the function to generate sample data
SELECT generate_sample_showtimes();

-- Drop the function after use since it's only needed for initialization
DROP FUNCTION IF EXISTS generate_sample_showtimes();
