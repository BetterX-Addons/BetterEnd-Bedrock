import { world, Block, Player, ItemStack, Vector3, BlockPermutation, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:tenanea_flowers_purple_and_blue', {
        onPlayerBreak({ block, player }) {
            const plantUtils = new PlantUtils(block, player);
            plantUtils.onBreak('betterend:tenanea_flowers_purple_and_blue');
        },
        onTick({ block }) {
            const tenaneaFlowers = new TenaneaFlowers(block);
            tenaneaFlowers.setTexture();
        }
    });
});

class TenaneaFlowers {
    private block: Block;
    private middle: BlockPermutation;
    private top: BlockPermutation;
    constructor(block: Block) {
        this.block = block;
        this.middle = block.isAir ? null : block.permutation.withState('betterend:top', false);
        this.top = block.isAir ? null : block.permutation.withState('betterend:top', true);
    }

    setTexture() {
        const block = this.block;
        const { dimension, location } = block;
        const down = { x: location.x, y: location.y - 1, z: location.z };
        const blockDown = dimension.getBlock(down);
        if (blockDown.isAir) this.top ? block.setPermutation(this?.top) : null;
        else this.middle ? block.setPermutation(this?.middle) : null;
    }
    
}