import { system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const blockIndex = {
    "betterend:chorus_plant_flower": {
        random: 1,
        randomTick: true,
    },
    "betterend:chorus_grass": {
        random: 7,
    },
    "betterend:purple_polypore": {
        random: 2,
    },
    "betterend:tail_moss": {
        random: 2,
    },
    "betterend:pythadendron_log": {
        random: 2
    },
    "betterend:pythadendron_wood": {
        random: 2
    }
};
system.beforeEvents.startup.subscribe((data) => {
    data.blockComponentRegistry.registerCustomComponent("betterend:chorus_index", {
        onPlace({ block }) {
            if (blockIndex[block.typeId] && blockIndex[block.typeId].random && !blockIndex[block.typeId].tall) {
                new PlantUtils(block).onPlace(Number(blockIndex[block.typeId].random));
            }
        },
        onPlayerBreak({ block, player, destroyedBlockPermutation }) {
            if (blockIndex[destroyedBlockPermutation.type.id]) {
                new PlantUtils(block, player).onBreak(destroyedBlockPermutation.type.id);
                blockIndex[destroyedBlockPermutation.type.id].tall &&
                    block.dimension.runCommand(`setblock ${block.location.x} ${block.location.y + (destroyedBlockPermutation.getState("betterend:top") ? -1 : 1)} ${block.location.z} air destroy`);
            }
        },
        onRandomTick({ block }) {
            if (blockIndex[block.typeId] && blockIndex[block.typeId].randomTick) {
                new PlantUtils(block).onPlace(blockIndex[block.typeId].random);
            }
        },
    });
});
