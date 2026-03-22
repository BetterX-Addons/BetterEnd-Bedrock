import { system } from "@minecraft/server";
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('betterend:stair_placement', {
        onPlace: e => {
            const { block } = e;
            const northBlock = block.north();
            const southBlock = block.south();
            const eastBlock = block.east();
            const westBlock = block.west();
            const vertical_half = block.permutation.getState('minecraft:vertical_half');
            const shape = block.permutation.getState('template:shape');
            const cardinal_direction = block.permutation.getState('minecraft:cardinal_direction');
            if (vertical_half == 'bottom') {
                block.setPermutation(block.permutation.withState('template:placed_bit', true));
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'inner_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'inner_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_north') && shape == 'inner_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_south') && shape == 'inner_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_north') && shape == 'outer_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_south') && shape == 'outer_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'outer_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'outer_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
            }
            if (vertical_half == 'top') {
                block.setPermutation(block.permutation.withState('template:placed_bit', true));
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'inner_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'inner_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_north') && shape == 'inner_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_south') && shape == 'inner_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_north') && shape == 'outer_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_south') && shape == 'outer_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'outer_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'outer_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
            }
        },
        onTick: e => {
            const { block } = e;
            const northBlock = e.block.north();
            const southBlock = e.block.south();
            const eastBlock = e.block.east();
            const westBlock = e.block.west();
            const vertical_half = block.permutation.getState('minecraft:vertical_half');
            const shape = block.permutation.getState('template:shape');
            const cardinal_direction = block.permutation.getState('minecraft:cardinal_direction');
            if (vertical_half == 'bottom') {
                block.setPermutation(block.permutation.withState('template:placed_bit', true));
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'inner_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'inner_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_north') && shape == 'inner_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_south') && shape == 'inner_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_up') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_up') && !northBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_up') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_up') && !southBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_north') && shape == 'outer_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_up') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_up') && !westBlock?.hasTag('custom_stairs_south') && shape == 'outer_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'outer_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_up') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_up') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'outer_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
            }
            if (vertical_half == 'top') {
                block.setPermutation(block.permutation.withState('template:placed_bit', true));
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_west') && shape == 'inner_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_east') && shape == 'inner_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'inner_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'inner_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_north') && shape == 'inner_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'inner_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_south') && shape == 'inner_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (northBlock?.hasTag('custom_stairs_down') && northBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!northBlock?.hasTag('custom_stairs_down') && !northBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'north') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_west') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_west') && shape == 'outer_right' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (southBlock?.hasTag('custom_stairs_down') && southBlock?.hasTag('custom_stairs_east') && shape == 'straight' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!southBlock?.hasTag('custom_stairs_down') && !southBlock?.hasTag('custom_stairs_east') && shape == 'outer_left' && cardinal_direction == 'south') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_north') && shape == 'outer_right' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (westBlock?.hasTag('custom_stairs_down') && westBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!westBlock?.hasTag('custom_stairs_down') && !westBlock?.hasTag('custom_stairs_south') && shape == 'outer_left' && cardinal_direction == 'west') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_south') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_right'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_south') && shape == 'outer_right' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
                if (eastBlock?.hasTag('custom_stairs_down') && eastBlock?.hasTag('custom_stairs_north') && shape == 'straight' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'outer_left'));
                }
                if (!eastBlock?.hasTag('custom_stairs_down') && !eastBlock?.hasTag('custom_stairs_north') && shape == 'outer_left' && cardinal_direction == 'east') {
                    block.setPermutation(block.permutation.withState('template:shape', 'straight'));
                }
            }
            const { dimension, location } = block;
            const loc = location;
            const entities = dimension.getEntities({ location, maxDistance: 4, excludeTypes: ["minecraft:item", "betterend:stairs_collision"] });
            if (entities.length <= 0)
                return;
            dimension.spawnEntity('betterend:stairs_collision', { x: loc.x + 0.5, y: loc.y + 0.5, z: loc.z + 0.5 });
        }
    });
});
