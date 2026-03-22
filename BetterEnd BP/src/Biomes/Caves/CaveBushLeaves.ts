import { world, Block, Player, ItemStack, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:cave_bush_leaves', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:lucernia_leaves');
        }
    });
});