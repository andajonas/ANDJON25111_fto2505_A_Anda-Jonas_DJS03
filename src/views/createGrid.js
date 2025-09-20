import { createModal } from "../components/createModal.js";

/**
 * Grid Renderer - Responsible for rendering the grid of podcast cards.
 *
 * @principle SRP - Manages layout and rendering only; delegates card creation and modal logic elsewhere.
 */
export const createGrid = () => {
  const container = document.getElementById("podcastGrid");

  return {
    /**
     * Renders a list of podcast cards into the grid.
     * @param {Object[]} podcastList - Array of podcast objects.
     */
    render(podcastList) {
      container.innerHTML = "";
      podcastList.forEach((p) => {
        // Create the custom element
        const card = document.createElement("podcast-preview");
        card.id = p.id;
        card.setAttribute("title", p.title);
        card.setAttribute("image", p.image);
        card.setAttribute("seasons", p.seasons);
        card.setAttribute("updated", p.updated);
        card.setAttribute("genres", p.genres.join(","));
        
        // Add event listener for the custom element
        card.addEventListener('podcastSelected', (e) => {
          createModal.open(p);
        });
        
        container.appendChild(card);
      });
    },
  };
};