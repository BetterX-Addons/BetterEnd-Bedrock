import { world, Block, Player, ItemStack, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:small_amaranita_mushroom', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:small_amaranita_mushroom');
        },
        onPlayerInteract({ block, player }) {
            new PlantUtils(block, player).boneMealGrowth(3, false, null, null, false);
        },
        onRandomTick({ block }) {
            return;
            new PlantUtils(block).randomTickinigGrowth(3, false, null, null, false);
        },
        onTick({ block }) {
            const structures = [
                "amaranita_mushroom1",
                "amaranita_mushroom2"
            ];
            const state = block.permutation.getState('betterend:growth') as number;
            if (state === 3) {
                const random = structures[Math.floor(Math.random() * structures.length)];
                const loc = block.location;
                world.structureManager.place(random, block.dimension, loc);
            }
        }
    });
});