package com.example.cinema.repository;

import com.example.cinema.model.Film;
import com.example.cinema.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByFilmStateEqualsAndStartTimeBetweenOrderByStartTimeAsc(Film.FilmState filmState, ZonedDateTime startTime, ZonedDateTime endTime);
}
