import { BlockPermutation, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:end_lotus_seed', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:end_lotus_seed');
        },
        onPlayerInteract({ block, player }) {
            new PlantUtils(block, player).boneMealGrowth(4, false);
        },
        onRandomTick({ block }) {
            new PlantUtils(block).randomTickinigGrowth(4, false);
        },
        onTick({ block }) {
            const { dimension: dim, location: loc } = block;
            const up = { x: loc.x, y: loc.y + 1, z: loc.z };
            const stem = BlockPermutation.resolve('betterend:end_lotus_stem_plant', {
                'betterend:stem': 1
            });
            const stemTop = BlockPermutation.resolve('betterend:end_lotus_stem_plant', {
                'betterend:stem': 2
            });
            const state = block.permutation.getState('betterend:growth');
            if (state === 4)
                dim.setBlockPermutation(loc, stem);
            else if (state === 5 || state === 6) {
                const down = { x: loc.x, y: loc.y - 1, z: loc.z };
                dim.setBlockPermutation(down, stemTop);
            }
        }
    });
});
