import { world, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:umbrella_tree_membrane', {
        onStepOn({ block, entity }) {
            const velocity = entity?.getDynamicProperty('betterend:fall_velocity') as number;
            const bound = Math.abs(velocity ? velocity : 0) * 1.1;
            entity?.applyKnockback(0, 0, 0, bound < 0.3 ? 0 : bound);
        },
        onRandomTick({ block }) {
            if (Math.random() > 0.5) return;
            const blockBelow = block?.below();
            const blockNorth = block?.north();
            const blockSouth = block?.south();
            const blockWest = block?.west();
            const blockEast = block?.east();

            if (
                blockBelow?.typeId === 'betterend:jungle_vine' ||
                blockNorth?.typeId === 'betterend:jungle_vine' ||
                blockSouth?.typeId === 'betterend:jungle_vine' ||
                blockWest?.typeId === 'betterend:jungle_vine' ||
                blockEast?.typeId === 'betterend:jungle_vine'
            ) {
                return;
            }

            const membraneSides = {
                up: block?.above()?.isAir,
                down: blockBelow?.isAir,
                north: blockNorth?.isAir,
                south: blockSouth?.isAir,
                west: blockWest?.isAir,
                east: blockEast?.isAir
            };

            for (const [direction, isAir] of Object.entries(membraneSides)) {
                const updateFace = block?.permutation?.withState(`betterend:${direction}`, isAir ? isAir : false);
                block?.setPermutation(updateFace);
            }
        }
    });
});