import { BlockPermutation, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:end_lotus_flower', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:end_lotus_stem');
        },
        onTick({ block }) {
            const { dimension: dim, location: loc } = block;
            let up = { x: loc.x, y: loc.y + 1, z: loc.z };
            const water = dim.getBlock(up)?.typeId === 'minecraft:water';
            const state = block.permutation.getState('betterend:stem');
            const flower = BlockPermutation.resolve('betterend:end_lotus_seed', {
                'betterend:growth': Math.floor(Math.random() * 2) + 5
            });
            switch (state) {
                case 0:
                    if (water) {
                        dim.setBlockType(up, block.typeId);
                    }
                    else {
                        if (Math.random() < 0.5) {
                            dim.setBlockPermutation(up, flower);
                        }
                        else {
                            const up2 = { x: loc.x, y: loc.y + 2, z: loc.z };
                            dim.setBlockType(up, block.typeId);
                            dim.setBlockPermutation(up2, flower);
                        }
                    }
                    break;
                case 1:
                    if (water)
                        dim.setBlockType(up, block.typeId);
                    break;
                default:
                    break;
            }
        }
    });
});
