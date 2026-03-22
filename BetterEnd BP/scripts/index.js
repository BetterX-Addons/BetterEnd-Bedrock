import { world, system, Player } from "@minecraft/server";
// Biomes
import "./Biomes/biomeRegister";
// Utils
import { durability } from "Utils/External/durability";
import "./Utils/External/ExternalUtils";
import "./Utils/External/main";
import "./Tools/tools";
import PlayerUtils from "Utils/PlayerUtils";
import MobUtils from "Utils/MobUtils";
import "./Utils/BlockUtils";
import "./Utils/RespawnObelisk";
world.afterEvents.playerBreakBlock.subscribe(({ player, itemStackAfterBreak }) => durability(player, itemStackAfterBreak));
world.afterEvents.itemUse.subscribe(({ source, itemStack }) => durability(source, itemStack));
// index
system.runInterval(() => {
    const dimensions = ["minecraft:nether", "minecraft:overworld", "minecraft:the_end"];
    for (const dimension of dimensions) {
        const dim = world.getDimension(dimension);
        for (const entity of dim.getEntities()) {
            if (entity instanceof Player) {
                // Player Utils
                const playerUtils = new PlayerUtils(entity);
                playerUtils.climb();
                playerUtils.joinSky();
                playerUtils.fallVelocity();
                playerUtils.ambientStuff();
                playerUtils.armor();
                // playerUtils.waila();
                // playerUtils.wailaArmor();
            }
            else {
                // Entity Utils
                const mobUtils = new MobUtils(entity);
                mobUtils.slimeSkin();
                mobUtils.portal();
            }
        }
    }
});
// Sky
world.afterEvents.playerDimensionChange.subscribe(e => {
    const { player, toDimension } = e;
    if (toDimension.id === 'minecraft:the_end') {
        new PlayerUtils(player).sky();
    }
    if (toDimension.id === 'minecraft:overworld') {
        player.runCommand('fog @s remove end_fog');
        player.runCommand('stopsound @s');
    }
});
world.afterEvents.playerJoin.subscribe(e => {
    const { playerId } = e;
    const player = world.getEntity(playerId);
    if (player.dimension.id === 'minecraft:the_end') {
        player.setDynamicProperty('betterend:in_the_end', true);
    }
});
world.afterEvents.entityDie.subscribe(e => {
    const { deadEntity: player } = e;
    player.setDynamicProperty('betterend:die', true);
});
world.afterEvents.playerSpawn.subscribe(e => {
    const die = e.player.getDynamicProperty('betterend:die');
    const spawnpoint = e.player.getDynamicProperty('betterend:respawn');
    if (die) {
        e.player.setDynamicProperty('betterend:die', false);
        e.player.teleport(spawnpoint, { dimension: world.getDimension('the_end') });
        e.player.setDynamicProperty('betterend:respawn', undefined);
    }
});
system.afterEvents.scriptEventReceive.subscribe(e => {
    const { message, sourceEntity: player } = e;
    if (player) {
        console.warn(message);
        eval(message);
    }
});
