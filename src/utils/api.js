import { formatDate } from './DateUtils.js';

/**
 * Fetches podcast data from the API
 * @async
 * @returns {Promise<Array>} Array of podcast objects
 * @throws {Error} If the API request fails
 */
export const fetchPodcasts = async () => {
    try {
        const response = await fetch('https://podcast-api.netlify.app');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        throw new Error('Failed to load podcasts. Please try again later.');
    }
};

/**
 * Genre mapping object that maps genre IDs to human-readable names
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