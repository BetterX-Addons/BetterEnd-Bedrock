import { world, Block, Player, ItemStack, Vector3, system } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const structures: string[] = [ 
    "hydralux_flower1", 
    "hydralux_flower2",
    "hydralux_flower3",
    "hydralux_flower4",
    "hydralux_flower5",
    "hydralux_flower6",
    "hydralux_flower7",
    "hydralux_flower8"
];

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:hydralux_sapling', {
        onPlayerInteract({ block, player }) {
            const offset: Vector3 = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            }
            new PlantUtils(block, player).boneMealGrowth(3, true, structures, offset, false);
        },
        onRandomTick({ block }) {
            const offset: Vector3 = {
                x: block.location.x,
                y: block.location.y,
                z: block.location.z
            }
            new PlantUtils(block).randomTickinigGrowth(3, true, structures, offset, false);
        },
    });
});