import { world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:helix_tree_leaves', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:helix_tree_leaves');
        }
    });
});
