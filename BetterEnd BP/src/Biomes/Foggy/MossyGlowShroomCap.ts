import { world, Block, Player, ItemStack, Vector3, BlockPermutation, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:mossy_glowshroom_cap', {
        onPlayerBreak({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:mossy_glowshroom_cap');
        },
        onRandomTick({ block }) {
            new MossyGlowShroomCap(block).updateTexture();
        }
    });
});

class MossyGlowShroomCap {
    private block: Block;
    private withWood: BlockPermutation;
    private withoutWood: BlockPermutation;
    constructor(block: Block) {
        this.block = block;
        this.withWood = block.permutation.withState('betterend:cap', true);
        this.withoutWood = block.permutation.withState('betterend:cap', false);
    }

    updateTexture() {
        const block = this.block;
        const wood = block.below();
        if (wood?.typeId === 'betterend:mossy_glowshroom_wood' || wood?.typeId === 'betterend:mossy_glowshroom_log') {
            block.setPermutation(this.withWood);
        }
        else {
            block.setPermutation(this.withoutWood);
        }
    }
}