import { world, Block, Player, ItemStack, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:brimstone', {
        onTick({ block }) {
            const { dimension, location } = block;
            const waterSides = [
                block.above()?.isLiquid,
                block.below()?.isLiquid,
                block.north()?.isLiquid,
                block.south()?.isLiquid,
                block.west()?.isLiquid,
                block.east()?.isLiquid
            ];
            if (waterSides.some(e => e === true)) {
                const active = block.permutation.withState('betterend:active', true);
                block.setPermutation(active);
            }
            else {
                const inactive = block.permutation.withState('betterend:active', false);
                block.setPermutation(inactive);
            }
        }
    });
});