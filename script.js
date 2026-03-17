/* ============================================
   VIBESYNC - JavaScript Application Logic
   ============================================ */

class VibeSync {
    constructor() {
        this.apiUrl = "http://localhost:5000/api/music";
        this.currentFile = null;
        this.init();
    }

    init() {
        this.setupElements();
        this.attachEventListeners();
    }

    setupElements() {
        // Upload elements
        this.uploadBox = document.getElementById("uploadBox");
        this.fileInput = document.getElementById("imageInput");
        this.previewContainer = document.getElementById("previewContainer");
        this.imagePreview = document.getElementById("imagePreview");
        this.removeBtn = document.getElementById("removeBtn");

        // Submit button
        this.submitBtn = document.getElementById("submitBtn");
        this.btnText = this.submitBtn.querySelector(".btn-text");
        this.btnLoading = this.submitBtn.querySelector(".btn-loading");

        // Results
        this.resultsSection = document.getElementById("resultsSection");
        this.moodCard = document.getElementById("moodCard");
        this.moodText = document.getElementById("moodText");
        this.songsList = document.getElementById("songsList");
        this.backBtn = document.getElementById("backBtn");

        // States
        this.loadingState = document.getElementById("loadingState");
        this.errorState = document.getElementById("errorState");
        this.errorMessage = document.getElementById("errorMessage");
        this.errorRetry = document.getElementById("errorRetry");
    }

    attachEventListeners() {
        // File input
        this.fileInput.addEventListener("change", (e) => this.handleFileSelect(e));
        this.removeBtn.addEventListener("click", () => this.removeImage());

        // Drag and drop
        this.uploadBox.addEventListener("dragover", (e) => this.handleDragOver(e));
        this.uploadBox.addEventListener("dragleave", (e) => this.handleDragLeave(e));
        this.uploadBox.addEventListener("drop", (e) => this.handleDrop(e));

        // Submit
        this.submitBtn.addEventListener("click", () => this.submitForm());

        // Navigation
        this.backBtn.addEventListener("click", () => this.resetForm());
        this.errorRetry.addEventListener("click", () => this.resetForm());

        // Click upload box to trigger file input
        this.uploadBox.addEventListener("click", () => {
            if (!this.currentFile) {
                this.fileInput.click();
            }
        });
    }

    // ============================================
    // FILE HANDLING
    // ============================================

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadBox.classList.add("drag-over");
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadBox.classList.remove("drag-over");
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadBox.classList.remove("drag-over");

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            this.processFile(file);
        } else {
            this.showError("Please drop a valid image file");
        }
    }

    processFile(file) {
        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showError("File size exceeds 5MB limit");
            return;
        }

        this.currentFile = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            this.imagePreview.src = e.target.result;
            this.uploadBox.style.display = "none";
            this.previewContainer.style.display = "block";
            this.submitBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.currentFile = null;
        this.fileInput.value = "";
        this.imagePreview.src = "";
        this.uploadBox.style.display = "block";
        this.previewContainer.style.display = "none";
        this.submitBtn.disabled = true;
    }

    // ============================================
    // API CALL
    // ============================================

    async submitForm() {
        if (!this.currentFile) {
            this.showError("Please select an image first");
            return;
        }

        await this.analyzeMood();
    }

    async analyzeMood() {
        try {
            // Show loading state
            this.showLoadingState();

            // Create FormData
            const formData = new FormData();
            formData.append("image", this.currentFile);

            console.log("Sending request to:", this.apiUrl + "/suggest");
            console.log("File:", this.currentFile.name, this.currentFile.size, this.currentFile.type);

            // Make API request
            const response = await fetch(this.apiUrl + "/suggest", {
                method: "POST",
                body: formData,
            });

            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);

            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(data.error || "Failed to analyze mood");
            }

            if (data.error) {
                throw new Error(data.error);
            }

            this.displayResults(data);
        } catch (error) {
            console.error("Error:", error);

            // Provide a clearer message if the backend cannot be reached or if CORS is blocking the request.
            const message = (error && error.message) ? error.message : "Failed to analyze your mood. Please try again.";
            const friendly = message.includes("Failed to fetch") || message.includes("NetworkError")
                ? `Unable to reach the backend API (http://localhost:5000). Make sure the backend is running and you are loading the app via HTTP (not file://). Open DevTools for more details.`
                : message;

            this.showError(friendly);
        }
    }

    // ============================================
    // DISPLAY RESULTS
    // ============================================

    displayResults(data) {
        // Hide loading state
        this.hideLoadingState();

        // Display mood
        const mood = data.mood || "Unknown Vibe";
        this.moodText.textContent = mood;

        // Animate mood card
        this.animateMoodCard();

        // Display songs
        this.displaySongs(data.songs);

        // Show results section
        this.resultsSection.style.display = "block";
        this.uploadBox.style.display = "none";
        this.previewContainer.style.display = "none";
        this.submitBtn.style.display = "none";

        // Scroll to results
        setTimeout(() => {
            document.querySelector(".results-section").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 300);
    }

    displaySongs(songs) {
        // Clear previous songs
        this.songsList.innerHTML = "";

        if (!songs || songs.length === 0) {
            this.songsList.innerHTML = `
                <div style="text-align: center; grid-column: 1/-1; padding: 2rem;">
                    <p style="color: var(--text-secondary);">No songs found for this mood.</p>
                </div>
            `;
            return;
        }

        // Create song cards
        songs.forEach((song, index) => {
            const songCard = this.createSongCard(song, index + 1);
            this.songsList.appendChild(songCard);

            // Stagger animation
            setTimeout(() => {
                songCard.style.animation = "slideUp 0.6s ease-out forwards";
            }, index * 100);
        });
    }

    createSongCard(song, number) {
        const card = document.createElement("div");
        card.className = "song-card";
        card.innerHTML = `
            <div class="song-number">#${number}</div>
            <div class="song-content">
                <div class="song-name" title="${song.name}">${this.escapeHtml(song.name)}</div>
                <div class="song-artist">
                    <i class="fas fa-user"></i>
                    ${this.escapeHtml(song.artist)}
                </div>
            </div>
            <div class="song-footer">
                <button class="btn-play" data-url="${song.uri}" title="Play on YouTube">
                    <i class="fas fa-play"></i>
                    <span>Play</span>
                </button>
                <button class="btn-open" data-url="${song.uri}" title="Open on YouTube">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Open</span>
                </button>
            </div>
        `;

        // Add event listeners
        const playBtn = card.querySelector(".btn-play");
        const openBtn = card.querySelector(".btn-open");

        playBtn.addEventListener("click", () => {
            this.playInPlayer(song.uri);
        });

        openBtn.addEventListener("click", () => {
            window.open(song.uri, "_blank");
        });

        // Add hover effects
        card.addEventListener("mouseenter", () => {
            this.addRippleEffect(card);
        });

        return card;
    }

    playInPlayer(url) {
        // Open in a new tab (YouTube will handle playback)
        window.open(url, "vibesync_player", "width=1000,height=750");
    }

    addRippleEffect(element) {
        // Simple visual feedback
        element.style.transform = "translateY(-6px)";
    }

    animateMoodCard() {
        const moodIcon = this.moodCard.querySelector(".mood-icon");
        moodIcon.style.animation = "none";
        setTimeout(() => {
            moodIcon.style.animation = "pulse 2s ease-in-out infinite";
        }, 10);
    }

    // ============================================
    // STATE MANAGEMENT
    // ============================================

    showLoadingState() {
        this.loadingState.style.display = "flex";
        this.resultsSection.style.display = "none";
        this.errorState.style.display = "none";

        // Disable buttons
        this.submitBtn.disabled = true;
        this.btnText.style.display = "none";
        this.btnLoading.style.display = "flex";
    }

    hideLoadingState() {
        this.loadingState.style.display = "none";
        this.btnText.style.display = "flex";
        this.btnLoading.style.display = "none";
        this.submitBtn.disabled = false;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorState.style.display = "flex";
        this.loadingState.style.display = "none";
        this.resultsSection.style.display = "none";

        this.btnText.style.display = "flex";
        this.btnLoading.style.display = "none";
        this.submitBtn.disabled = false;

        // Scroll to error
        setTimeout(() => {
            this.errorState.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    resetForm() {
        // Reset UI
        this.resultsSection.style.display = "none";
        this.errorState.style.display = "none";
        this.loadingState.style.display = "none";
        this.uploadBox.style.display = "block";
        this.previewContainer.style.display = "none";
        this.submitBtn.style.display = "flex";

        // Reset form
        this.removeImage();
        this.fileInput.value = "";

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ============================================
    // UTILITIES
    // ============================================

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    window.vibeSync = new VibeSync();
});

// Handle errors
window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);
});

// Prevent default drag behavior on the document
document.addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.addEventListener("drop", (e) => {
    e.preventDefault();
});
