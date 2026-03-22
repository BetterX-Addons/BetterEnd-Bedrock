import { world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = [
    "blossoming_tree1",
    "blossoming_tree2",
    "blossoming_tree3",
    "blossoming_tree4",
    "blossoming_tree5",
];
system.beforeEvents.startup.subscribe((data) => {
    data.blockComponentRegistry.registerCustomComponent("betterend:tenanea_sapling", {
        onPlayerInteract({ block, player }) {
            const offset = {
                x: block.location.x + -10,
                y: block.location.y + 0,
                z: block.location.z + -12,
            };
            new PlantUtils(block, player).boneMealGrowth(3, true, structures, offset, true);
        },
        onRandomTick({ block }) {
            const offset = {
                x: block.location.x + -12,
                y: block.location.y + 0,
                z: block.location.z + -9,
            };
            new PlantUtils(block).randomTickinigGrowth(3, true, structures, offset, true);
        },
    });
});
