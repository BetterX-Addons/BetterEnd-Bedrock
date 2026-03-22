import { BlockPermutation, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const blockIndex = {
    "betterend:creeping_moss": {},
    "betterend:cyan_moss": {
        random: 2,
    },
    "betterend:umbrella_moss": {
        random: 3,
    },
    "betterend:tall_umbrella_moss": {
        random: 3,
        tall: true,
    },
    "betterend:twisted_umbrella_moss": {
        random: 3,
    },
    "betterend:tall_twisted_umbrella_moss": {
        random: 3,
        tall: true,
    },
    "betterend:lacugrove_wood": {
        random: 3
    },
    "betterend:lacugrove_log": {
        random: 3
    }
};
system.beforeEvents.startup.subscribe((data) => {
    data.blockComponentRegistry.registerCustomComponent("betterend:megalakes_index", {
        beforeOnPlayerPlace(args) {
            const { block } = args;
            if (blockIndex[args.permutationToPlace.type.id] && blockIndex[args.permutationToPlace.type.id].tall) {
                const upBlock = block.above();
                if (upBlock?.typeId === "minecraft:air") {
                    upBlock.setPermutation(BlockPermutation.resolve(args.permutationToPlace.type.id, {
                        ...block.permutation.getAllStates(),
                        "betterend:top": true,
                        "betterend:random": Math.floor(Math.random() * blockIndex[args.permutationToPlace.type.id].random),
                    }));
                }
                else {
                    args.cancel = true;
                }
            }
        },
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
    });
});
