// State variables
let progress = 0;
let displayedPointsValue = "0";
let currentCenterIconHTML = "";
let displayedLockedLabelValue = "";
let displayedBundleDealsLabelValue = "";
let isPlaying = false;
let timeoutId = null;
let pointsTimeoutId = null;
let lastShowAlternatePosition = null;

// Tier rewards definitions
const tierRewards = [
  { id: 1, text: "WELCOME GIFT\nONE-TIME 10% OFF" },
  { id: 2, text: "FREE SHIPPING\nON ORDERS $100+" },
  { id: 3, text: "FREE THEME\nMESSAGE CARD" },
  { id: 4, text: "BIRTHDAY GIFT\nREWARD $10" },
  { id: 5, text: "MEMBER\nSAVING 5% OFF" },
  { id: 6, text: "2-YEAR JEWELRY\nWARRANTY" },
  { id: 7, text: "VIEW NEW\nCOLLECTIONS" },
  { id: 8, text: "CONTACT LIVE\nSUPPORT CHAT" },
  { id: 9, text: "FREE JEWELLERY\nGIVEAWAY" },
  { id: 10, text: "VOTE NEW\nCOLLECTIONS" },
];

// Helper to render CirclesIcon1SVG
function getCirclesIcon1SVG(active) {
  return `
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M35.1484 0.5L49.5 14.8516V35.1484L35.1484 49.5H14.8516L0.5 35.1484V14.8516L14.8516 0.5H35.1484Z" 
            fill="${active ? "url(#paint0_linear_9401_47516)" : "white"}" 
            stroke="url(#paint0_linear_9401_47516)" 
            style="transition: all 0.5s ease-in-out;"
        />
        ${
          active
            ? `
            <g filter="url(#filter0_d_9401_47516)">
                <path d="M25 11.1418C25 18.7955 31.2045 25 38.8582 25C31.2045 25 25 31.2045 25 38.8582C25 31.2045 18.7955 25 11.1418 25C18.7955 25 25 18.7955 25 11.1418Z" fill="white" />
            </g>
        `
            : `
            <path d="M25 14.9062C26.3288 19.8098 30.1894 23.6709 35.0928 25C30.1897 26.329 26.329 30.1897 25 35.0928C23.6709 30.1894 19.8098 26.3288 14.9062 25C19.8101 23.6711 23.6711 19.8101 25 14.9062Z" stroke="url(#paint1_linear_9401_47516)" stroke-width="1.2" />
        `
        }
        <defs>
            <filter id="filter0_d_9401_47516" x="9.14062" y="9.14258" width="31.7188" height="31.7148" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.980377 0 0 0 0 0.956848 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9401_47516" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9401_47516" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_9401_47516" x1="25" y1="0" x2="25" y2="50" gradientUnits="userSpaceOnUse">
                <stop stop-color="#947863" />
                <stop offset="0.5" stop-color="#E9DDD4" />
                <stop offset="1" stop-color="#947863" />
            </linearGradient>
            <linearGradient id="paint1_linear_9401_47516" x1="25" y1="11.5" x2="25" y2="38.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#947863" />
                <stop offset="0.5" stop-color="#E9DDD4" />
                <stop offset="1" stop-color="#947863" />
            </linearGradient>
        </defs>
    </svg>
  `;
}

// Helper to render StarSVG with dynamic star activation and gradient colors
function getDynamicStarsSVG(progress) {
  const activeFill =
    progress >= 145 ? "url(#paint_galaxy_star)" : "url(#paint_gold_star)";
  const inactiveFill = "#2C2C2C";

  let star1Active = false; // Large star (left)
  let star2Active = false; // Medium star (bottom-right)
  let star3Active = false; // Small star (top-right)

  if (progress === 0) {
    star1Active = false;
    star2Active = false;
    star3Active = false;
  } else if (progress >= 145) {
    // GALAXY Tier
    if (progress >= 152) {
      star1Active = true;
    } else if (progress >= 150) {
      star2Active = true;
    } else {
      star3Active = true;
    }
  } else if (progress >= 112) {
    // STARLIGHT Tier
    if (progress >= 128) {
      star1Active = true;
    } else if (progress >= 125) {
      star2Active = true;
    } else {
      star3Active = true;
    }
  } else if (progress >= 105) {
    // SHINY Tier
    if (progress >= 107) {
      star1Active = true;
    } else if (progress >= 106) {
      star2Active = true;
    } else {
      star3Active = true;
    }
  } else {
    // S-BRILLET Tier (progress >= 25)
    if (progress >= 75) {
      star1Active = true;
    } else if (progress >= 50) {
      star2Active = true;
    } else {
      star3Active = true;
    }
  }

  return `
    <svg width="35" height="32" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paint_gold_star" x1="0" y1="0" x2="28" y2="24" gradientUnits="userSpaceOnUse">
          <stop stop-color="#947863" />
          <stop offset="0.5" stop-color="#E9DDD4" />
          <stop offset="1" stop-color="#947863" />
        </linearGradient>
        <linearGradient id="paint_galaxy_star" x1="0" y1="0" x2="28" y2="24" gradientUnits="userSpaceOnUse">
          <stop stop-color="#483951" />
          <stop offset="0.5" stop-color="#675470" />
          <stop offset="1" stop-color="#483951" />
        </linearGradient>
      </defs>
      
      <!-- Large Star (left) -->
      <path 
        d="M19.2388 10C14.1363 10 10 14.1364 10 19.2388C10 14.1364 5.86365 10 0.761204 10C5.86365 10 10 5.86365 10 0.761204C10 5.86365 14.1363 10 19.2388 10Z" 
        fill="${inactiveFill}" 
      />
      <path 
        d="M19.2388 10C14.1363 10 10 14.1364 10 19.2388C10 14.1364 5.86365 10 0.761204 10C5.86365 10 10 5.86365 10 0.761204C10 5.86365 14.1363 10 19.2388 10Z" 
        fill="${activeFill}" 
        style="opacity: ${star1Active ? 1 : 0}; transition: opacity 0.5s ease-in-out;"
      />

      <!-- Medium Star (bottom-right) -->
      <path 
        d="M25.5433 17.9883C22.4818 17.9883 20 20.4701 20 23.5316C20 20.4701 17.5182 17.9883 14.4567 17.9883C17.5182 17.9883 20 15.5065 20 12.445C20 15.5065 22.4818 17.9883 25.5433 17.9883Z" 
        fill="${inactiveFill}" 
      />
      <path 
        d="M25.5433 17.9883C22.4818 17.9883 20 20.4701 20 23.5316C20 20.4701 17.5182 17.9883 14.4567 17.9883C17.5182 17.9883 20 15.5065 20 12.445C20 15.5065 22.4818 17.9883 25.5433 17.9883Z" 
        fill="${activeFill}" 
        style="opacity: ${star2Active ? 1 : 0}; transition: opacity 0.5s ease-in-out;"
      />

      <!-- Small Star (top-right) -->
      <path 
        d="M27.6955 7.99609C25.6545 7.99609 24 9.65063 24 11.6916C24 9.65063 22.3455 7.99609 20.3045 7.99609C22.3455 7.99609 24 6.34155 24 4.30058C24 6.34155 25.6545 7.99609 27.6955 7.99609Z" 
        fill="${inactiveFill}" 
      />
      <path 
        d="M27.6955 7.99609C25.6545 7.99609 24 9.65063 24 11.6916C24 9.65063 22.3455 7.99609 20.3045 7.99609C22.3455 7.99609 24 6.34155 24 4.30058C24 6.34155 25.6545 7.99609 27.6955 7.99609Z" 
        fill="${activeFill}" 
        style="opacity: ${star3Active ? 1 : 0}; transition: opacity 0.5s ease-in-out;"
      />
    </svg>
  `;
}

// Function to update SVG progress rings
function setRingProgress(ringId, progressValue, galaxyTheme) {
  const ring = document.getElementById(ringId);
  if (!ring) return;

  const progressCircle = ring.querySelector(".progress-circle");
  const wavyCircle = ring.querySelector(".wavy-circle");

  const hasProgress =
    progressValue !== null && progressValue !== undefined && progressValue > 0;

  const displayProgress = Math.min(progressValue, 100);
  const isFull = displayProgress >= 100;
  const circumference = 314.159;
  const strokeDashoffset =
    circumference - (circumference * displayProgress) / 100;

  if (
    hasProgress &&
    progressValue !== 102 &&
    progressValue !== 103 &&
    progressValue !== 105
  ) {
    progressCircle.style.display = "block";
    setTimeout(() => {
      progressCircle.style.opacity = "1";
    }, 10);
    progressCircle.setAttribute(
      "stroke",
      galaxyTheme
        ? "url(#paint0_linear_galaxy_progress)"
        : "url(#paint0_linear_gold_progress)",
    );
    if (isFull) {
      progressCircle.removeAttribute("stroke-dasharray");
      progressCircle.removeAttribute("stroke-dashoffset");
    } else {
      progressCircle.setAttribute("stroke-dasharray", circumference);
      progressCircle.setAttribute("stroke-dashoffset", strokeDashoffset);
    }
  } else {
    progressCircle.style.opacity = "0";
    setTimeout(() => {
      if (progressCircle.style.opacity === "0") {
        progressCircle.style.display = "none";
      }
    }, 700);
  }

  if (hasProgress && (progressValue === 103 || progressValue === 105)) {
    wavyCircle.style.display = "block";
    setTimeout(() => {
      wavyCircle.style.opacity = "1";
    }, 10);
    wavyCircle.setAttribute(
      "stroke",
      galaxyTheme
        ? "url(#paint0_linear_galaxy_progress)"
        : "url(#paint0_linear_gold_progress)",
    );
  } else {
    wavyCircle.style.opacity = "0";
    setTimeout(() => {
      if (wavyCircle.style.opacity === "0") {
        wavyCircle.style.display = "none";
      }
    }, 500);
  }
}

function updateLockedLabelWithTransition(newText) {
  if (displayedLockedLabelValue !== newText) {
    // If it's the first render (i.e. displayedLockedLabelValue is empty), just set it without animation to prevent initial jump
    if (displayedLockedLabelValue === "") {
      displayedLockedLabelValue = newText;
      const el = document.getElementById("locked-overlay-label");
      if (el) el.innerText = newText;
      return;
    }
    displayedLockedLabelValue = newText;

    const wrapper = document.getElementById("locked-overlay-label-wrapper");
    if (wrapper) {
      const currentLabel = document.getElementById("locked-overlay-label");
      if (currentLabel) {
        // Prepare current label to fade out absolutely with identical centering classes
        currentLabel.className = "locked-overlay-label-absolute points-fade-out-active";
        currentLabel.id = "locked-overlay-label-old";

        // Create new label
        const newLabel = document.createElement("p");
        newLabel.id = "locked-overlay-label";
        newLabel.className = "locked-overlay-label-absolute points-fade-in-active";
        newLabel.innerText = newText;

        wrapper.appendChild(newLabel);

        // After transition, clean up old label and restore relative layout
        setTimeout(() => {
          const oldLabel = document.getElementById("locked-overlay-label-old");
          if (oldLabel) {
            oldLabel.remove();
          }
          newLabel.className = "locked-overlay-label";
        }, 500);
      }
    }
  }
}

function updateBundleDealsLabelWithTransition(newText) {
  if (displayedBundleDealsLabelValue !== newText) {
    // If it's the first render (i.e. displayedBundleDealsLabelValue is empty), just set it without animation to prevent initial jump
    if (displayedBundleDealsLabelValue === "") {
      displayedBundleDealsLabelValue = newText;
      const el = document.getElementById("bundle-deals-label");
      if (el) el.innerText = newText;
      return;
    }
    displayedBundleDealsLabelValue = newText;

    const wrapper = document.getElementById("bundle-deals-label-wrapper");
    if (wrapper) {
      const currentLabel = document.getElementById("bundle-deals-label");
      if (currentLabel) {
        // Prepare current label to fade out absolutely with identical centering classes
        currentLabel.className = "bundle-deals-label-absolute points-fade-out-active";
        currentLabel.id = "bundle-deals-label-old";

        // Create new label
        const newLabel = document.createElement("span");
        newLabel.id = "bundle-deals-label";
        newLabel.className = "bundle-deals-label-absolute points-fade-in-active";
        newLabel.innerText = newText;

        wrapper.appendChild(newLabel);

        // After transition, clean up old label and restore relative layout
        setTimeout(() => {
          const oldLabel = document.getElementById("bundle-deals-label-old");
          if (oldLabel) {
            oldLabel.remove();
          }
          newLabel.className = "bundle-deals-label";
        }, 500);
      }
    }
  }
}

function initBundleDealsDiamonds() {
  const diamondsContainer = document.getElementById("bundle-deals-diamonds");
  if (!diamondsContainer) return;

  let diamondsHTML = "";
  for (let i = 0; i < 4; i++) {
    diamondsHTML += `
      <div
        id="bundle-diamond-card-${i}"
        class="diamond-card"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="diamond-svg">
          <!-- Locked state path (White) -->
          <path
            class="diamond-locked transition-opacity duration-700"
            d="M5 2H19L24 9L12 22L0 9L5 2Z"
            fill="white"
            stroke="#EAEAEA"
            stroke-width="0.8"
            style="opacity: 1;"
          />
          <!-- Starlight state path (Gold Gradient) -->
          <path
            class="diamond-starlight transition-opacity duration-700"
            d="M5 2H19L24 9L12 22L0 9L5 2Z"
            fill="url(#paint_starlight_diamond_bg)"
            style="opacity: 0;"
          />
          <!-- Galaxy state path (Purple Gradient) -->
          <path
            class="diamond-galaxy transition-opacity duration-700"
            d="M5 2H19L24 9L12 22L0 9L5 2Z"
            fill="url(#paint_galaxy_diamond_bg)"
            style="opacity: 0;"
          />
        </svg>
        <span class="diamond-content-container"></span>
      </div>
    `;
  }
  diamondsContainer.innerHTML = diamondsHTML;
}

function initTierRewardsGrid() {
  const rewardsGrid = document.getElementById("tier-rewards-grid");
  if (!rewardsGrid) return;

  let gridHTML = "";
  tierRewards.forEach((reward) => {
    gridHTML += `
      <div
        id="reward-card-${reward.id}"
        class="reward-card"
      >
        <div class="octagon-wrapper">
          <svg viewBox="0 0 50 50" class="octagon-svg">
            <!-- Locked State Path (White) -->
            <path
              class="octagon-locked transition-opacity duration-700"
              d="M14.5 0.5 L35.5 0.5 L49.5 14.5 L49.5 35.5 L35.5 49.5 L14.5 49.5 L0.5 35.5 L0.5 14.5 Z"
              fill="white"
              stroke="#EAEAEA"
              stroke-width="1"
              style="opacity: 1;"
            />
            <!-- Starlight Unlocked State Path (Gold Gradient) -->
            <path
              class="octagon-starlight transition-opacity duration-700"
              d="M14.5 0.5 L35.5 0.5 L49.5 14.5 L49.5 35.5 L35.5 49.5 L14.5 49.5 L0.5 35.5 L0.5 14.5 Z"
              fill="url(#paint_unlocked_octagon_bg)"
              style="opacity: 0;"
            />
            <!-- Galaxy Unlocked State Path (Purple Gradient) -->
            <path
              class="octagon-galaxy transition-opacity duration-700"
              d="M14.5 0.5 L35.5 0.5 L49.5 14.5 L49.5 35.5 L35.5 49.5 L14.5 49.5 L0.5 35.5 L0.5 14.5 Z"
              fill="url(#paint_unlocked_octagon_galaxy_bg)"
              style="opacity: 0;"
            />
          </svg>
          <span class="reward-icon-container"></span>
        </div>
        <p class="reward-label reward-label-locked">
          ${reward.text}
        </p>
      </div>
    `;
  });
  rewardsGrid.innerHTML = gridHTML;
}

// Set state and render
function setProgress(val) {
  progress = val;
  updateUI();
}

// Update DOM elements based on progress state
function updateUI() {
  const galaxyTheme = progress >= 145;

  // 1. EARN SPARKLE POINTS CONTAINER border
  const earnPointsContainer = document.getElementById("earn-points-container");
  if (progress >= 25) {
    earnPointsContainer.className = "glass-card border-accent";
  } else {
    earnPointsContainer.className = "glass-card";
  }

  // 2. SVG RINGS ANIMATION AND VALUE UPDATES
  // Ring 1 (outermost)
  let r1Prog = null;
  if (progress >= 160) r1Prog = 105;
  else if (progress >= 155) r1Prog = 100;
  else if (progress >= 152) r1Prog = 75;
  else if (progress >= 150) r1Prog = 50;
  else if (progress >= 148) r1Prog = 25;
  setRingProgress("ring-1-svg", r1Prog, galaxyTheme);

  const ring1 = document.getElementById("ring-1-svg");
  if (progress >= 175) {
    ring1.setAttribute("class", "ring-1-svg galaxy-final");
  } else if (progress >= 160) {
    ring1.setAttribute("class", "ring-1-svg spin-active");
  } else {
    ring1.setAttribute("class", "ring-1-svg");
  }

  // Final Ring Image
  const finalRingImage = document.getElementById("final-ring-image");
  const galaxyCircleBorder = document.getElementById("galaxy-circle-border");
  finalRingImage.src =
    progress >= 575 ? "assets/Images/ring2.png" : "assets/Images/rign.png";
  if (progress >= 175) {
    finalRingImage.className = "final-ring-img visible";
    if (galaxyCircleBorder) {
      galaxyCircleBorder.className = "galaxy-circle-border visible";
    }
  } else {
    finalRingImage.className = "final-ring-img";
    if (galaxyCircleBorder) {
      galaxyCircleBorder.className = "galaxy-circle-border";
    }
  }
  // Galaxy stars — only show with the final galaxy ring image (progress >= 175)
  const star1 = document.getElementById("galaxy-star-1");
  const star2 = document.getElementById("galaxy-star-2");
  if (progress >= 175 && progress < 575) {
    let points = 0;
    if (progress === 175) {
      points = 0;
    } else if (progress === 225) {
      points = 100;
    } else {
      const steps = Math.round((progress - 250) / 25);
      points = 150 + steps * 50;
    }

    const showAlternatePosition = (points % 100 === 50);

    if (star1) {
      star1.style.transition = ""; // Clear transitions for position swap
      star1.style.top = "26px";
      star1.style.right = "";
      star1.style.bottom = "";
      if (showAlternatePosition) {
        star1.style.left = "94px";
      } else {
        star1.style.left = "26px";
      }
    }
    if (star2) {
      star2.style.transition = ""; // Clear transitions for position swap
      star2.style.top = "94px";
      star2.style.right = "";
      star2.style.bottom = "";
      if (showAlternatePosition) {
        star2.style.left = "26px";
      } else {
        star2.style.left = "94px";
      }
    }

    if (lastShowAlternatePosition !== showAlternatePosition) {
      if (star1) {
        star1.classList.remove("star-pop-active");
        void star1.offsetWidth; // Force reflow
        star1.classList.add("star-pop-active");
      }
      if (star2) {
        star2.classList.remove("star-pop-active");
        void star2.offsetWidth; // Force reflow
        star2.classList.add("star-pop-active");
      }
      lastShowAlternatePosition = showAlternatePosition;
    }
  } else {
    lastShowAlternatePosition = null;
    if (star1) {
      star1.classList.remove("star-pop-active");
      star1.style.opacity = "0";
      star1.style.top = "26px";
      star1.style.left = "26px";
      star1.style.right = "";
      star1.style.bottom = "";
      star1.style.transform = "";
    }
    if (star2) {
      star2.classList.remove("star-pop-active");
      star2.style.opacity = "0";
      star2.style.top = "94px";
      star2.style.left = "94px";
      star2.style.right = "";
      star2.style.bottom = "";
      star2.style.transform = "";
    }
  }


  // Ring 2
  let r2Prog = null;
  if (progress >= 140) r2Prog = 105;
  else if (progress >= 130) r2Prog = 100;
  else if (progress >= 128) r2Prog = 75;
  else if (progress >= 125) r2Prog = 50;
  else if (progress >= 122) r2Prog = 25;
  setRingProgress("ring-2-svg", r2Prog, galaxyTheme);

  const ring2 = document.getElementById("ring-2-svg");
  let r2Class = "ring-2-svg";
  if (progress >= 160) {
    r2Class += " fade-out";
  } else if (progress >= 145) {
    r2Class += " galaxy-theme";
  }
  if (progress >= 140) {
    r2Class += " spin-active";
  }
  ring2.setAttribute("class", r2Class);

  // Ring 3
  let r3Prog = null;
  if (progress === 105 || progress === 106) r3Prog = 40;
  else if (progress === 107) r3Prog = 70;
  else if (progress === 108 || progress === 110) r3Prog = 100;
  else if (progress === 111 || progress >= 112) r3Prog = 105;
  setRingProgress("ring-3-svg", r3Prog, galaxyTheme);

  const ring3 = document.getElementById("ring-3-svg");
  let r3Class = "ring-3-svg";
  if (progress >= 160) {
    r3Class += " fade-out";
  } else if (progress === 110) {
    r3Class += " fade-out";
  } else if (progress === 111) {
    r3Class += " opaque";
  } else if (progress >= 112) {
    r3Class += " galaxy-theme";
  }
  if (progress >= 111) {
    r3Class += " spin-active";
  }
  ring3.setAttribute("class", r3Class);

  // Ring 4
  let r4Prog = null;
  if (progress >= 105) r4Prog = 105;
  else r4Prog = progress;
  setRingProgress("ring-4-svg", r4Prog, galaxyTheme);

  const ring4 = document.getElementById("ring-4-svg");
  let r4Class = "ring-4-svg";
  if (progress >= 160) {
    r4Class += " fade-out";
  } else if (progress === 102) {
    r4Class += " fade-out";
  } else if (progress === 103) {
    r4Class += " opaque";
  } else if (progress >= 105) {
    r4Class += " galaxy-theme";
  }
  if (progress >= 103) {
    r4Class += " spin-active";
  }
  ring4.setAttribute("class", r4Class);

  // Center Icon Container
  const centerIconContainer = document.getElementById("center-icon-container");
  if (progress >= 175) {
    centerIconContainer.className = "center-icon-container hidden-state";
  } else {
    centerIconContainer.className = "center-icon-container";
  }

  // Set inner content of Center Icon
  let newCenterHTML = "";
  if (progress >= 145) {
    newCenterHTML = svgs.Star4SVG;
  } else if (progress >= 112) {
    newCenterHTML = svgs.Star3SVG;
  } else if (progress >= 105) {
    newCenterHTML = `
      <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,0 37.3,10 37.3,30 20,40 2.7,30 2.7,10" fill="url(#paint_hexagon_grad_center)" stroke="#C5B5A5" stroke-width="0.8" />
        <path d="M20,12 C20,17 23,20 28,20 C23,20 20,23 20,28 C20,23 17,20 12,20 C17,20 20,17 20,12 Z" fill="white" opacity="0.9" />
        <defs>
          <linearGradient id="paint_hexagon_grad_center" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#947863" />
            <stop offset="0.5" stop-color="#E9DDD4" />
            <stop offset="1" stop-color="#947863" />
          </linearGradient>
        </defs>
      </svg>
    `;
  } else {
    newCenterHTML = getCirclesIcon1SVG(progress >= 25);
  }

  const centerIconContent = document.getElementById("center-icon-content");
  if (centerIconContent) {
    if (currentCenterIconHTML === "") {
      currentCenterIconHTML = centerIconContent.innerHTML;
    }
    if (currentCenterIconHTML !== newCenterHTML) {
      currentCenterIconHTML = newCenterHTML;
      centerIconContent.style.opacity = "0";
      centerIconContent.style.transform = "scale(0.8)";
      centerIconContent.style.transition =
        "opacity 0.25s ease-in-out, transform 0.25s ease-in-out";
      setTimeout(() => {
        centerIconContent.innerHTML = newCenterHTML;
        centerIconContent.style.opacity = "1";
        centerIconContent.style.transform = "scale(1)";
      }, 250);
    }
  }

  // 3. POINTS BOX CONTAINER border
  const pointsBoxContainer = document.getElementById("points-box-container");
  if (progress >= 105) {
    pointsBoxContainer.className = "points-box-container border-gold";
  } else if (progress >= 25) {
    pointsBoxContainer.className = "points-box-container border-accent";
  } else {
    pointsBoxContainer.className = "points-box-container";
  }

  // Points Number value and style
  const pointsNumber = document.getElementById("points-number");

  let newPointsText = "";
  let usesGradient = false;
  let gradientType = ""; // "gold" or "galaxy"

  if (progress >= 175) {
    let points = 0;
    if (progress >= 575) {
      points = 1000;
    } else if (progress === 175) {
      points = 0;
    } else if (progress === 225) {
      points = 100;
    } else {
      const steps = Math.round((progress - 250) / 25);
      points = 150 + steps * 50;
    }
    newPointsText = String(points);
    usesGradient = true;
    gradientType = "galaxy";
  } else if (progress >= 155) {
    newPointsText = "1000";
  } else if (progress >= 152) {
    newPointsText = "850";
  } else if (progress >= 145) {
    newPointsText = "700";
    usesGradient = true;
    gradientType = "galaxy";
  } else if (progress >= 140) {
    newPointsText = "700";
    usesGradient = true;
    gradientType = "gold";
  } else if (progress >= 130) {
    newPointsText = "700";
  } else if (progress >= 128) {
    newPointsText = "575";
  } else if (progress >= 125) {
    newPointsText = "350";
  } else if (progress >= 122) {
    newPointsText = "225";
  } else if (progress === 112) {
    newPointsText = "100";
    usesGradient = true;
    gradientType = "gold";
  } else if (progress >= 108) {
    newPointsText = "100";
  } else {
    newPointsText =
      progress === 107
        ? "70"
        : progress >= 100
          ? "40"
          : progress >= 75
            ? "40"
            : "0";
  }

  if (displayedPointsValue !== newPointsText) {
    displayedPointsValue = newPointsText;

    const wrapper = document.getElementById("points-number-wrapper");
    if (wrapper) {
      const currentSpan = document.getElementById("points-number");
      if (currentSpan) {
        if (pointsTimeoutId) clearTimeout(pointsTimeoutId);

        // Setup current span to fade out
        currentSpan.className = "points-number points-fade-out-active";
        currentSpan.id = "points-number-old";

        // Create new span to fade in
        const newSpan = document.createElement("span");
        newSpan.id = "points-number";
        newSpan.className = "points-number points-fade-in-active";
        newSpan.innerText = newPointsText;

        if (usesGradient) {
          if (gradientType === "galaxy") {
            newSpan.style.backgroundImage =
              "linear-gradient(90deg, #483951 0%, #675470 50%, #483951 100%)";
          } else {
            newSpan.style.backgroundImage =
              "linear-gradient(90deg, #947863 0%, #E9DDD4 50%, #947863 100%)";
          }
          newSpan.style.webkitBackgroundClip = "text";
          newSpan.style.webkitTextFillColor = "transparent";
          newSpan.style.color = "transparent";
        } else {
          newSpan.style.color = "#1E1E1E";
        }

        wrapper.appendChild(newSpan);

        // After transition completes, clean up old span and make new span relative
        pointsTimeoutId = setTimeout(() => {
          const oldSpan = document.getElementById("points-number-old");
          if (oldSpan) {
            oldSpan.remove();
          }
          newSpan.className = "points-number relative";
          // Re-apply gradient color styling if needed
          if (usesGradient) {
            if (gradientType === "galaxy") {
              newSpan.style.backgroundImage =
                "linear-gradient(90deg, #483951 0%, #675470 50%, #483951 100%)";
            } else {
              newSpan.style.backgroundImage =
                "linear-gradient(90deg, #947863 0%, #E9DDD4 50%, #947863 100%)";
            }
            newSpan.style.webkitBackgroundClip = "text";
            newSpan.style.webkitTextFillColor = "transparent";
            newSpan.style.color = "transparent";
          }
          pointsTimeoutId = null;
        }, 500);
      }
    }
  }

  // Star Icon inside Points Box
  document.getElementById("star-icon-points").innerHTML =
    getDynamicStarsSVG(progress);

  // 4. S-BRILLET / SHINY / STARLIGHT / GALAXY sliding cards
  const secBrillet = document.getElementById("tier-section-s-brillet");
  const secShiny = document.getElementById("tier-section-shiny");
  const secStarlight = document.getElementById("tier-section-starlight");
  const secGalaxy = document.getElementById("tier-section-galaxy");

  // S-BRILLET Logo
  document.getElementById("s-brillet-logo").innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2H22L30 10V22L22 30H10L2 22V10L10 2Z" fill="url(#paint_brillet)" />
      <path d="M16 9C16 13.5 19 16 23 16C19 16 16 18.5 16 23C16 18.5 13 16 9 16C13 16 16 13.5 16 9Z" fill="white" />
      <defs>
        <linearGradient id="paint_brillet" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stop-color="#947863" />
          <stop offset="0.5" stop-color="#E9DDD4" />
          <stop offset="1" stop-color="#947863" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // SHINY Logo
  document.getElementById("shiny-logo").innerHTML = `
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,0 37.3,10 37.3,30 20,40 2.7,30 2.7,10" fill="url(#paint_shiny_icon)" stroke="#C5B5A5" stroke-width="0.8" />
      <path d="M20,12 C20,17 23,20 28,20 C23,20 20,23 20,28 C20,23 17,20 12,20 C17,20 20,17 20,12 Z" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="paint_shiny_icon" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stop-color="#947863" />
          <stop offset="0.5" stop-color="#E9DDD4" />
          <stop offset="1" stop-color="#947863" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // STARLIGHT Logo
  document.getElementById("starlight-logo").innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 8.5 15.5 12 22 12C15.5 12 12 15.5 12 22C12 15.5 8.5 12 2 12C8.5 12 12 8.5 12 2Z" stroke="url(#paint_starlight_icon)" stroke-width="1.2" fill="none" />
      <path d="M12 6C12 10 14 12 18 12C14 12 12 14 12 18C12 14 10 12 6 12C10 12 12 10 12 6Z" fill="url(#paint_starlight_icon)" opacity="0.8" />
      <defs>
        <linearGradient id="paint_starlight_icon" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stop-color="#947863" />
          <stop offset="0.5" stop-color="#E9DDD4" />
          <stop offset="1" stop-color="#947863" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // GALAXY Logo
  document.getElementById("galaxy-logo").innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 8.5 15.5 12 22 12C15.5 12 12 15.5 12 22C12 15.5 8.5 12 2 12C8.5 12 12 8.5 12 2Z" stroke="url(#paint_galaxy_icon)" stroke-width="1.2" fill="none" />
      <path d="M12 6C12 10 14 12 18 12C14 12 12 14 12 18C12 14 10 12 6 12C10 12 12 10 12 6Z" fill="url(#paint_galaxy_icon)" opacity="0.8" />
      <defs>
        <linearGradient id="paint_galaxy_icon" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stop-color="#483951" />
          <stop offset="0.5" stop-color="#675470" />
          <stop offset="1" stop-color="#483951" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // Handle card display states using class transitions
  if (progress >= 145) {
    secBrillet.className = "tier-card-hidden-up";
    secShiny.className = "tier-card-hidden-up";
    secStarlight.className = "tier-card-hidden-up";
    secGalaxy.className = "tier-card-visible tier-inner-container gap-4";
  } else if (progress >= 115) {
    secBrillet.className = "tier-card-hidden-up";
    secShiny.className = "tier-card-hidden-up";
    secStarlight.className = "tier-card-visible tier-inner-container gap-4";
    secGalaxy.className = "tier-card-hidden-down";
  } else if (progress >= 105) {
    secBrillet.className = "tier-card-hidden-up";
    secShiny.className = "tier-card-visible tier-inner-container gap-4";
    secStarlight.className = "tier-card-hidden-down";
    secGalaxy.className = "tier-card-hidden-down";
  } else if (progress >= 25) {
    secBrillet.className = "tier-card-visible tier-inner-container gap-4";
    secShiny.className = "tier-card-hidden-down";
    secStarlight.className = "tier-card-hidden-down";
    secGalaxy.className = "tier-card-hidden-down";
  } else {
    secBrillet.className = "tier-card-hidden-down";
    secShiny.className = "tier-card-hidden-down";
    secStarlight.className = "tier-card-hidden-down";
    secGalaxy.className = "tier-card-hidden-down";
  }

  // Details inside sliding sections
  // S-BRILLET Detail
  const sBrilletTitle = document.getElementById("s-brillet-title");
  const sBrilletPointsLabel = document.getElementById("s-brillet-points-label");
  const sBrilletSignupPoints = document.getElementById(
    "s-brillet-signup-points",
  );

  if (progress >= 100) {
    sBrilletTitle.className = "tier-title completed";
    sBrilletPointsLabel.className = "tier-points-label completed";
  } else {
    sBrilletTitle.className = "tier-title";
    sBrilletPointsLabel.className = "tier-points-label";
  }

  const sBrilletSignupIcon = document.getElementById("s-brillet-signup-icon");
  if (progress >= 75) {
    sBrilletSignupIcon.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="url(#paint_brillet_checkmark_bg)" />
        <path d="M8.5 12.5L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
          <linearGradient id="paint_brillet_checkmark_bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stop-color="#947863" />
            <stop offset="0.5" stop-color="#E9DDD4" />
            <stop offset="1" stop-color="#947863" />
          </linearGradient>
        </defs>
      </svg>
    `;
    sBrilletSignupPoints.className = "tier-item-points completed";
  } else {
    sBrilletSignupIcon.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="url(#paint_brillet_bullet)" stroke="#C5B5A5" stroke-width="0.8" />
        <circle cx="16" cy="16" r="5" fill="white" />
        <defs>
          <linearGradient id="paint_brillet_bullet" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stop-color="#947863" />
            <stop offset="0.5" stop-color="#E9DDD4" />
            <stop offset="1" stop-color="#947863" />
          </linearGradient>
        </defs>
      </svg>
    `;
    if (progress === 50) {
      sBrilletSignupPoints.className = "tier-item-points active";
    } else {
      sBrilletSignupPoints.className = "tier-item-points";
    }
  }

  // SHINY Detail
  const shinyPointsLabel = document.getElementById("shiny-points-label");
  const shinyInstagramPoints = document.getElementById(
    "shiny-instagram-points",
  );
  const shinyNewsletterPoints = document.getElementById(
    "shiny-newsletter-points",
  );

  if (progress >= 110) {
    shinyPointsLabel.className = "tier-points-label completed";
  } else if (progress === 108) {
    shinyPointsLabel.className = "tier-points-label active";
  } else {
    shinyPointsLabel.className = "tier-points-label shiny";
  }

  const shinyInstagramIcon = document.getElementById("shiny-instagram-icon");
  const shinyNewsletterIcon = document.getElementById("shiny-newsletter-icon");

  const checkmarkSVG_shiny = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="url(#paint_shiny_checkmark_bg)" />
      <path d="M8.5 12.5L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <defs>
        <linearGradient id="paint_shiny_checkmark_bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stop-color="#947863" />
          <stop offset="0.5" stop-color="#E9DDD4" />
          <stop offset="1" stop-color="#947863" />
        </linearGradient>
      </defs>
    </svg>
  `;
  const emptyCheckmark_shiny = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-[#333333]">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `;

  if (progress >= 106) {
    shinyInstagramIcon.innerHTML = checkmarkSVG_shiny;
    shinyInstagramPoints.className = "tier-item-points completed";
  } else {
    shinyInstagramIcon.innerHTML = emptyCheckmark_shiny;
    shinyInstagramPoints.className = "tier-item-points";
  }

  if (progress >= 107) {
    shinyNewsletterIcon.innerHTML = checkmarkSVG_shiny;
    shinyNewsletterPoints.className = "tier-item-points completed";
  } else {
    shinyNewsletterIcon.innerHTML = emptyCheckmark_shiny;
    shinyNewsletterPoints.className = "tier-item-points";
  }

  // STARLIGHT Detail
  const starlightPointsLabel = document.getElementById(
    "starlight-points-label",
  );
  const starlightPurchasePoints = document.getElementById(
    "starlight-purchase-points",
  );
  const starlightReferPoints = document.getElementById(
    "starlight-refer-points",
  );

  if (progress >= 135) {
    starlightPointsLabel.className = "tier-points-label completed";
    starlightPurchasePoints.className = "tier-item-points completed";
    starlightReferPoints.className = "tier-item-points completed";
  } else {
    starlightPointsLabel.className =
      progress >= 130
        ? "tier-points-label active"
        : "tier-points-label";
    starlightPurchasePoints.className =
      progress >= 125
        ? "tier-item-points active"
        : "tier-item-points";
    starlightReferPoints.className =
      progress >= 128
        ? "tier-item-points active"
        : "tier-item-points";
  }

  const starlightPurchaseIcon = document.getElementById(
    "starlight-purchase-icon",
  );
  const starlightReferIcon = document.getElementById("starlight-refer-icon");

  if (progress >= 125) {
    starlightPurchaseIcon.innerHTML = checkmarkSVG_shiny;
  } else {
    starlightPurchaseIcon.innerHTML = emptyCheckmark_shiny;
  }

  if (progress >= 128) {
    starlightReferIcon.innerHTML = checkmarkSVG_shiny;
  } else {
    starlightReferIcon.innerHTML = emptyCheckmark_shiny;
  }

  // GALAXY Detail
  const galaxyTitle = document.getElementById("galaxy-title");
  const galaxyPointsLabel = document.getElementById("galaxy-points-label");
  const galaxyPurchasePoints = document.getElementById(
    "galaxy-purchase-points",
  );
  const galaxyReferPoints = document.getElementById("galaxy-refer-points");

  galaxyTitle.innerText = progress >= 155 ? "ULTRA GALAXY" : "GALAXY";
  galaxyPointsLabel.innerText =
    progress >= 155 ? "(+1000 Sparkle Points)" : "(1000 Sparkle Points)";

  const checkmarkSVG_galaxy = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="url(#paint_galaxy_checkmark_bg1)" />
      <path d="M8.5 12.5L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <defs>
        <linearGradient id="paint_galaxy_checkmark_bg1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stop-color="#483951" />
          <stop offset="0.5" stop-color="#675470" />
          <stop offset="1" stop-color="#483951" />
        </linearGradient>
      </defs>
    </svg>
  `;

  const galaxyPurchaseIcon = document.getElementById("galaxy-purchase-icon");
  const galaxyReferIcon = document.getElementById("galaxy-refer-icon");

  if (progress >= 150) {
    galaxyPurchaseIcon.innerHTML = checkmarkSVG_galaxy;
    galaxyPurchasePoints.className = "tier-item-points active-galaxy";
  } else {
    galaxyPurchaseIcon.innerHTML = emptyCheckmark_shiny;
    galaxyPurchasePoints.className = "tier-item-points";
  }

  if (progress >= 152) {
    galaxyReferIcon.innerHTML = checkmarkSVG_galaxy;
    galaxyReferPoints.className = "tier-item-points active-galaxy";
  } else {
    galaxyReferIcon.innerHTML = emptyCheckmark_shiny;
    galaxyReferPoints.className = "tier-item-points";
  }

  // 5. UNLOCK BUNDLE DEALS DIAMONDS
  for (let i = 0; i < 4; i++) {
    const card = document.getElementById(`bundle-diamond-card-${i}`);
    if (!card) continue;

    const pathLocked = card.querySelector(".diamond-locked");
    const pathStarlight = card.querySelector(".diamond-starlight");
    const pathGalaxy = card.querySelector(".diamond-galaxy");
    const contentContainer = card.querySelector(".diamond-content-container");

    let isFilled = false;
    let val = "";
    let isIcon = false;

    if (progress >= 115) {
      if (progress >= 145) {
        isFilled =
          (i === 0 && progress >= 148) ||
          (i === 1 && progress >= 150) ||
          (i === 2 && progress >= 152) ||
          (i === 3 && progress >= 155);
        if (i === 0) val = "25%";
        else if (i === 1) val = "35%";
        else if (i === 2) val = "45%";
        else {
          val = "✦";
          isIcon = true;
        }
      } else {
        isFilled =
          (i === 0 && progress >= 115) ||
          (i === 1 && progress >= 125) ||
          (i === 2 && progress >= 128) ||
          (i === 3 && progress >= 130);
        if (i === 0) val = "20%";
        else if (i === 1) val = "25%";
        else if (i === 2) val = "35%";
        else {
          val = "✦";
          isIcon = true;
        }
      }
    } else {
      isFilled = false;
      val = svgs.LockSVG;
      isIcon = true;
    }

    // 1. Update background path opacities
    if (pathLocked && pathStarlight && pathGalaxy) {
      if (isFilled) {
        pathLocked.style.opacity = "0";
        if (progress >= 145) {
          pathStarlight.style.opacity = "0";
          pathGalaxy.style.opacity = "1";
        } else {
          pathStarlight.style.opacity = "1";
          pathGalaxy.style.opacity = "0";
        }
      } else {
        pathLocked.style.opacity = "1";
        pathStarlight.style.opacity = "0";
        pathGalaxy.style.opacity = "0";
      }
    }

    // 2. Update content/text color & HTML with smooth cross-fade transition
    if (contentContainer) {
      // Determine text color class
      const textColorClass = isFilled ? "text-white" : "text-dark";

      // Update text color
      contentContainer.className = `diamond-content-container ${textColorClass}`;
      if (isIcon && val === svgs.LockSVG) {
        contentContainer.classList.add("mt-neg-3");
      } else {
        contentContainer.classList.add("mt-neg-1");
      }

      // Check if value changed
      if (contentContainer.getAttribute("data-current-val") !== val) {
        contentContainer.setAttribute("data-current-val", val);
        contentContainer.style.opacity = "0";
        contentContainer.style.transform = "scale(0.8)";
        setTimeout(() => {
          contentContainer.innerHTML = val;
          contentContainer.style.opacity = "1";
          contentContainer.style.transform = "scale(1)";
        }, 250);
      }
    }
  }

  // Bottom Deals label
  let targetBundleDealsLabelText = "";
  if (progress >= 160)
    targetBundleDealsLabelText = "MAX GALAXY TIER LEVEL ACHIEVED";
  else if (progress >= 155)
    targetBundleDealsLabelText = "GET 1 + 1 FREE ON NEXT ORDER";
  else if (progress >= 152) targetBundleDealsLabelText = "BUY 3RD | SAVE 45%";
  else if (progress >= 150) targetBundleDealsLabelText = "BUY 2ND | SAVE 35%";
  else if (progress >= 148) targetBundleDealsLabelText = "BUY 1ST | SAVE 25%";
  else if (progress >= 145)
    targetBundleDealsLabelText = "UNLOCKED GALAXY TIER LEVEL";
  else if (progress >= 130)
    targetBundleDealsLabelText = "GET 1 + 1 FREE ON NEXT ORDER";
  else if (progress >= 128) targetBundleDealsLabelText = "BUY 3RD | SAVE 35%";
  else if (progress >= 125) targetBundleDealsLabelText = "BUY 2ND | SAVE 25%";
  else if (progress >= 115) targetBundleDealsLabelText = "BUY 1ST | SAVE 20%";
  else if (progress >= 110)
    targetBundleDealsLabelText = "LEVEL UP TO STARLIGHT TIER";
  else targetBundleDealsLabelText = "LEVEL UP TO SHINY TIER";

  updateBundleDealsLabelWithTransition(targetBundleDealsLabelText);

  // 6. RIGHT SIDE: UNLOCK TIER REWARDS GRID
  tierRewards.forEach((reward) => {
    const card = document.getElementById(`reward-card-${reward.id}`);
    if (!card) return;

    const isUnlocked =
      (reward.id === 1 && progress >= 105) ||
      (reward.id === 2 && progress >= 112) ||
      (reward.id === 3 && progress >= 115) ||
      (reward.id === 4 && progress >= 122) ||
      (reward.id === 5 && progress >= 125) ||
      (reward.id === 6 && progress >= 128) ||
      (reward.id === 7 && progress >= 130) ||
      (reward.id === 8 && progress >= 135) ||
      (reward.id === 9 && progress >= 140) ||
      (reward.id === 10 && progress >= 148);

    let displayText = reward.text;
    if (progress >= 145) {
      if (reward.id === 1) displayText = "WELCOME GIFT\nONE-TIME 20% OFF";
      if (reward.id === 2) displayText = "FREE SHIPPING\nON ALL ORDERS";
      if (reward.id === 4) displayText = "BIRTHDAY GIFT\nREWARD $20";
      if (reward.id === 5) displayText = "MEMBER\nSAVING 15% OFF";
    } else if (progress >= 115) {
      if (reward.id === 1) displayText = "WELCOME GIFT\nONE-TIME 15% OFF";
      if (reward.id === 2) displayText = "FREE SHIPPING\nON ALL ORDERS";
    }

    // 1. Update text content
    const label = card.querySelector(".reward-label");
    if (label && label.innerText !== displayText) {
      label.innerText = displayText;
    }

    // 2. Update text color
    if (label) {
      if (isUnlocked) {
        label.classList.remove("reward-label-locked");
        label.classList.add("reward-label-unlocked");
      } else {
        label.classList.remove("reward-label-unlocked");
        label.classList.add("reward-label-locked");
      }
    }

    // 3. Update card borders/shadows
    if (isUnlocked) {
      if (progress >= 145) {
        card.className = "reward-card unlocked-galaxy";
      } else {
        card.className = "reward-card unlocked-gold";
      }
    } else {
      card.className = "reward-card";
    }

    // 4. Update SVG path fill/stroke via layered opacity transitions
    const pathLocked = card.querySelector(".octagon-locked");
    const pathStarlight = card.querySelector(".octagon-starlight");
    const pathGalaxy = card.querySelector(".octagon-galaxy");

    if (pathLocked && pathStarlight && pathGalaxy) {
      if (isUnlocked) {
        pathLocked.style.opacity = "0";
        if (progress >= 145) {
          pathStarlight.style.opacity = "0";
          pathGalaxy.style.opacity = "1";
        } else {
          pathStarlight.style.opacity = "1";
          pathGalaxy.style.opacity = "0";
        }
      } else {
        pathLocked.style.opacity = "1";
        pathStarlight.style.opacity = "0";
        pathGalaxy.style.opacity = "0";
      }
    }

    // 5. Update Center Icon with smooth fade transition
    let innerIcon = "";
    if (isUnlocked) {
      if (reward.id === 2) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>`;
      } else if (reward.id === 3) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>`;
      } else if (reward.id === 4) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><line x1="12" y1="3" x2="12" y2="8" /><path d="M12 3c.5 1 1 1 1 2s-.5 2-1 2-1-1-1-2 0-1 1-2z" fill="white" stroke="none" /><path d="M6 14h12v-6H6zm-2 6h16v-6H4zM6 11h12M4 17h16" /></svg>`;
      } else if (reward.id === 5) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><path d="M19 9c0-3.5-2.5-5-5-5h-4C7.5 4 5 5.5 5 9c0 4 2 6.5 2 9.5C7 21 9 22 12 22s5-1 5-3.5c0-3 2-5.5 2-9.5z" /><path d="M6 10h12" /><path d="M12 13v5" /><path d="M14 14.5h-3c-1 0-1.5-.5-1.5-1.2s.5-1.2 1.5-1.2h1c1 0 1.5-.5 1.5-1.2s-.5-1.2-1.5-1.2h-3" /></svg>`;
      } else if (reward.id === 6) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 7c0 2 1.2 3 3 3c-1.8 0-3 1-3 3c0-2-1.2-3-3-3c1.8 0 3-1 3-3z" fill="white" stroke="none" /></svg>`;
      } else if (reward.id === 7) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><path d="M12 9l2.5 3-2.5 3-2.5-3z" fill="white" stroke="none" /></svg>`;
      } else if (reward.id === 8) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><circle cx="12" cy="9" r="2" fill="white" stroke="none" /><path d="M9 13c0-1.5 1.5-2 3-2s3 .5 3 2" fill="white" stroke="none" /></svg>`;
      } else if (reward.id === 9) {
        innerIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="white" stroke="none" /><rect x="5" y="16" width="14" height="3" rx="1" fill="white" stroke="none" /></svg>`;
      } else {
        innerIcon = svgs.GiftSVG;
      }
    } else {
      innerIcon = svgs.LockSVG;
    }

    const iconContainer = card.querySelector(".reward-icon-container");
    if (iconContainer) {
      if (iconContainer.getAttribute("data-current-icon") !== innerIcon) {
        iconContainer.setAttribute("data-current-icon", innerIcon);
        iconContainer.style.opacity = "0";
        iconContainer.style.transform = "scale(0.8)";
        setTimeout(() => {
          iconContainer.innerHTML = innerIcon;
          iconContainer.style.opacity = "1";
          iconContainer.style.transform = "scale(1)";
        }, 250);
      }
    }
  });

  // 7. RIGHT SIDE: SPEND SPARKLE POINTS SLIDER & LOCKED STATE
  const spendSlider = document.getElementById("spend-points-slider-container");
  const spendLocked = document.getElementById("spend-points-locked-container");
  const spendLockedOverlay = document.getElementById(
    "spend-points-locked-overlay",
  );

  if (progress >= 175) {
    spendSlider.classList.remove("hidden");
    spendLocked.classList.add("hidden");
    spendLockedOverlay.classList.add("hidden");

    // Calculate Fill Width
    let points = 0;
    if (progress >= 575) {
      points = 1000;
    } else if (progress === 175) {
      points = 0;
    } else if (progress === 225) {
      points = 100;
    } else {
      const steps = Math.round((progress - 250) / 25);
      points = 150 + steps * 50;
    }

    let fillWidth = "0%";
    if (points <= 0) fillWidth = "0%";
    else if (points <= 100) fillWidth = `${(points / 100) * 12}%`;
    else if (points <= 200) fillWidth = `${12 + ((points - 100) / 100) * 15}%`;
    else if (points <= 300) fillWidth = `${27 + ((points - 200) / 100) * 16}%`;
    else if (points <= 400) fillWidth = `${43 + ((points - 300) / 100) * 15}%`;
    else if (points <= 500) fillWidth = `${58 + ((points - 400) / 100) * 16}%`;
    else if (points <= 750) fillWidth = `${74 + ((points - 500) / 250) * 16}%`;
    else if (points <= 1000) fillWidth = `${90 + ((points - 750) / 250) * 10}%`;
    else fillWidth = "100%";

    document.getElementById("slider-progress-bar").style.width = fillWidth;
    document.getElementById("slider-star-thumb").innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C10 5.52285 14.4772 10 20 10C14.4772 10 10 14.4772 10 20C10 14.4772 5.52285 10 0 10C5.52285 10 10 5.52285 10 0Z" />
        <path d="M20 12C20 14.2091 21.7909 16 24 16C21.7909 16 20 17.7909 20 20C20 17.7909 18.2091 16 16 16C18.2091 16 20 14.2091 20 12Z" />
      </svg>
    `;
  } else {
    spendSlider.classList.add("hidden");
    spendLocked.classList.remove("hidden");
    spendLockedOverlay.classList.remove("hidden");

    if (progress < 160) {
      spendLocked.className = "spend-locked-container blurred-state";
      spendLockedOverlay.className = "spend-locked-overlay";
    } else {
      spendLocked.className = "spend-locked-container normal-state";
      spendLockedOverlay.className = "spend-locked-overlay opacity-0";
    }

    // Set locked progress bar width
    let lockedWidth = "0%";
    if (progress >= 170) lockedWidth = "100%";
    else if (progress >= 165) lockedWidth = "66%";
    else if (progress >= 162) lockedWidth = "33%";
    document.getElementById("locked-progress-bar").style.width = lockedWidth;

    // Steps/Icons locked state animations
    const step1 = document.getElementById("locked-step-1");
    const step2 = document.getElementById("locked-step-2");
    const step3 = document.getElementById("locked-step-3");
    const step4 = document.getElementById("locked-step-4");

    step1.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="11.7,0 28.3,0 40,11.7 40,28.3 28.3,40 11.7,40 0,28.3 0,11.7" fill="url(#paint_octagon_grad)" stroke="#C5B5A5" stroke-width="0.8" />
        <path d="M20,12 C20,17 23,20 28,20 C23,20 20,23 20,28 C20,23 17,20 12,20 C17,20 20,17 20,12 Z" fill="white" opacity="0.9" />
        <defs>
          <linearGradient id="paint_octagon_grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#947863" />
            <stop offset="0.5" stop-color="#E9DDD4" />
            <stop offset="1" stop-color="#947863" />
          </linearGradient>
        </defs>
      </svg>
    `;

    step2.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,0 37.3,10 37.3,30 20,40 2.7,30 2.7,10" fill="url(#paint_hexagon_grad)" stroke="#C5B5A5" stroke-width="0.8" />
        <path d="M20,12 C20,17 23,20 28,20 C23,20 20,23 20,28 C20,23 17,20 12,20 C17,20 20,17 20,12 Z" fill="white" opacity="0.9" />
        <defs>
          <linearGradient id="paint_hexagon_grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#947863" />
            <stop offset="0.5" stop-color="#E9DDD4" />
            <stop offset="1" stop-color="#947863" />
          </linearGradient>
        </defs>
      </svg>
    `;

    step3.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16,2 C16,11 21,16 30,16 C21,16 16,21 16,30 C16,21 11,16 2,16 C11,16 16,11 16,2 Z" fill="url(#paint_sparkle_grad)" stroke="#C5B5A5" stroke-width="0.8" />
        <path d="M16,8 C16,13 19,16 24,16 C19,16 16,19 16,24 C16,19 13,16 8,16 C13,16 16,13 16,8 Z" fill="white" />
        <defs>
          <linearGradient id="paint_sparkle_grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E9DDD4" />
            <stop offset="0.5" stop-color="#C5B5A5" />
            <stop offset="1" stop-color="#947863" />
          </linearGradient>
        </defs>
      </svg>
    `;

    step4.innerHTML = svgs.Star2SVG;

    // Apply step styles
    if (progress >= 160)
      step1.className = "locked-step-node active-gold";
    else
      step1.className = "locked-step-node grayscale-hidden";

    if (progress >= 162)
      step2.className = "locked-step-node active-gold";
    else
      step2.className = "locked-step-node grayscale-hidden";

    if (progress >= 165)
      step3.className = "locked-step-node active-gold";
    else
      step3.className = "locked-step-node grayscale-hidden";

    if (progress >= 170)
      step4.className = "locked-step-node active-purple";
    else
      step4.className = "locked-step-node inactive-purple";

    // Locked Overlay display details
    const overlayIcons = document.getElementById("locked-overlay-icons");
    let targetOverlayLabelText = "";

    if (progress >= 148) {
      overlayIcons.innerHTML = svgs.Star2SVG;
      if (progress >= 160)
        targetOverlayLabelText = "MAX GALAXY TIER LEVEL ACHIEVED";
      else if (progress >= 155)
        targetOverlayLabelText = "UNLOCKED GALAXY TIER REWARDS";
      else targetOverlayLabelText = "COMPLETE GALAXY TIER TO UNLOCK REWARDS";
    } else {
      // Show lock/unlock list
      let lockListHTML = "";
      if (progress >= 145) {
        lockListHTML = `<span class="text-[#483951] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#483951] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#483951] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#483951] animate-pulse">${svgs.UnlockSVG}</span>`;
      } else if (progress >= 122) {
        lockListHTML = `<span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span>${svgs.LockSVG}</span>`;
      } else if (progress >= 115) {
        lockListHTML = `<span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span>${svgs.LockSVG}</span>`;
      } else if (progress >= 112) {
        lockListHTML = `<span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span>${svgs.LockSVG}</span>
                       <span>${svgs.LockSVG}</span>`;
      } else if (progress >= 102) {
        lockListHTML = `<span class="text-[#947863] animate-pulse">${svgs.UnlockSVG}</span>
                       <span>${svgs.LockSVG}</span>
                       <span>${svgs.LockSVG}</span>
                       <span>${svgs.LockSVG}</span>`;
      } else {
        lockListHTML = `<span>${svgs.LockSVG}</span>
                       <span>${svgs.LockSVG}</span>
                       <span>${svgs.LockSVG}</span>
                       <span>${svgs.LockSVG}</span>`;
      }
      overlayIcons.innerHTML = lockListHTML;

      if (progress >= 145)
        targetOverlayLabelText = "UNLOCKED GALAXY TIER LEVEL";
      else if (progress >= 122)
        targetOverlayLabelText = "LEVEL UP TO GALAXY TIER";
      else if (progress >= 115)
        targetOverlayLabelText = "UNLOCKED STARLIGHT TIER LEVEL";
      else if (progress >= 112)
        targetOverlayLabelText = "LEVEL UP TO STARLIGHT TIER";
      else if (progress >= 102)
        targetOverlayLabelText = "LEVEL UP TO SHINY TIER";
      else targetOverlayLabelText = "SIGN UP TO JOIN VIP LOYALTY UNIVERSE CLUB";
    }

    updateLockedLabelWithTransition(targetOverlayLabelText);
  }
}

// Tick function to simulate auto demo progress
function tick(current) {
  if (!isPlaying) return;

  let nextProgress = 0;
  let delay = 1800; // default 1.8s

  if (current === 0) nextProgress = 25;
  else if (current === 25) nextProgress = 50;
  else if (current === 50) nextProgress = 75;
  else if (current === 75) nextProgress = 100;
  else if (current === 100) {
    nextProgress = 102;
    delay = 3000;
  } else if (current === 102) {
    nextProgress = 103;
    delay = 2000;
  } else if (current === 103) {
    nextProgress = 105;
    delay = 3000;
  } else if (current === 105) {
    nextProgress = 106;
    delay = 1800;
  } else if (current === 106) {
    nextProgress = 107;
    delay = 1800;
  } else if (current === 107) {
    nextProgress = 108;
    delay = 1800;
  } else if (current === 108) {
    nextProgress = 110;
    delay = 3000;
  } else if (current === 110) {
    nextProgress = 111;
    delay = 1000;
  } else if (current === 111) {
    nextProgress = 112;
    delay = 1000;
  } else if (current === 112) {
    nextProgress = 115;
    delay = 3000;
  } else if (current === 115) {
    nextProgress = 122;
    delay = 3000;
  } else if (current === 122) {
    nextProgress = 125;
    delay = 3000;
  } else if (current === 125) {
    nextProgress = 128;
    delay = 3000;
  } else if (current === 128) {
    nextProgress = 130;
    delay = 3000;
  } else if (current === 130) {
    nextProgress = 135;
    delay = 3000;
  } else if (current === 135) {
    nextProgress = 140;
    delay = 3000;
  } else if (current === 140) {
    nextProgress = 145;
    delay = 3000;
  } else if (current === 145) {
    nextProgress = 148;
    delay = 2000;
  } else if (current === 148) {
    nextProgress = 150;
    delay = 2000;
  } else if (current === 150) {
    nextProgress = 152;
    delay = 2000;
  } else if (current === 152) {
    nextProgress = 155;
    delay = 2000;
  } else if (current === 155) {
    nextProgress = 160;
    delay = 2000;
  } else if (current === 160) {
    nextProgress = 162;
    delay = 2000;
  } else if (current === 162) {
    nextProgress = 165;
    delay = 2000;
  } else if (current === 165) {
    nextProgress = 170;
    delay = 2000;
  } else if (current === 170) {
    nextProgress = 175;
    delay = 2000;
  } else if (current === 175) {
    nextProgress = 225;
    delay = 2500;
  } else if (current >= 225 && current < 575) {
    nextProgress = current + 25;
    delay = 2000;
  } else if (current >= 575) {
    nextProgress = 0;
    delay = 5000;
  }

  timeoutId = setTimeout(() => {
    setProgress(nextProgress);
    tick(nextProgress);
  }, delay);
}

// Play/Pause Demo Toggle
const demoToggleBtn = document.getElementById("demo-toggle-btn");
const demoToggleIcon = document.getElementById("demo-toggle-icon");
const demoToggleText = document.getElementById("demo-toggle-text");

demoToggleBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    demoToggleText.innerText = "Pause Demo";
    demoToggleIcon.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-[#947863]">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      </svg>
    `;
    tick(progress);
  } else {
    demoToggleText.innerText = "Play Demo";
    demoToggleIcon.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-[#947863]">
        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
      </svg>
    `;
    if (timeoutId) clearTimeout(timeoutId);
  }
});

// Click to manually advance progress
const tierCardInteractive = document.getElementById("tier-card-interactive");
tierCardInteractive.addEventListener("click", () => {
  let nextProgress = 0;
  if (progress === 0) nextProgress = 25;
  else if (progress === 25) nextProgress = 50;
  else if (progress === 50) nextProgress = 75;
  else if (progress === 75) nextProgress = 100;
  else if (progress === 100) nextProgress = 102;
  else if (progress === 102) nextProgress = 103;
  else if (progress === 103) nextProgress = 105;
  else if (progress === 105) nextProgress = 106;
  else if (progress === 106) nextProgress = 107;
  else if (progress === 107) nextProgress = 108;
  else if (progress === 108) nextProgress = 110;
  else if (progress === 110) nextProgress = 111;
  else if (progress === 111) nextProgress = 112;
  else if (progress === 112) nextProgress = 115;
  else if (progress === 115) nextProgress = 122;
  else if (progress === 122) nextProgress = 125;
  else if (progress === 125) nextProgress = 128;
  else if (progress === 128) nextProgress = 130;
  else if (progress === 130) nextProgress = 135;
  else if (progress === 135) nextProgress = 140;
  else if (progress === 140) nextProgress = 145;
  else if (progress === 145) nextProgress = 148;
  else if (progress === 148) nextProgress = 150;
  else if (progress === 150) nextProgress = 152;
  else if (progress === 152) nextProgress = 155;
  else if (progress === 155) nextProgress = 160;
  else if (progress === 160) nextProgress = 162;
  else if (progress === 162) nextProgress = 165;
  else if (progress === 165) nextProgress = 170;
  else if (progress >= 170) {
    if (progress === 170) nextProgress = 175;
    else if (progress === 175) nextProgress = 225;
    else if (progress >= 575) nextProgress = 0;
    else nextProgress = progress + 25;
  }

  setProgress(nextProgress);

  // If demo is playing, restart the timer for the new progress step
  if (isPlaying) {
    if (timeoutId) clearTimeout(timeoutId);
    tick(nextProgress);
  }
});

// Initialize UI
if (typeof svgs !== "undefined") {
  if (svgs.LockSVG) {
    svgs.LockSVG = svgs.LockSVG.replace(
      "{class}",
      "lock-icon-svg",
    );
  }
  if (svgs.UnlockSVG) {
    svgs.UnlockSVG = svgs.UnlockSVG.replace(
      "{class}",
      "unlock-icon-svg",
    );
  }
}
initBundleDealsDiamonds();
initTierRewardsGrid();
updateUI();
