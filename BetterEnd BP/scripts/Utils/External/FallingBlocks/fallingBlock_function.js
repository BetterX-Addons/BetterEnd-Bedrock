import { system, BlockPermutation } from '@minecraft/server';
import { fallingBlocks } from './fallingBlocksList.js';
/*
 * There is no need to change anything here
 * the changes are only in the >>> fallingBlocksList.js <<< file
*/
export function checkBlocksToFall(block, fallingBlock, fallingEntity) {
    if (!block.hasTag("isFallingBlock") || !blockList.includes(block.below().typeId))
        return;
    if (block.typeId === `${fallingBlock}`) {
        if (block.above().hasTag("isFallingBlock")) {
            fallingBlocks.forEach((fallingBlockAbove) => {
                forceBlocksToFall(block.above(), `${fallingBlockAbove.identifier}`, `${fallingBlockAbove.entity}`);
            });
        }
        fallingBlocks.forEach((fBlock) => {
            if (fBlock.identifier !== `${fallingBlock}`)
                return;
            if (fBlock.type !== "layers") {
                block.setPermutation(BlockPermutation.resolve("minecraft:air"));
                block.dimension.spawnEntity(`${fallingEntity}`, { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
            }
            else {
                const layerState = block.permutation.getState(`${fBlock.layerState}`);
                block.setPermutation(BlockPermutation.resolve("minecraft:air"));
                block.dimension.spawnEntity(`${fallingEntity}`, { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 }).setProperty(`${fBlock.layerProperty}`, layerState);
            }
        });
    }
}
export function checkBlocksAroundToFall(block, fallingBlock, fallingEntity) {
    checkBlocksToFall(block.above(), `${fallingBlock}`, `${fallingEntity}`);
    checkBlocksToFall(block.north(), `${fallingBlock}`, `${fallingEntity}`);
    checkBlocksToFall(block.south(), `${fallingBlock}`, `${fallingEntity}`);
    checkBlocksToFall(block.east(), `${fallingBlock}`, `${fallingEntity}`);
    checkBlocksToFall(block.west(), `${fallingBlock}`, `${fallingEntity}`);
}
export function forceBlocksToFall(block, fallingBlock, fallingEntity) {
    system.runTimeout(() => {
        if (block.typeId !== `${fallingBlock}`)
            return;
        if (block.above().hasTag("isFallingBlock")) {
            for (const fallingBlockAbove of fallingBlocks)
                forceBlocksToFall(block.above(), `${fallingBlockAbove.identifier}`, `${fallingBlockAbove.entity}`);
        }
        fallingBlocks.forEach((fBlock) => {
            if (fBlock.identifier !== `${fallingBlock}`)
                return;
            if (fBlock.type !== "layers") {
                block.setPermutation(BlockPermutation.resolve("minecraft:air"));
                block.dimension.spawnEntity(`${fallingEntity}`, { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
            }
            else {
                const layerState = block.permutation.getState(`${fBlock.layerState}`);
                block.setPermutation(BlockPermutation.resolve("minecraft:air"));
                block.dimension.spawnEntity(`${fallingEntity}`, { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 }).setProperty(`${fBlock.layerProperty}`, layerState);
            }
        });
    }, 5);
}
export function dropFallingEntity(entity, item) {
    fallingBlocks.forEach((fallingBlock) => {
        if (entity.typeId !== `${fallingBlock.entity}`)
            return;
        if (item !== undefined) {
            entity.dimension.spawnItem(item, { x: entity.location.x, y: entity.location.y + 0.5, z: entity.location.z });
        }
        if (fallingBlock.particle !== undefined && fallingBlock.particle !== "none") {
            entity.dimension.spawnParticle(`${fallingBlock.particle}`, { x: entity.location.x, y: entity.location.y + 0.5, z: entity.location.z });
        }
        if (fallingBlock.sound !== "none" && fallingBlock.sound !== undefined) {
            const name = fallingBlock.sound.name === undefined ? `${fallingBlock.sound}` : `${fallingBlock.sound.name}`;
            const volume = fallingBlock.sound.volume === undefined ? 100 : `${fallingBlock.sound.volume}`;
            const pitch = fallingBlock.sound.pitch === undefined ? 1 : `${fallingBlock.sound.pitch}`;
            entity.runCommand(`playsound ${name} @a ~~~ ${volume} ${pitch}`);
        }
        entity.remove();
    });
}
export const blockList = [
    "minecraft:air",
    "minecraft:water",
    "minecraft:flowing_water",
    "minecraft:lava",
    "minecraft:flowing_lava",
    "minecraft:fire",
    "minecraft:vine",
    "minecraft:glow_lichen",
    "minecraft:deadbush",
    "minecraft:short_grass",
    "minecraft:tall_grass",
    "minecraft:large_fern",
    "minecraft:fern",
    "minecraft:kelp",
    "minecraft:seagrass",
    "minecraft:warped_roots",
    "minecraft:crimson_roots",
    "minecraft:nether_sprouts"
];
