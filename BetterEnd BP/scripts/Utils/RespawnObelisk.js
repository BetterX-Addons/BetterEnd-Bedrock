import { world, ItemStack, system, EquipmentSlot } from "@minecraft/server";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:respawn_obelisk', {
        onPlayerBreak({ block }) {
            const { x, y, z } = block.location;
            block.dimension.setBlockType({ x, y: y + 1, z }, 'air');
            block.dimension.setBlockType({ x, y: y + 2, z }, 'air');
        },
        beforeOnPlayerPlace(e) {
            const { block } = e;
            const { x, y, z } = block.location;
            const getTopBlock = block.dimension.getBlock({ x, y: y + 2, z });
            e.cancel = true;
            if (!getTopBlock?.isAir)
                return;
            system.run(() => {
                world.structureManager.place('respawn_obelisk', block.dimension, block.location);
            });
        },
        onPlayerInteract({ player }) {
            if (player.dimension.id !== 'minecraft:the_end')
                return;
            const spawn = player.getDynamicProperty('betterend:respawn');
            if (spawn)
                return;
            const equipment = player.getComponent('equippable');
            const item = equipment.getEquipment(EquipmentSlot.Mainhand);
            if (item?.typeId === 'betterend:amber_gem') {
                player.setDynamicProperty('betterend:respawn', player.location);
                player.onScreenDisplay.setActionBar('§6Spawnpoint!');
                const itemUpdate = new ItemStack(item?.typeId, item?.amount - 1);
                equipment.setEquipment(EquipmentSlot.Mainhand, itemUpdate);
            }
        }
    });
});
