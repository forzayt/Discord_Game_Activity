(() => {
    "use strict";

    const LOCK = "__multiGamePresence";
    const MIN_CHANGE_MS = 23 * 60 * 1000;
    const MAX_CHANGE_MS = 38 * 60 * 1000;
    const GAMES = Object.freeze([
        // --- Rockstar & Action / Crime Open-World ---
        "Grand Theft Auto V", "Grand Theft Auto IV", "Grand Theft Auto: San Andreas", "Grand Theft Auto: Vice City",
        "Red Dead Redemption 2", "Red Dead Redemption", "LA Noire", "Bully: Scholarship Edition",
        "Mafia: Definitive Edition", "Mafia II: Definitive Edition", "Mafia III: Definitive Edition", "Mafia: Old Country",
        "Watch Dogs", "Watch Dogs 2", "Watch Dogs: Legion", "Sleeping Dogs: Definitive Edition",
        "Saints Row IV", "Saints Row: The Third", "Saints Row 2", "Saints Row (2022)",
        "Just Cause 2", "Just Cause 3", "Just Cause 4", "Mercenaries 2: World in Flames",
        "The Saboteur", "Crackdown 3", "Mad Max", "Rage", "Rage 2", "State of Decay", "State of Decay 2",

        // --- Cyberpunk, Sci-Fi & Space Open-World ---
        "Cyberpunk 2077", "Starfield", "No Man's Sky", "ELEX", "ELEX II", "Everspace 2",
        "Star Citizen", "Elite Dangerous", "Astroneer", "The Outer Worlds", "The Outer Worlds 2",
        "Mass Effect Legendary Edition", "Mass Effect: Andromeda", "Prey", "Deus Ex: Mankind Divided",
        "Deus Ex: Human Revolution", "Alien: Isolation", "Deliver Us The Moon", "Deliver Us Mars",
        "Death Stranding", "Death Stranding Director's Cut", "Generation Zero", "Atomic Heart",
        "Chorus", "Submerged: Hidden Depths", "Outer Wilds", "Sable", "Journey",

        // --- Fantasy & Action RPG Open-World ---
        "Elden Ring", "Dark Souls", "Dark Souls II", "Dark Souls III", "Sekiro: Shadows Die Twice",
        "Bloodborne", "Demon's Souls", "Lords of the Fallen", "Lies of P", "Nioh", "Nioh 2",
        "Wo Long: Fallen Dynasty", "Black Myth: Wukong", "Dragon's Dogma: Dark Arisen", "Dragon's Dogma 2",
        "The Witcher 3: Wild Hunt", "The Witcher 2: Assassins of Kings", "The Witcher: Enhanced Edition",
        "The Elder Scrolls V: Skyrim", "The Elder Scrolls IV: Oblivion", "The Elder Scrolls III: Morrowind",
        "Fallout 3", "Fallout: New Vegas", "Fallout 4", "Fallout 76", "Kingdom Come: Deliverance",
        "Kingdom Come: Deliverance II", "Dragon Age: Inquisition", "Dragon Age: Origins", "Dragon Age: The Veilguard",
        "Baldur's Gate 3", "Divinity: Original Sin 2", "Avowed", "Fable Anniversary", "Gothic 3",

        // --- Sony PlayStation / Ported Action Open-World ---
        "Ghost of Tsushima", "Horizon Zero Dawn", "Horizon Forbidden West", "God of War",
        "God of War Ragnarök", "Marvel's Spider-Man Remastered", "Marvel's Spider-Man: Miles Morales",
        "Marvel's Spider-Man 2", "Days Gone", "The Last of Us Part I", "The Last of Us Part II Remastered",
        "Uncharted: Legacy of Thieves Collection", "Infamous Second Son", "Rise of the Ronin", "Stellar Blade",

        // --- Ubisoft Open-World Franchises ---
        "Assassin's Creed Valhalla", "Assassin's Creed Odyssey", "Assassin's Creed Origins",
        "Assassin's Creed Shadows", "Assassin's Creed Mirage", "Assassin's Creed Black Flag",
        "Assassin's Creed III", "Assassin's Creed Syndicate", "Assassin's Creed Unity", "Assassin's Creed Rogue",
        "Far Cry 3", "Far Cry 4", "Far Cry 5", "Far Cry 6", "Far Cry Primal", "Far Cry New Dawn",
        "Tom Clancy's Ghost Recon Wildlands", "Tom Clancy's Ghost Recon Breakpoint",
        "Tom Clancy's The Division", "Tom Clancy's The Division 2", "Avatar: Frontiers of Pandora",
        "Star Wars Outlaws", "Immortals Fenyx Rising", "Prince of Persia: The Lost Crown",

        // --- Survival, Crafting & Sandbox ---
        "Valheim", "Palworld", "ARK: Survival Evolved", "ARK: Survival Ascended", "Rust", "Raft",
        "Subnautica", "Subnautica: Below Zero", "The Forest", "Sons of the Forest", "Grounded",
        "Enshrouded", "Nightingale", "V Rising", "Green Hell", "Stranded Deep", "Conan Exiles",
        "Terraria", "Minecraft", "Starbound", "7 Days to Die", "Project Zomboid", "DayZ",
        "SCUM", "Smalland: Survive the Wilds", "Pacific Drive", "Medieval Dynasty", "Sengoku Dynasty",
        "Manor Lords", "Bellwright", "Soulmask", "Abiotic Factor", "Icarus", "Sunkenland",
        "Myth of Empires", "Keplerth", "Necresse", "Core Keeper", "Don't Starve Together",

        // --- Post-Apocalyptic & Horror Open-World ---
        "S.T.A.L.K.E.R.: Shadow of Chernobyl", "S.T.A.L.K.E.R.: Call of Pripyat", "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
        "Metro 2033", "Metro Last Light", "Metro Exodus", "Dying Light", "Dying Light 2 Stay Human",
        "Dead Island", "Dead Island 2", "Chernoblite", "Hunt: Showdown 1896", "Remnant: From the Ashes",
        "Remnant II", "Resident Evil Village", "Resident Evil 4", "Alan Wake 2", "Control",

        // --- Racing, Driving & Vehicle Open-World ---
        "Forza Horizon 5", "Forza Horizon 4", "Forza Horizon 3", "The Crew Motorfest", "The Crew 2",
        "Test Drive Unlimited Solar Crown", "Need for Speed Unbound", "Need for Speed Heat",
        "Need for Speed Payback", "Need for Speed Rivals", "BeamNG.drive", "SnowRunner",
        "MudRunner", "Expeditions: A MudRunner Game", "Euro Truck Simulator 2", "American Truck Simulator",
        "Assetto Corsa", "Assetto Corsa Competizione", "Automobilista 2", "CarX Drift Racing Online",

        // --- Superhero, Anime & Asian Action Open-World ---
        "Batman: Arkham Knight", "Batman: Arkham City", "Batman: Arkham Origins", "Gotham Knights",
        "Suicide Squad: Kill the Justice League", "Middle-earth: Shadow of Mordor", "Middle-earth: Shadow of War",
        "Genshin Impact", "Honkai: Star Rail", "Zenless Zone Zero", "Wuthering Waves",
        "Yakuza 0", "Yakuza Kiwami", "Yakuza Kiwami 2", "Like a Dragon: Infinite Wealth",
        "Yakuza: Like a Dragon", "Judgment", "Lost Judgment", "Monster Hunter: World",
        "Monster Hunter Rise", "Monster Hunter Wilds", "Wild Hearts", "Code Vein",

        // --- Shooters & Tactical Combat ---
        "Helldivers 2", "Warframe", "Destiny 2", "Borderlands 2", "Borderlands 3", "Tiny Tina's Wonderlands",
        "Arma 3", "Arma Reforger", "Squad", "Hell Let Loose", "Insurgency: Sandstorm",
        "Escape from Tarkov", "Ready or Not", "PAYDAY 2", "PAYDAY 3", "Rainbow Six Siege",
        "Call of Duty: Warzone", "Battlefield 2042", "Battlefield V", "Battlefield 1", "Halo Infinite",

        // --- Strategy, Simulation & Management Open-World ---
        "Satisfactory", "Factorio", "Dyson Sphere Program", "RimWorld", "Kenshi",
        "Mount & Blade II: Bannerlord", "Mount & Blade: Warband", "X4: Foundations", "Stellaris",
        "Cities: Skylines", "Cities: Skylines II", "Frostpunk", "Frostpunk 2", "Anno 1800",
        "Sid Meier's Civilization VI", "Age of Empires IV", "Total War: WARHAMMER III",

        // --- Additional Renowned AAA & Indie Titles ---
        "Hogwarts Legacy", "Sea of Thieves", "Forspoken", "Outward", "Tchia",
        "Dune: Awakening", "Ashen", "Biomutant", "Shadow of the Colossus", "The Pathless",
        "Sunless Sea", "Sunless Skies", "Cat Quest", "Cat Quest II", "Cat Quest III",
        "A Short Hike", "Slime Rancher", "Slime Rancher 2", "Dave the Diver", "Dredge",
        "Everspace", "Ancestors: The Humankind Odyssey", "Breathedge", "Voidtrain",
        "Astroneer", "Hardspace: Shipbreaker", "Police Simulator: Patrol Officers", "Construction Simulator",
        "Farming Simulator 22", "Farming Simulator 25", "Bus Simulator 21", "Train Sim World 4",
        "Way of the Hunter", "theHunter: Call of the Wild", "Fishing: North Atlantic", "Gold Rush: The Game",
        "House Flipper 2", "Gas Station Simulator", "Car Mechanic Simulator 2021", "PC Building Simulator 2",

        // --- High-End RPGs & Masterpieces ---
        "Vampyr", "GreedFall", "Greedfall II: The Dying World", "Technomancer", "Bound by Flame",
        "Risen", "Risen 2: Dark Waters", "Risen 3: Titan Lords", "ArcaniA", "Two Worlds II",
        "Sacred 2: Fallen Angel", "Titan Quest Anniversary Edition", "Grim Dawn", "Path of Exile",
        "Path of Exile 2", "Diablo IV", "Diablo III", "Diablo II: Resurrected", "Torchlight II",
        "Torchlight III", "Last Epoch", "V Rising", "Nine Sols", "Hades", "Hades II",

        // --- Action, Stealth & Narrative ---
        "Hitman 3", "Hitman World of Assassination", "Dishonored", "Dishonored 2", "Dishonored: Death of the Outsider",
        "Deathloop", "Ghostwire: Tokyo", "Sniper Elite 4", "Sniper Elite 5", "Sniper Ghost Warrior Contracts 2",
        "Metal Gear Solid V: Ground Zeroes", "Metal Gear Solid V: The Phantom Pain", "Metal Gear Solid Δ: SNAKE EATER",
        "Splinter Cell: Blacklist", "Sifu", "Stray", "Kena: Bridge of Spirits", "Solar Ash",

        // --- Sci-Fi / VR & Space Sims ---
        "Space Engineers", "Kerbal Space Program", "Kerbal Space Program 2", "Stationeers",
        "Empyrion - Galactic Survival", "Avorion", "Dual Universe", "Star Trek: Infinite",
        "Homeworld 3", "Sins of a Solar Empire II", "Endless Space 2", "Galactic Civilizations IV",

        // --- Zombie / Horror / Apocalyptic ---
        "Left 4 Dead 2", "Back 4 Blood", "World War Z", "Zombie Army 4: Dead War", "Dead Rising Deluxe Remaster",
        "Dead Rising 3", "Dead Rising 4", "Unturned", "Mist Survival", "Infection Free Zone",
        "Night of the Dead", "SurrounDead", "Deadside", "HumanitZ", "The Day Before",

        // --- Medieval, Historical & Conquest Open World ---
        "Chivalry 2", "MORDHAU", "Conqueror's Blade", "For Honor", "Wild West Dynasty",
        "Farmer's Dynasty", "Lumberjack's Dynasty", "Life is Feudal: Your Own", "Kingdoms and Castles",
        "Becastled", "Going Medieval", "Stranded: Alien Dawn", "Founders' Fortune",

        // --- Marine, Naval & Ocean Exploration ---
        "Skull and Bones", "Naval Action", "Windward", "Sailwind", "Sailing Era",
        "Sunkenland", "Barotrauma", "Iron Lung", "Far: Lone Sails", "Far: Changing Tides",

        // --- Sandbox Physics & Destruction ---
        "Teardown", "Garry's Mod", "Besiege", "Trailmakers", "Scrap Mechanic",
        "Main Assembly", "Stormworks: Build and Rescue", "Brick Rigs", "Instruments of Destruction",

        // --- Multiplayer Open World / MMORPG ---
        "World of Warcraft", "FINAL FANTASY XIV", "Guild Wars 2", "The Elder Scrolls Online",
        "Lost Ark", "Black Desert", "New World: Aeternum", "Trove", "DC Universe Online",
        "Star Wars: The Old Republic", "Neverwinter", "Star Trek Online", "RuneScape", "Old School RuneScape",

        // --- Co-Op Adventure & Unique Exploration ---
        "Deep Rock Galactic", "Deep Rock Galactic: Survivor", "Risk of Rain 2", "Risk of Rain Returns",
        "Gunfire Reborn", "Roboquest", "Unravel Two", "It Takes Two", "A Way Out",
        "Sea of Stars", "Chained Echoes", "Octopath Traveler II", "Bravely Default II",

        // --- Additional Open World, Action & RPG Heavyweights ---
        "Shadow Warrior 3", "Shadow Warrior 2", "Serious Sam 4", "Bright Memory: Infinite",
        "Prodeus", "Ultrakill", "Warhammer 40,000: Darktide", "Warhammer 40,000: Space Marine 2",
        "Warhammer: Vermintide 2", "Aliens: Fireteam Elite", "Remnant 2", "Soulstice",
        "Steelrising", "Thymesia", "Mortal Shell", "Hellpoint", "The Surge 2", "The Surge",
        "Outriders", "Redfall", "Evil West", "Atlas Fallen", "Flintlock: The Siege of Dawn",
        "En Garde!", "Shadows of Doubt", "Gloomwood", "Tainted Grail: The Fall of Avalon",
        "Dread Delusion", "Lunacid", "Arx Fatalis", "Dark Messiah of Might & Magic",
        "Blood West", "Witchfire", "Phantom Fury", "Ion Fury", "Turbo Overkill",

        // --- Extended Simulation, Driving & Open Air Sports ---
        "Riders Republic", "Steep", "Skate 3", "Session: Skate Sim", "Skater XL",
        "Tony Hawk's Pro Skater 1 + 2", "BMX Pipe", "Rims Racing", "Ride 5",
        "TT Isle of Man: Ride on the Edge 3", "MX vs ATV Legends", "Monster Energy Supercross 6",
        "Pure Rock Crawling", "Offroad Outlaws", "Overpass 2", "WRC Generations",
        "EA Sports WRC", "Dirt Rally 2.0", "GRID Legends", "Project CARS 3",

        // --- Additional Survival, Crafting & Wilderness ---
        "The Long Dark", "Green Hell VR", "Subnautica VR", "Starsand", "Arid",
        "Dead in Vinland", "Bermuda Lost Survival", "Survival: Fountain of Youth", "Wildmender",
        "Warm Snow", "Cult of the Lamb", "Moonlighter", "Graveyard Keeper", "Core Keeper",
        "Rogue Legacy 2", "Dead Cells", "Hollow Knight", "Hollow Knight: Silksong",
        "Blasphemous 2", "Ender Lilies: Quietus of the Knights", "Aeterna Noctis", "Salt and Sanctuary"
    ]);

    if (window[LOCK]?.stop) {
        console.warn("[Multi Game Presence] Already running. To stop: window.__multiGamePresence.stop()");
        return;
    }
    if (GAMES.length < 100) throw new Error("[Multi Game Presence] Game list must contain at least 100 entries.");

    function getWebpackRequire() {
        if (window.Vencord?.Webpack?.wreq?.c) return window.Vencord.Webpack.wreq;
        if (typeof webpackChunkdiscord_app === "undefined") return null;
        let req;
        webpackChunkdiscord_app.push([[Symbol("multi-game-presence")], {}, incoming => {
            if (Object.keys(incoming?.c ?? {}).length > Object.keys(req?.c ?? {}).length) req = incoming;
        }]);
        webpackChunkdiscord_app.pop();
        return req;
    }

    function collectExports(req) {
        return Object.values(req?.c ?? {}).flatMap(module => {
            try {
                const exp = module?.exports;
                if (!exp) return [];
                return [exp, exp.default, ...(typeof exp === "object" ? Object.values(exp) : [])];
            } catch (_) {
                return [];
            }
        }).filter(Boolean);
    }

    function findStore(exports, name) {
        return exports.find(value => {
            try {
                return value && typeof value === "object" &&
                    (value.getName?.() === name || value.__proto__?.constructor?.displayName === name);
            } catch (_) {
                return false;
            }
        });
    }

    function findDispatcher(exports) {
        return exports.find(value => value && typeof value.dispatch === "function" &&
            typeof value.subscribe === "function" && value._subscriptions);
    }

    const req = getWebpackRequire();
    if (!req?.c) throw new Error("[Multi Game Presence] Discord webpack registry could not be found.");
    const exports = collectExports(req);
    const runStore = findStore(exports, "RunningGameStore");
    const dispatcher = findDispatcher(exports);
    if (!runStore || !dispatcher) throw new Error("[Multi Game Presence] RunningGameStore or Dispatcher not found.");

    const original = {};
    const patchable = ["getRunningGames", "getGameForPID", "getVisibleGame", "getVisibleRunningGames", "getCandidateGames"];
    for (const key of patchable) {
        if (typeof runStore[key] === "function") original[key] = runStore[key];
    }
    if (!original.getRunningGames || !original.getGameForPID) {
        throw new Error("[Multi Game Presence] Required RunningGameStore methods not found.");
    }

    const pid = 45000 + Math.floor(Math.random() * 10000);
    let index = Math.floor(Math.random() * GAMES.length);
    let current = null;
    let timer = null;

    const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const buildGame = name => {
        const executable = /Linux/i.test(navigator.userAgent) ? slug(name) : `${slug(name)}.exe`;
        return {
            id: null,
            name,
            pid,
            pidPath: [pid],
            processName: name,
            start: Date.now(),
            exeName: executable,
            exePath: `/synthetic/games/${slug(name)}/${executable}`,
            cmdLine: `/synthetic/games/${slug(name)}/${executable}`,
            executables: [{ os: /Linux/i.test(navigator.userAgent) ? "linux" : "win32", name: executable, is_launcher: false }],
            windowHandle: 0,
            fullscreenType: 0,
            overlay: false,
            sandboxed: false,
            hidden: false,
            isLauncher: false
        };
    };

    const realGames = () => (original.getRunningGames.call(runStore) ?? []).filter(game => game?.pid !== pid);
    runStore.getRunningGames = () => current ? [...realGames(), current] : realGames();
    runStore.getGameForPID = value => value === pid && current ? current : original.getGameForPID.call(runStore, value);
    if (original.getVisibleGame) runStore.getVisibleGame = () => current ?? original.getVisibleGame.call(runStore);
    if (original.getVisibleRunningGames) {
        runStore.getVisibleRunningGames = () => current
            ? [...(original.getVisibleRunningGames.call(runStore) ?? []).filter(game => game?.pid !== pid), current]
            : original.getVisibleRunningGames.call(runStore);
    }
    if (original.getCandidateGames) {
        runStore.getCandidateGames = () => current
            ? [...(original.getCandidateGames.call(runStore) ?? []).filter(game => game?.pid !== pid), current]
            : original.getCandidateGames.call(runStore);
    }

    const dispatchRemoval = game => {
        if (!game) return;
        dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", added: [], removed: [game], games: realGames() });
        dispatcher.dispatch({ type: "LOCAL_ACTIVITY_UPDATE", socketId: null, pid, activity: null });
    };

    const activate = name => {
        const previous = current;
        if (previous) dispatchRemoval(previous);
        current = buildGame(name);
        dispatcher.dispatch({
            type: "RUNNING_GAMES_CHANGE",
            added: [current],
            removed: [],
            games: runStore.getRunningGames()
        });
        dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            socketId: null,
            pid,
            activity: {
                name: current.name,
                type: 0,
                details: null,
                state: null,
                timestamps: { start: current.start },
                assets: null
            }
        });
        console.log(`[Multi Game Presence] ${index + 1}/${GAMES.length}: ${current.name}`);
    };

    const scheduleNext = () => {
        const delay = MIN_CHANGE_MS + Math.floor(Math.random() * (MAX_CHANGE_MS - MIN_CHANGE_MS + 1));
        timer = setTimeout(() => {
            next();
            scheduleNext();
        }, delay);
        console.log(`[Multi Game Presence] Next game switch in approximately ${(delay / 60000).toFixed(1)} minutes.`);
    };

    const next = () => {
        index = (index + 1) % GAMES.length;
        activate(GAMES[index]);
    };

    const stop = () => {
        if (!timer) return;
        clearTimeout(timer);
        timer = null;
        const previous = current;
        current = null;
        for (const [key, fn] of Object.entries(original)) runStore[key] = fn;
        dispatchRemoval(previous);
        delete window[LOCK];
        console.log("[Multi Game Presence] Stopped and store restored.");
    };

    window[LOCK] = { stop, next, games: GAMES, get current() { return current?.name ?? null; } };
    window.addEventListener("pagehide", stop, { once: true });
    activate(GAMES[index]);
    scheduleNext();
    console.log(`[Multi Game Presence] ${GAMES.length} games loaded. Switch manually using: window.__multiGamePresence.next()`);
})();
