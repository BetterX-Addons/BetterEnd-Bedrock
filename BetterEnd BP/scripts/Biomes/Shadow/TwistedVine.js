import { world, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = ["bulb_vine"];
;
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:twisted_vine', {
        onPlayerBreak({ block, player }) {
            const plantUtils = new PlantUtils(block, player);
            plantUtils.onBreak('betterend:twisted_vine');
        },
        onTick({ block }) {
            const bulbVine = new BulbVine(block);
            if (block.hasTag('extends'))
                bulbVine.extends();
            else
                bulbVine.setTexture();
        }
    });
});
class BulbVine {
    constructor(block) {
        this.block = block;
        this.roots = block.isAir ? null : block.permutation.withState('betterend:growth', 0);
        this.middle = block.isAir ? null : block.permutation.withState('betterend:growth', 1);
        this.bottom = block.isAir ? null : block.permutation.withState('betterend:growth', 2);
    }
    extends() {
        const { dimension, location, typeId } = this.block;
        this.block.setType('betterend:twisted_vine');
        for (let i = 1; i < 100; i++) {
            const loc = {
                x: location.x,
                y: location.y - i,
                z: location.z
            };
            const block = dimension.getBlock(loc);
            const next = Math.random() < 0.8;
            if (!block.isAir) {
                break;
            }
            if (next) {
                dimension.setBlockType(loc, typeId);
            }
            else {
                dimension.setBlockType(loc, typeId);
                const vineBottom = dimension.getBlock(loc);
                vineBottom?.setPermutation(this.bottom);
                break;
            }
        }
    }
    setTexture() {
        const block = this.block;
        const { dimension, location } = block;
        const up = { x: location.x, y: location.y + 1, z: location.z };
        const down = { x: location.x, y: location.y - 1, z: location.z };
        const vineUp = dimension.getBlock(up);
        const vineDown = dimension.getBlock(down);
        const vineUpState = vineUp?.typeId === block.typeId ? vineUp.permutation.getState('betterend:growth') : null;
        const vineDownState = vineDown?.typeId === block.typeId ? vineDown.permutation.getState('betterend:growth') : null;
        if (block.isAir)
            return;
        if (vineUp?.typeId === "betterend:dragon_tree_leaves") {
            block.isAir ? null : block.setPermutation(this.roots);
        }
        else if (vineDown?.typeId !== block.typeId) {
            block.isAir ? null : block.setPermutation(this.bottom);
        }
        else if (vineUpState === 0 && vineDownState === 0) {
            block.isAir ? null : block.setPermutation(this.middle);
        }
        else if (vineUpState === 1 && vineDownState === 0) {
            block.isAir ? null : block.setPermutation(this.bottom);
        }
        else if (vineUpState === 2 && vineDownState === 0) {
            block.isAir ? null : block.setPermutation(this.roots);
        }
        else {
            block.isAir ? null : block.setPermutation(this.middle);
        }
    }
}
