import { world, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent('betterend:can_sit', {
        onPlayerInteract({ block, player }) {
            if (!player) return;
            const sit = "betterend:sit_entity";
            const { dimension, location, typeId } = block;
            const loc = location;
            const position = typeId.includes('bar_stool')
                ?   { x: loc.x + 0.5, y: loc.y + 0.8, z: loc.z + 0.5 }
                :   { x: loc.x + 0.5, y: loc.y + 0.5, z: loc.z + 0.5 };
            const sitEntity = dimension.spawnEntity(sit, position);
            const rideable = sitEntity.getComponent('rideable');
            rideable.addRider(player);
        }
    });
});
