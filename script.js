
// =================================
// GHOSTS OF SPACE - INTERACTIVITY
// =================================

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    menuToggle.textContent =
        navLinks.classList.contains("show") ? "×" : "☰";
});

// Close mobile navigation after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
    });
});

// MACHINE STORY DATABASE

const machineStories = {

    lrv: {
        title: "Lunar Roving Vehicle",
        text: "The Lunar Roving Vehicle was used during Apollo 15, 16 and 17. It allowed astronauts to travel much farther across the lunar surface than they could on foot. The vehicles were left behind at their respective landing sites after the missions. Their legacy lives on in the scientific exploration they made possible."
    },

    surveyor: {
        title: "Surveyor 3",
        text: "Surveyor 3 landed on the Moon in April 1967. It studied the lunar surface and transmitted photographs and scientific information to Earth. In November 1969, Apollo 12 astronauts visited the lander and retrieved some of its components for examination back on Earth. It remains an extraordinary example of two missions meeting on another world."
    },

    sojourner: {
        title: "Sojourner",
        text: "Sojourner arrived on Mars aboard the Pathfinder mission in July 1997. It became the first successful Mars rover. It examined Martian rocks and soil, demonstrating that mobile robotic exploration was possible on another planet. Communication with the Pathfinder lander was lost in September 1997."
    },

    spirit: {
        title: "Spirit",
        text: "Spirit landed on Mars in January 2004. It was designed for a 90-sol mission but operated for more than six years. In 2009, it became stuck in soft Martian soil. NASA's final communication attempt took place in March 2010, and the mission was declared complete in May 2011. Its discoveries transformed our understanding of ancient Martian environments."
    },

    opportunity: {
        title: "Opportunity",
        text: "Opportunity landed on Mars in January 2004. Originally designed for just 90 sols, it continued exploring for almost 15 years. It discovered evidence that liquid water had once existed on Mars. A massive dust storm in 2018 blocked sunlight from reaching its solar panels. NASA ended the mission in February 2019 after unsuccessful communication attempts."
    },

    ingenuity: {
        title: "Ingenuity",
        text: "Ingenuity arrived on Mars with the Perseverance rover in February 2021. It was originally designed for five experimental flights but completed 72 flights. In January 2024, NASA announced that damage to one or more rotor blades had ended its flying mission. It remains on the Martian surface as a historic technological achievement."
    }

};

// STORY MODAL

const modal = document.getElementById("storyModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".story-button").forEach(button => {

    button.addEventListener("click", () => {

        const storyId = button.dataset.story;
        const story = machineStories[storyId];

        if (!story) return;

        modalTitle.textContent = story.title;
        modalText.textContent = story.text;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    });

});

// CLOSE MODAL

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

// Close when clicking outside the popup

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close using Escape key

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

console.log("GHOSTS OF SPACE website loaded successfully!");


/* ==========================================
   STAGE 2 - INTERACTIVE PLANETARY MAP
========================================== */

// Planetary map tile sources from OpenPlanetaryMap

const planetaryMaps = {
    moon: {
        name: "THE MOON",
        center: [0, 0],
        zoom: 2,
        tiles: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png"
    },

    mars: {
        name: "MARS",
        center: [0, 0],
        zoom: 2,
        tiles: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
    }
};


// Mission information and approximate coordinates

const planetaryMissions = {

    moon: [
        {
            name: "Apollo 17 Lunar Rover",
            type: "LUNAR ROVER",
            location: "Apollo 17 landing site",
            coordinates: [20.19, -30.77],
            year: "1972",
            status: "Left on the lunar surface",
            story: "The Lunar Roving Vehicle helped Apollo 17 astronauts explore a wider area of the Moon. After the astronauts departed, the rover remained at the landing site.",
            legacy: "It allowed astronauts to collect samples and explore lunar geology much farther from their lander.",
            source: "https://www.nasa.gov/history/alsj/a17/a17.html"
        },

        {
            name: "Surveyor 3",
            type: "ROBOTIC LANDER",
            location: "Oceanus Procellarum",
            coordinates: [-3.01, -23.42],
            year: "1967",
            status: "Inactive on the Moon",
            story: "Surveyor 3 landed on the Moon in April 1967. It photographed and studied the lunar surface. Two years later, Apollo 12 astronauts visited the spacecraft and retrieved some of its components.",
            legacy: "Its findings helped scientists understand the lunar surface and prepare for human exploration.",
            source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A"
        },

        {
            name: "Apollo 17 ALSEP",
            type: "SCIENTIFIC INSTRUMENTS",
            location: "Apollo 17 landing site",
            coordinates: [20.19, -30.76],
            year: "1972",
            status: "Surface instruments; operations ended",
            story: "The Apollo Lunar Surface Experiments Package contained scientific instruments deployed by astronauts. Its instruments sent data back to Earth for years after the mission.",
            legacy: "The experiments helped scientists study lunar seismic activity, heat flow and the Moon's interior.",
            source: "https://science.nasa.gov/moon/"
        }
    ],

    mars: [
        {
            name: "Sojourner",
            type: "ROBOTIC ROVER",
            location: "Ares Vallis",
            coordinates: [19.13, -33.22],
            year: "1997",
            status: "Mission completed",
            story: "Sojourner explored the Martian surface after arriving with the Pathfinder mission in 1997. It examined rocks and soil and demonstrated the potential of mobile robotic exploration.",
            legacy: "It paved the way for later generations of Mars rovers.",
            source: "https://science.nasa.gov/mission/mars-pathfinder/"
        },

        {
            name: "Spirit",
            type: "MARS EXPLORATION ROVER",
            location: "Gusev Crater",
            coordinates: [-14.57, 175.47],
            year: "2004",
            status: "Communication ended in 2010",
            story: "Spirit was designed for a 90-sol mission but operated for more than six years. It eventually became trapped in soft soil and NASA could not re-establish communication.",
            legacy: "Spirit found evidence of ancient water-related environments and transformed our understanding of Mars.",
            source: "https://science.nasa.gov/mission/mer-spirit/"
        },

        {
            name: "Opportunity",
            type: "MARS EXPLORATION ROVER",
            location: "Meridiani Planum",
            coordinates: [-1.95, -5.53],
            year: "2004",
            status: "Mission ended in 2019",
            story: "Opportunity was originally designed for 90 sols but explored Mars for nearly 15 years. A massive dust storm in 2018 blocked sunlight from reaching its solar panels. NASA ended the mission in February 2019.",
            legacy: "It discovered geological evidence that liquid water had once existed on Mars.",
            source: "https://science.nasa.gov/mission/mer-opportunity/"
        }
    ]
};


// Create the map

const planetMap = L.map("planetMap", {
    center: [0, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 8,
    worldCopyJump: false
});


// Add the planetary surface

let currentTileLayer;

let missionMarkers = L.layerGroup().addTo(planetMap);


// Show mission information in the right panel

function showMission(mission) {

    const details = document.getElementById("missionDetails");

    if (mission.name === "Opportunity") {
        window.location.href = "opportunity.html";
        return;
    }
    
    if (mission.name === "Spirit") {
        window.location.href = "spirit.html";
        return;
    }
    
    if (mission.name === "Sojourner") {
        window.location.href = "sojourner.html";
        return;
    }
    
    if (mission.name == "Surveyor 3") {
        window.location.href = "surveyor.html";
        return;
    }

    if (mission.name == "Apollo 17 ALSEP") {
        window.location.href = "lrv.html";
        return;
    }

    details.innerHTML = `
        <div class="mission-location">
            ${mission.type} · ${mission.year}
        </div>

        <h3>${mission.name}</h3>

        <p><strong>Location:</strong> ${mission.location}</p>

        <p><strong>Mission status:</strong> ${mission.status}</p>

        <p>${mission.story}</p>

        <div style="margin-top:20px;">
            <span class="explorer-small-label">
                SCIENTIFIC LEGACY
            </span>

            <p>${mission.legacy}</p>
        </div>

        <a href="${mission.source}"
           target="_blank"
           rel="noopener noreferrer"
           style="
             display:inline-block;
             margin-top:22px;
             color:#b29aff;
             font-size:11px;
             font-weight:700;
           ">
           EXPLORE MISSION SOURCE ↗
        </a>
    `;
}


// Load the selected planet

function loadPlanet(planet) {

    const config = planetaryMaps[planet];

    document.getElementById("planetName").textContent = config.name;

    // Remove old map tiles

    if (currentTileLayer) {
        planetMap.removeLayer(currentTileLayer);
    }

    // Remove old mission markers

    missionMarkers.clearLayers();

    // Load the new planetary map

    currentTileLayer = L.tileLayer(config.tiles, {
        minZoom: 1,
        maxZoom: 8,
        noWrap: true,
        attribution: '&copy; <a href="https://openplanetarymap.org/">OpenPlanetaryMap</a>'
    });

    currentTileLayer.addTo(planetMap);

    planetMap.setView(config.center, config.zoom);

    // Reset information panel

    document.getElementById("missionDetails").innerHTML = `
        <div class="empty-state-icon">✦</div>
        <h3>SELECT A MISSION</h3>
        <p>Choose a highlighted location on the map to explore its forgotten equipment and scientific legacy.</p>
    `;

    // Create mission markers

    planetaryMissions[planet].forEach(mission => {

        const marker = L.circleMarker(mission.coordinates, {
            radius: 9,
            color: "#ffffff",
            weight: 2,
            fillColor: "#a68cff",
            fillOpacity: 1
        });

        marker.bindPopup(`<strong>${mission.name}</strong><br>${mission.type}`);

        marker.on("click", () => {
            showMission(mission);
        });

        marker.addTo(missionMarkers);

    });

    // Update active planet button

    document.querySelectorAll(".planet-btn").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.planet === planet
        );
    });

    // Allow Leaflet to calculate its correct size

    setTimeout(() => {
        planetMap.invalidateSize();
    }, 100);
}


// Planet switching buttons

document.querySelectorAll(".planet-btn").forEach(button => {

    button.addEventListener("click", () => {

        loadPlanet(button.dataset.planet);

    });

});


// Start with the Moon

loadPlanet("moon");

console.log("Planetary Explorer initialized successfully!");

// =====================================
// STAGE 4.1 - LOADING SCREEN ACTIVATION
// =====================================

window.addEventListener("load", function () {

    const loadingScreen = document.getElementById("loadingScreen");

    if (loadingScreen) {
        setTimeout(function () {
            loadingScreen.remove();
        }, 2100);
    }

});

// =====================================
// STAGE 4.2 - ANIMATED MISSION STATISTICS
// =====================================

const counters = document.querySelectorAll(".count-up");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const value = Math.floor(progress * target);

                counter.textContent = String(value).padStart(2, "0");

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = String(target).padStart(2, "0");
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);

        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// =====================================
// STAGE 4.5 - SCROLL REVEAL ACTIVATION
// =====================================

// =====================================
// STAGE 4.5 - SCROLL REVEAL ACTIVATION
// =====================================

const revealSections = document.querySelectorAll(".reveal-section");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.05
    });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

} else {

    revealSections.forEach(section => {
        section.classList.add("visible");
    });

}

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealSections.forEach(section => {
    revealObserver.observe(section);
});
