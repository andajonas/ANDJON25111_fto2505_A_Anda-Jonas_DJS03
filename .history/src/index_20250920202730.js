import { podcasts } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";

/**
 * Initializes the podcast application
 * @module index
 */

/**
 * Sets up event listeners and renders the initial grid
 */
function init() {
    document
        .getElementById("closeModal")
        .addEventListener("click", createModal.close);
    const grid = createGrid();
    grid.render(podcasts);
}

// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
