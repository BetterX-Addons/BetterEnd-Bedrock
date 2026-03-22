import { world, system, GameMode } from "@minecraft/server";
system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('betterend:portal', {
        onTick(e) {
            const { block, dimension } = e;
            const location = block.location;
            let seconds = 0;
            let interval = system.runInterval(() => {
                const player = dimension.getPlayers({ location, maxDistance: 0.9 })[0];
                if (!player) {
                    system.clearRun(interval);
                    seconds = 0;
                    return;
                }
                player.addEffect('nausea', 80, { amplifier: 0, showParticles: false });
                seconds++;
                if (seconds === 5) {
                    const theEnd = world.getDimension('minecraft:the_end');
                    const overworld = world.getDimension('minecraft:overworld');
                    if (dimension.id === 'minecraft:overworld') {
                        const { x, y, z } = player.location;
                        const topBlock = theEnd.getTopmostBlock({ x, z }).y + 1;
                        player.teleport({ x, y: topBlock, z }, { dimension: theEnd });
                    }
                    else {
                        const portalLocation = dimension.getEntities({
                            type: 'betterend:portal', location: player.location,
                            maxDistance: 3
                        })[0]?.location;
                        const { x, y, z } = portalLocation;
                        player.sendMessage('<betterend_loading>');
                        player.teleport({ x, y: 200, z: z - 2 }, { dimension: overworld });
                        const lastGameMode = player.getGameMode();
                        player.setGameMode(GameMode.Spectator);
                        system.runTimeout(() => {
                            const topBlock = overworld.getTopmostBlock({ x, z }).y + 1;
                            world.structureManager.place('portal/eternal_portal_overworld', overworld, {
                                x: x + 4, y: topBlock - 1, z: z - 4
                            });
                            player.setGameMode(lastGameMode);
                            player.teleport({ x: x + 4, y: topBlock - 1, z: z - 4 });
                        }, 200);
                    }
                    system.clearRun(interval);
                }
            }, 20);
        }
    });
});
