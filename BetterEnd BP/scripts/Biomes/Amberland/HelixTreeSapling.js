import { world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = ["amber_tree1", "amber_tree2", "amber_tree3"];
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:helix_tree_sapling', {
        onPlayerInteract({ block, player }) {
            const offset = {
                x: block.location.x + -12,
                y: block.location.y + 0,
                z: block.location.z + -9
            };
            new PlantUtils(block, player).boneMealGrowth(3, true, structures, offset, true);
        },
        onRandomTick({ block }) {
            const offset = {
                x: block.location.x + -12,
                y: block.location.y + 0,
                z: block.location.z + -9
            };
            new PlantUtils(block).randomTickinigGrowth(3, true, structures, offset, true);
        },
    });
});
