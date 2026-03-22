import * as mc from "@minecraft/server";

export const BiomeTags = [
    {
        tag: 'foggy_mushroomland',
        fog: 'betterend:foggy_mushroomland_fog_setting',
        sound: 'foggy_mushroomland',
        music: 'betterend.calm.music',
    },
    {
        tag: 'amberland',
        fog: 'betterend:amber_land_fog_setting',
        sound: 'amber_land',
        music: 'betterend.calm.music',
    },
    {
        tag: 'blossoming_spires',
        fog: 'betterend:blossoming_spire_fog_setting',
        sound: 'blossoming_spires',
        music: 'betterend.calm.music',
    },
    {
        tag: 'crystal_mountains',
        fog: 'betterend:crystal_mountains_fog_setting',
        sound: 'foggy_mushroomland',
        music: 'betterend.caves.music',
    },
    {
        tag: 'chorus_forest',
        fog: 'betterend:chorus_forest_fog_setting',
        sound: 'chorus_forest',
        music: 'betterend.forest.music',
    },
    {
        tag: 'dust_wasteland',
        fog: 'betterend:desert_fog_setting',
        sound: 'dust_wastelands',
        music: 'betterend.dark.music',
    },
    {
        tag: 'neon_oasis',
        fog: 'betterend:desert_fog_setting',
        sound: 'dust_wastelands',
        music: 'betterend.dark.music',
    },
    {
        tag: 'megalakes_grove',
        fog: 'betterend:megalakes_fog_setting',
        sound: 'megalake',
        music: 'betterend.calm.music',
    },
    {
        tag: 'shadow_forest',
        fog: 'betterend:shadow_forest_fog_setting',
        sound: 'chorus_forest',
        music: 'betterend.dark.music',
    },
    {
        tag: 'sulphur_springs',
        fog: 'betterend:sulphur_springs_fog_setting',
        sound: 'sulphur_springs',
        music: 'none',
    },
    {
        tag: 'umbrella_jungle',
        fog: 'betterend:umbrella_jungle_fog_setting',
        sound: 'umbrella_jungle',
        music: 'betterend.calm.music',
    },
    {
        tag: 'glowing_grasslands',
        fog: 'betterend:glowing_grasslands_fog_setting',
        sound: 'glowing_grasslands',
        music: 'betterend.calm.music',
    },
    {
        tag: 'dragon_graveyards',
        fog: 'betterend:dragon_graveyards_fog_setting',
        sound: 'amber_land',
        music: 'betterend.calm.music',
    },
    {
        tag: 'dry_shrubland',
        fog: 'betterend:dry_shrubland_fog_setting',
        sound: 'chorus_forest',
        music: 'betterend.forest.music',
    },
    {
        tag: 'ice_starfield',
        fog: 'betterend:ice_starfield_fog_setting',
        sound: 'caves',
        music: 'betterend.calm.music'
    },
    {
        tag: 'umbra_valley',
        fog: 'betterend:umbra_valley_fog_setting',
        sound: 'caves',
        music: 'betterend.dark.music',
    },
    {
        tag: 'the_end_biome',
        fog: 'betterend:crystal_mountains_fog_setting',
        sound: '',
        music: 'betterend.caves.music',
    },
    {
        tag: 'none',
        fog: 'betterend:crystal_mountains_fog_setting',
        sound: '',
        music: 'betterend.caves.music',
    }
];
export const CaveBiomesTag = [
    {
        tag: 'lush_cave',
        fog: 'betterend:lush_cave_fog_setting',
        sound: 'caves',
        music: 'betterend.caves.music',
    },
    {
        tag: 'jadestone',
        fog: 'betterend:jadestone_fog_setting',
        sound: 'caves',
        music: 'betterend.caves.music',
    },
    {
        tag: 'smaragdant',
        fog: 'betterend:smaragdant_cave_fog_setting',
        sound: 'caves',
        music: 'betterend.caves.music',
    },
    {
        tag: 'empty_cave',
        fog: 'betterend:desert_fog_setting',
        sound: 'caves',
        music: 'betterend.caves.music',
    }
];
export const AllTags = [
    "foggy_mushroomland",
    "amberland",
    "blossoming_spires",
    "crystal_mountains",
    "chorus_forest",
    "dust_wasteland",
    "neon_oasis",
    "megalakes_grove",
    "shadow_forest",
    "sulphur_springs",
    "umbrella_jungle",
    "glowing_grasslands",
    "dragon_graveyards",
    "dry_shrubland",
    "ice_starfield",
    "umbra_valley",
    "the_end_biome",
    "none",
    "lush_cave",
    "jadestone",
    "smaragdant",
    "empty_cave"
];
export function fogSoundsMusic(player, fog, sound, music, time) {
    if (!player.hasTag('in_biome')) {
        player.addTag('in_biome');
        player.runCommand(`stopsound @s`);
        player.runCommand(`fog @s remove end_fog`);
        player.runCommand(`fog @s push ${fog} end_fog`);
        mc.system.runTimeout(() => {
            player.playSound(sound, { location: player.location });
            player.playSound(music, { location: player.location, volume: 0.3 });
        }, time);
    }
};