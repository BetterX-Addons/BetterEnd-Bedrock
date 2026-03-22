import { world, Block, Player, ItemStack, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:dragon_tree_leaves', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:dragon_tree_leaves');
        }
    });
});