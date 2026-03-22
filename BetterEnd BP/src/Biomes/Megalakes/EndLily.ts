import { world, Block, Player, ItemStack, Vector3, BlockPermutation, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:end_lily_seed', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:end_lily_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset: Vector3 = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            }
            new PlantUtils(block, player).boneMealGrowth(4, false);
        },
        onRandomTick({ block }) {
            const offset: Vector3 = {
                x: block.location.x - 1,
                y: block.location.y + 0,
                z: block.location.z - 1
            }
            new PlantUtils(block).randomTickinigGrowth(4, false);
        },
        onTick({ block }) {
            const { dimension: dim, location: loc } = block;
            const up = { x: loc.x, y: loc.y + 1, z: loc.z };
            const water = dim.getBlock(up)?.typeId === 'minecraft:water';
            const state = block.permutation.getState('betterend:growth') as number;
            const stem = BlockPermutation.resolve(block.typeId, {
                'betterend:growth': 5
            });
            const leaf = BlockPermutation.resolve(block.typeId, {
                'betterend:growth': Math.floor(Math.random() * 3) + 6
            });
            switch (state) {
                case 4:
                    if (water) dim.setBlockPermutation(up, stem);
                    break;
                case 5:
                    if (water) dim.setBlockPermutation(up, stem);
                    else dim.setBlockPermutation(up, leaf);
                    break;
                default:
                    break;
            }
        }
    });
});