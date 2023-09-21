package hac;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * Movie class - represents a movie
 */
@Component
public class Movie implements Serializable {
    /**
     * id - movie id
     */
    private int id;
    /**
     * image - movie image
     */
    private String image;
    /**
     * title - movie title
     */
    private String title;
    /**
     * releaseDate - movie release date
     */
    private String releaseDate;
    /**
     * price - movie price
     */
    private double price;

    /**
     * Movie ctor - default
     */
    public Movie() {
    }

    /**
     * Movie ctor - with parameters
     * @param id - movie id
     * @param image - movie image
     * @param title - movie title
     * @param releaseDate - movie release date
     * @param price - movie price
     */
    public Movie(int id, String image, String title, String releaseDate, double price) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.releaseDate = releaseDate;
        this.price = price;
    }

    /**
     * setMovie - set movie parameters
     * @param id - movie id
     * @param image - movie image
     * @param title - movie title
     * @param releaseDate - movie release date
     * @param price - movie price
     */
    public void setMovie(int id, String image, String title, String releaseDate, double price) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.releaseDate = releaseDate;
        this.price = price;
    }

    /**
     * getId - get movie id
     * @return movie id
     */
    public int getId() {
        return id;
    }

    /**
     * getImage - get movie image
     * @return movie image
     */
    public String getImage() {
        return image;
    }

    /**
     * getTitle - get movie title
     * @return movie title
     */
    public String getTitle() {
        return title;
    }

    /**
     * getReleaseDate - get movie release date
     * @return movie release date
     */
    public String getReleaseDate() {
        return releaseDate;
    }

    /**
     * getPrice - get movie price
     * @return movie price
     */
    public double getPrice() {
        return price;
    }
}