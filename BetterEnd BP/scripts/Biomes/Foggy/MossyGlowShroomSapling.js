import { world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = ["minor_foggy_tree1", "minor_foggy_tree2", "big_foggy_tree1"];
const y = [-2, -3];
const randomY = y[Math.floor(Math.random() * y.length)];
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:mossy_glowshroom_sapling', {
        onPlayerInteract({ block, player }) {
            const offset = {
                x: block.location.x + -12,
                y: block.location.y + randomY,
                z: block.location.z + -9
            };
            new PlantUtils(block, player).boneMealGrowth(3, true, structures, offset, true);
        },
        onRandomTick({ block }) {
            const offset = {
                x: block.location.x + -12,
                y: block.location.y + randomY,
                z: block.location.z + -9
            };
            new PlantUtils(block).randomTickinigGrowth(3, true, structures, offset, true);
        },
    });
});
