package com.example.cinema.controller;

import com.example.cinema.model.Film;
import com.example.cinema.model.Film.FilmState;
import com.example.cinema.service.FilmService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/films")
public class FilmController {

    private final FilmService filmService;

    @GetMapping()
    public ResponseEntity<List<Film>> listFilms() {
        return ResponseEntity.ok(filmService.getAllFilms());
    }

    @PostMapping("/new")
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {
        film.setState(FilmState.OPEN);
        return ResponseEntity.ok(filmService.saveFilm(film));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> showEditForm(@PathVariable Long id) {
        return ResponseEntity.ok(filmService.getFilm(id).orElseThrow(()
                -> new IllegalArgumentException("Film not found")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Film> updateFilm(@RequestBody Film film) {
                    return ResponseEntity.ok(filmService.saveFilm(film));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilm(@PathVariable Long id) {
                    filmService.deleteFilm(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<Void> activateFilm(@PathVariable Long id) {
        return filmService.getFilm(id)
                .map(film -> {
                    film.setState(FilmState.ACTIVE);
                    filmService.saveFilm(film);
                    return new ResponseEntity<Void>(HttpStatus.OK);
                })
                .orElse(new ResponseEntity<Void>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateFilm(@PathVariable Long id) {
        return filmService.getFilm(id)
                .map(film -> {
                    film.setState(FilmState.INACTIVE);
                    filmService.saveFilm(film);
                    return new ResponseEntity<Void>(HttpStatus.OK);
                })
                .orElse(new ResponseEntity<Void>(HttpStatus.NOT_FOUND));
    }
}
