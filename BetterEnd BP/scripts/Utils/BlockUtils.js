import { system } from "@minecraft/server";
class BlockUtils {
    constructor(block) {
        this.block = block;
        this.loc = block.location;
        this.dim = block.dimension;
    }
    particleEmitter() {
        if (this.dim.id !== 'minecraft:the_end')
            return;
        const closePlayers = this.dim.getPlayers({ maxDistance: 15, location: this.loc });
        if (closePlayers.length === 0)
            return;
        const tags = this.block.getTags();
        const Yoffset = parseInt(tags.find(e => e.startsWith('offset')).split(':')[1]);
        const particle = tags.find(e => e.startsWith('particle')).replace('particle:', '');
        const offset = { x: this.loc.x, y: this.loc.y + Yoffset, z: this.loc.z };
        if (particle.includes('desertic')) {
            const canSpawn = Math.random() < 0.1;
            canSpawn ? this.dim.spawnParticle(particle, offset) : null;
        }
        else {
            this.dim.spawnParticle(particle, offset);
        }
    }
}
system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('betterend:particle_emitter', {
        onRandomTick({ block }) {
            new BlockUtils(block).particleEmitter();
        }
    });
});
