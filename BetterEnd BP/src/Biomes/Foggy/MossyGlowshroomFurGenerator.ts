import { world, Block, Player, ItemStack, Direction, Vector3, BlockPermutation, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:mossy_glowshroom_fur_generator', {
        onRandomTick({ block }) {
            return;
            const { dimension: dim, location: loc } = block;
            const sides: { direction: string, vector: Vector3 }[] = [
                {
                    direction: Direction.Down,
                    vector: { x: loc.x, y: loc.y - 1, z: loc.z }
                },
                {
                    direction: Direction.East,
                    vector: { x: loc.x + 1, y: loc.y, z: loc.z }
                },
                {
                    direction: Direction.South,
                    vector: { x: loc.x, y: loc.y, z: loc.z + 1 } 
                },
                {
                    direction: Direction.North,
                    vector: { x: loc.x, y: loc.y, z: loc.z - 1 } 
                },
                {
                    direction: Direction.Up,
                    vector: { x: loc.x, y: loc.y + 1, z: loc.z }
                },
                {
                    direction: Direction.West,
                    vector: { x: loc.x - 1, y: loc.y, z: loc.z }
                }
            ];
            for (let i = 0; i < sides.length; i++) {
                const sideBlock = dim.getBlock(sides[i].vector);
                if (sideBlock?.isAir || !sideBlock) {
                    const perm = BlockPermutation.resolve('betterend:mossy_glowshroom_fur', {
                        "minecraft:facing_direction": sides[i].direction.toLocaleLowerCase()
                    });
                    dim.setBlockPermutation(sides[i].vector, perm);
                }
            }
        }
    });
});