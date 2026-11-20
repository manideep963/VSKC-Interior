/**
 * VSKC Interiors - Interactive Space & Design Scope Planner
 * Allows homeowners to configure their custom room & material scope
 */

document.addEventListener('DOMContentLoaded', () => {
  const scopeData = {
    bhk: {
      '1bhk': { label: '1 BHK Apartment (550 - 750 sq.ft)', days: '30-35 Days' },
      '2bhk': { label: '2 BHK Apartment (950 - 1300 sq.ft)', days: '40-45 Days' },
      '3bhk': { label: '3 BHK Apartment (1450 - 2100 sq.ft)', days: '45-50 Days' },
      'villa': { label: '4 BHK / Luxury Villa (2400+ sq.ft)', days: '55-60 Days' }
    },
    tier: {
      'essential': { 
        name: 'Essential Finishes', 
        spec: 'IS 303 Plywood, Matte Laminates & Standard ISI Hardware' 
      },
      'premium': { 
        name: 'Premium Finishes', 
        spec: '710-Grade BWP Marine Ply, High-Gloss / Acrylic & Hettich Soft-Close' 
      },
      'luxury': { 
        name: 'Ultra Luxury Finishes', 
        spec: 'Century Club Prime, PU / Lacquered Glass, Hafele Hardware & Profile LEDs' 
      }
    },
    rooms: {
      'kitchen': { label: 'Modular Kitchen with Tandem Baskets & Cutlery Tray' },
      'masterBed': { label: 'Master Bedroom Wardrobe with Integrated Loft' },
      'guestBed': { label: 'Guest / Children Bedroom Wardrobe & Study Unit' },
      'living': { label: 'Living Room Designer TV Console & Foyer Unit' },
      'ceiling': { label: 'Saint-Gobain Gyproc False Ceiling with LED Cove Lights' },
      'pooja': { label: 'Sacred Pooja Mandir with Backlit CNC Jaali' },
      'paint': { label: 'Fluted Wall Panelling & Luxury Emulsion Painting' }
    }
  };

  let currentBHK = '2bhk';
  let currentTier = 'premium';

  const bhkBtns = document.querySelectorAll('.bhk-btn');
  const tierCards = document.querySelectorAll('.tier-card');
  const roomCheckboxes = document.querySelectorAll('.room-checkbox input');

  const selectedBHKTitle = document.getElementById('selectedBHKTitle');
  const selectedTierSpec = document.getElementById('selectedTierSpec');
  const scopeItemsList = document.getElementById('scopeItemsList');
  const timelineDisplay = document.getElementById('estimatedDays');

  function updateScope() {
    const bhkInfo = scopeData.bhk[currentBHK];
    const tierInfo = scopeData.tier[currentTier];

    if (selectedBHKTitle) {
      selectedBHKTitle.textContent = bhkInfo.label;
    }

    if (selectedTierSpec) {
      selectedTierSpec.textContent = `${tierInfo.name}: ${tierInfo.spec}`;
    }

    if (timelineDisplay) {
      timelineDisplay.textContent = `${bhkInfo.days} Handover Guarantee`;
    }

    if (scopeItemsList) {
      scopeItemsList.innerHTML = '';
      let count = 0;
      roomCheckboxes.forEach(cb => {
        if (cb.checked) {
          count++;
          const itemKey = cb.value;
          const roomInfo = scopeData.rooms[itemKey];
          if (roomInfo) {
            const row = document.createElement('div');
            row.className = 'breakdown-row';
            row.innerHTML = `<span><i class="fa-solid fa-check text-apple" style="margin-right: 0.5rem;"></i>${roomInfo.label}</span><span style="color: #10b981; font-weight: 600;">Included</span>`;
            scopeItemsList.appendChild(row);
          }
        }
      });

      const totalRow = document.createElement('div');
      totalRow.className = 'breakdown-row total';
      totalRow.innerHTML = `<span>Total Spaces in Scope</span><span style="color: var(--accent-gold); font-size: 1.05rem;">${count} Configured Units</span>`;
      scopeItemsList.appendChild(totalRow);
    }
  }

  // Event Listeners for BHK
  bhkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bhkBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBHK = btn.getAttribute('data-bhk');
      updateScope();
    });
  });

  // Event Listeners for Tier
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentTier = card.getAttribute('data-tier');
      updateScope();
    });
  });

  // Event Listeners for Rooms Checkboxes
  roomCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateScope);
  });

  // Initial Run
  updateScope();
});
