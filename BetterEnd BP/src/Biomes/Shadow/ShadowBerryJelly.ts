import { world, Block, Player, ItemStack, system } from "@minecraft/server";
import FoodUtils from "Biomes/FoodUtils";

system.beforeEvents.startup.subscribe(data => {
    data.itemComponentRegistry.registerCustomComponent('betterend:shadow_berry_jelly', {
        onConsume({ itemStack, source }) {
            new FoodUtils(itemStack, source).addEffect('speed', 30, 2, true);
        }
    });
});