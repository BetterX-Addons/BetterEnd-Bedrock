import { system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:bubble_coral', {
        onPlace({ block }) {
            new PlantUtils(block).randomRotation();
        }
    });
});
