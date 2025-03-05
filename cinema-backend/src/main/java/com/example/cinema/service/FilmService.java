package com.example.cinema.service;

import com.example.cinema.model.Film;
import com.example.cinema.repository.FilmRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FilmService {
    private final FilmRepository filmRepository;

    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    @Cacheable(value = "films")
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    public Optional<Film> getFilm(Long id) {
        return filmRepository.findById(id);
    }

    public Film saveFilm(Film film) {
        return filmRepository.save(film);
    }

    public void deleteFilm(Long id) {
        filmRepository.deleteById(id);
    }
}
