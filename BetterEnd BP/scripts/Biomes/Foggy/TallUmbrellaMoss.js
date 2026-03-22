// import { world, Block, Player, ItemStack, BlockPermutation, system } from "@minecraft/server";
// import PlantUtils from "Biomes/PlantsUtils";
// system.beforeEvents.startup.subscribe((data) => {
//   data.blockComponentRegistry.registerCustomComponent("betterend:tall_umbrella_moss", {
//     beforeOnPlayerPlace(args) {
//       const { block } = args;
//       const upBlock = block.above();
//       if (upBlock?.typeId === "minecraft:air") {
//         upBlock.setPermutation(
//           BlockPermutation.resolve(args.permutationToPlace.type.id, {
//             ...block.permutation.getAllStates(),
//             "betterend:top": true,
//             "betterend:random": Math.floor(Math.random() * 3),
//           })
//         );
//       } else {
//         args.cancel = true;
//       }
//     },
//     onPlayerBreak({ block, destroyedBlockPermutation, player }) {
//       new PlantUtils(block, player).onBreak("betterend:tall_umbrella_moss");
//       block.dimension.runCommand(
//         `setblock ${block.location.x} ${
//           block.location.y + (destroyedBlockPermutation.getState("betterend:top") ? -1 : 1)
//         } ${block.location.z} air destroy`
//       );
//     },
//   });
// });
