import { Direction, BlockPermutation, system } from "@minecraft/server";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:tenanea_outer_leaves_generator', {
        onRandomTick({ block }) {
            return;
            const { dimension: dim, location: loc } = block;
            const sides = [
                {
                    direction: Direction.Up,
                    vector: { x: loc.x, y: loc.y - 1, z: loc.z }
                },
                {
                    direction: Direction.West,
                    vector: { x: loc.x + 1, y: loc.y, z: loc.z }
                },
                {
                    direction: Direction.North,
                    vector: { x: loc.x, y: loc.y, z: loc.z + 1 }
                },
                {
                    direction: Direction.South,
                    vector: { x: loc.x, y: loc.y, z: loc.z - 1 }
                },
                {
                    direction: Direction.Down,
                    vector: { x: loc.x, y: loc.y + 1, z: loc.z }
                },
                {
                    direction: Direction.East,
                    vector: { x: loc.x - 1, y: loc.y, z: loc.z }
                }
            ];
            for (let i = 0; i < sides.length; i++) {
                const sideBlock = dim.getBlock(sides[i].vector);
                if (sideBlock?.isAir || !sideBlock) {
                    const perm = BlockPermutation.resolve('betterend:tenanea_outer_leaves', {
                        "minecraft:facing_direction": sides[i].direction.toLocaleLowerCase()
                    });
                    dim.setBlockPermutation(sides[i].vector, perm);
                }
            }
        }
    });
});
