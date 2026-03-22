import { Block, world, BlockComponentPlayerInteractEvent, Vector3, EquipmentSlot, ItemStack, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('betterend:eternal_pedestal', {
        onPlayerInteract(e: BlockComponentPlayerInteractEvent) {
            const { player, dimension, block } = e;
            const { x, y, z } = block.location;
            const equipment = player.getComponent('equippable');
            const item = equipment.getEquipment(EquipmentSlot.Mainhand);
            const fixedLoc = { x: x + 0.5, y: y + 1.5, z: z + 0.5 };
            if (block.typeId === 'betterend:eternal_pedestal_off') {
                if (item?.typeId === 'betterend:eternal_crystal') {
                    dimension.setBlockType({ x, y, z }, 'betterend:eternal_pedestal_on');
                    dimension.spawnEntity('betterend:eternal_crystal_entity', fixedLoc);
                    const amount = item.amount > 1 ? item.amount - 1 : 1;
                    equipment.setEquipment(EquipmentSlot.Mainhand, 
                        new ItemStack(item.amount > 1 ? 'betterend:eternal_crystal' : 'air', amount)
                    );
                }
            }
            else {
                dimension.getEntities({
                    type: "betterend:eternal_crystal_entity", location: fixedLoc, maxDistance: 0.5
                })[0]?.remove();
                dimension.setBlockType({ x, y, z }, 'betterend:eternal_pedestal_off');
                dimension.spawnItem(new ItemStack('betterend:eternal_crystal'), fixedLoc);
            }
        }
    });
});