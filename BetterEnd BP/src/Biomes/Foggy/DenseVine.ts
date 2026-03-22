import { world, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe((data) => {
  data.blockComponentRegistry.registerCustomComponent("betterend:dense_vine", {
    beforeOnPlayerPlace(args) {
      const above = args.block.above();

      if (above.typeId === args.permutationToPlace.type.id) {
        const aboveAbove = above.above();

        if (aboveAbove.typeId === args.permutationToPlace.type.id) {
          above.setPermutation(above.permutation.withState("betterend:growth", 1));
          args.permutationToPlace = args.permutationToPlace.withState("betterend:growth", 2);
        } else {
          above.setPermutation(above.permutation.withState("betterend:growth", 0));
          args.permutationToPlace = args.permutationToPlace.withState("betterend:growth", 2);
        }
      } else {
        args.permutationToPlace = args.permutationToPlace.withState("betterend:growth", 2);
      }
    },

    onPlayerBreak(args) {
      const block = args.block;
      if (block.above().typeId === args.destroyedBlockPermutation.type.id) {
        block.above().setPermutation(block.above().permutation.withState("betterend:growth", 2));
      }
    },
  });
});
