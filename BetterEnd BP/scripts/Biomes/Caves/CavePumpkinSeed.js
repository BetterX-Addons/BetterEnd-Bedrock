import { world, BlockPermutation } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:cave_pumpkin_seed', {
        onPlayerDestroy({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:cave_pumpkin_seed');
        },
        onPlayerInteract({ block, player }) {
            const state = block.permutation.getState('betterend:growth');
            if (state == 3)
                spawnPumpkin(block);
            if (state < 3)
                new PlantUtils(block, player).boneMealGrowth(3, false, null, null, false);
        },
        onRandomTick({ block }) {
            const state = block.permutation.getState('betterend:growth');
            if (state == 3)
                spawnPumpkin(block);
            if (state < 3)
                new PlantUtils(block).boneMealGrowth(3, false, null, null, false);
            if (state == 4) {
                const bigPumpkin = block.permutation.withState('betterend:growth', 5);
                block.setPermutation(bigPumpkin);
            }
        },
    });
});
function spawnPumpkin(block) {
    const state = block.permutation.getState('betterend:growth');
    if (state === 3) {
        const downLoc = {
            x: block.location.x,
            y: block.location.y - 1,
            z: block.location.z,
        };
        const blockBelow = block.dimension.getBlock(downLoc);
        if (blockBelow.isAir) {
            const pumpkin = BlockPermutation.resolve(block.typeId, {
                'betterend:growth': 4, // small pumpkin
            });
            block.dimension.setBlockPermutation(downLoc, pumpkin);
        }
    }
}
