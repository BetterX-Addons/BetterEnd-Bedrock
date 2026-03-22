import { world, system, BlockPermutation, ItemStack } from "@minecraft/server";
import { fallingBlocks } from "./fallingBlocksList.js";
import {
  checkBlocksToFall,
  forceBlocksToFall,
  checkBlocksAroundToFall,
  dropFallingEntity,
  blockList,
} from "./fallingBlock_function.js";
/*
 * There is no need to change anything here
 * the changes are only in the >>> fallingBlocksList.js <<< file
 */
system.beforeEvents.startup.subscribe((initEvent) => {
  initEvent.blockComponentRegistry.registerCustomComponent(
    "falling_block:custom_component",
    {
      beforeOnPlayerPlace: (e) => {
        const { block } = e;
        if (block.typeId === "minecraft:water") {
          system.run(() => {
            fallingBlocks.forEach((fallingBlock) => {
              if (block.typeId !== `${fallingBlock.identifier}`) return;
              if (fallingBlock.type == "concrete_powder") {
                if (fallingBlock.inWaterBlock !== undefined) {
                  block.setPermutation(
                    BlockPermutation.resolve(`${fallingBlock.inWaterBlock}`)
                  );
                } else {
                  checkBlocksToFall(
                    block,
                    `${fallingBlock.identifier}`,
                    `${fallingBlock.entity}`
                  );
                }
                return;
              }
            });
          });
        }
        system.run(() => {
          fallingBlocks.forEach((fallingBlock) => {
            if (block.typeId !== `${fallingBlock.identifier}`) return;
            if (
              fallingBlock.type == "layers" &&
              block.below().typeId === block.typeId
            ) {
              const layerState = block
                .below()
                .permutation.getState(`${fallingBlock.layerState}`) as number;
              if (layerState + 1 < fallingBlock.maxLayers) {
                forceBlocksToFall(
                  block,
                  `${fallingBlock.identifier}`,
                  `${fallingBlock.entity}`
                );
              }
            } else {
              checkBlocksToFall(
                block,
                `${fallingBlock.identifier}`,
                `${fallingBlock.entity}`
              );
            }
          });
        });
      },
    }
  );
});

world.afterEvents.playerBreakBlock.subscribe(({ player, block }) => {
  if (block.above().hasTag("isFallingBlock")) {
    for (const fallingBlock of fallingBlocks) {
      checkBlocksToFall(
        block.above(),
        `${fallingBlock.identifier}`,
        `${fallingBlock.entity}`
      );
    }
  } else if (block.above(2).hasTag("isFallingBlock")) {
    for (const fallingBlock of fallingBlocks) {
      checkBlocksToFall(
        block.above(2),
        `${fallingBlock.identifier}`,
        `${fallingBlock.entity}`
      );
    }
  }
});

world.afterEvents.explosion.subscribe((data) => {
  data.getImpactedBlocks().forEach((block) => {
    fallingBlocks.forEach((fallingBlock) => {
      system.run(() => {
        checkBlocksAroundToFall(
          block,
          `${fallingBlock.identifier}`,
          `${fallingBlock.entity}`
        );
      });
    });
  });
});

world.afterEvents.pistonActivate.subscribe(({ piston, block }) => {
  const locations = piston.getAttachedBlocksLocations();
  for (const loc of locations) {
    const aBlock = block.dimension.getBlock({ x: loc.x, y: loc.y, z: loc.z });
    system.runTimeout(() => {
      fallingBlocks.forEach((fallingBlock) => {
        checkBlocksAroundToFall(
          aBlock,
          `${fallingBlock.identifier}`,
          `${fallingBlock.entity}`
        );
      });
    }, 7);
  }
  const facingDirection = piston.block.permutation.getState("facing_direction");
  system.runTimeout(() => {
    if (facingDirection == 1) {
      const fBlock = piston.block.dimension.getBlock(
        piston.block.offset({ x: 0, y: 1, z: 0 })
      );
      fallingBlocks.forEach((fallingBlock) => {
        checkBlocksAroundToFall(
          fBlock,
          `${fallingBlock.identifier}`,
          `${fallingBlock.entity}`
        );
      });
    }
  }, 7);
});

system.afterEvents.scriptEventReceive.subscribe(
  ({ id, message, sourceEntity: entity }) => {
    if (id === "id:turnIntoBlock") {
      if (!entity.isValid()) return;
      const block = entity.dimension.getBlock(entity.location);
      fallingBlocks.forEach((fallingBlock) => {
        if (entity.typeId !== `${fallingBlock.entity}`) return;
        let item = undefined;
        if (
          fallingBlock.item !== undefined &&
          `${fallingBlock.item}` !== "minecraft:air"
        ) {
          item = new ItemStack(`${fallingBlock.item}`);
        }
        if (fallingBlock.type == "concrete_powder") {
          if (entity.isInWater) {
            if (blockList.includes(block?.typeId)) {
              block.setPermutation(
                BlockPermutation.resolve(`${fallingBlock.inWaterBlock}`)
              );
              entity.remove();
            } else {
              dropFallingEntity(entity, item);
            }
          } else {
            if (blockList.includes(block?.typeId)) {
              block.setPermutation(
                BlockPermutation.resolve(`${fallingBlock.identifier}`)
              );
              entity.remove();
            } else {
              dropFallingEntity(entity, item);
            }
          }
        } // concrete_powder
        else if (fallingBlock.type == "layers") {
          const layerProperty =
            1 + entity.getProperty(`${fallingBlock.layerProperty}`);
          const layerState =
            1 + block.permutation.getState(`${fallingBlock.layerState}`);
          const sum = layerState + layerProperty;
          let remaining =
            sum - 1 <= fallingBlock.maxLayers
              ? 0
              : sum - fallingBlock.maxLayers;
          remaining = remaining < 0 ? remaining * -1 : remaining;
          if (
            (block.typeId !== `${fallingBlock.identifier}` &&
              blockList.includes(block?.typeId)) ||
            block.hasTag("minecraft:crop")
          ) {
            block.setPermutation(
              BlockPermutation.resolve(`${fallingBlock.identifier}`).withState(
                `${fallingBlock.layerState}`,
                layerProperty - 1
              )
            );
            entity.remove();
          } else if (block.typeId === `${fallingBlock.identifier}`) {
            if (sum - 1 < fallingBlock.maxLayers) {
              block.setPermutation(
                block.permutation.withState(
                  `${fallingBlock.layerState}`,
                  sum - 1
                )
              );
              entity.remove();
            } else {
              const aboveBlock = block.dimension.getBlock(block.above());
              block.setPermutation(
                block.permutation.withState(
                  `${fallingBlock.layerState}`,
                  fallingBlock.maxLayers - 1
                )
              );
              aboveBlock.setPermutation(
                BlockPermutation.resolve(
                  `${fallingBlock.identifier}`
                ).withState(
                  `${fallingBlock.layerState}`,
                  remaining <= 1 ? 0 : remaining - 1
                )
              );
              entity.remove();
            }
          } else {
            dropFallingEntity(entity, item);
          }
          return;
        } // layers
        else {
          if (
            blockList.includes(block?.typeId) ||
            block.hasTag("minecraft:crop")
          ) {
            block.setPermutation(
              BlockPermutation.resolve(`${fallingBlock.identifier}`)
            );
            entity.remove();
          } else {
            dropFallingEntity(entity, item);
          }
        } // default
      });
    }
  }
);
