import { system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = [
    "jellyshroom_tree1",
    "jellyshroom_tree2",
    "jellyshroom_tree3",
    "jellyshroom_tree4"
];
const y = [-1, -1];
const randomY = y[Math.floor(Math.random() * y.length)];
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:jellyshroom', {
        onPlayerInteract({ block, player }) {
            const offset = {
                x: block.location.x + -5,
                y: block.location.y + randomY,
                z: block.location.z + -5
            };
            new PlantUtils(block, player).boneMealGrowth(3, true, structures, offset, false);
        },
    });
});
