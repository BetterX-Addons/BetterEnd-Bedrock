import { system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = ["glowing_pillar1", "glowing_pillar2"];
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:glowing_pillar_seed', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:glowing_pillar_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            };
            new PlantUtils(block, player).boneMealGrowth(4, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            };
            new PlantUtils(block).randomTickinigGrowth(4, true, structures, offset, false);
        },
    });
});
