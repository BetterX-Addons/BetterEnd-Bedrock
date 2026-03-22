import { world, Block, Player, ItemStack, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:charnia', {
        onPlace({ block }) {
            new PlantUtils(block).randomRotation();
        }
    });
});