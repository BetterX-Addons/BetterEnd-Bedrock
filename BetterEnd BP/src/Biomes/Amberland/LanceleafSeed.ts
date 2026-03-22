import { world, Block, Player, ItemStack, Vector3, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const structures: string[] = [ "lanceleaf1", "lanceleaf2" ];

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:lanceleaf_seed', {
        
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:lanceleaf_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset: Vector3 = {
                x: block.location.x + 0,
                y: block.location.y + 0,
                z: block.location.z + 0 
            }
            new PlantUtils(block, player).boneMealGrowth(4, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset: Vector3 = {
                x: block.location.x + 0,
                y: block.location.y + 0,
                z: block.location.z + 0 
            }
            new PlantUtils(block).randomTickinigGrowth(4, true, structures, offset, false);
        },
    });
});