import { world } from "@minecraft/server";
export default class MobUtils {
    constructor(entity) {
        this.entity = entity;
        this.dimension = entity?.dimension;
        this.location = entity?.location;
        this.typeId = entity?.typeId;
    }
    slimeSkin() {
        if (this?.typeId === "minecraft:slime") {
            const slimeSkins = {
                "betterend:amber_moss": "slime_amber",
                "betterend:chorus_nylium": "slime_chorus",
                "betterend:end_moss_lakes": "slime_megalake",
                "betterend:end_moss": "slime_foggy",
            };
            const floor = this?.dimension.getBlock({ x: this.location.x, y: this.location.y - 1, z: this.location.z })?.typeId;
            const moss = Object.keys(slimeSkins).find((key) => key === floor);
            if (!moss)
                return;
            if (!this?.entity.hasTag("betterend:skin")) {
                this?.entity.addTag("betterend:skin");
                this?.entity.triggerEvent(slimeSkins[moss]);
            }
        }
    }
    portal() {
        if (this?.typeId === "betterend:portal") {
            const eternal_crystals = this.dimension.getEntities({
                location: this.location, maxDistance: 7, type: "betterend:eternal_crystal_entity"
            });
            const haveCrystals = eternal_crystals.length === 6;
            const put = this.entity.hasTag('betterend:put');
            const { x, y, z } = this.location;
            if (haveCrystals && !put) {
                this.entity.addTag('betterend:put');
                this.dimension.playSound('beacon.activate', this.location);
                world.structureManager.place('portal/portal_on', this.dimension, { x, y: y - 1, z: z - 3 });
            }
            else {
                if (!haveCrystals && put) {
                    this.entity.removeTag('betterend:put');
                    this.dimension.playSound('beacon.deactivate', this.location);
                    world.structureManager.place('portal/portal_off', this.dimension, { x, y: y - 1, z: z - 3 });
                }
            }
        }
    }
}
