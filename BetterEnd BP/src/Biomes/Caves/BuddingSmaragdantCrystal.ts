import { world, Block, Player, ItemStack, Direction, BlockPermutation, Vector3, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:budding_smaragdant_crystal', {
        onTick({ block }) {
            const { location: loc, dimension: dim } = block;
            // Ticks [ 20000, 40000 ] [16 min a 33 min]
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
            const randomSide = sides[Math.floor(Math.random() * sides.length)];
            const sideBlock = dim.getBlock(randomSide.vector);
            if (!sideBlock.isAir) return;
            const perm = BlockPermutation.resolve(block.typeId.replace('budding_', '') + '_shard', {
                "minecraft:facing_direction": randomSide.direction.toLocaleLowerCase()
            });
            dim.setBlockPermutation(randomSide.vector, perm);
        }
    });
});