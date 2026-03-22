import { system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:lucernia_leaves', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:lucernia_leaves');
        }
    });
});
