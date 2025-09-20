// A web component that displays a podcast preview card with title, image, seasons, updated date, and genres.
const genreMap = {
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

class PodcastPreview extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'image', 'seasons', 'updated', 'genres'];
    }

    constructor() {
        super();
        
        // Create shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });
        
        // Define the component's HTML structure
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                
                :host(:hover) {
                    transform: scale(1.02);
                }
                
                .card img {
                    width: 100%;
                    border-radius: 6px;
                }
                
                .card h3 {
                    margin: 0.5rem 0;
                    font-size: 1.1rem;
                }
                
                .card p {
                    margin: 0px;
                    font-size: 0.8rem;
                    color: #555;
                }
                
                .tags {
                    margin: 0.5rem 0;
                }
                
                .tag {
                    background: #eee;
                    padding: 0.3rem 0.6rem;
                    margin-right: 0.5rem;
                    margin-top: 0.5rem;
                    border-radius: 4px;
                    display: inline-block;
                    font-size: 0.8rem;
                }
                
                .updated-text {
                    font-size: 0.8rem;
                    color: #555;
                }
                
                @media (max-width: 480px) {
                    .card h3 {
                        font-size: 1rem;
                    }
                }
            </style>
            <div class="card">
                <img id="image" alt="Podcast cover">
                <h3 id="title"></h3>
                <p id="seasons"></p>
                <div id="genres" class="tags"></div>
                <p id="updated" class="updated-text"></p>
            </div>
        `;
        
        // Cache DOM references
        this.imageEl = this.shadowRoot.getElementById('image');
        this.titleEl = this.shadowRoot.getElementById('title');
        this.seasonsEl = this.shadowRoot.getElementById('seasons');
        this.genresEl = this.shadowRoot.getElementById('genres');
        this.updatedEl = this.shadowRoot.getElementById('updated');
    }

    connectedCallback() {
        // Update the component with attribute values
        this.updateContent();
        
        // Add click event listener
        this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback() {
        // Clean up event listener
        this.removeEventListener('click', this.handleClick);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Update content when attributes change
        if (oldValue !== newValue) {
            this.updateContent();
        }
    }

    /**
     * Updates the component content based on attribute values
     */
    updateContent() {
        if (this.hasAttribute('title')) {
            this.titleEl.textContent = this.getAttribute('title');
        }
        
        if (this.hasAttribute('image')) {
            this.imageEl.src = this.getAttribute('image');
            this.imageEl.alt = `${this.getAttribute('title') || 'Podcast'} cover`;
        }
        
        if (this.hasAttribute('seasons')) {
            const seasons = this.getAttribute('seasons');
            this.seasonsEl.textContent = `${seasons} season${seasons > 1 ? 's' : ''}`;
        }
        
        if (this.hasAttribute('genres')) {
            this.renderGenres();
        }
        
        if (this.hasAttribute('updated')) {
            this.renderUpdatedDate();
        }
    }

    /**
     * Renders genre tags based on genre IDs
     */
    renderGenres() {
        const genreIds = this.getAttribute('genres').split(',').map(id => parseInt(id.trim()));
        const genreNames = genreIds.map(id => genreMap[id] || 'Unknown');
        
        this.genresEl.innerHTML = genreNames
            .map(name => `<span class="tag">${name}</span>`)
            .join('');
    }

    /**
     * Formats and renders the updated date
     */
    renderUpdatedDate() {
        const dateStr = this.getAttribute('updated');
        const date = new Date(dateStr);
        
        this.updatedEl.textContent = `Updated ${date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;
    }

    /**
     * Handles click events on the component
     * Dispatches a custom event with podcast data
     */
    handleClick() {
        const podcastData = {
            id: this.id,
            title: this.getAttribute('title'),
            image: this.getAttribute('image'),
            seasons: this.getAttribute('seasons'),
            updated: this.getAttribute('updated'),
            genres: this.getAttribute('genres')
        };
        
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('podcastSelected', {
            detail: podcastData,
            bubbles: true
        }));
    }
}

// Register the custom element
customElements.define('podcast-preview', PodcastPreview);