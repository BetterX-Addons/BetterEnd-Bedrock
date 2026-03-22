import { system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:lacugrove_leaves', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:lacugrove_leaves');
        }
    });
});
