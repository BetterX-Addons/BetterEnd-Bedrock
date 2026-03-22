import { world, system, ItemStack, BlockPermutation } from '@minecraft/server';
import { randomTickComponent, OnTickComponent, leafDrop } from "./OnTick";
import { treeInteractComponent, leafDefaultComponent } from './tree';
import { FenceInteractComponent, PlaceComponent, PlaceGateComponent, GateInteract } from './fence';
import { slabComponent } from './slabs';
import './door';
import './trapdoor';
import './chairs';
import './stairPlacement';
import "./pillar";
// Add more mappings here as needed - Note, the doors need to be set on door.js at line 237.
const isSlab = new Set([
    "betterend:dragon_tree_slab",
    "betterend:helix_tree_slab",
    "betterend:jellyshroom_slab",
    "betterend:lacugrove_slab",
    "betterend:lucernia_slab",
    "betterend:mossy_glowshroom_slab",
    "betterend:pythadendron_slab",
    "betterend:tenanea_slab",
    "betterend:umbrella_tree_slab",
    "betterend:end_lotus_slab",
    "betterend:flavolite_slab",
    "betterend:flavolite_bricks_slab",
    "betterend:azure_jadestone_slab",
    "betterend:azure_jadestone_bricks_slab",
    "betterend:sandy_jadestone_slab",
    "betterend:sandy_jadestone_bricks_slab",
    "betterend:virid_jadestone_slab",
    "betterend:virid_jadestone_bricks_slab",
    "betterend:sulphuric_rock_slab",
    "betterend:sulphuric_rock_bricks_slab",
    "betterend:umbralith_slab",
    "betterend:umbralith_bricks_slab",
    "betterend:violecite_slab",
    "betterend:violecite_bricks_slab",
]);
const fenceSet = new Set([
    "betterend:dragon_tree_fence",
    "betterend:dragon_tree_fence_gate",
    "betterend:helix_tree_fence",
    "betterend:helix_tree_fence_gate",
    "betterend:jellyshroom_fence",
    "betterend:jellyshroom_fence_gate",
    "betterend:lacugrove_fence",
    "betterend:lacugrove_fence_gate",
    "betterend:lucernia_fence",
    "betterend:lucernia_fence_gate",
    "betterend:mossy_glowshroom_fence",
    "betterend:mossy_glowshroom_fence_gate",
    "betterend:pythadendron_fence",
    "betterend:pythadendron_fence_gate",
    "betterend:tenanea_fence",
    "betterend:tenanea_fence_gate",
    "betterend:umbrella_tree_fence",
    "betterend:umbrella_tree_fence_gate",
    "betterend:end_lotus_fence",
    "betterend:end_lotus_fence_gate",
]);
export const gateSet = new Set(Array.from(fenceSet).filter(item => item.includes("_gate")));
const fenceMap = new Map([
    ["betterend:dragon_tree_fence_inventory", "betterend:dragon_tree_fence"],
    ["betterend:dragon_tree_fence_inventory_item", "betterend:dragon_tree_fence"],
    ["betterend:dragon_tree_fence", "betterend:dragon_tree_fence"],
    ["betterend:helix_tree_fence_inventory", "betterend:helix_tree_fence"],
    ["betterend:helix_tree_fence_inventory_item", "betterend:helix_tree_fence"],
    ["betterend:helix_tree_fence", "betterend:helix_tree_fence"],
    ["betterend:jellyshroom_fence_inventory", "betterend:jellyshroom_fence"],
    ["betterend:jellyshroom_fence_inventory_item", "betterend:jellyshroom_fence"],
    ["betterend:jellyshroom_fence", "betterend:jellyshroom_fence"],
    ["betterend:lacugrove_fence_inventory", "betterend:lacugrove_fence"],
    ["betterend:lacugrove_fence_inventory_item", "betterend:lacugrove_fence"],
    ["betterend:lacugrove_fence", "betterend:lacugrove_fence"],
    ["betterend:lucernia_fence_inventory", "betterend:lucernia_fence"],
    ["betterend:lucernia_fence_inventory_item", "betterend:lucernia_fence"],
    ["betterend:lucernia_fence", "betterend:lucernia_fence"],
    ["betterend:mossy_glowshroom_fence_inventory", "betterend:mossy_glowshroom_fence"],
    ["betterend:mossy_glowshroom_fence_inventory_item", "betterend:mossy_glowshroom_fence"],
    ["betterend:mossy_glowshroom_fence", "betterend:mossy_glowshroom_fence"],
    ["betterend:pythadendron_fence_inventory", "betterend:pythadendron_fence"],
    ["betterend:pythadendron_fence_inventory_item", "betterend:pythadendron_fence"],
    ["betterend:pythadendron_fence", "betterend:pythadendron_fence"],
    ["betterend:tenanea_fence_inventory", "betterend:tenanea_fence"],
    ["betterend:tenanea_fence_inventory_item", "betterend:tenanea_fence"],
    ["betterend:tenanea_fence", "betterend:tenanea_fence"],
    ["betterend:umbrella_tree_fence_inventory", "betterend:umbrella_tree_fence"],
    ["betterend:umbrella_tree_fence_inventory_item", "betterend:umbrella_tree_fence"],
    ["betterend:umbrella_tree_fence", "betterend:umbrella_tree_fence"],
    ["betterend:end_lotus_fence_inventory", "betterend:end_lotus_fence"],
    ["betterend:end_lotus_fence_inventory_item", "betterend:end_lotus_fence"],
    ["betterend:end_lotus_fence", "betterend:end_lotus_fence"],
]);
const leafSet = new Set([
    "betterend:dragon_tree_leaves",
    "betterend:helix_tree_leaves",
    "betterend:jellyshroom_leaves",
    "betterend:lacugrove_leaves",
    "betterend:lucernia_leaves",
    "betterend:mossy_glowshroom_leaves",
    "betterend:pythadendron_leaves",
    "betterend:tenanea_leaves",
    "betterend:umbrella_tree_leaves",
    "betterend:end_lotus_leaves",
]);
const leafDropMap = new Map([
    ["betterend:dragon_tree_leaves", "betterend:dragon_tree_sapling_placer"],
    ["betterend:helix_tree_leaves", "betterend:helix_tree_sapling_placer"],
    ["betterend:jellyshroom_leaves", "betterend:jellyshroom_sapling_placer"],
    ["betterend:lacugrove_leaves", "betterend:lacugrove_sapling_placer"],
    ["betterend:lucernia_leaves", "betterend:lucernia_sapling_placer"],
    ["betterend:mossy_glowshroom_leaves", "betterend:mossy_glowshroom_sapling_placer"],
    ["betterend:pythadendron_leaves", "betterend:pythadendron_sapling_placer"],
    ["betterend:tenanea_leaves", "betterend:tenanea_sapling_placer"],
    ["betterend:umbrella_tree_leaves", "betterend:umbrella_tree_sapling_placer"],
    ["betterend:end_lotus_leaves", "betterend:end_lotus_sapling_placer"],
]);
const saplingBlocks = [
    { blockID: "betterend:dragon_tree_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:helix_tree_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:jellyshroom_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:lacugrove_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:lucernia_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:mossy_glowshroom_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:pythadendron_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:tenanea_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:umbrella_tree_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
    { blockID: "betterend:end_lotus_sapling", maxStage: 2, growChance: { numerator: 1, denominator: 3 } },
];
const logSet = new Set([
    "betterend:dragon_tree_log",
    "betterend:helix_tree_log",
    "betterend:jellyshroom_log",
    "betterend:lacugrove_log",
    "betterend:lucernia_log",
    "betterend:mossy_glowshroom_log",
    "betterend:pythadendron_log",
    "betterend:tenanea_log",
    "betterend:umbrella_tree_log",
    "betterend:end_lotus_log",
]);
const sapSet = new Set([
    "betterend:dragon_tree_sapling",
    "betterend:helix_tree_sapling",
    "betterend:jellyshroom_sapling",
    "betterend:lacugrove_sapling",
    "betterend:lucernia_sapling",
    "betterend:mossy_glowshroom_sapling",
    "betterend:pythadendron_sapling",
    "betterend:tenanea_sapling",
    "betterend:umbrella_tree_sapling",
    "betterend:end_lotus_sapling",
]);
const logMap = new Map([
    ["betterend:dragon_tree_log", "betterend:stripped_dragon_tree_log"],
    ["betterend:dragon_tree_wood", "betterend:stripped_dragon_tree_wood"],
    ["betterend:helix_tree_log", "betterend:stripped_helix_tree_log"],
    ["betterend:helix_tree_wood", "betterend:stripped_helix_tree_wood"],
    ["betterend:jellyshroom_log", "betterend:stripped_jellyshroom_log"],
    ["betterend:jellyshroom_wood", "betterend:stripped_jellyshroom_wood"],
    ["betterend:lacugrove_log", "betterend:stripped_lacugrove_log"],
    ["betterend:lacugrove_wood", "betterend:stripped_lacugrove_wood"],
    ["betterend:lucernia_log", "betterend:stripped_lucernia_log"],
    ["betterend:lucernia_wood", "betterend:stripped_lucernia_wood"],
    ["betterend:mossy_glowshroom_log", "betterend:stripped_mossy_glowshroom_log"],
    ["betterend:mossy_glowshroom_wood", "betterend:stripped_mossy_glowshroom_wood"],
    ["betterend:pythadendron_log", "betterend:stripped_pythadendron_log"],
    ["betterend:pythadendron_wood", "betterend:stripped_pythadendron_wood"],
    ["betterend:tenanea_log", "betterend:stripped_tenanea_log"],
    ["betterend:tenanea_wood", "betterend:stripped_tenanea_wood"],
    ["betterend:umbrella_tree_log", "betterend:stripped_umbrella_tree_log"],
    ["betterend:umbrella_tree_wood", "betterend:stripped_umbrella_tree_wood"],
    ["betterend:end_lotus_log", "betterend:end_lotus_log"],
    ["betterend:end_lotus_wood", "betterend:end_lotus_wood"],
]);
const trapSet = new Set([
    "betterend:dragon_tree_trapdoor",
    "betterend:helix_tree_trapdoor",
    "betterend:jellyshroom_trapdoor",
    "betterend:lacugrove_trapdoor",
    "betterend:lucernia_trapdoor",
    "betterend:mossy_glowshroom_trapdoor",
    "betterend:pythadendron_trapdoor",
    "betterend:tenanea_trapdoor",
    "betterend:umbrella_tree_trapdoor",
    "betterend:end_lotus_trapdoor",
]);
// This handles the durality damage for all blocks (except slabs - handled in slabs.js) and removing the block above for fences and gates
const DestroyComponent = {
    onPlayerBreak(e) {
        const { block, player } = e;
        const aboveBlock = block.above();
        const blockBelow = block.below();
        // Remove betterend:fence_inventory or invisible fence gate on top if present
        if ((aboveBlock.typeId.includes("_inventory")) || (fenceSet.has(aboveBlock.typeId) && aboveBlock.permutation.getState('betterend:invisible'))) {
            aboveBlock.setType("minecraft:air");
        }
        // add betterend:fence_inventory if fence present below
        if (fenceSet.has(blockBelow.typeId)) {
            block.setPermutation(BlockPermutation.resolve("betterend:helix_tree_fence_inventory", { "betterend:post": 1 }));
        }
        const inventory = player.getComponent("inventory");
        const selectedItem = inventory.container.getItem(player.selectedSlotIndex);
        if (selectedItem &&
            (selectedItem.typeId.includes("shovel") ||
                selectedItem.typeId.includes("hoe") ||
                selectedItem.typeId.includes("_axe") ||
                selectedItem.typeId.includes("_pickaxe") ||
                selectedItem.typeId.includes("shears"))) {
            system.runTimeout(() => {
                applyDurabilityDamage(player, selectedItem, inventory, player.selectedSlotIndex);
            }, 1);
        }
    },
};
const customComponents = {
    "betterend:fence_interact": FenceInteractComponent,
    "betterend:on_player_destroy": DestroyComponent,
    "betterend:on_tick": OnTickComponent,
    "betterend:on_player_placed": PlaceComponent,
    "betterend:random_tick": randomTickComponent,
    "betterend:slab_interact": slabComponent,
    "betterend:interact_tree": treeInteractComponent,
    "betterend:gate_interact": GateInteract,
    "betterend:gate_placed": PlaceGateComponent,
    "betterend:leaf_place": leafDefaultComponent
};
let lastBrokenBlockType = null;
let lastBrokenBlockIsDouble = false;
// Use this world initialization event to register all custom components
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    for (const [componentName, componentImplementation] of Object.entries(customComponents)) {
        blockComponentRegistry.registerCustomComponent(componentName, componentImplementation);
    }
});
world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
    const { block, player, dimension } = eventData;
    const blockBelow = block.below();
    const inventory = player.getComponent("inventory");
    const selectedItem = inventory.container.getItem(player.selectedSlotIndex);
    const { hasSilkTouch } = getRelevantEnchantments(selectedItem);
    if (selectedItem && leafSet.has(block.typeId) && selectedItem.typeId === "minecraft:shears" && !hasSilkTouch) {
        const spawnItem = block.typeId;
        system.runTimeout(() => {
            block.dimension.spawnItem(new ItemStack(spawnItem, 1), block.location);
        }, 1);
    }
    else if (leafSet.has(block.typeId) && !hasSilkTouch) {
        leafDrop(block, true);
    }
    if (isSlab.has(block.typeId)) {
        lastBrokenBlockType = block.typeId;
        lastBrokenBlockIsDouble =
            block.permutation.getState("betterend:double") === true;
        system.runTimeout(() => {
            if (!selectedItem) {
                slabDrop(block, dimension, player);
            }
            else if (selectedItem.typeId.includes("shovel") ||
                selectedItem.typeId.includes("hoe") ||
                selectedItem.typeId.includes("_axe") ||
                selectedItem.typeId.includes("_pickaxe")) {
                applyDurabilityDamage(player, selectedItem, inventory, player.selectedSlotIndex);
                slabDrop(block, dimension, player);
            }
            else {
                slabDrop(block, dimension, player);
            }
        }, 1);
    }
    else if (fenceSet.has(blockBelow.typeId)) {
        system.runTimeout(() => {
            if (blockBelow.typeId.includes("betterend:") && blockBelow.typeId.includes("_gate")) {
                const currentStates = blockBelow.permutation.getAllStates();
                const cardinalDirection = currentStates['minecraft:cardinal_direction'];
                const newAboveStates = { ...currentStates };
                if (cardinalDirection === 'south') {
                    delete newAboveStates['minecraft:cardinal_direction'];
                }
                newAboveStates['betterend:invisible'] = true;
                block.setPermutation(BlockPermutation.resolve(blockBelow.typeId, newAboveStates));
            }
            else if (blockBelow.typeId.includes("betterend:") && !blockBelow.typeId.includes("_gate")) {
                block.setPermutation(BlockPermutation.resolve("betterend:helix_tree_fence_inventory", { "betterend:post": 1 }));
            }
        }, 1);
    }
});
function slabDrop(block, dimension, player) {
    if (player.getGameMode() !== "creative") {
        if (lastBrokenBlockType) {
            const blockData = lastBrokenBlockType;
            if (blockData) {
                let dropItem;
                if (lastBrokenBlockIsDouble) {
                    dropItem = new ItemStack(lastBrokenBlockType, 1);
                }
                if (dropItem) {
                    dimension.spawnItem(dropItem, block.location);
                }
            }
            lastBrokenBlockType = null;
            lastBrokenBlockIsDouble = false;
        }
    }
}
function applyDurabilityDamage(player, item, inventory, slotIndex) {
    const durabilityComponent = item.getComponent("minecraft:durability");
    if (durabilityComponent) {
        const { unbreakingLevel } = getRelevantEnchantments(item);
        if (Math.random() < 1 / (unbreakingLevel + 1)) {
            const newDamage = durabilityComponent.damage + 1;
            if (newDamage >= durabilityComponent.maxDurability) {
                inventory.container.setItem(slotIndex, undefined);
                player.playSound("random.break");
            }
            else {
                durabilityComponent.damage = newDamage;
                inventory.container.setItem(slotIndex, item);
            }
        }
    }
}
function getRelevantEnchantments(item) {
    let unbreakingLevel = 0;
    let hasSilkTouch = false;
    try {
        const enchantableComponent = item.getComponent("minecraft:enchantable");
        if (enchantableComponent) {
            const enchantments = enchantableComponent.getEnchantments();
            for (const enchant of enchantments) {
                if (enchant.type.id === "unbreaking") {
                    unbreakingLevel = enchant.level;
                }
                else if (enchant.type.id === "silk_touch") {
                    hasSilkTouch = true;
                }
            }
        }
    }
    catch (error) {
    }
    return { unbreakingLevel, hasSilkTouch };
}
export { applyDurabilityDamage, getRelevantEnchantments, isSlab, fenceSet, fenceMap, leafSet, leafDropMap, saplingBlocks, logSet, sapSet, logMap, trapSet, };
