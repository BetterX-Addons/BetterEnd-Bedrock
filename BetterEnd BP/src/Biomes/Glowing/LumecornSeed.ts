import { world, Block, Player, ItemStack, Vector3, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const structures: string[] = [ 
    "lumecorn1",
    "lumecorn2"
];

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:lumecorn_seed', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:lumecorn_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset: Vector3 = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            }
            new PlantUtils(block, player).boneMealGrowth(4, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset: Vector3 = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            }
            new PlantUtils(block).randomTickinigGrowth(4, true, structures, offset, false);
        },
    });
});