/**
 * PEROS ESPORTS - TOURNAMENT PLATFORM LOGIC
 * Features:
 * - Unified Authentication with Secret Admin Auto-Routing (charukesh / 9347176849)
 * - Sign In & Sign Up with Google integration
 * - First-time visitor welcome & auth trigger
 * - Mobile PWA installation (Service Worker + Manifest)
 * - Multi-Event & Multi-Tournament Engine
 * - Team Logo Upload & Dynamic Esports Badges
 * - Dynamic UPI QR, 12-Slot Tracker & Live Points Calculator
 */

// ==========================================
// CONSTANTS & SECRET ADMIN CREDENTIALS
// ==========================================
// CONSTANTS & SECRET ADMIN CREDENTIALS
// ==========================================
const STORAGE_KEY = 'peros_esports_tournament_db_v3';
const LEGACY_STORAGE_KEYS = ['peros_esports_tournament_platform_v1', 'clutch_carnival_tournament_platform_v3'];
const SECRET_ADMIN = {
  username: 'charukesh',
  email: 'charukesh@perosesports.com',
  alternateEmail: 'charukesh@clutchcarnival.com',
  password: '9347176849'
};

// Default Initial Database (Clean & 100% Ready for Live Production)
const INITIAL_DATABASE = {
  activeTournamentId: 'tournament_2026_s1',
  tournaments: [
    {
      id: 'tournament_2026_s1',
      name: 'PEROS ESPORTS CHAMPIONSHIP 2026',
      subtitle: 'Where Every Clutch Counts! ⚡',
      game: 'Garena Free Fire',
      gameMode: 'Battle Royale',
      mapName: 'Bermuda (Full Map)',
      format: 'Squad (4v4)',
      playersPerSquad: 4,
      totalSlots: 12,
      bannerImage: 'assets/peros-logo.jpg',
      organizerPhone: '919347176849',
      officialGroupLink: 'https://chat.whatsapp.com/C5nbq7MBvuJFq7HSsElJTb?s=cl&p=a&mlu=4&ilr=4',
      entryFee: 120,
      totalPrizePool: 1440,
      prizes: { first: 700, second: 450, third: 290, mvp: 0 },
      upiId: '9347176849@ybl',
      roomId: '8849201',
      roomPass: 'PEROS26',
      roomStatus: 'scheduled',
      matchDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
      rules: '1. Strict Anti-Cheat Policy • 2. Registered IGNs & UIDs only • 3. Screen recording required for prize claims • 4. Instant UPI payout within 30 min.',
      slots: Array.from({ length: 12 }, (_, i) => ({
        slotNumber: i + 1,
        status: 'available',
        squadName: null,
        players: []
      }))
    },
    {
      id: 'tournament_clash_squad',
      name: 'PEROS CLASH SQUAD WAR 2026',
      subtitle: 'Fast Pace 4v4 Intense Knockout Showdown! ⚡',
      game: 'Free Fire (Clash Squad)',
      gameMode: 'Clash Squad',
      mapName: 'Clash Squad Bermuda',
      format: 'Clash Squad (4v4)',
      playersPerSquad: 4,
      totalSlots: 8,
      bannerImage: 'assets/peros-logo.jpg',
      organizerPhone: '919347176849',
      officialGroupLink: 'https://chat.whatsapp.com/C5nbq7MBvuJFq7HSsElJTb?s=cl&p=a&mlu=4&ilr=4',
      entryFee: 160,
      totalPrizePool: 1000,
      prizes: { first: 600, second: 300, third: 100, mvp: 0 },
      upiId: '9347176849@ybl',
      roomId: '7729104',
      roomPass: 'WAR2026',
      roomStatus: 'scheduled',
      matchDateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      rules: '1. 4v4 Custom Clash Squad • 2. Limited Ammo: Yes • 3. Character Skills: Off • 4. Gun Attributes: Off',
      slots: Array.from({ length: 8 }, (_, i) => ({
        slotNumber: i + 1,
        status: 'available',
        squadName: null,
        players: []
      }))
    },
    {
      id: 'tournament_duo_carnival',
      name: 'PEROS DUO CUP 2026',
      subtitle: 'Double the Clutch, Double the Fire! ⚡',
      game: 'Free Fire (Duo Showdown)',
      gameMode: 'Duo Showdown',
      mapName: 'Purgatory',
      format: 'Duo (2v2)',
      playersPerSquad: 2,
      totalSlots: 12,
      bannerImage: 'assets/peros-logo.jpg',
      organizerPhone: '919347176849',
      officialGroupLink: 'https://chat.whatsapp.com/C5nbq7MBvuJFq7HSsElJTb?s=cl&p=a&mlu=4&ilr=4',
      entryFee: 60,
      totalPrizePool: 700,
      prizes: { first: 350, second: 220, third: 130, mvp: 0 },
      upiId: '9347176849@ybl',
      roomId: '9920182',
      roomPass: 'DUO2026',
      roomStatus: 'scheduled',
      matchDateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      rules: '1. 2 Players per team • 2. Both players must submit UID • 3. Standard BR scoring',
      slots: Array.from({ length: 12 }, (_, i) => ({
        slotNumber: i + 1,
        status: 'available',
        squadName: null,
        players: []
      }))
    }
  ],
  blogPosts: [
    {
      id: 'clutch-tactics',
      title: 'Top 5 Clutch Strategies for Bermuda Full Map & Clash Squad',
      category: 'PRO GUIDE',
      author: 'Peros Editorial',
      date: 'March 2026 • 5 min read',
      mediaType: 'photo',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      videoUrl: null,
      excerpt: 'Discover how top tier squads control high ground positions, execute lightning-fast gloo wall rotations, and secure Booyah in final circles.',
      content: `<p>In competitive Free Fire esports, mechanics alone won't win you championship trophies. High IQ rotations, predictive zone positioning, and split-second decision-making make the difference between an early knockout and a ₹700 Booyah prize!</p>
      <h4>1. High Ground Control & Zone Predictions</h4>
      <p>In Bermuda Full Map tournaments, capturing high ground points such as Peak, Observatory, or the hills overlooking Bimasakti Strip gives your squad a 360-degree crossfire advantage. Always rotate along the safe edge 30 seconds prior to circle shrinkage to prevent pinch maneuvers.</p>
      <h4>2. Double Gloo Wall Stacking & Fast Reset</h4>
      <p>Never rely on a single gloo wall when reviving fallen teammates in late-game open areas. Master the <strong>"V-Formation" double wall deploy</strong> with quick character skill triggers to secure flawless resets.</p>
      <h4>3. Bait & Switch Crossfire Setups (Clash Squad 4v4)</h4>
      <p>In Clash Squad matches, having all 4 players rush together is an invitation for grenade wipes. Instead, position 1 designated bait player to make noise while 2 flankers hold wide angles for instant knockouts.</p>
      <h4>4. Cooked Grenade Trajectory Mastery</h4>
      <p>Cook fragmentation grenades down to 1.5 seconds before throwing. Detonations on contact give opposing squads zero reaction time to deploy defensive shields.</p>
      <div class="blog-callout-box"><strong>⚡ Ready to test your skills?</strong> Register your squad for the live <strong>Peros Esports Championship</strong> and win cash prizes paid instantly via UPI!</div>`
    },
    {
      id: 'weapon-meta',
      title: 'Free Fire MAX 2026 Weapon Tier List: Best ARs, SMGs & Snipers',
      category: 'META ANALYSIS',
      author: 'Peros Editorial',
      date: 'March 2026 • 4 min read',
      mediaType: 'photo',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      videoUrl: null,
      excerpt: 'A comprehensive breakdown of damage per second (DPS), fire rates, recoil control, and optimal gun attributes for competitive scrims.',
      content: `<p>Understanding weapon stats, rate-of-fire multipliers, and effective damage drop-off is paramount for competitive tournaments.</p>
      <h4>Tier S+ (God Tier - Tournament Staples)</h4>
      <ul>
        <li><strong>Woodpecker (Marksman):</strong> Unrivaled armor piercing with devastating 2-tap headshot capabilities at medium to long range.</li>
        <li><strong>MP40 (SMG):</strong> The undisputed king of close-quarter rush combat with blistering fire rate and rapid time-to-kill.</li>
        <li><strong>M1887-X (Shotgun):</strong> Maximum burst damage. Capable of instant 1-shot knockouts when paired with quick gloo deployment.</li>
        <li><strong>AWM-Y (Sniper):</strong> Armor-penetrating long-range dominator for picking off rotating squads.</li>
      </ul>
      <h4>Recommended Squad Weapon Loadouts</h4>
      <p><strong>Primary Rusher:</strong> MP40 + M1887 + Flash Freeze Grenades<br><strong>Flanker / Support:</strong> SCAR + UMP + Smoke Grenades<br><strong>Designated Sniper:</strong> AWM / Woodpecker + MP40</p>`
    },
    {
      id: 'registration-guide',
      title: 'How to Register Your Squad & Claim Cash Prizes via Instant UPI',
      category: 'COMMUNITY',
      author: 'Peros Editorial',
      date: 'March 2026 • 3 min read',
      mediaType: 'photo',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      videoUrl: null,
      excerpt: 'Step-by-step walkthrough on slot booking, dynamic QR payments, team logo upload, and receiving custom match room credentials.',
      content: `<p>Peros Esports provides India's smoothest, most transparent tournament registration process with verified match tracking and 30-minute instant UPI prize disbursements.</p>
      <h4>Step 1: Select an Open Arena</h4><p>Browse our active tournaments and inspect available slots (1 through 12).</p>
      <h4>Step 2: Enter Squad Info & Upload Team Crest</h4><p>Input Team Name, WhatsApp number, and UIDs for all roster members.</p>
      <h4>Step 3: Scan UPI QR & Complete Payment</h4><p>Scan our live dynamic UPI QR code (9347176849@ybl) and attach screenshot.</p>
      <h4>Step 4: Instant 30-Minute UPI Payout</h4><p>Cash prizes (₹700 for 1st, ₹450 for 2nd, ₹290 for 3rd) are transferred directly to your leader's UPI ID within 30 minutes!</p>`
    },
    {
      id: 'season-finals',
      title: 'Peros Esports Championship 2026: Season 1 Schedule & Live Cast',
      category: 'ANNOUNCEMENT',
      author: 'Organizer Desk',
      date: 'March 2026 • 4 min read',
      mediaType: 'photo',
      img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      videoUrl: null,
      excerpt: 'Everything you need to know about the upcoming high-stakes showdown, prize pool distribution, casting links, and hall of fame awards.',
      content: `<p>The grand stage is set! Top tier squads from across the country will clash in the ultimate Season 1 Grand Championship for huge prize pools.</p>
      <h4>Tournament Format</h4>
      <ul>
        <li><strong>Tournament Type:</strong> Bermuda Full Map Battle Royale (12 Squads / 48 Players)</li>
        <li><strong>Grand Finals Date:</strong> Weekend High-Stakes Showdown (8:00 PM IST)</li>
        <li><strong>Official Points System:</strong> 1st Place (12 Pts + ₹700), 2nd Place (9 Pts + ₹450), 3rd Place (8 Pts + ₹290), 1 Pt per Kill.</li>
      </ul>`
    }
  ],
  contactInquiries: [],
  users: [],
  currentUser: null,
  adminSession: {
    isLoggedIn: false
  }
};

// ==========================================
// TOURNAMENT PLATFORM CONTROLLER
// ==========================================
class TournamentApp {
  constructor() {
    this.db = this.loadDatabase();
    this.currentStep = 1;
    this.selectedSlotForReg = null;
    this.uploadedScreenshotBase64 = null;
    this.uploadedTeamLogoBase64 = null;
    this.uploadedBlogPhotoBase64 = null;
    this.authMode = 'login';
    this.deferredPrompt = null;
    this.currentTourBannerUrl = null;
    this.gameFilter = 'All';
    this.statusFilter = 'all';

    this.init();
  }

  loadDatabase() {
    try {
      let stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        for (const legacyKey of LEGACY_STORAGE_KEYS) {
          stored = localStorage.getItem(legacyKey);
          if (stored) break;
        }
      }

      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.tournaments && parsed.tournaments.length > 0) {
          // Sanitize demo squads so slots start clean
          parsed.tournaments.forEach(t => {
            if (t.slots) {
              t.slots.forEach(s => {
                if (s.squadName === 'ALPHA ESPORTS' || s.squadName === 'SOUL REAPERS' || s.squadName === 'TEAM HYDRA' || s.squadName === 'DEADLY VIPERS') {
                  s.status = 'available';
                  s.squadName = null;
                  s.squadTag = null;
                  s.teamLogo = null;
                  s.leaderName = null;
                  s.leaderPhone = null;
                  s.registeredByEmail = null;
                  s.players = [];
                  s.paymentRef = null;
                  s.screenshot = null;
                  s.matchStats = null;
                }
              });
            }
          });

          if (!parsed.blogPosts || parsed.blogPosts.length === 0) {
            parsed.blogPosts = JSON.parse(JSON.stringify(INITIAL_DATABASE.blogPosts));
          }
          if (!parsed.contactInquiries) {
            parsed.contactInquiries = [];
          }

          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load database:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATABASE));
  }

  saveDatabase() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
    } catch (e) {
      console.error('Failed to save database:', e);
    }
    this.renderAll();
  }

  getActiveTournament() {
    const t = this.db.tournaments.find(x => x.id === this.db.activeTournamentId);
    return t || this.db.tournaments[0];
  }

  init() {
    this.renderAll();
    this.startCountdown();
    this.setupEventListeners();
    this.setupAudioToggle();
    this.registerServiceWorker();
    this.checkFirstTimeVisitor();
  }

  // ==========================================
  // SERVICE WORKER & PWA INSTALLATION
  // ==========================================
  registerServiceWorker() {
    // Show install buttons immediately so all mobile/desktop users can access
    const installBtn = document.getElementById('btn-install-app');
    const installBanner = document.getElementById('pwa-install-banner');
    if (installBtn) installBtn.style.display = 'inline-flex';
    if (installBanner) installBanner.style.display = 'flex';

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
          reg.update();
        }).catch(err => {
          console.log('SW registration note:', err);
        });
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (installBtn) installBtn.style.display = 'inline-flex';
      if (installBanner) installBanner.style.display = 'flex';
    });
  }

  triggerPWAInstall() {
    window.sfx?.playClick();
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User installed the Peros Esports app!');
          window.sfx?.playFanfare();
        }
        this.deferredPrompt = null;
        document.getElementById('pwa-install-banner')?.style.setProperty('display', 'none');
      });
    } else {
      // Open interactive installation guide modal for all mobile/desktop browsers
      document.getElementById('modal-pwa-guide')?.classList.add('active');
    }
  }

  // ==========================================
  // FIRST TIME VISITOR PROMPT
  // ==========================================
  checkFirstTimeVisitor() {
    const hasVisited = localStorage.getItem('clutch_has_visited');
    if (!hasVisited && !this.db.currentUser && !this.db.adminSession.isLoggedIn) {
      localStorage.setItem('clutch_has_visited', 'true');
      setTimeout(() => {
        this.openAuthModal('signup');
      }, 700);
    }
  }

  // ==========================================
  // MASTER RENDER
  // ==========================================
  renderAll() {
    this.renderTournamentHeaderAndSwitcher();
    this.renderTournamentsLobby();
    this.renderSlotGrid();
    this.renderSlotMeter();
    this.renderPrizeBreakdown();
    this.renderUserAuthUI();
    this.renderBlogGrid();
    this.renderAdminSquadTable();
    this.renderPointsInputTable();
    this.renderRoomDetails();
    this.renderAdminTournamentsList();
  }

  renderTournamentHeaderAndSwitcher() {
    const t = this.getActiveTournament();
    
    const switcherSelect = document.getElementById('event-switcher-select');
    if (switcherSelect) {
      switcherSelect.innerHTML = '';
      this.db.tournaments.forEach(tour => {
        const opt = document.createElement('option');
        opt.value = tour.id;
        opt.textContent = `${tour.name} (${tour.gameMode || 'BR'})`;
        if (tour.id === t.id) opt.selected = true;
        switcherSelect.appendChild(opt);
      });
    }

    const heroTitle = document.getElementById('hero-title-main');
    const heroSlogan = document.getElementById('hero-slogan');
    const statEntryFee = document.getElementById('stat-entry-fee');
    const statTotalPrize = document.getElementById('stat-total-prize');
    const heroEntryCta = document.getElementById('hero-entry-cta-fee');
    const badgeMode = document.getElementById('badge-game-mode');
    const badgeMap = document.getElementById('badge-game-map');
    const badgeFormat = document.getElementById('badge-game-format');
    const heroLogoImg = document.getElementById('hero-main-logo-img');
    const waGroupLink = document.getElementById('link-join-wa-group');
    const waSupportPhone = document.getElementById('organizer-support-phone');

    if (heroTitle) heroTitle.textContent = t.name;
    if (heroSlogan) heroSlogan.textContent = t.subtitle || 'Where Every Clutch Counts! ⚡';
    if (statEntryFee) statEntryFee.textContent = `₹${t.entryFee}`;
    if (statTotalPrize) statTotalPrize.textContent = `₹${t.totalPrizePool.toLocaleString()}`;
    if (heroEntryCta) heroEntryCta.textContent = `(₹${t.entryFee})`;

    if (badgeMode) badgeMode.textContent = `🎮 ${t.gameMode || 'BATTLE ROYALE'}`;
    if (badgeMap) badgeMap.textContent = `🗺️ ${t.mapName || 'BERMUDA FULL MAP'}`;
    if (badgeFormat) badgeFormat.textContent = `👥 ${t.format || 'SQUAD (4v4)'}`;
    if (heroLogoImg && t.bannerImage) heroLogoImg.src = t.bannerImage;
    if (waGroupLink && t.officialGroupLink) waGroupLink.href = t.officialGroupLink;
    if (waSupportPhone && t.organizerPhone) waSupportPhone.textContent = `+${t.organizerPhone}`;
  }

  // ==========================================
  // AGENT ESPORTS TOURNAMENTS & SCRIMS LOBBY
  // ==========================================
  renderTournamentsLobby() {
    const gridEl = document.getElementById('tournaments-lobby-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';

    let filtered = this.db.tournaments;

    // Filter by Game mode / Title
    if (this.gameFilter && this.gameFilter !== 'All') {
      const g = this.gameFilter.toLowerCase();
      filtered = filtered.filter(t => {
        const gameStr = (t.game || '').toLowerCase();
        const modeStr = (t.gameMode || '').toLowerCase();
        const nameStr = (t.name || '').toLowerCase();
        return gameStr.includes(g) || modeStr.includes(g) || nameStr.includes(g);
      });
    }

    // Filter by Status
    if (this.statusFilter === 'live') {
      filtered = filtered.filter(t => t.id === this.db.activeTournamentId || t.roomStatus === 'live');
    } else if (this.statusFilter === 'upcoming') {
      filtered = filtered.filter(t => t.slots.some(s => s.status === 'available'));
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">🎮</div>
          <h3 style="color: #FFF; font-family: var(--font-heading);">No Tournaments Found</h3>
          <p style="color: #8C9BAE; font-size: 0.9rem; margin-top: 6px;">Try selecting another game tab or view all events!</p>
          <button class="btn btn-sm btn-primary" style="margin-top: 16px;" onclick="app.filterTournamentsByGame('All'); app.filterTournamentsStatus('all');">View All Tournaments</button>
        </div>
      `;
      return;
    }

    filtered.forEach(t => {
      const isCurrent = t.id === this.db.activeTournamentId;
      const totalSlots = t.totalSlots || t.slots.length || 12;
      const filledSlots = t.slots.filter(s => s.status !== 'available').length;
      const progressPct = Math.round((filledSlots / totalSlots) * 100);
      const bannerSrc = t.bannerImage || 'assets/peros-logo.jpg';
      const playersPerTeam = t.playersPerSquad || 4;
      const totalPlayers = totalSlots * playersPerTeam;

      const card = document.createElement('div');
      card.className = 'tour-card';

      card.innerHTML = `
        <div class="tour-card-banner-wrap">
          <img src="${bannerSrc}" onerror="this.src='peros-logo.jpg'" alt="${this.escapeHtml(t.name)}" class="tour-card-banner-img">
          <div class="tour-card-badges-float">
            <span class="badge ${isCurrent ? 'badge-live' : 'badge-confirmed'}">
              ${isCurrent ? '<span class="pulse-dot"></span> LIVE ARENA' : 'OPEN FOR ENTRY'}
            </span>
            <span class="badge badge-available" style="font-size:0.7rem;">
              <i class="fa-solid fa-gamepad"></i> ${this.escapeHtml(t.gameMode || 'BATTLE ROYALE')}
            </span>
          </div>
        </div>

        <div class="tour-card-body">
          <div>
            <h3 class="tour-card-title">${this.escapeHtml(t.name)}</h3>
            <div class="tour-card-subtitle">${this.escapeHtml(t.subtitle || 'Where Every Clutch Counts! ⚡')}</div>

            <div class="tour-card-meta-row">
              <span class="tour-meta-pill"><i class="fa-solid fa-map-location-dot" style="color:var(--fire-amber);"></i> ${this.escapeHtml(t.mapName || 'Bermuda')}</span>
              <span class="tour-meta-pill"><i class="fa-solid fa-users" style="color:var(--cyber-cyan);"></i> ${this.escapeHtml(t.format || 'Squad')}</span>
              <span class="tour-meta-pill"><i class="fa-solid fa-crosshairs" style="color:var(--gold-champion);"></i> ${totalPlayers} Gamers</span>
            </div>

            <div class="tour-card-financials">
              <div class="tour-fee-box">
                <small>Entry / Squad</small>
                <div class="tour-fee-val">₹${t.entryFee}</div>
              </div>
              <div class="tour-prize-box" style="text-align:right;">
                <small>Total Cash Prize</small>
                <div class="tour-prize-val">₹${t.totalPrizePool.toLocaleString()}</div>
              </div>
            </div>

            <div class="tour-slots-progress-wrap">
              <div class="tour-slots-progress-label">
                <span>Slots Allocation</span>
                <span style="color:${progressPct > 70 ? 'var(--fire-orange)' : 'var(--cyber-cyan)'};">${filledSlots} / ${totalSlots} Claimed</span>
              </div>
              <div class="slot-progress-bar-bg" style="height:8px;">
                <div class="slot-progress-bar-fill" style="width:${progressPct}%;"></div>
              </div>
            </div>
          </div>

          <div class="tour-card-actions">
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="app.switchAndScrollToArena('${t.id}')">
              <span>🎯</span> Enter Arena
            </button>
            <a href="${t.officialGroupLink || '#'}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" title="Join WhatsApp Group">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      `;

      gridEl.appendChild(card);
    });
  }

  switchAndScrollToArena(tourId) {
    this.switchTournament(tourId);
    window.sfx?.playSuccess();
    const arenaEl = document.getElementById('match-arena');
    if (arenaEl) {
      arenaEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  filterTournamentsByGame(game) {
    this.gameFilter = game;
    document.querySelectorAll('.game-pill').forEach(btn => {
      const txt = btn.textContent.toLowerCase();
      if (game === 'All' && txt.includes('all')) {
        btn.classList.add('active');
      } else if (game !== 'All' && txt.includes(game.toLowerCase())) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.renderTournamentsLobby();
    window.sfx?.playClick();
  }

  filterTournamentsStatus(status) {
    this.statusFilter = status;
    document.querySelectorAll('.filter-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const clickedBtn = event?.currentTarget || event?.target;
    if (clickedBtn && clickedBtn.classList.contains('filter-tab-btn')) {
      clickedBtn.classList.add('active');
    }
    this.renderTournamentsLobby();
    window.sfx?.playClick();
  }

  openShopCheckout(itemName, itemPrice) {
    window.sfx?.playClick();
    const modal = document.getElementById('modal-shop-checkout');
    const nameEl = document.getElementById('shop-modal-item-name');
    const priceEl = document.getElementById('shop-modal-item-price');
    const waBtn = document.getElementById('btn-shop-wa-confirm');

    if (nameEl) nameEl.textContent = itemName;
    if (priceEl) priceEl.textContent = `Price: ${itemPrice}`;

    if (waBtn) {
      waBtn.onclick = () => {
        const userName = this.db.currentUser?.name || 'Gamer';
        const userPhone = this.db.currentUser?.phone || '';
        const message = 
`🛍️ *PEROS ESPORTS STORE ORDER* 🛍️
━━━━━━━━━━━━━━━━━━━━━━━━━
📦 *Item:* ${itemName}
💰 *Price:* ${itemPrice}
👤 *Buyer Name:* ${userName}
${userPhone ? `📱 *Phone:* ${userPhone}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━
I want to make the UPI payment and get my order delivered! ⚡`;

        const waUrl = `https://wa.me/919347176849?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
        modal?.classList.remove('active');
      };
    }

    modal?.classList.add('active');
  }

  renderSlotGrid() {
    const t = this.getActiveTournament();
    const gridEl = document.getElementById('slots-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    t.slots.forEach(slot => {
      const card = document.createElement('div');
      card.className = `slot-card ${slot.status}`;
      card.setAttribute('data-slot', slot.slotNumber);

      let statusBadge = '';
      if (slot.status === 'confirmed') {
        statusBadge = '<span class="badge badge-confirmed">Confirmed ✅</span>';
      } else if (slot.status === 'pending') {
        statusBadge = '<span class="badge badge-pending">Pending ⏳</span>';
      } else {
        statusBadge = '<span class="badge badge-available">Available ⚡</span>';
      }

      let logoHtml = '';
      if (slot.teamLogo) {
        logoHtml = `<div class="team-logo-avatar"><img src="${slot.teamLogo}" alt="Logo"></div>`;
      } else if (slot.squadName) {
        const initials = slot.squadName.substring(0, 2).toUpperCase();
        logoHtml = `<div class="team-logo-avatar">${initials}</div>`;
      }

      let innerContent = '';
      if (slot.status === 'confirmed' || slot.status === 'pending') {
        innerContent = `
          <div>
            <div class="slot-card-header">
              <div class="slot-number-badge">#${slot.slotNumber}</div>
              ${statusBadge}
            </div>
            <div class="slot-identity-row">
              ${logoHtml}
              <div>
                <div class="slot-squad-name">${this.escapeHtml(slot.squadName)}</div>
                <div class="slot-squad-tag">[${this.escapeHtml(slot.squadTag || 'SQUAD')}]</div>
              </div>
            </div>
            <div class="slot-leader-info">
              <span>👤 Leader:</span> <strong>${this.escapeHtml(slot.leaderName || 'Unknown')}</strong>
            </div>
          </div>
          <div>
            <div class="slot-players-preview">
              <div class="player-avatar-dot filled" title="P1: ${slot.players[0]?.ign || ''}">P1</div>
              <div class="player-avatar-dot filled" title="P2: ${slot.players[1]?.ign || ''}">P2</div>
              <div class="player-avatar-dot filled" title="P3: ${slot.players[2]?.ign || ''}">P3</div>
              <div class="player-avatar-dot filled" title="P4: ${slot.players[3]?.ign || ''}">P4</div>
              <span style="font-size:0.75rem; color:#8C9BAE; margin-left:6px;">4/4 Players</span>
            </div>
          </div>
        `;
      } else {
        innerContent = `
          <div>
            <div class="slot-card-header">
              <div class="slot-number-badge">#${slot.slotNumber}</div>
              ${statusBadge}
            </div>
            <div class="slot-squad-name" style="color: #64748B;">Empty Slot</div>
            <div class="slot-squad-tag" style="color: #475569;">Ready for Squad</div>
            <div class="slot-leader-info" style="color: #64748B;">
              <span>4 Players Required</span>
            </div>
          </div>
          <div class="slot-claim-cta">
            <span>🔥 Claim Slot #${slot.slotNumber}</span>
            <span style="font-size: 1.1rem;">➔</span>
          </div>
        `;
      }

      card.innerHTML = innerContent;
      card.addEventListener('click', () => this.handleSlotClick(slot));
      gridEl.appendChild(card);
    });
  }

  renderSlotMeter() {
    const t = this.getActiveTournament();
    const confirmedCount = t.slots.filter(s => s.status === 'confirmed').length;
    const pendingCount = t.slots.filter(s => s.status === 'pending').length;
    const availableCount = t.slots.filter(s => s.status === 'available').length;
    const total = t.slots.length;

    const countEl = document.getElementById('slot-meter-count');
    const fillEl = document.getElementById('slot-progress-bar-fill');
    const statFilledEl = document.getElementById('stat-slots-filled');

    if (countEl) {
      countEl.innerHTML = `<span>${total - availableCount}</span> / ${total} SQUADS`;
    }
    if (statFilledEl) {
      statFilledEl.textContent = `${total - availableCount} / ${total}`;
    }
    if (fillEl) {
      const pct = Math.round(((total - availableCount) / total) * 100);
      fillEl.style.width = `${pct}%`;
    }
  }

  renderPrizeBreakdown() {
    const t = this.getActiveTournament();
    const p = t.prizes;
    const el1 = document.getElementById('prize-1st');
    const el2 = document.getElementById('prize-2nd');
    const el3 = document.getElementById('prize-3rd');
    const elTotal = document.getElementById('prize-total');
    const elFee = document.getElementById('prize-entry-fee');

    if (el1) el1.textContent = `₹${p.first.toLocaleString()}`;
    if (el2) el2.textContent = `₹${p.second.toLocaleString()}`;
    if (el3) el3.textContent = `₹${p.third.toLocaleString()}`;
    if (elTotal) elTotal.textContent = `₹${t.totalPrizePool.toLocaleString()}`;
    if (elFee) elFee.textContent = `₹${t.entryFee} / SQUAD`;
  }

  renderRoomDetails() {
    const t = this.getActiveTournament();
    const roomIdEl = document.getElementById('display-room-id');
    const roomPassEl = document.getElementById('display-room-pass');
    if (roomIdEl) roomIdEl.textContent = t.roomId || 'TBA';
    if (roomPassEl) roomPassEl.textContent = t.roomPass || 'TBA';
  }

  switchTournament(tournamentId) {
    if (this.db.tournaments.some(t => t.id === tournamentId)) {
      this.db.activeTournamentId = tournamentId;
      this.saveDatabase();
      window.sfx?.playSuccess();
    }
  }

  startCountdown() {
    const update = () => {
      const t = this.getActiveTournament();
      const matchTime = new Date(t.matchDateTime).getTime();
      const now = new Date().getTime();
      const diff = matchTime - now;

      const daysEl = document.getElementById('cd-days');
      const hoursEl = document.getElementById('cd-hours');
      const minsEl = document.getElementById('cd-mins');
      const secsEl = document.getElementById('cd-secs');

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
  }

  // ==========================================
  // UNIFIED AUTHENTICATION & SECRET ADMIN ROUTING
  // ==========================================
  renderUserAuthUI() {
    const authBtn = document.getElementById('btn-nav-auth');
    const userProfileCapsule = document.getElementById('nav-user-capsule');
    const userNameEl = document.getElementById('nav-user-display-name');
    const userAvatarEl = document.getElementById('nav-user-avatar');

    if (this.db.adminSession.isLoggedIn) {
      if (authBtn) authBtn.style.display = 'none';
      if (userProfileCapsule) userProfileCapsule.style.display = 'flex';
      if (userNameEl) userNameEl.textContent = 'Organizer (charukesh)';
      if (userAvatarEl) userAvatarEl.textContent = '👑';
    } else if (this.db.currentUser) {
      if (authBtn) authBtn.style.display = 'none';
      if (userProfileCapsule) userProfileCapsule.style.display = 'flex';
      if (userNameEl) userNameEl.textContent = this.db.currentUser.name;
      if (userAvatarEl) userAvatarEl.textContent = this.db.currentUser.name.charAt(0).toUpperCase();
    } else {
      if (authBtn) authBtn.style.display = 'flex';
      if (userProfileCapsule) userProfileCapsule.style.display = 'none';
    }
  }

  openAuthModal(mode = 'login') {
    this.authMode = mode;
    this.switchAuthTab(mode);
    const modal = document.getElementById('modal-auth') || document.getElementById('modal-user-auth');
    modal?.classList.add('active');
  }

  switchAuthTab(mode) {
    this.authMode = mode;
    const tabLogin = document.getElementById('auth-tab-login');
    const tabSignup = document.getElementById('auth-tab-signup');
    const formLogin = document.getElementById('auth-form-login');
    const formSignup = document.getElementById('auth-form-signup');

    if (tabLogin) tabLogin.classList.toggle('active', mode === 'login');
    if (tabSignup) tabSignup.classList.toggle('active', mode === 'signup');
    if (formLogin) formLogin.style.display = mode === 'login' ? 'block' : 'none';
    if (formSignup) formSignup.style.display = mode === 'signup' ? 'block' : 'none';
  }

  handleUserLogin() {
    const emailOrUser = document.getElementById('login-email')?.value.trim();
    const pass = document.getElementById('login-pass')?.value;

    if (!emailOrUser || !pass) {
      alert('Please enter your Email/Username and Password.');
      return;
    }

    // SECRET ADMIN CHECK: Automatically route to Admin Portal if organizer credentials matched
    const inputClean = emailOrUser.toLowerCase();
    const isSecretAdmin = (inputClean === SECRET_ADMIN.username.toLowerCase() || 
                           inputClean === SECRET_ADMIN.email.toLowerCase() ||
                           inputClean === SECRET_ADMIN.alternateEmail.toLowerCase()) && 
                          pass === SECRET_ADMIN.password;

    if (isSecretAdmin) {
      this.db.adminSession = { isLoggedIn: true };
      this.db.currentUser = {
        name: 'Charukesh Organizer',
        email: SECRET_ADMIN.email,
        phone: '9347176849'
      };
      this.saveDatabase();
      window.sfx?.playFanfare();
      (document.getElementById('modal-auth') || document.getElementById('modal-user-auth'))?.classList.remove('active');
      this.openAdminDashboardModal();
      return;
    }

    // REGULAR PLAYER CHECK
    const user = this.db.users.find(u => (u.email === emailOrUser.toLowerCase() || u.name.toLowerCase() === emailOrUser.toLowerCase()) && u.password === pass);
    if (!user) {
      window.sfx?.playBuzzer();
      alert('❌ Invalid Email ID or Password. Please try again or create an account.');
      return;
    }

    this.db.currentUser = user;
    this.db.adminSession = { isLoggedIn: false };
    this.saveDatabase();

    window.sfx?.playSuccess();
    alert(`✅ Logged in successfully as ${user.name}!`);
    (document.getElementById('modal-auth') || document.getElementById('modal-user-auth'))?.classList.remove('active');
  }

  handleUserSignUp() {
    const name = document.getElementById('signup-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim().toLowerCase();
    const phone = document.getElementById('signup-phone')?.value.trim();
    const pass = document.getElementById('signup-pass')?.value;

    if (!name || !email || !phone || !pass) {
      alert('Please fill in all fields (Name, Email ID, Phone, Password).');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Please provide a valid email ID.');
      return;
    }

    if (this.db.users.some(u => u.email === email)) {
      alert('An account with this email ID already exists! Please log in.');
      this.switchAuthTab('login');
      return;
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name: name,
      email: email,
      phone: phone,
      password: pass,
      createdAt: new Date().toISOString()
    };

    this.db.users.push(newUser);
    this.db.currentUser = newUser;
    this.db.adminSession = { isLoggedIn: false };
    this.saveDatabase();

    window.sfx?.playSuccess();
    alert(`🎉 Account created successfully! Welcome, ${newUser.name}!`);
    (document.getElementById('modal-auth') || document.getElementById('modal-user-auth'))?.classList.remove('active');
  }

  handleGoogleAuth() {
    const googleName = prompt('Enter your Name for Google Sign-In:', 'Player');
    if (!googleName) return;
    const googleEmail = prompt('Enter your Google Email ID:', `${googleName.toLowerCase().replace(/\s+/g, '')}@gmail.com`);
    if (!googleEmail) return;

    let user = this.db.users.find(u => u.email === googleEmail.toLowerCase());
    if (!user) {
      user = {
        id: 'google_user_' + Date.now(),
        name: googleName,
        email: googleEmail.toLowerCase(),
        phone: '9876543210',
        password: 'google_oauth_authenticated',
        createdAt: new Date().toISOString()
      };
      this.db.users.push(user);
    }

    this.db.currentUser = user;
    this.db.adminSession = { isLoggedIn: false };
    this.saveDatabase();

    window.sfx?.playSuccess();
    alert(`⚡ Signed in with Google as ${user.name} (${user.email})!`);
    (document.getElementById('modal-auth') || document.getElementById('modal-user-auth'))?.classList.remove('active');
  }

  handleUserLogout() {
    if (confirm('Are you sure you want to log out?')) {
      this.db.currentUser = null;
      this.db.adminSession = { isLoggedIn: false };
      this.saveDatabase();
      window.sfx?.playClick();
      alert('You have been logged out.');
      document.getElementById('modal-my-squads')?.classList.remove('active');
      document.getElementById('modal-admin')?.classList.remove('active');
    }
  }

  openMySquadsModal() {
    if (this.db.adminSession.isLoggedIn) {
      this.openAdminDashboardModal();
      return;
    }

    if (!this.db.currentUser) {
      this.openAuthModal('login');
      return;
    }

    const modal = document.getElementById('modal-my-squads');
    const content = document.getElementById('my-squads-body');
    if (!modal || !content) return;

    const email = this.db.currentUser.email;
    const myRegistrations = [];

    this.db.tournaments.forEach(tour => {
      tour.slots.forEach(slot => {
        if (slot.registeredByEmail === email || slot.leaderPhone === this.db.currentUser.phone) {
          myRegistrations.push({ tournament: tour, slot: slot });
        }
      });
    });

    if (myRegistrations.length === 0) {
      content.innerHTML = `
        <div style="text-align:center; padding:30px 10px;">
          <div style="font-size:2.5rem; margin-bottom:10px;">🛡️</div>
          <h4 style="color:#FFF; font-family:var(--font-heading);">No Squad Registrations Found</h4>
          <p style="color:#8C9BAE; font-size:0.9rem; margin-top:6px;">You haven't registered a squad for any tournaments yet.</p>
          <button class="btn btn-primary" style="margin-top:16px;" onclick="app.openRegistrationModal(); document.getElementById('modal-my-squads').classList.remove('active');">
            Register a Squad Now
          </button>
        </div>
      `;
    } else {
      let listHtml = '';
      myRegistrations.forEach(item => {
        const t = item.tournament;
        const s = item.slot;
        listHtml += `
          <div style="background:rgba(255,255,255,0.04); border:1px solid var(--border-glass); border-radius:var(--radius-md); padding:16px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-family:var(--font-display); color:var(--fire-amber); font-weight:700;">${this.escapeHtml(t.name)}</span>
              <span class="badge ${s.status === 'confirmed' ? 'badge-confirmed' : 'badge-pending'}">${s.status.toUpperCase()}</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
              ${s.teamLogo ? `<img src="${s.teamLogo}" style="width:36px; height:36px; border-radius:8px; object-fit:cover;">` : ''}
              <div>
                <strong style="color:#FFF; font-size:1.1rem;">${this.escapeHtml(s.squadName)}</strong>
                <span style="color:var(--cyber-cyan); font-size:0.85rem;"> [${this.escapeHtml(s.squadTag || '')}]</span>
                <div style="color:#8C9BAE; font-size:0.8rem;">Assigned Slot: <strong>#${s.slotNumber}</strong></div>
              </div>
            </div>
            ${s.status === 'confirmed' ? `
              <div style="background:rgba(0,240,255,0.08); border:1px solid rgba(0,240,255,0.25); border-radius:var(--radius-sm); padding:10px; margin-top:10px; font-size:0.85rem;">
                <div style="color:var(--cyber-cyan); font-weight:700; margin-bottom:4px;">🔐 Match Room Credentials:</div>
                <div>Room ID: <strong style="color:#FFF; font-family:monospace;">${t.roomId || 'Available 15m before match'}</strong></div>
                <div>Password: <strong style="color:#FFF; font-family:monospace;">${t.roomPass || 'Available 15m before match'}</strong></div>
              </div>
            ` : '<div style="color:var(--fire-amber); font-size:0.8rem; margin-top:6px;">⏳ Payment verification in progress with Organizer.</div>'}
          </div>
        `;
      });

      content.innerHTML = listHtml;
    }

    modal.classList.add('active');
  }

  // ==========================================
  // SLOT INTERACTIONS & REGISTRATION WIZARD
  // ==========================================
  handleSlotClick(slot) {
    if (slot.status === 'available') {
      window.sfx?.playSlotSelect();
      this.openRegistrationModal(slot.slotNumber);
    } else {
      window.sfx?.playClick();
      this.openSlotDetailsModal(slot);
    }
  }

  openSlotDetailsModal(slot) {
    const modal = document.getElementById('modal-slot-details');
    const contentEl = document.getElementById('slot-details-body');
    if (!modal || !contentEl) return;

    let logoHtml = '';
    if (slot.teamLogo) {
      logoHtml = `<div class="team-logo-avatar team-logo-lg"><img src="${slot.teamLogo}" alt="Logo"></div>`;
    } else if (slot.squadName) {
      const initials = slot.squadName.substring(0, 2).toUpperCase();
      logoHtml = `<div class="team-logo-avatar team-logo-lg">${initials}</div>`;
    }

    let playersHtml = '';
    (slot.players || []).forEach((p, idx) => {
      playersHtml += `
        <div style="background:rgba(255,255,255,0.04); border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:10px 14px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="color:var(--fire-amber); font-weight:700; font-family:var(--font-heading); margin-right:8px;">#${idx + 1}</span>
            <strong style="color:#FFF;">${this.escapeHtml(p.ign || 'Player')}</strong>
            ${idx === 0 ? '<span class="badge badge-live" style="margin-left:8px; padding:2px 8px; font-size:0.68rem;">Leader</span>' : ''}
          </div>
          <div style="font-family:monospace; color:var(--cyber-cyan); font-size:0.9rem;">
            UID: ${this.escapeHtml(p.uid || 'N/A')}
          </div>
        </div>
      `;
    });

    contentEl.innerHTML = `
      <div style="text-align:center; margin-bottom:20px;">
        ${logoHtml}
        <div class="slot-number-badge" style="margin:0 auto 10px; width:44px; height:44px; font-size:1.3rem;">#${slot.slotNumber}</div>
        <h3 style="font-family:var(--font-display); font-size:1.6rem; color:#FFF;">${this.escapeHtml(slot.squadName)}</h3>
        <div style="color:var(--cyber-cyan); font-family:var(--font-heading); font-size:0.95rem; font-weight:700;">TAG: [${this.escapeHtml(slot.squadTag || 'SQUAD')}]</div>
        <div style="margin-top:8px;">
          ${slot.status === 'confirmed' 
            ? '<span class="badge badge-confirmed">Confirmed Squad ✅</span>' 
            : '<span class="badge badge-pending">Payment Verification In Progress ⏳</span>'}
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <h4 style="font-family:var(--font-heading); color:#CBD5E0; font-size:0.95rem; text-transform:uppercase; margin-bottom:10px;">👥 Squad Roster (4 Players)</h4>
        ${playersHtml}
      </div>

      <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:14px; font-size:0.85rem; color:#94A3B8;">
        <div>📅 Registered: ${slot.registeredAt ? new Date(slot.registeredAt).toLocaleString() : 'Recent'}</div>
        <div>🛡️ Room status: Room ID & Password will be shared on Leader's WhatsApp before match.</div>
      </div>
    `;

    modal.classList.add('active');
  }

  // ==========================================
  // ESPORTS BLOGS & COMMUNITY GAMEPLAY REELS
  // ==========================================
  renderBlogGrid() {
    const gridEl = document.getElementById('blog-cards-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    const posts = this.db.blogPosts || [];

    if (posts.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🎬</div>
          <h3 style="color: #FFF; font-family: var(--font-heading);">No Blogs or Clips Posted Yet</h3>
          <p style="color: #8C9BAE; font-size: 0.9rem; margin-top: 6px;">Be the first player to post a gameplay clip or guide!</p>
          <button class="btn btn-sm btn-primary" style="margin-top: 14px;" onclick="app.openCreateBlogModal()">
            <i class="fa-solid fa-plus"></i> Post a Blog / Gameplay Reel
          </button>
        </div>
      `;
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.addEventListener('click', () => this.openBlogModal(post.id));

      const isVideo = post.mediaType === 'video' || (post.videoUrl && post.videoUrl.trim() !== '');
      const thumbSrc = post.img || 'assets/peros-logo.jpg';

      card.innerHTML = `
        <div class="blog-thumb-wrap">
          <img src="${thumbSrc}" onerror="this.src='peros-logo.jpg'" alt="${this.escapeHtml(post.title)}" class="blog-thumb-img">
          <span class="blog-category-badge">${this.escapeHtml(post.category || 'COMMUNITY')}</span>
          ${isVideo ? `
            <span class="blog-video-badge"><i class="fa-solid fa-play"></i> VIDEO REEL</span>
            <div class="blog-play-icon-overlay"><i class="fa-solid fa-play"></i></div>
          ` : ''}
        </div>
        <div class="blog-card-body">
          <div class="blog-date">
            <i class="fa-regular fa-calendar"></i> ${this.escapeHtml(post.date || 'Recent')} • 👤 ${this.escapeHtml(post.author || 'Peros Gamer')}
          </div>
          <h3 class="blog-title">${this.escapeHtml(post.title)}</h3>
          <p class="blog-excerpt">${this.escapeHtml(post.excerpt || '')}</p>
          <div class="blog-card-footer">
            <span class="blog-read-more">${isVideo ? 'Watch Reel & Tactics ➔' : 'Read Full Article ➔'}</span>
          </div>
        </div>
      `;

      gridEl.appendChild(card);
    });
  }

  openCreateBlogModal() {
    window.sfx?.playClick();
    const modal = document.getElementById('modal-create-blog');
    if (!modal) return;

    document.getElementById('create-blog-form')?.reset();
    this.uploadedBlogPhotoBase64 = null;
    this.toggleBlogMediaType('photo');

    const authorInput = document.getElementById('create-blog-author');
    if (authorInput) {
      if (this.db.adminSession.isLoggedIn) {
        authorInput.value = 'Organizer (Charukesh)';
      } else if (this.db.currentUser) {
        authorInput.value = this.db.currentUser.name;
      } else {
        authorInput.value = '';
      }
    }

    const previewWrap = document.getElementById('create-blog-preview-wrap');
    if (previewWrap) {
      previewWrap.innerHTML = `
        <span style="font-size:2rem;">📸</span>
        <span style="color:#CBD5E0; font-size:0.9rem;">Click or tap to upload high-res screenshot or thumbnail</span>
        <span style="color:#64748B; font-size:0.78rem;">PNG, JPG, WebP supported</span>
      `;
    }

    modal.classList.add('active');
  }

  toggleBlogMediaType(type) {
    const photoGroup = document.getElementById('blog-media-photo-group');
    const videoGroup = document.getElementById('blog-media-video-group');
    const labelPhoto = document.getElementById('label-media-photo');
    const labelVideo = document.getElementById('label-media-video');

    if (type === 'video') {
      if (photoGroup) photoGroup.style.display = 'none';
      if (videoGroup) videoGroup.style.display = 'block';
      if (labelPhoto) labelPhoto.classList.remove('active');
      if (labelVideo) labelVideo.classList.add('active');
    } else {
      if (photoGroup) photoGroup.style.display = 'block';
      if (videoGroup) videoGroup.style.display = 'none';
      if (labelPhoto) labelPhoto.classList.add('active');
      if (labelVideo) labelVideo.classList.remove('active');
    }
  }

  handleBlogThumbnailUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG/JPG/WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedBlogPhotoBase64 = e.target.result;
      const previewWrap = document.getElementById('create-blog-preview-wrap');
      if (previewWrap) {
        previewWrap.innerHTML = `
          <img src="${this.uploadedBlogPhotoBase64}" style="max-height:160px; border-radius:8px; object-fit:cover; border:1px solid var(--border-glass);">
          <span style="color:var(--success-green); font-size:0.85rem; font-weight:700;">✅ Photo attached successfully</span>
        `;
      }
      window.sfx?.playSuccess();
    };
    reader.readAsDataURL(file);
  }

  extractYouTubeVideoId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  handleCreateBlogSubmit() {
    const title = document.getElementById('create-blog-title')?.value.trim();
    const author = document.getElementById('create-blog-author')?.value.trim() || 'Peros Gamer';
    const category = document.getElementById('create-blog-category')?.value || 'GAMEPLAY CLIP';
    const mediaType = document.querySelector('input[name="create-blog-media-type"]:checked')?.value || 'photo';
    const videoUrl = document.getElementById('create-blog-video-url')?.value.trim();
    const content = document.getElementById('create-blog-content')?.value.trim();

    if (!title || !content) {
      alert('Please enter a Post Title and Description/Story.');
      return;
    }

    let thumbnailImg = this.uploadedBlogPhotoBase64 || 'assets/peros-logo.jpg';
    let cleanVideoUrl = null;

    if (mediaType === 'video' && videoUrl) {
      cleanVideoUrl = videoUrl;
      const ytId = this.extractYouTubeVideoId(videoUrl);
      if (ytId) {
        thumbnailImg = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
    }

    const newPost = {
      id: 'post_' + Date.now(),
      title: title,
      author: author,
      category: category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) + ' • Community Reel',
      mediaType: mediaType,
      img: thumbnailImg,
      videoUrl: cleanVideoUrl,
      excerpt: content.length > 140 ? content.substring(0, 140) + '...' : content,
      content: `<p>${this.escapeHtml(content).replace(/\n/g, '<br>')}</p>`
    };

    if (!this.db.blogPosts) this.db.blogPosts = [];
    this.db.blogPosts.unshift(newPost);
    this.saveDatabase();

    window.sfx?.playFanfare();
    alert(`🎉 Awesome, ${author}! Your post "${title}" is now live on the Peros Esports community blog!`);

    document.getElementById('modal-create-blog')?.classList.remove('active');
    document.getElementById('esports-blog')?.scrollIntoView({ behavior: 'smooth' });
  }

  openBlogModal(blogId) {
    window.sfx?.playClick();
    const modal = document.getElementById('modal-blog-reader');
    const bodyEl = document.getElementById('blog-reader-body');
    if (!modal || !bodyEl) return;

    let article = (this.db.blogPosts || []).find(b => b.id === blogId);
    if (!article) {
      article = (this.db.blogPosts && this.db.blogPosts[0]) || {
        title: 'Peros Esports Community Article',
        category: 'COMMUNITY',
        author: 'Peros Editorial',
        date: 'Recent',
        img: 'assets/peros-logo.jpg',
        content: '<p>Welcome to Peros Esports!</p>'
      };
    }

    const ytId = article.videoUrl ? this.extractYouTubeVideoId(article.videoUrl) : null;
    let mediaEmbedHtml = '';

    if (ytId) {
      mediaEmbedHtml = `
        <div class="blog-reader-video-container">
          <iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
      `;
    } else if (article.videoUrl && article.videoUrl.includes('mp4')) {
      mediaEmbedHtml = `
        <div class="blog-reader-video-container">
          <video controls autoplay style="width:100%; height:100%; object-fit:contain;">
            <source src="${article.videoUrl}" type="video/mp4">
          </video>
        </div>
      `;
    } else {
      mediaEmbedHtml = `
        <div class="blog-reader-hero">
          <img src="${article.img || 'assets/peros-logo.jpg'}" onerror="this.src='peros-logo.jpg'" alt="${this.escapeHtml(article.title)}">
          <span class="blog-reader-category">${this.escapeHtml(article.category || 'COMMUNITY')}</span>
        </div>
      `;
    }

    bodyEl.innerHTML = `
      ${mediaEmbedHtml}
      <h2 class="blog-reader-title">${this.escapeHtml(article.title)}</h2>
      <div class="blog-reader-meta">
        <span><i class="fa-regular fa-calendar"></i> ${this.escapeHtml(article.date || 'Recent')}</span>
        <span><i class="fa-solid fa-user-astronaut"></i> By ${this.escapeHtml(article.author || 'Peros Esports')}</span>
        <span style="color:var(--fire-amber);"><i class="fa-solid fa-fire"></i> ${this.escapeHtml(article.category || 'COMMUNITY')}</span>
      </div>
      <div class="blog-reader-content">
        ${article.content}
      </div>
      <div style="margin-top:28px; text-align:center; display:flex; gap:12px; flex-wrap:wrap;">
        <button class="btn btn-primary btn-lg" style="flex:1;" onclick="document.getElementById('modal-blog-reader').classList.remove('active'); document.getElementById('tournaments-lobby')?.scrollIntoView({behavior:'smooth'});">
          <span>🎮</span> Join Live Tournament Arena
        </button>
        <button class="btn btn-secondary" onclick="document.getElementById('modal-blog-reader').classList.remove('active');">
          Close Article
        </button>
      </div>
    `;

    modal.classList.add('active');
  }

  handleContactFormSubmit() {
    const name = document.getElementById('contact-name')?.value.trim();
    const phone = document.getElementById('contact-phone')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value || 'General Inquiry';
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !phone || !email || !message) {
      alert('Please fill in all required fields (Name, WhatsApp Phone, Email, and Message).');
      return;
    }

    const inquiry = {
      id: 'inquiry_' + Date.now(),
      name,
      phone,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString()
    };

    if (!this.db.contactInquiries) this.db.contactInquiries = [];
    this.db.contactInquiries.push(inquiry);
    this.saveDatabase();

    window.sfx?.playSuccess();

    // Prepare WhatsApp redirect message
    const waText = `🔥 *PEROS ESPORTS - PLAYER INQUIRY* 🔥\n\n👤 *Name:* ${name}\n📱 *WhatsApp Phone:* ${phone}\n✉️ *Email:* ${email}\n🎯 *Topic:* ${subject}\n\n📝 *Message:* \n"${message}"\n\n⚡ _Sent via Peros Esports Support Desk_`;
    const waUrl = `https://wa.me/919347176849?text=${encodeURIComponent(waText)}`;

    // Reset form
    document.getElementById('contact-us-form')?.reset();

    if (confirm(`✅ Inquiry submitted successfully, ${name}!\n\nWould you like to send this inquiry directly to Organizer Charukesh on WhatsApp (+91 9347176849)?`)) {
      window.open(waUrl, '_blank');
    }
  }

  openRegistrationModal(preselectedSlot = null) {
    const t = this.getActiveTournament();
    this.selectedSlotForReg = preselectedSlot;
    this.currentStep = 1;
    this.uploadedScreenshotBase64 = null;
    this.uploadedTeamLogoBase64 = null;

    document.getElementById('reg-form')?.reset();
    const screenshotPreview = document.getElementById('screenshot-preview-container');
    const logoPreview = document.getElementById('reg-logo-preview');
    if (screenshotPreview) screenshotPreview.style.display = 'none';
    if (logoPreview) logoPreview.innerHTML = '🛡️';

    if (this.db.currentUser) {
      const leaderPhoneInput = document.getElementById('reg-leader-phone');
      if (leaderPhoneInput && !leaderPhoneInput.value) leaderPhoneInput.value = this.db.currentUser.phone || '';
    }

    const slotSelect = document.getElementById('reg-slot-select');
    if (slotSelect) {
      slotSelect.innerHTML = '';
      t.slots.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.slotNumber;
        opt.textContent = `Slot #${s.slotNumber} (${s.status.toUpperCase()}${s.squadName ? ' - ' + s.squadName : ''})`;
        if (s.status !== 'available' && s.slotNumber !== preselectedSlot) {
          opt.disabled = true;
        }
        if (s.slotNumber === preselectedSlot) {
          opt.selected = true;
        }
        slotSelect.appendChild(opt);
      });
    }

    this.renderRegistrationPlayersRosterInputs();
    this.renderStepView();
    const modal = document.getElementById('modal-registration');
    modal?.classList.add('active');
  }

  renderRegistrationPlayersRosterInputs() {
    const t = this.getActiveTournament();
    const count = t.playersPerSquad || 4;
    const container = document.getElementById('reg-players-container');
    if (!container) return;

    let html = '';
    for (let i = 1; i <= count; i++) {
      const isLeader = i === 1;
      html += `
        <div class="player-input-card">
          <div class="player-input-header">
            <span>👤 Player ${i} ${isLeader ? '(Squad Leader / Captain)' : ''} *</span>
            ${isLeader ? '<span class="badge badge-live" style="font-size:0.65rem;">Captain</span>' : ''}
          </div>
          <div class="form-row">
            <input type="text" class="form-input" id="reg-p${i}-ign" placeholder="Free Fire IGN (e.g. ALP_Player${i})" required>
            <input type="text" class="form-input" id="reg-p${i}-uid" placeholder="Character UID (e.g. 28471928${i})" required>
          </div>
        </div>
      `;
    }
    container.innerHTML = html;

    if (this.db.currentUser) {
      const p1Ign = document.getElementById('reg-p1-ign');
      if (p1Ign && !p1Ign.value) p1Ign.value = this.db.currentUser.name || '';
    }
  }

  renderStepView() {
    for (let i = 1; i <= 4; i++) {
      const indicator = document.getElementById(`step-item-${i}`);
      const stepContent = document.getElementById(`reg-step-content-${i}`);
      if (indicator) {
        indicator.classList.remove('active', 'completed');
        if (i === this.currentStep) indicator.classList.add('active');
        else if (i < this.currentStep) indicator.classList.add('completed');
      }
      if (stepContent) {
        stepContent.style.display = i === this.currentStep ? 'block' : 'none';
      }
    }

    const prevBtn = document.getElementById('btn-reg-prev');
    const nextBtn = document.getElementById('btn-reg-next');
    const submitBtn = document.getElementById('btn-reg-submit');

    if (prevBtn) prevBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = this.currentStep < 4 ? 'inline-flex' : 'none';
    if (submitBtn) submitBtn.style.display = this.currentStep === 4 ? 'inline-flex' : 'none';

    if (this.currentStep === 3) {
      this.generateUPIQRCode();
    }
  }

  nextStep() {
    if (!this.validateStep(this.currentStep)) return;
    if (this.currentStep < 4) {
      window.sfx?.playClick();
      this.currentStep++;
      this.renderStepView();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      window.sfx?.playClick();
      this.currentStep--;
      this.renderStepView();
    }
  }

  validateStep(step) {
    if (step === 1) {
      const squadName = document.getElementById('reg-squad-name')?.value.trim();
      const leaderPhone = document.getElementById('reg-leader-phone')?.value.trim();
      if (!squadName) {
        alert('Please enter your Squad Name!');
        return false;
      }
      if (!leaderPhone || leaderPhone.length < 10) {
        alert('Please enter a valid 10-digit WhatsApp phone number!');
        return false;
      }
      return true;
    }

    if (step === 2) {
      const t = this.getActiveTournament();
      const count = t.playersPerSquad || 4;
      for (let i = 1; i <= count; i++) {
        const ign = document.getElementById(`reg-p${i}-ign`)?.value.trim();
        const uid = document.getElementById(`reg-p${i}-uid`)?.value.trim();
        if (!ign) {
          alert(`Please enter In-Game Name (IGN) for Player ${i}!`);
          return false;
        }
        if (!uid || uid.length < 5) {
          alert(`Please enter a valid Free Fire UID for Player ${i}!`);
          return false;
        }
      }
      return true;
    }

    return true;
  }

  handleTeamLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file for Team Logo (PNG/JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedTeamLogoBase64 = e.target.result;
      const previewEl = document.getElementById('reg-logo-preview');
      if (previewEl) {
        previewEl.innerHTML = `<img src="${this.uploadedTeamLogoBase64}" alt="Team Logo" style="width:100%; height:100%; object-fit:cover; border-radius:var(--radius-sm);">`;
      }
      window.sfx?.playSuccess();
    };
    reader.readAsDataURL(file);
  }

  generateUPIQRCode() {
    const t = this.getActiveTournament();
    const upiId = t.upiId || '9347176849@ybl';
    const amount = t.entryFee || 120;
    const squadName = encodeURIComponent(document.getElementById('reg-squad-name')?.value.trim() || 'Squad');
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=PerosEsports&am=${amount}&cu=INR&tn=EntryFee_${squadName}`;

    const qrContainer = document.getElementById('upi-qr-display');
    if (qrContainer) {
      const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}&bgcolor=FFFFFF&color=000000&margin=1`;
      qrContainer.innerHTML = `<img src="${qrImgUrl}" alt="UPI Payment QR" style="width:100%; height:100%; border-radius:4px; display:block;" onerror="this.parentElement.innerHTML='<div style=\\'padding:20px; font-weight:bold; color:#000;\\'>Scan with any UPI App<br>Amount: ₹${amount}</div>'"/>`;
    }

    const upiIdDisplay = document.getElementById('display-upi-id');
    if (upiIdDisplay) upiIdDisplay.textContent = upiId;

    const gpayLink = document.getElementById('link-gpay');
    const phonepeLink = document.getElementById('link-phonepe');
    const paytmLink = document.getElementById('link-paytm');

    if (gpayLink) gpayLink.href = upiUrl;
    if (phonepeLink) phonepeLink.href = upiUrl;
    if (paytmLink) paytmLink.href = upiUrl;
  }

  copyUPIId() {
    const t = this.getActiveTournament();
    const upiId = t.upiId || '9347176849@ybl';
    navigator.clipboard.writeText(upiId).then(() => {
      window.sfx?.playSuccess();
      const btn = document.getElementById('btn-copy-upi-text');
      if (btn) {
        btn.textContent = 'COPIED! ✅';
        setTimeout(() => { btn.textContent = 'COPY'; }, 2000);
      }
    });
  }

  handleScreenshotUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedScreenshotBase64 = e.target.result;
      const previewImg = document.getElementById('screenshot-preview-img');
      const previewContainer = document.getElementById('screenshot-preview-container');
      if (previewImg && previewContainer) {
        previewImg.src = this.uploadedScreenshotBase64;
        previewContainer.style.display = 'block';
        window.sfx?.playSuccess();
      }
    };
    reader.readAsDataURL(file);
  }

  // ==========================================
  // SUBMIT REGISTRATION & WHATSAPP REDIRECT
  // ==========================================
  submitRegistration() {
    const t = this.getActiveTournament();
    const squadName = document.getElementById('reg-squad-name')?.value.trim();
    const squadTag = document.getElementById('reg-squad-tag')?.value.trim() || 'SQUAD';
    const leaderPhone = document.getElementById('reg-leader-phone')?.value.trim();
    const slotNumber = parseInt(document.getElementById('reg-slot-select')?.value, 10);
    const paymentRef = document.getElementById('reg-payment-ref')?.value.trim() || 'Screenshot Provided';

    const count = t.playersPerSquad || 4;
    const players = [];
    for (let i = 1; i <= count; i++) {
      players.push({
        ign: document.getElementById(`reg-p${i}-ign`)?.value.trim() || `Player ${i}`,
        uid: document.getElementById(`reg-p${i}-uid`)?.value.trim() || ''
      });
    }

    const slotIndex = t.slots.findIndex(s => s.slotNumber === slotNumber);
    if (slotIndex !== -1) {
      t.slots[slotIndex] = {
        slotNumber: slotNumber,
        status: 'pending',
        squadName: squadName,
        squadTag: squadTag,
        teamLogo: this.uploadedTeamLogoBase64,
        leaderPhone: leaderPhone,
        leaderName: players[0].ign,
        registeredByEmail: this.db.currentUser?.email || null,
        registeredAt: new Date().toISOString(),
        players: players,
        paymentRef: paymentRef,
        screenshot: this.uploadedScreenshotBase64,
        matchStats: { rank: null, kills: 0, placementPts: 0, killPts: 0, totalPts: 0 }
      };
      this.saveDatabase();
    }

    window.sfx?.playFanfare();

    let rosterFormatted = '';
    players.forEach((p, idx) => {
      rosterFormatted += `${idx + 1}️⃣ Player ${idx + 1}${idx === 0 ? ' (Leader)' : ''}: ${p.ign} | Free Fire UID: ${p.uid}\n`;
    });

    const formattedMessage = 
`🔥 *${t.name} REGISTRATION* 🔥
🎮 *Where Every Clutch Counts! ⚡*
━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ *Squad Name:* ${squadName} [${squadTag}]
📱 *Leader Contact:* +91 ${leaderPhone}
🎯 *Preferred Slot:* Slot #${slotNumber}
${this.db.currentUser ? `📧 *Registered Email:* ${this.db.currentUser.email}\n` : ''}
👥 *PLAYER ROSTER (${count} PLAYERS):*
${rosterFormatted}
💰 *Entry Fee:* ₹${t.entryFee} (Paid)
💳 *Payment Ref / Txn ID:* ${paymentRef}
📸 *Payment Screenshot:* (Attached)
━━━━━━━━━━━━━━━━━━━━━━━━━
Please verify our payment and confirm our Slot #${slotNumber}! 🏆`;

    const whatsappUrl = `https://wa.me/${t.organizerPhone}?text=${encodeURIComponent(formattedMessage)}`;

    document.getElementById('modal-registration')?.classList.remove('active');
    this.openSuccessModal(squadName, slotNumber, whatsappUrl);
  }

  openSuccessModal(squadName, slotNumber, whatsappUrl) {
    const modal = document.getElementById('modal-success');
    const detailsEl = document.getElementById('success-modal-details');
    const waBtn = document.getElementById('btn-success-send-wa');

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div style="font-size:1.1rem; color:#FFF; margin-bottom:8px;">
          Squad <strong>${this.escapeHtml(squadName)}</strong> is registered for <strong>Slot #${slotNumber}</strong>!
        </div>
        <p style="color:#A0AEC0; font-size:0.92rem;">
          Final step: Click the button below to send your squad roster and payment screenshot directly to Organizer WhatsApp (+91 9347176849) for instant verification ✅
        </p>
      `;
    }

    if (waBtn) {
      waBtn.onclick = () => {
        window.open(whatsappUrl, '_blank');
      };
    }

    modal?.classList.add('active');
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================
  openAdminDashboardModal() {
    const modal = document.getElementById('modal-admin');
    modal?.classList.add('active');
    this.switchAdminTab('squads');
  }

  switchAdminTab(tabName) {
    const tabs = ['squads', 'room', 'points', 'tournaments'];
    tabs.forEach(t => {
      const btn = document.getElementById(`admin-tab-btn-${t}`);
      const content = document.getElementById(`admin-tab-content-${t}`);
      if (btn) btn.classList.toggle('active', t === tabName);
      if (content) content.style.display = t === tabName ? 'block' : 'none';
    });

    if (tabName === 'squads') this.renderAdminSquadTable();
    if (tabName === 'points') this.renderPointsInputTable();
    if (tabName === 'room') this.renderAdminRoomSettings();
    if (tabName === 'tournaments') this.renderAdminTournamentsList();
  }

  renderAdminSquadTable() {
    const t = this.getActiveTournament();
    const activeLabel = document.getElementById('admin-active-event-name');
    if (activeLabel) activeLabel.textContent = `🎯 Event: ${t.name} (${t.gameMode || 'BR'} • ${t.format || 'Squad'})`;

    const tbody = document.getElementById('admin-squads-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    t.slots.forEach(slot => {
      const tr = document.createElement('tr');
      const hasSquad = slot.status !== 'available';

      let logoHtml = '';
      if (slot.teamLogo) {
        logoHtml = `<img src="${slot.teamLogo}" style="width:28px; height:28px; border-radius:6px; object-fit:cover; margin-right:8px; vertical-align:middle;">`;
      }

      let proofHtml = '<span style="color:#64748B;">-</span>';
      if (hasSquad) {
        const hasSS = Boolean(slot.screenshot);
        const txnId = slot.paymentRef || 'Provided on WA';
        proofHtml = `
          <div class="proof-pill-wrap">
            <span class="txn-id-badge" title="Txn ID: ${this.escapeHtml(txnId)}">💳 ${this.escapeHtml(txnId)}</span>
            ${hasSS ? `
              <button class="btn-proof-preview" onclick="app.openPaymentProofModal(${slot.slotNumber})" title="View Uploaded Payment Screenshot">
                📸 View SS
              </button>
            ` : '<span style="color:#A0AEC0; font-size:0.75rem;">(No SS)</span>'}
          </div>
        `;
      }

      tr.innerHTML = `
        <td><strong>#${slot.slotNumber}</strong></td>
        <td>
          ${hasSquad ? `${logoHtml}<strong>${this.escapeHtml(slot.squadName)}</strong> <span style="color:var(--cyber-cyan); font-size:0.8rem;">[${this.escapeHtml(slot.squadTag || '')}]</span>` : '<span style="color:#64748B;">Empty Available Slot</span>'}
        </td>
        <td>
          ${hasSquad ? `
            <a href="https://wa.me/91${slot.leaderPhone}" target="_blank" rel="noopener" style="color:var(--whatsapp-green); text-decoration:none; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
              <i class="fa-brands fa-whatsapp"></i> +91 ${this.escapeHtml(slot.leaderPhone)}
            </a>
          ` : '-'}
        </td>
        <td>${proofHtml}</td>
        <td>
          <span class="badge ${slot.status === 'confirmed' ? 'badge-confirmed' : slot.status === 'pending' ? 'badge-pending' : 'badge-available'}">
            ${slot.status.toUpperCase()}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${hasSquad ? `
              <button class="btn btn-sm btn-outline-cyan" onclick="app.openPaymentProofModal(${slot.slotNumber})" title="Cross-check Payment Screenshot & Transaction ID">
                🔍 Verify Proof
              </button>
            ` : ''}
            ${slot.status === 'pending' ? `<button class="btn btn-sm" style="background:var(--success-green); color:#000;" onclick="app.approveSlot(${slot.slotNumber})">Approve ✅</button>` : ''}
            ${slot.status === 'confirmed' ? `<button class="btn btn-sm btn-secondary" onclick="app.setSlotPending(${slot.slotNumber})">To Pending</button>` : ''}
            ${hasSquad ? `<button class="btn btn-sm btn-secondary" style="color:#FF3366;" onclick="app.clearSlot(${slot.slotNumber})">Remove</button>` : `<button class="btn btn-sm btn-outline-cyan" onclick="app.manualAddSquad(${slot.slotNumber})">+ Add Squad</button>`}
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==========================================
  // ADMIN PAYMENT PROOF & SQUAD VERIFICATION MODAL
  // ==========================================
  openPaymentProofModal(slotNumber) {
    const t = this.getActiveTournament();
    const slot = t.slots.find(s => s.slotNumber === slotNumber);
    if (!slot || slot.status === 'available') return;

    window.sfx?.playClick();
    const modal = document.getElementById('modal-admin-payment-proof');
    const body = document.getElementById('admin-payment-proof-body');
    if (!modal || !body) return;

    let logoHtml = '';
    if (slot.teamLogo) {
      logoHtml = `<img src="${slot.teamLogo}" style="width:48px; height:48px; border-radius:10px; object-fit:cover; border:1px solid var(--border-glass);">`;
    } else {
      const initials = (slot.squadName || 'SQ').substring(0, 2).toUpperCase();
      logoHtml = `<div style="width:48px; height:48px; border-radius:10px; background:rgba(255,85,0,0.2); border:1px solid var(--fire-orange); display:flex; align-items:center; justify-content:center; font-family:var(--font-heading); font-weight:800; font-size:1.2rem; color:var(--fire-amber);">${initials}</div>`;
    }

    let playersRows = '';
    (slot.players || []).forEach((p, idx) => {
      playersRows += `
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
          <td style="padding:8px 10px; color:var(--fire-amber); font-weight:700;">#${idx + 1}</td>
          <td style="padding:8px 10px; color:#FFF; font-weight:600;">${this.escapeHtml(p.ign || 'Player')} ${idx === 0 ? '<span class="badge badge-live" style="font-size:0.65rem; padding:2px 6px;">Leader</span>' : ''}</td>
          <td style="padding:8px 10px; font-family:monospace; color:var(--cyber-cyan);">${this.escapeHtml(p.uid || 'N/A')}</td>
        </tr>
      `;
    });

    const ssHtml = slot.screenshot 
      ? `
        <div style="background:#000; border:1px solid var(--border-glass); border-radius:var(--radius-md); padding:10px; text-align:center;">
          <img src="${slot.screenshot}" alt="Payment Screenshot Proof" style="max-width:100%; max-height:360px; object-fit:contain; border-radius:var(--radius-sm); box-shadow:0 4px 20px rgba(0,0,0,0.8); cursor:pointer;" onclick="window.open('${slot.screenshot}', '_blank')">
          <div style="color:#8C9BAE; font-size:0.78rem; margin-top:8px;">
            <i class="fa-solid fa-magnifying-glass-plus"></i> Click screenshot to open full size image in new tab
          </div>
        </div>
      `
      : `
        <div style="background:rgba(255,51,102,0.08); border:1px dashed rgba(255,51,102,0.4); border-radius:var(--radius-md); padding:30px 16px; text-align:center; color:#FF6B8B;">
          <div style="font-size:2rem; margin-bottom:8px;">⚠️</div>
          <strong>No Screenshot Image Attached</strong>
          <p style="font-size:0.85rem; color:#A0AEC0; margin-top:4px;">Transaction Reference ID provided: <strong>${this.escapeHtml(slot.paymentRef || 'None')}</strong></p>
        </div>
      `;

    const waMessage = encodeURIComponent(`🔥 *PEROS ESPORTS - PAYMENT VERIFICATION* 🔥\nHello *${slot.leaderName || slot.squadName}*!\nTournament: *${t.name}*\nSlot: *#${slot.slotNumber}*\nTxn ID: *${slot.paymentRef || 'N/A'}*\nStatus: *${slot.status.toUpperCase()}* ✅\n━━━━━━━━━━━━━━━━━━━━━━━━━\nYour squad registration has been verified! Match Room credentials will be shared here 15 minutes before kickoff.`);

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; border-bottom:1px solid var(--border-glass); padding-bottom:14px; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; align-items:center; gap:14px;">
          ${logoHtml}
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <h3 style="font-family:var(--font-heading); font-size:1.35rem; color:#FFF; margin:0;">${this.escapeHtml(slot.squadName)}</h3>
              <span style="color:var(--cyber-cyan); font-family:var(--font-heading); font-weight:700;">[${this.escapeHtml(slot.squadTag || 'SQUAD')}]</span>
              <span class="badge ${slot.status === 'confirmed' ? 'badge-confirmed' : 'badge-pending'}">${slot.status.toUpperCase()}</span>
            </div>
            <div style="color:#8C9BAE; font-size:0.85rem; margin-top:2px;">
              🎯 ${this.escapeHtml(t.name)} • <strong>Slot #${slot.slotNumber}</strong>
            </div>
          </div>
        </div>
        <div style="text-align:right;">
          <a href="https://wa.me/91${slot.leaderPhone}?text=${waMessage}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
            <i class="fa-brands fa-whatsapp"></i> Chat with Leader (+91 ${this.escapeHtml(slot.leaderPhone)})
          </a>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:18px; margin-bottom:20px;">
        <!-- Left: Payment Proof & Txn Reference -->
        <div>
          <h4 style="font-family:var(--font-heading); color:var(--fire-amber); font-size:1rem; text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-receipt"></i> 1. Payment Proof & Transaction ID
          </h4>
          
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:var(--radius-md); padding:16px; margin-bottom:14px;">
            <div style="margin-bottom:10px;">
              <span style="font-size:0.78rem; color:#8C9BAE; text-transform:uppercase; display:block;">Transaction ID / UTR / Reference:</span>
              <div style="display:flex; align-items:center; gap:8px; margin-top:3px;">
                <strong style="font-family:monospace; font-size:1.05rem; color:var(--gold-champion); background:rgba(255,215,0,0.1); padding:4px 10px; border-radius:6px; border:1px solid rgba(255,215,0,0.3); word-break:break-all;">
                  ${this.escapeHtml(slot.paymentRef || 'N/A')}
                </strong>
                ${slot.paymentRef ? `<button class="btn btn-sm btn-secondary" onclick="navigator.clipboard.writeText('${this.escapeHtml(slot.paymentRef)}'); alert('Txn ID copied to clipboard!');">Copy</button>` : ''}
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.85rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:10px;">
              <div>
                <span style="color:#8C9BAE;">Entry Fee:</span> <strong style="color:var(--fire-orange);">₹${t.entryFee}</strong>
              </div>
              <div>
                <span style="color:#8C9BAE;">Receiver UPI:</span> <strong style="color:#FFF;">${this.escapeHtml(t.upiId || '9347176849@ybl')}</strong>
              </div>
              <div>
                <span style="color:#8C9BAE;">Registered:</span> <span style="color:#CBD5E1;">${slot.registeredAt ? new Date(slot.registeredAt).toLocaleDateString() : 'Today'}</span>
              </div>
              <div>
                <span style="color:#8C9BAE;">Registered By:</span> <span style="color:#CBD5E1;">${this.escapeHtml(slot.registeredByEmail || 'Guest')}</span>
              </div>
            </div>
          </div>

          <div>
            <span style="font-size:0.8rem; color:#8C9BAE; margin-bottom:6px; display:block;">📸 Uploaded Screenshot Receipt:</span>
            ${ssHtml}
          </div>
        </div>

        <!-- Right: Squad Roster Details -->
        <div>
          <h4 style="font-family:var(--font-heading); color:var(--cyber-cyan); font-size:1rem; text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-users"></i> 2. Player Roster (IGN & Free Fire UID)
          </h4>

          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:var(--radius-md); overflow:hidden; margin-bottom:16px;">
            <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">
              <thead>
                <tr style="background:rgba(255,255,255,0.05); text-align:left; color:#8C9BAE; font-size:0.78rem; text-transform:uppercase;">
                  <th style="padding:8px 10px;">#</th>
                  <th style="padding:8px 10px;">Player IGN</th>
                  <th style="padding:8px 10px;">Free Fire UID</th>
                </tr>
              </thead>
              <tbody>
                ${playersRows}
              </tbody>
            </table>
          </div>

          <!-- Verification Decision Action Buttons -->
          <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-glow); border-radius:var(--radius-md); padding:16px;">
            <h5 style="font-family:var(--font-heading); color:#FFF; margin-bottom:10px; text-transform:uppercase; font-size:0.95rem;">
              ⚖️ Admin Verification Decisions:
            </h5>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <button class="btn btn-primary" style="background:linear-gradient(135deg, #00E676, #00C853); color:#000; font-weight:800;" onclick="app.approveSlotFromModal(${slot.slotNumber})">
                <span>✅</span> Approve Payment & Confirm Slot #${slot.slotNumber}
              </button>
              <button class="btn btn-secondary" onclick="app.setPendingSlotFromModal(${slot.slotNumber})">
                <span>⏳</span> Set to Pending Review
              </button>
              <button class="btn btn-secondary" style="color:#FF3366; border-color:rgba(255,51,102,0.4);" onclick="app.clearSlotFromModal(${slot.slotNumber})">
                <span>❌</span> Reject & Remove Squad
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  approveSlotFromModal(slotNumber) {
    this.approveSlot(slotNumber);
    document.getElementById('modal-admin-payment-proof')?.classList.remove('active');
    alert(`🎉 Squad in Slot #${slotNumber} has been successfully verified & confirmed!`);
  }

  setPendingSlotFromModal(slotNumber) {
    this.setSlotPending(slotNumber);
    document.getElementById('modal-admin-payment-proof')?.classList.remove('active');
  }

  clearSlotFromModal(slotNumber) {
    this.clearSlot(slotNumber);
    document.getElementById('modal-admin-payment-proof')?.classList.remove('active');
  }

  clearAllSquads() {
    const t = this.getActiveTournament();
    if (confirm(`Are you sure you want to RESET all squad slots in "${t.name}" to empty? All demo/registered squads in this event will be removed.`)) {
      t.slots.forEach(slot => {
        slot.status = 'available';
        slot.squadName = null;
        slot.squadTag = null;
        slot.teamLogo = null;
        slot.leaderName = null;
        slot.leaderPhone = null;
        slot.registeredByEmail = null;
        slot.players = [];
        slot.paymentRef = null;
        slot.screenshot = null;
        slot.matchStats = null;
      });
      this.saveDatabase();
      window.sfx?.playSuccess();
      this.renderAdminSquadTable();
      alert(`✅ All slots in "${t.name}" are now 100% clean and empty!`);
    }
  }

  approveSlot(slotNumber) {
    const t = this.getActiveTournament();
    const slot = t.slots.find(s => s.slotNumber === slotNumber);
    if (slot) {
      slot.status = 'confirmed';
      this.saveDatabase();
      window.sfx?.playSuccess();
      this.renderAdminSquadTable();
    }
  }

  setSlotPending(slotNumber) {
    const t = this.getActiveTournament();
    const slot = t.slots.find(s => s.slotNumber === slotNumber);
    if (slot) {
      slot.status = 'pending';
      this.saveDatabase();
      this.renderAdminSquadTable();
    }
  }

  clearSlot(slotNumber) {
    const t = this.getActiveTournament();
    if (confirm(`Remove squad from Slot #${slotNumber}?`)) {
      const slot = t.slots.find(s => s.slotNumber === slotNumber);
      if (slot) {
        slot.status = 'available';
        slot.squadName = null;
        slot.squadTag = null;
        slot.teamLogo = null;
        slot.leaderName = null;
        slot.leaderPhone = null;
        slot.registeredByEmail = null;
        slot.players = [];
        slot.paymentRef = null;
        slot.screenshot = null;
        slot.matchStats = null;
        this.saveDatabase();
        window.sfx?.playClick();
        this.renderAdminSquadTable();
      }
    }
  }

  manualAddSquad(slotNumber) {
    const t = this.getActiveTournament();
    const count = t.playersPerSquad || 4;
    const squadName = prompt(`Enter Squad Name for Slot #${slotNumber}:`);
    if (!squadName) return;
    const leaderPhone = prompt(`Enter Leader WhatsApp Phone:`) || '9999999999';

    const slot = t.slots.find(s => s.slotNumber === slotNumber);
    if (slot) {
      const players = [];
      for (let i = 1; i <= count; i++) {
        players.push({
          ign: `${squadName}_P${i}`,
          uid: `${Math.floor(1000000000 + Math.random() * 9000000000)}`
        });
      }
      slot.status = 'confirmed';
      slot.squadName = squadName;
      slot.squadTag = squadName.substring(0, 3).toUpperCase();
      slot.teamLogo = null;
      slot.leaderName = squadName + '_Leader';
      slot.leaderPhone = leaderPhone;
      slot.players = players;
      slot.registeredAt = new Date().toISOString();
      this.saveDatabase();
      window.sfx?.playSuccess();
      this.renderAdminSquadTable();
    }
  }

  renderAdminRoomSettings() {
    const t = this.getActiveTournament();
    const idInput = document.getElementById('admin-input-room-id');
    const passInput = document.getElementById('admin-input-room-pass');
    if (idInput) idInput.value = t.roomId || '';
    if (passInput) passInput.value = t.roomPass || '';
  }

  saveRoomCredentials() {
    const t = this.getActiveTournament();
    const idInput = document.getElementById('admin-input-room-id');
    const passInput = document.getElementById('admin-input-room-pass');
    if (idInput && passInput) {
      t.roomId = idInput.value.trim();
      t.roomPass = passInput.value.trim();
      this.saveDatabase();
      window.sfx?.playSuccess();
      alert('✅ Room ID & Password updated successfully!');
    }
  }

  broadcastRoomCredentials() {
    const t = this.getActiveTournament();
    if (!t.roomId || !t.roomPass) {
      alert('Please enter and save Room ID and Password first!');
      return;
    }

    const broadcastMsg = 
`🔐 *${t.name} - OFFICIAL ROOM DETAILS* 🔐
━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *MATCH ROOM CREDENTIALS:*
🆔 *Room ID:* ${t.roomId}
🔑 *Password:* ${t.roomPass}
━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ *IMPORTANT RULES:*
1. Only confirmed squad players are allowed.
2. Join your assigned Slot # in the custom room.
3. Match starts strictly on schedule!
4. All team leaders must screen-record the match.

Good luck and Clutch Hard! 🔥🏆`;

    navigator.clipboard.writeText(broadcastMsg).then(() => {
      window.sfx?.playSuccess();
      alert('✅ Room credentials broadcast text copied to clipboard! You can paste it into the WhatsApp announcement group.');
    });
  }

  getPlacementPoints(rank) {
    const ptsTable = {
      1: 12, 2: 9, 3: 8, 4: 7, 5: 6,
      6: 5, 7: 4, 8: 3, 9: 2, 10: 1,
      11: 0, 12: 0
    };
    return ptsTable[rank] || 0;
  }

  renderPointsInputTable() {
    const t = this.getActiveTournament();
    const container = document.getElementById('admin-points-container');
    if (!container) return;

    container.innerHTML = '';
    const activeSlots = t.slots.filter(s => s.status === 'confirmed' || s.squadName);

    if (activeSlots.length === 0) {
      container.innerHTML = '<p style="color:#8C9BAE; padding:20px; text-align:center;">No confirmed squads available for match points calculation. Add or approve squads first!</p>';
      return;
    }

    activeSlots.forEach(slot => {
      const stats = slot.matchStats || { rank: 1, kills: 0 };
      const row = document.createElement('div');
      row.className = 'points-input-row';

      let logoHtml = '';
      if (slot.teamLogo) {
        logoHtml = `<img src="${slot.teamLogo}" style="width:36px; height:36px; border-radius:6px; object-fit:cover;">`;
      } else {
        const initials = slot.squadName ? slot.squadName.substring(0, 2).toUpperCase() : 'SQ';
        logoHtml = `<div style="width:36px; height:36px; border-radius:6px; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:0.8rem; color:var(--gold-champion);">${initials}</div>`;
      }

      row.innerHTML = `
        <div style="font-family:var(--font-display); font-weight:700; color:var(--fire-orange);">#${slot.slotNumber}</div>
        <div>${logoHtml}</div>
        <div>
          <strong style="color:#FFF;">${this.escapeHtml(slot.squadName || 'Squad')}</strong>
        </div>
        <div>
          <label style="font-size:0.75rem; color:#A0AEC0; display:block;">Rank (1-12):</label>
          <input type="number" class="form-input" style="padding:6px 10px;" id="input-rank-${slot.slotNumber}" min="1" max="12" value="${stats.rank || 1}" onchange="app.updateSquadPoints(${slot.slotNumber})">
        </div>
        <div>
          <label style="font-size:0.75rem; color:#A0AEC0; display:block;">Kills (1 pt/kill):</label>
          <input type="number" class="form-input" style="padding:6px 10px;" id="input-kills-${slot.slotNumber}" min="0" value="${stats.kills || 0}" onchange="app.updateSquadPoints(${slot.slotNumber})">
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.75rem; color:#A0AEC0; display:block;">Total Pts:</span>
          <strong id="display-pts-${slot.slotNumber}" style="font-family:var(--font-display); color:var(--gold-champion); font-size:1.2rem;">
            ${(stats.placementPts || this.getPlacementPoints(stats.rank || 1)) + (stats.killPts || stats.kills || 0)}
          </strong>
        </div>
      `;
      container.appendChild(row);
    });
  }

  updateSquadPoints(slotNumber) {
    const t = this.getActiveTournament();
    const slot = t.slots.find(s => s.slotNumber === slotNumber);
    if (!slot) return;

    const rankInput = document.getElementById(`input-rank-${slotNumber}`);
    const killsInput = document.getElementById(`input-kills-${slotNumber}`);
    const ptsDisplay = document.getElementById(`display-pts-${slotNumber}`);

    const rank = parseInt(rankInput?.value || 1, 10);
    const kills = parseInt(killsInput?.value || 0, 10);
    const placementPts = this.getPlacementPoints(rank);
    const killPts = kills;
    const totalPts = placementPts + killPts;

    slot.matchStats = { rank, kills, placementPts, killPts, totalPts };
    if (ptsDisplay) ptsDisplay.textContent = totalPts;
  }

  calculateAndDeclareWinners() {
    const t = this.getActiveTournament();
    t.slots.forEach(slot => {
      if (slot.status === 'confirmed' || slot.squadName) {
        this.updateSquadPoints(slot.slotNumber);
      }
    });
    this.saveDatabase();

    const rankedSquads = t.slots
      .filter(s => s.status === 'confirmed' || s.squadName)
      .map(s => ({
        slotNumber: s.slotNumber,
        squadName: s.squadName,
        squadTag: s.squadTag,
        teamLogo: s.teamLogo,
        stats: s.matchStats || { rank: 12, kills: 0, totalPts: 0 }
      }))
      .sort((a, b) => {
        if (b.stats.totalPts !== a.stats.totalPts) {
          return b.stats.totalPts - a.stats.totalPts;
        }
        return (b.stats.kills || 0) - (a.stats.kills || 0);
      });

    if (rankedSquads.length < 3) {
      alert('Need at least 3 squads to declare 1st, 2nd, and 3rd place winners!');
      return;
    }

    window.sfx?.playFanfare();
    this.openVictoryLeaderboardModal(rankedSquads);
  }

  openVictoryLeaderboardModal(rankedSquads) {
    const t = this.getActiveTournament();
    const modal = document.getElementById('modal-victory-leaderboard');
    const contentEl = document.getElementById('victory-leaderboard-content');
    if (!modal || !contentEl) return;

    const first = rankedSquads[0];
    const second = rankedSquads[1];
    const third = rankedSquads[2];

    let fullTableRows = '';
    rankedSquads.forEach((sq, idx) => {
      fullTableRows += `
        <tr style="${idx === 0 ? 'background:rgba(255,215,0,0.15); font-weight:bold;' : idx === 1 ? 'background:rgba(224,230,237,0.1);' : idx === 2 ? 'background:rgba(205,127,50,0.1);' : ''}">
          <td><strong>#${idx + 1}</strong></td>
          <td>
            ${sq.teamLogo ? `<img src="${sq.teamLogo}" style="width:24px; height:24px; border-radius:4px; object-fit:cover; margin-right:6px; vertical-align:middle;">` : ''}
            ${this.escapeHtml(sq.squadName)} [${this.escapeHtml(sq.squadTag || '')}]
          </td>
          <td>Slot #${sq.slotNumber}</td>
          <td>${sq.stats.rank || '-'}</td>
          <td>${sq.stats.kills || 0}</td>
          <td><strong style="color:var(--gold-champion);">${sq.stats.totalPts}</strong></td>
          <td>
            ${idx === 0 ? '🥇 ₹' + t.prizes.first : idx === 1 ? '🥈 ₹' + t.prizes.second : idx === 2 ? '🥉 ₹' + t.prizes.third : '-'}
          </td>
        </tr>
      `;
    });

    contentEl.innerHTML = `
      <div style="text-align:center; margin-bottom:30px;">
        <div style="font-size:3rem; margin-bottom:8px;">🏆👑🔥</div>
        <h2 style="font-family:var(--font-display); font-size:2rem; color:var(--gold-champion); text-transform:uppercase;">
          ${this.escapeHtml(t.name)}
        </h2>
        <p style="color:#A0AEC0;">OFFICIAL TOURNAMENT CHAMPIONSHIP PODIUM</p>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:30px;">
        <div style="background:rgba(255,215,0,0.12); border:2px solid var(--gold-champion); border-radius:var(--radius-md); padding:20px; text-align:center;">
          ${first.teamLogo ? `<img src="${first.teamLogo}" style="width:60px; height:60px; border-radius:12px; object-fit:cover; margin:0 auto 10px; display:block;">` : '<div style="font-size:2rem;">🥇</div>'}
          <div style="font-family:var(--font-heading); color:var(--gold-champion); font-weight:700;">1ST PLACE CHAMPION</div>
          <div style="font-family:var(--font-display); font-size:1.4rem; color:#FFF; margin:6px 0;">${this.escapeHtml(first.squadName)}</div>
          <div style="font-size:1.6rem; font-family:var(--font-display); color:var(--gold-champion); font-weight:900;">₹${t.prizes.first}</div>
          <div style="font-size:0.8rem; color:#CBD5E0; margin-top:4px;">${first.stats.totalPts} Total Points (${first.stats.kills} Kills)</div>
        </div>

        <div style="background:rgba(224,230,237,0.08); border:1px solid var(--silver-runner); border-radius:var(--radius-md); padding:20px; text-align:center;">
          ${second.teamLogo ? `<img src="${second.teamLogo}" style="width:60px; height:60px; border-radius:12px; object-fit:cover; margin:0 auto 10px; display:block;">` : '<div style="font-size:2rem;">🥈</div>'}
          <div style="font-family:var(--font-heading); color:var(--silver-runner); font-weight:700;">2ND PLACE RUNNER UP</div>
          <div style="font-family:var(--font-display); font-size:1.4rem; color:#FFF; margin:6px 0;">${this.escapeHtml(second.squadName)}</div>
          <div style="font-size:1.6rem; font-family:var(--font-display); color:var(--silver-runner); font-weight:900;">₹${t.prizes.second}</div>
          <div style="font-size:0.8rem; color:#CBD5E0; margin-top:4px;">${second.stats.totalPts} Total Points (${second.stats.kills} Kills)</div>
        </div>

        <div style="background:rgba(205,127,50,0.08); border:1px solid var(--bronze-third); border-radius:var(--radius-md); padding:20px; text-align:center;">
          ${third.teamLogo ? `<img src="${third.teamLogo}" style="width:60px; height:60px; border-radius:12px; object-fit:cover; margin:0 auto 10px; display:block;">` : '<div style="font-size:2rem;">🥉</div>'}
          <div style="font-family:var(--font-heading); color:var(--bronze-third); font-weight:700;">3RD PLACE</div>
          <div style="font-family:var(--font-display); font-size:1.4rem; color:#FFF; margin:6px 0;">${this.escapeHtml(third.squadName)}</div>
          <div style="font-size:1.6rem; font-family:var(--font-display); color:var(--bronze-third); font-weight:900;">₹${t.prizes.third}</div>
          <div style="font-size:0.8rem; color:#CBD5E0; margin-top:4px;">${third.stats.totalPts} Total Points (${third.stats.kills} Kills)</div>
        </div>
      </div>

      <div class="admin-table-container">
        <h4 style="font-family:var(--font-heading); color:#FFF; margin-bottom:12px; text-transform:uppercase;">📊 Complete Match Scorecard</h4>
        <table class="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Squad Name</th>
              <th>Slot</th>
              <th>Placement</th>
              <th>Kills</th>
              <th>Total Points</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            ${fullTableRows}
          </tbody>
        </table>
      </div>
    `;

    modal.classList.add('active');
  }

  // ==========================================
  // A-TO-Z MULTI-EVENT & TOURNAMENT ENGINE
  // ==========================================
  renderAdminTournamentsList() {
    const listEl = document.getElementById('admin-tournaments-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    this.db.tournaments.forEach(t => {
      const isCurrent = t.id === this.db.activeTournamentId;
      const card = document.createElement('div');
      card.style.cssText = `background:rgba(255,255,255,0.04); border:1px solid ${isCurrent ? 'var(--cyber-cyan)' : 'var(--border-glass)'}; border-radius:var(--radius-md); padding:18px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;`;

      const filledSlots = t.slots.filter(s => s.status !== 'available').length;
      const totalSlots = t.slots.length;
      const bannerSrc = t.bannerImage || 'assets/peros-logo.jpg';

      card.innerHTML = `
        <div style="display:flex; align-items:center; gap:14px;">
          <img src="${bannerSrc}" onerror="this.src='peros-logo.jpg'" style="width:54px; height:54px; border-radius:10px; object-fit:cover; border:1px solid var(--border-glass);">
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <strong style="color:#FFF; font-size:1.15rem; font-family:var(--font-heading);">${this.escapeHtml(t.name)}</strong>
              ${isCurrent ? '<span class="badge badge-confirmed">ACTIVE LIVE</span>' : ''}
              <span class="badge badge-pending" style="font-size:0.7rem;">${this.escapeHtml(t.gameMode || 'BR')}</span>
            </div>
            <div style="color:#8C9BAE; font-size:0.83rem; margin-top:4px;">
              🗺️ ${this.escapeHtml(t.mapName || 'Bermuda')} • 👥 ${this.escapeHtml(t.format || 'Squad')} • 💰 Fee: ₹${t.entryFee} • 🏆 Prize: ₹${t.totalPrizePool} • 🎯 ${filledSlots}/${totalSlots} Teams
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          ${!isCurrent ? `<button class="btn btn-sm btn-outline-cyan" onclick="app.switchTournament('${t.id}')">Make Active ⚡</button>` : '<span style="color:var(--cyber-cyan); font-weight:700; font-size:0.85rem; align-self:center;">CURRENTLY LIVE</span>'}
          <button class="btn btn-sm btn-secondary" onclick="app.openTournamentCreatorForm('${t.id}')">✏️ Edit Specs</button>
          <button class="btn btn-sm btn-secondary" onclick="app.switchTournament('${t.id}'); app.switchAdminTab('squads');">👥 Manage Slots</button>
          ${this.db.tournaments.length > 1 ? `<button class="btn btn-sm btn-secondary" style="color:#FF3366;" onclick="app.deleteTournament('${t.id}')">🗑️ Delete</button>` : ''}
        </div>
      `;
      listEl.appendChild(card);
    });
  }

  openTournamentCreatorForm(tourId = null) {
    const container = document.getElementById('admin-tournament-form-container');
    const titleEl = document.getElementById('tour-form-title');
    const editIdInput = document.getElementById('edit-tour-id');
    if (!container) return;

    this.currentTourBannerUrl = null;

    if (tourId) {
      const t = this.db.tournaments.find(x => x.id === tourId);
      if (t) {
        if (titleEl) titleEl.textContent = `✏️ EDIT TOURNAMENT SPECS: ${t.name}`;
        if (editIdInput) editIdInput.value = t.id;

        document.getElementById('tour-name').value = t.name || '';
        document.getElementById('tour-subtitle').value = t.subtitle || 'Where Every Clutch Counts! ⚡';
        document.getElementById('tour-game').value = t.game || 'Garena Free Fire';
        document.getElementById('tour-mode').value = t.gameMode || 'Battle Royale';
        document.getElementById('tour-map').value = t.mapName || 'Bermuda (Full Map)';
        document.getElementById('tour-format').value = t.format || 'Squad (4v4)';
        document.getElementById('tour-slots-count').value = t.totalSlots || t.slots.length || 12;
        document.getElementById('tour-players-per-team').value = t.playersPerSquad || 4;
        document.getElementById('tour-entry-fee').value = t.entryFee || 120;
        document.getElementById('tour-total-prize').value = t.totalPrizePool || 1440;
        document.getElementById('tour-prize-1').value = t.prizes?.first || 700;
        document.getElementById('tour-prize-2').value = t.prizes?.second || 450;
        document.getElementById('tour-prize-3').value = t.prizes?.third || 290;
        document.getElementById('tour-upi-id').value = t.upiId || '9347176849@ybl';
        document.getElementById('tour-phone').value = t.organizerPhone || '919347176849';
        document.getElementById('tour-wa-group-link').value = t.officialGroupLink || '';
        document.getElementById('tour-room-id').value = t.roomId || '';
        document.getElementById('tour-room-pass').value = t.roomPass || '';
        document.getElementById('tour-rules').value = t.rules || '';

        const previewImg = document.getElementById('tour-banner-preview-img');
        if (previewImg) previewImg.src = t.bannerImage || 'assets/peros-logo.jpg';
        this.currentTourBannerUrl = t.bannerImage || 'assets/peros-logo.jpg';
      }
    } else {
      if (titleEl) titleEl.textContent = '🚀 CREATE NEW TOURNAMENT (A-Z SPECS)';
      if (editIdInput) editIdInput.value = '';

      document.getElementById('tour-name').value = '';
      document.getElementById('tour-subtitle').value = 'Where Every Clutch Counts! ⚡';
      document.getElementById('tour-game').value = 'Garena Free Fire';
      document.getElementById('tour-mode').value = 'Battle Royale';
      document.getElementById('tour-map').value = 'Bermuda (Full Map)';
      document.getElementById('tour-format').value = 'Squad (4v4)';
      document.getElementById('tour-slots-count').value = 12;
      document.getElementById('tour-players-per-team').value = 4;
      document.getElementById('tour-entry-fee').value = 120;
      document.getElementById('tour-total-prize').value = 1440;
      document.getElementById('tour-prize-1').value = 700;
      document.getElementById('tour-prize-2').value = 450;
      document.getElementById('tour-prize-3').value = 290;
      document.getElementById('tour-upi-id').value = '9347176849@ybl';
      document.getElementById('tour-phone').value = '919347176849';
      document.getElementById('tour-wa-group-link').value = 'https://chat.whatsapp.com/C5nbq7MBvuJFq7HSsElJTb?s=cl&p=a&mlu=4&ilr=4';
      document.getElementById('tour-room-id').value = '';
      document.getElementById('tour-room-pass').value = '';
      document.getElementById('tour-rules').value = `1. Strict Anti-Cheat: No scripts, hacks, or mod files (Permanent Ban + No Refund).\n2. Registered Players Only: Only registered IGNs and UIDs allowed.\n3. Proof Requirement: Squad leaders must screen record POV or take end-game score screenshot.\n4. Instant UPI Payouts: Prizes transferred within 30 minutes of match validation.`;

      const previewImg = document.getElementById('tour-banner-preview-img');
      if (previewImg) previewImg.src = 'assets/peros-logo.jpg';
      this.currentTourBannerUrl = 'assets/peros-logo.jpg';
    }

    this.updateTourRosterSummary();
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
  }

  closeTournamentCreatorForm() {
    const container = document.getElementById('admin-tournament-form-container');
    if (container) container.style.display = 'none';
  }

  handleTourModeChange() {
    const mode = document.getElementById('tour-mode')?.value;
    const mapSelect = document.getElementById('tour-map');
    const formatInput = document.getElementById('tour-format');
    const slotsInput = document.getElementById('tour-slots-count');
    const playersSelect = document.getElementById('tour-players-per-team');
    const feeInput = document.getElementById('tour-entry-fee');
    const p1Input = document.getElementById('tour-prize-1');
    const p2Input = document.getElementById('tour-prize-2');
    const p3Input = document.getElementById('tour-prize-3');

    if (mode === 'Clash Squad') {
      if (mapSelect) mapSelect.value = 'Clash Squad Bermuda';
      if (formatInput) formatInput.value = 'Clash Squad (4v4)';
      if (slotsInput) slotsInput.value = 8;
      if (playersSelect) playersSelect.value = 4;
      if (feeInput) feeInput.value = 160;
      if (p1Input) p1Input.value = 600;
      if (p2Input) p2Input.value = 300;
      if (p3Input) p3Input.value = 100;
    } else if (mode === 'Duo Showdown') {
      if (mapSelect) mapSelect.value = 'Purgatory';
      if (formatInput) formatInput.value = 'Duo (2v2)';
      if (slotsInput) slotsInput.value = 12;
      if (playersSelect) playersSelect.value = 2;
      if (feeInput) feeInput.value = 60;
      if (p1Input) p1Input.value = 350;
      if (p2Input) p2Input.value = 220;
      if (p3Input) p3Input.value = 130;
    } else if (mode === 'Solo Survival') {
      if (mapSelect) mapSelect.value = 'Bermuda (Full Map)';
      if (formatInput) formatInput.value = 'Solo (1v1)';
      if (slotsInput) slotsInput.value = 24;
      if (playersSelect) playersSelect.value = 1;
      if (feeInput) feeInput.value = 30;
      if (p1Input) p1Input.value = 350;
      if (p2Input) p2Input.value = 200;
      if (p3Input) p3Input.value = 100;
    } else {
      if (mapSelect) mapSelect.value = 'Bermuda (Full Map)';
      if (formatInput) formatInput.value = 'Squad (4v4)';
      if (slotsInput) slotsInput.value = 12;
      if (playersSelect) playersSelect.value = 4;
      if (feeInput) feeInput.value = 120;
      if (p1Input) p1Input.value = 700;
      if (p2Input) p2Input.value = 450;
      if (p3Input) p3Input.value = 290;
    }

    this.autoComputeTotalPrize();
    this.updateTourRosterSummary();
  }

  updateTourRosterSummary() {
    const slots = parseInt(document.getElementById('tour-slots-count')?.value || 12, 10);
    const playersPerTeam = parseInt(document.getElementById('tour-players-per-team')?.value || 4, 10);
    const badge = document.getElementById('tour-roster-summary-badge');
    if (badge) {
      badge.textContent = `👥 Configuration: ${slots} Teams × ${playersPerTeam} Players = ${slots * playersPerTeam} Total Registered Players`;
    }
  }

  autoComputeTotalPrize() {
    const p1 = parseInt(document.getElementById('tour-prize-1')?.value || 0, 10);
    const p2 = parseInt(document.getElementById('tour-prize-2')?.value || 0, 10);
    const p3 = parseInt(document.getElementById('tour-prize-3')?.value || 0, 10);
    const totalPrizeInput = document.getElementById('tour-total-prize');
    if (totalPrizeInput) {
      totalPrizeInput.value = p1 + p2 + p3;
    }
  }

  setTournamentBannerPreset(url) {
    this.currentTourBannerUrl = url;
    const previewImg = document.getElementById('tour-banner-preview-img');
    if (previewImg) previewImg.src = url;
    window.sfx?.playSuccess();
  }

  handleTournamentBannerUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG/JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.currentTourBannerUrl = e.target.result;
      const previewImg = document.getElementById('tour-banner-preview-img');
      if (previewImg) previewImg.src = this.currentTourBannerUrl;
      window.sfx?.playSuccess();
    };
    reader.readAsDataURL(file);
  }

  handleSaveTournamentSpecs() {
    const editId = document.getElementById('edit-tour-id')?.value;
    const name = document.getElementById('tour-name')?.value.trim();
    const subtitle = document.getElementById('tour-subtitle')?.value.trim() || 'Where Every Clutch Counts! ⚡';
    const game = document.getElementById('tour-game')?.value || 'Garena Free Fire';
    const gameMode = document.getElementById('tour-mode')?.value || 'Battle Royale';
    const mapName = document.getElementById('tour-map')?.value || 'Bermuda (Full Map)';
    const format = document.getElementById('tour-format')?.value || 'Squad (4v4)';
    const slotsCount = parseInt(document.getElementById('tour-slots-count')?.value || 12, 10);
    const playersPerSquad = parseInt(document.getElementById('tour-players-per-team')?.value || 4, 10);
    const entryFee = parseInt(document.getElementById('tour-entry-fee')?.value || 0, 10);
    const totalPrize = parseInt(document.getElementById('tour-total-prize')?.value || 0, 10);
    const p1 = parseInt(document.getElementById('tour-prize-1')?.value || 0, 10);
    const p2 = parseInt(document.getElementById('tour-prize-2')?.value || 0, 10);
    const p3 = parseInt(document.getElementById('tour-prize-3')?.value || 0, 10);
    const upiId = document.getElementById('tour-upi-id')?.value.trim() || '9347176849@ybl';
    const phone = document.getElementById('tour-phone')?.value.trim() || '919347176849';
    const waLink = document.getElementById('tour-wa-group-link')?.value.trim() || 'https://chat.whatsapp.com/C5nbq7MBvuJFq7HSsElJTb?s=cl&p=a&mlu=4&ilr=4';
    const roomId = document.getElementById('tour-room-id')?.value.trim() || '';
    const roomPass = document.getElementById('tour-room-pass')?.value.trim() || '';
    const rules = document.getElementById('tour-rules')?.value.trim() || '';
    const banner = this.currentTourBannerUrl || document.getElementById('tour-banner-preview-img')?.src || 'assets/peros-logo.jpg';

    if (!name) {
      alert('Please enter a Tournament Name!');
      return;
    }

    if (editId) {
      const tour = this.db.tournaments.find(x => x.id === editId);
      if (tour) {
        tour.name = name;
        tour.subtitle = subtitle;
        tour.game = game;
        tour.gameMode = gameMode;
        tour.mapName = mapName;
        tour.format = format;
        tour.playersPerSquad = playersPerSquad;
        tour.totalSlots = slotsCount;
        tour.entryFee = entryFee;
        tour.totalPrizePool = totalPrize;
        tour.prizes = { first: p1, second: p2, third: p3, mvp: 0 };
        tour.upiId = upiId;
        tour.organizerPhone = phone;
        tour.officialGroupLink = waLink;
        tour.roomId = roomId;
        tour.roomPass = roomPass;
        tour.rules = rules;
        tour.bannerImage = banner;

        // Adjust slots array
        while (tour.slots.length < slotsCount) {
          tour.slots.push({
            slotNumber: tour.slots.length + 1,
            status: 'available',
            squadName: null,
            players: []
          });
        }
        if (tour.slots.length > slotsCount) {
          tour.slots = tour.slots.slice(0, slotsCount);
        }
      }
    } else {
      const newTour = {
        id: 'tour_' + Date.now(),
        name: name,
        subtitle: subtitle,
        game: game,
        gameMode: gameMode,
        mapName: mapName,
        format: format,
        playersPerSquad: playersPerSquad,
        totalSlots: slotsCount,
        bannerImage: banner,
        organizerPhone: phone,
        officialGroupLink: waLink,
        entryFee: entryFee,
        totalPrizePool: totalPrize,
        prizes: { first: p1, second: p2, third: p3, mvp: 0 },
        upiId: upiId,
        roomId: roomId,
        roomPass: roomPass,
        roomStatus: 'scheduled',
        matchDateTime: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
        rules: rules,
        slots: Array.from({ length: slotsCount }, (_, i) => ({
          slotNumber: i + 1,
          status: 'available',
          squadName: null,
          players: []
        }))
      };
      this.db.tournaments.push(newTour);
      this.db.activeTournamentId = newTour.id;
    }

    this.saveDatabase();
    window.sfx?.playFanfare();
    alert(`🎉 Tournament "${name}" specifications saved successfully!`);
    this.closeTournamentCreatorForm();
    this.renderAdminTournamentsList();
  }

  switchTournament(tourId) {
    const t = this.db.tournaments.find(x => x.id === tourId);
    if (t) {
      this.db.activeTournamentId = tourId;
      this.saveDatabase();
      window.sfx?.playClick();
      this.renderAll();
    }
  }

  deleteTournament(tourId) {
    if (confirm('Are you sure you want to delete this tournament?')) {
      this.db.tournaments = this.db.tournaments.filter(t => t.id !== tourId);
      if (this.db.activeTournamentId === tourId) {
        this.db.activeTournamentId = this.db.tournaments[0].id;
      }
      this.saveDatabase();
      window.sfx?.playClick();
      this.renderAdminTournamentsList();
    }
  }

  exportDatabaseJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `peros_esports_platform_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // ==========================================
  // EVENT LISTENERS & HOOKS
  // ==========================================
  setupAudioToggle() {
    const audioBtn = document.getElementById('btn-toggle-sound');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isEnabled = window.sfx.toggle();
        audioBtn.innerHTML = isEnabled ? '🔊 SFX ON' : '🔇 SFX OFF';
        audioBtn.style.color = isEnabled ? 'var(--cyber-cyan)' : '#8C9BAE';
      });
    }
  }

  setupEventListeners() {
    document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el) {
          el.closest('.modal-backdrop')?.classList.remove('active');
        }
      });
    });

    document.getElementById('event-switcher-select')?.addEventListener('change', (e) => {
      this.switchTournament(e.target.value);
    });

    document.getElementById('btn-hero-register')?.addEventListener('click', () => {
      window.sfx?.playClick();
      this.openRegistrationModal();
    });

    document.getElementById('btn-hero-install-app')?.addEventListener('click', () => {
      this.triggerPWAInstall();
    });

    document.getElementById('btn-nav-auth')?.addEventListener('click', () => {
      this.openAuthModal('login');
    });

    document.getElementById('nav-user-capsule')?.addEventListener('click', () => {
      this.openMySquadsModal();
    });

    document.getElementById('btn-install-app')?.addEventListener('click', () => {
      this.triggerPWAInstall();
    });

    document.getElementById('btn-pwa-banner-install')?.addEventListener('click', () => {
      this.triggerPWAInstall();
    });

    document.getElementById('btn-pwa-banner-close')?.addEventListener('click', () => {
      document.getElementById('pwa-install-banner')?.style.setProperty('display', 'none');
    });

    document.getElementById('btn-reg-next')?.addEventListener('click', () => this.nextStep());
    document.getElementById('btn-reg-prev')?.addEventListener('click', () => this.prevStep());
    document.getElementById('btn-reg-submit')?.addEventListener('click', () => this.submitRegistration());

    document.getElementById('reg-logo-input')?.addEventListener('change', (e) => this.handleTeamLogoUpload(e));
    document.getElementById('reg-screenshot-input')?.addEventListener('change', (e) => this.handleScreenshotUpload(e));
    document.getElementById('tour-banner-file-input')?.addEventListener('change', (e) => this.handleTournamentBannerUpload(e));
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  window.app = new TournamentApp();
});
