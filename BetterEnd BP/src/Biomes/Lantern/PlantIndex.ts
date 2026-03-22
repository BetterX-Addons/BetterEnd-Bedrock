import { BlockPermutation, world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const blockIndex = {
  "betterend:lucernia_leaves": {
    random: 3
  },
  "betterend:ruscus": {
    random: 2
  },
  "betterend:aurant_polypore": {
    random: 2
  },
  "betterend:lamellarium": {
    random: 1
  },
  "betterend:orango": {
    random: 1
  },
  "betterend:bolux_mushroom": {
    random: 2
  },
  "betterend:flamaea": {
    random: 4
  },
  "betterend:lucernia_log": {
    random: 1
  },
  "betterend:lucernia_wood": {
    random: 1
  },
  "betterend:lucernia_outer_leaves": {
    random: 2
  }
};

system.beforeEvents.startup.subscribe((data) => {
  data.blockComponentRegistry.registerCustomComponent("betterend:lucernia_index", {
    onPlace({ block }) {
      if (blockIndex[block.typeId] && blockIndex[block.typeId].random && !blockIndex[block.typeId].tall) {
        new PlantUtils(block).onPlace(Number(blockIndex[block.typeId].random));
      }
    },
    onPlayerBreak({ block, player, destroyedBlockPermutation }) {
      if (blockIndex[destroyedBlockPermutation.type.id]) {
        new PlantUtils(block, player).onBreak(destroyedBlockPermutation.type.id);
        blockIndex[destroyedBlockPermutation.type.id].tall &&
          block.dimension.runCommand(
            `setblock ${block.location.x} ${
              block.location.y + (destroyedBlockPermutation.getState("betterend:top") ? -1 : 1)
            } ${block.location.z} air destroy`
          );
      }
    },

    onRandomTick({ block }) {
      if (blockIndex[block.typeId] && blockIndex[block.typeId].randomTick) {
        new PlantUtils(block).onPlace(blockIndex[block.typeId].random);
      }
    },
  });
});
