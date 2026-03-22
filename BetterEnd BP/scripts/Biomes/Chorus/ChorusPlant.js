import { world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:chorus_plant_flower', {
        onPlace({ block }) {
            new PlantUtils(block).onPlace([0, 1]);
        },
        onRandomTick({ block }) {
            new PlantUtils(block).onPlace([0, 1]);
        },
    });
});
