import { createPodcastCard } from "./createPodcastCard.js";
import { createModal } from "./createModal.js";

/**
 * Grid Renderer - Responsible for rendering the grid of podcast cards
 * @module createGrid
 */

/**
 * Creates a grid controller for rendering podcast cards
 * @returns {Object} Grid controller with render method
 */
export const createGrid = () => {
    const container = document.getElementById("podcastGrid");

    return {
        /**
         * Renders a list of podcast cards into the grid
         * @param {Object[]} podcastList - Array of podcast objects
         */
        render(podcastList) {
            container.innerHTML = "";
            podcastList.forEach((p) => {
                const card = createPodcastCard(p, createModal.open);
                container.appendChild(card);
            });
        },
    };
};