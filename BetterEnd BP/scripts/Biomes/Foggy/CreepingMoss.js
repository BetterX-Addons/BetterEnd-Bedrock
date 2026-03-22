import { world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:creeping_moss', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:creeping_moss');
        }
    });
});
