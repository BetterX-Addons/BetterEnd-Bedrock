import { system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:murkweed', {
        onTick({ block }) {
            new PlantUtils(block).spawnParticle('minecraft:evoker_spell');
            let interval = system.runInterval(() => {
                const { dimension, location: loc } = block;
                const loca = { x: loc.x + 0.5, y: loc.y, z: loc.z + 0.5 };
                const players = dimension.getPlayers({ location: loca, maxDistance: 1 });
                players.forEach(player => {
                    player.addEffect('blindness', 80, { showParticles: false });
                });
                const murkweed = dimension.getBlock(loc);
                if (murkweed?.isAir)
                    system.clearRun(interval);
            }, 10);
        }
    });
});
