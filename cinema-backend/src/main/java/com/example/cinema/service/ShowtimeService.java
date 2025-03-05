package com.example.cinema.service;

import com.example.cinema.model.Film;
import com.example.cinema.model.Showtime;
import com.example.cinema.repository.ShowtimeRepository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ShowtimeService {
    private final ShowtimeRepository showtimeRepository;

    public ShowtimeService(ShowtimeRepository showtimeRepository) {
        this.showtimeRepository = showtimeRepository;
    }

    public Showtime save(Showtime showtime) {
        return showtimeRepository.save(showtime);
    }

    @Cacheable(value = "showtimes")
    public List<Showtime> findByDate(LocalDate date) {
        ZonedDateTime startOfDay = date.atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);
        return showtimeRepository.findByFilmStateEqualsAndStartTimeBetweenOrderByStartTimeAsc(
                Film.FilmState.ACTIVE, startOfDay, endOfDay);
    }

}
