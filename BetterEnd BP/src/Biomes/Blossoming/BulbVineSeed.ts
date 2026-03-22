import { world, Block, Player, ItemStack, Vector3, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const structures = [ "bulb_vine" ];;

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:bulb_vine_seed', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:bulb_vine_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset: Vector3 = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            }
            new PlantUtils(block, player).boneMealGrowth(3, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset: Vector3 = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            }
            new PlantUtils(block).randomTickinigGrowth(3, true, structures, offset, false);
        },
    });
});