import { world, Block, Player, ItemStack, Vector3, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const structures: string[] = [ "blue_vine1", "blue_vine2", "blue_vine3" ];

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:blue_vine_seed', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:blue_vine_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset: Vector3 = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            }
            new PlantUtils(block, player).boneMealGrowth(4, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset: Vector3 = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            }
            new PlantUtils(block).randomTickinigGrowth(4, true, structures, offset, false);
        },
    });
});