import { genres } from "./data.js";

/**
 * Service to retrieve genre titles from genre IDs
 * @module GenreService
 */

/**
 * Resolves an array of genre IDs into an array of genre titles
 * @param {number[]} genreIds - Array of genre IDs
 * @returns {string[]} Array of genre titles
 */
export const getNames = (genreIds) => {
    return genreIds.map(
        (id) => genres.find((g) => g.id === id)?.title || "Unknown"
    );
};

/**
 * Genre mapping object for quick lookup
 * @type {Object.<number, string>}
 */
export const genreMap = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family"
};