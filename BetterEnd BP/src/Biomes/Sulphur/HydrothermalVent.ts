import { world, Block, Player, ItemStack, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:hydrothermal_vent', {
        onTick({ block }) {
            const { dimension, location } = block;
            new PlantUtils(block).spawnParticle('minecraft:basic_smoke_particle', 1);
        },
        onPlace({ block }) {
            new PlantUtils(block).randomRotation();
        }
    });
});