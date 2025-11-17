import { world } from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe((data) => {
    data.blockComponentRegistry.registerCustomComponent("betterend:stalactite", {
        onTick({ block }) {
            const dim = block.dimension;
            const loc = block.location;
            const orientation = getOrientation(block); // "up" o "down"
            const step = orientation === "down" ? 1 : -1;
            // 1) Detectar distancia hasta la punta
            let dist = 0;
            let scan = { x: loc.x, y: loc.y - step, z: loc.z };
            while (true) {
                const b = dim.getBlock(scan);
                if (!b || b.typeId !== block.typeId)
                    break;
                dist++;
                scan = { x: scan.x, y: scan.y - step, z: scan.z };
            }
            // 2) Calcular size según distancia
            let newSize = Math.min(dist, 6);
            // 3) Verificar si es raíz (arriba no hay otro del mismo tipo)
            const parentPos = { x: loc.x, y: loc.y + step, z: loc.z };
            const parent = dim.getBlock(parentPos);
            if (!parent || parent.typeId !== block.typeId) {
                newSize = 7; // raíz
            }
            // 4) Aplicar si cambió
            const current = Number(block.permutation.getState("betterend:size"));
            if (current !== newSize) {
                block.setPermutation(block.permutation.withState("betterend:size", newSize));
            }
        },
    });
});
function getOrientation(block) {
    return block.permutation.getState("minecraft:block_face");
}
