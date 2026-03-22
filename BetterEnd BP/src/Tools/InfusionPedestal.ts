import { Block, world, BlockComponentTickEvent, Vector3, system } from "@minecraft/server";

const pedestals: Vector3[] = [
    { x: 0, y: 0, z: 3 },
    { x: -2, y: 0, z: 2 },
    { x: 2, y: 0, z: 2 },
    { x: -3, y: 0, z: 0 },
    { x: 3, y: 0, z: 0 },
    { x: 2, y: 0, z: -2 },
    { x: -2, y: 0, z: -2 },
    { x: 0, y: 0, z: -3 },
]

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('betterend:infusion_pedestal', {
        onTick(e: BlockComponentTickEvent) {
            const block = e.block;
            const { x, y, z } = e.block.location;
            const allPedestals = [];
            for (const pedestal of pedestals) {
                const pedestalLoc = { x: pedestal.x + x, y: pedestal.y + y, z: pedestal.z + z };
                const pedestalBlock = block.dimension.getBlock(pedestalLoc);
                if (pedestalBlock.hasTag('betterend:pedestal')) allPedestals.push(true);
                else allPedestals.push(false);
            }
            if (allPedestals.every(e => e === true)) {
                const craft = block.permutation.withState('betterend:craft', true);
                block.setPermutation(craft);
            }
            else {
                const noCraft = block.permutation.withState('betterend:craft', false);
                block.setPermutation(noCraft);
            }
        }
    });
});