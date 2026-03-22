import { system, BlockPermutation, BlockTypes, ItemStack } from "@minecraft/server";
import { fenceMap, gateSet } from './main';
export const FenceInteractComponent = {
    onPlayerInteract(e) {
        const { block, player, face } = e;
        // Get the equipment component for the player
        const equipment = player.getComponent("equippable");
        // Get the selected item from the player's mainhand
        const selectedItem = equipment.getEquipment("Mainhand");
        if (selectedItem?.typeId === "minecraft:water_bucket") {
            // Check if the current dimension is not the Nether
            if (e.dimension.id !== "minecraft:nether") {
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment("Mainhand", new ItemStack("minecraft:bucket", 1));
                }
                // Set block to waterlogged and place corresponding structure
                block.setPermutation(block.permutation.withState("betterend:waterlogged", true));
                const structureName = generateStructureName(block.typeId);
                const { x, y, z } = block;
                block.setWaterlogged(true);
            }
            else {
                e.dimension.spawnParticle("minecraft:water_evaporation_bucket_emitter", block.center());
                player.playSound("random.fizz", { pitch: 1.0, volume: 1.0 });
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment("Mainhand", new ItemStack("minecraft:bucket", 1));
                }
            }
            return; // Exit the function after handling water bucket
        }
        // Check if the selected item is a empty bucket and handle un-waterlogging
        else if (selectedItem?.typeId === "minecraft:bucket") {
            if (block.permutation.getState("betterend:waterlogged")) {
                // If not in creative mode, replace empty bucket with water bucket
                if (player.getGameMode() !== "creative") {
                    if (selectedItem.amount === 1) {
                        equipment.setEquipment("Mainhand", undefined);
                    }
                    else {
                        selectedItem.amount -= 1;
                        equipment.setEquipment("Mainhand", selectedItem);
                    }
                    player.runCommand(`gamerule sendcommandfeedback false`);
                    player.runCommand(`give @s minecraft:water_bucket 1`);
                    player.runCommand(`gamerule sendcommandfeedback true`);
                }
                player.playSound("bucket.fill_water");
                // Save the state of the block
                const currentPermutation = block.permutation;
                const stateObject = currentPermutation.getAllStates();
                // Create a new object to store the states to prevent visual glitches
                const statesToKeep = {};
                for (const [key, value] of Object.entries(stateObject)) {
                    if (key !== "betterend:waterlogged") {
                        statesToKeep[key] = value;
                    }
                }
                // Create a new permutation with the saved states
                let newPermutation = currentPermutation.withState("betterend:waterlogged", false);
                for (const [key, value] of Object.entries(statesToKeep)) {
                    newPermutation = newPermutation.withState(key, value);
                }
                block.setWaterlogged(false);
                // Set the block with the new permutation
                block.setPermutation(newPermutation);
                return; // Exit the function after handling bucket
            }
        }
        // Get block states and player direction
        const { stateName, stateValue } = getBlockStatesAndDirection(player, selectedItem, face);
        // Determine the adjacent block position based on the face
        let adjacentBlockPos;
        switch (face) {
            case "North":
                adjacentBlockPos = { x: block.x, y: block.y, z: block.z - 1 };
                break;
            case "South":
                adjacentBlockPos = { x: block.x, y: block.y, z: block.z + 1 };
                break;
            case "East":
                adjacentBlockPos = { x: block.x + 1, y: block.y, z: block.z };
                break;
            case "West":
                adjacentBlockPos = { x: block.x - 1, y: block.y, z: block.z };
                break;
            case "Up":
                adjacentBlockPos = { x: block.x, y: block.y + 1, z: block.z };
                break;
            case "Down":
                adjacentBlockPos = { x: block.x, y: block.y - 1, z: block.z };
                break;
        }
        const adjacentBlock = e.dimension.getBlock(adjacentBlockPos);
        // Check if the selected item is a block
        if (face) {
            // Calculate the position above the current block
            const aboveBlock = adjacentBlock.above();
            if (selectedItem?.typeId.includes("_inventory") || selectedItem?.typeId.includes("_inventory_item")) {
                // If the block is air or a custom fence inventory item...
                if (adjacentBlock.typeId.includes("_inventory") ||
                    adjacentBlock.typeId === "minecraft:air" ||
                    adjacentBlock.typeId === "minecraft:water") {
                    // ...place the corresponding fence block
                    const fenceBlockType = fenceMap.get(selectedItem.typeId);
                    adjacentBlock.setType(fenceBlockType);
                    if (aboveBlock.typeId === "minecraft:air" ||
                        aboveBlock.typeId === "minecraft:water") {
                        aboveBlock.setPermutation(BlockPermutation.resolve("betterend:helix_tree_fence_inventory", {
                            "betterend:post": 1,
                        }));
                    }
                    // Reduce item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment("Mainhand", selectedItem);
                        }
                        else {
                            equipment.setEquipment("Mainhand", undefined); // Clear the slot if only 1 item left
                        }
                    }
                }
            }
            else if (adjacentBlock.typeId === "minecraft:air" ||
                adjacentBlock.typeId === "minecraft:water" ||
                adjacentBlock.typeId.includes("_inventory")) {
                // Handle non-fence block placement with state
                const commandBlock = stateName
                    ? `setblock ${adjacentBlockPos.x} ${adjacentBlockPos.y} ${adjacentBlockPos.z} ${selectedItem.typeId} ["${stateName}"="${stateValue}"]`
                    : `setblock ${adjacentBlockPos.x} ${adjacentBlockPos.y} ${adjacentBlockPos.z} ${selectedItem.typeId}`;
                system.runTimeout(() => {
                    try {
                        player.runCommand(commandBlock);
                        if (player.getGameMode() !== "creative") {
                            if (selectedItem.amount === 1) {
                                equipment.setEquipment("Mainhand", undefined);
                            }
                            else {
                                selectedItem.amount -= 1;
                                equipment.setEquipment("Mainhand", selectedItem);
                            }
                        }
                    }
                    catch (error) {
                        console.warn(`Error: ${error.message}`);
                    }
                }, 1);
            }
        }
    },
};
export const PlaceComponent = {
    onPlace(e) {
        // Destructure event data for easier access
        const { block } = e;
        const aboveBlock = block.above();
        const fenceBlockType = fenceMap.get(block.typeId);
        e.block.setType(fenceBlockType);
        if (aboveBlock.typeId === "minecraft:air" ||
            aboveBlock.typeId === "minecraft:water") {
            aboveBlock.setPermutation(BlockPermutation.resolve("betterend:helix_tree_fence_inventory", { "betterend:post": 1 }));
        }
    },
};
export const PlaceGateComponent = {
    onPlace(e) {
        // Destructure event data for easier access
        const { block } = e;
        const aboveBlock = block.above();
        // Get all current block states
        const currentStates = block.permutation.getAllStates();
        // Get the current state of the 'minecraft:cardinal_direction' block trait
        const cardinalDirection = currentStates['minecraft:cardinal_direction'];
        // Check if the current cardinal direction is 'south'
        if (cardinalDirection === 'south') {
            // Change the block state 'betterend:direction' from false to true (remember this is the actual south rotation for our fence gate)
            const newDirection = true;
            currentStates['betterend:direction'] = newDirection;
            // Update the block's permutation with the new state
            const newPermutation = BlockPermutation.resolve(block.typeId, currentStates);
            // Apply the new permutation to the block
            block.setPermutation(newPermutation);
        }
        // Check if the block above is air
        if (aboveBlock.typeId === 'minecraft:air' ||
            aboveBlock.typeId === 'minecraft:water') {
            // Create a copy of the current block states of our fence gate
            const newAboveStates = { ...currentStates };
            // If the cardinal direction is 'south', remove the 'minecraft:cardinal_direction' state (remember we are only using 'south' for inventory render purposes)
            if (cardinalDirection === 'south') {
                delete newAboveStates['minecraft:cardinal_direction'];
            }
            // Set the 'betterend:invisible' state to true for the block above
            newAboveStates['betterend:invisible'] = true;
            const placeBlock = block.typeId;
            // Apply the new permutation to the block above using 'betterend:fence_gate'
            aboveBlock.setPermutation(BlockPermutation.resolve(placeBlock, newAboveStates));
        }
    }
};
export const GateInteract = {
    onTick: (e) => {
        const { block, dimension } = e;
        // Quando a porta for quebrada no modo sobrevivência
        function toggleTrapdoor(block, dimension) {
            const currentState = block.permutation.getState('betterend:open');
            // Determina o novo estado do bloco (abre ou fecha a porta)
            const newOpenState = !currentState;
            // Resolve a nova permutação de bloco com o estado atualizado
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'betterend:open': newOpenState
            });
            // Atualiza a permutação do bloco
            block.setPermutation(newPermutation);
            // Define o som baseado no estado
            const sound = currentState ? 'open.fence_gate' : 'close.fence_gate';
            // Toca o som no bloco
            dimension.runCommand(`playsound ${sound} @a[x=${block.location.x},y=${block.location.y},z=${block.location.z}]`);
        }
        // Verificação de estado da porta
        const isOpen = block.permutation.getState("betterend:open");
        const isPowered = block.permutation.getState("betterend:powered");
        const hasRedstone = block.getRedstonePower() > 0;
        if (isPowered && !hasRedstone) {
            block.setPermutation(block.permutation.withState("betterend:powered", false));
            if (isOpen) {
                toggleTrapdoor(block, dimension);
            }
        }
        else if (!isPowered && hasRedstone) {
            block.setPermutation(block.permutation.withState("betterend:powered", true));
            if (!isOpen) {
                toggleTrapdoor(block, dimension);
            }
        }
    },
    onPlayerInteract(e) {
        // Destructure event data for easier access
        const { block, player, face } = e;
        // Get the equipment component for the player
        const equipment = player.getComponent('equippable');
        // Get the selected item from the player's mainhand
        const selectedItem = equipment.getEquipment('Mainhand');
        // Check if a player tried to place a block on top of the fence gate
        if (selectedItem && face === 'Up' && BlockTypes.get(selectedItem.typeId)) {
            // Calculate the position above the current block
            const aboveBlock = block.above();
            // If the block above is a betterend:fence_gate (an equivalent of air)...
            if (gateSet.has(aboveBlock.typeId) && aboveBlock.typeId.includes("gate")) {
                // ...place the selected block above the current block
                aboveBlock.setType(selectedItem.typeId);
                // Reduce item count if not in creative mode
                if (player.getGameMode() !== "creative") {
                    if (selectedItem.amount > 1) {
                        selectedItem.amount -= 1;
                        equipment.setEquipment('Mainhand', selectedItem);
                    }
                    else {
                        equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                    }
                }
                return; // Exit the function after placing the block
            }
        }
        // Toggle the 'betterend:open' state between false and true and determine the sound effect to play
        const currentState = block.permutation.getState('betterend:open');
        const newOpenState = !currentState;
        const sound = newOpenState ? 'open.fence_gate' : 'close.fence_gate';
        // Determine the new cardinal direction based on the player's rotation
        const rotationAngle = player.getRotation().y;
        const newCardinalDirection = getNewCardinalDirection(block.permutation.getState('minecraft:cardinal_direction'), rotationAngle);
        // Update the block's permutation with the new states
        const newPermutation = BlockPermutation.resolve(block.typeId, {
            ...block.permutation.getAllStates(),
            'betterend:open': newOpenState,
            'minecraft:cardinal_direction': newCardinalDirection
        });
        // Apply the new permutation and play the sound
        block.setPermutation(newPermutation);
        block.dimension.playSound(sound, block.location);
        // Corrected: Remove redeclaration of aboveBlock
        const aboveBlock = block.above();
        // Checks if the block above our fence gate is an invisible fence gate (equivalent to air)
        if (gateSet.has(aboveBlock.typeId) && aboveBlock.permutation.getState('betterend:invisible')) {
            const aboveCurrentState = aboveBlock.permutation.getState('betterend:open');
            // Update betterend:open state of the invisible fence gate above our fence gate
            if (aboveCurrentState !== newOpenState) {
                const newAbovePermutation = BlockPermutation.resolve(aboveBlock.typeId, {
                    ...aboveBlock.permutation.getAllStates(),
                    'betterend:open': newOpenState
                });
                aboveBlock.setPermutation(newAbovePermutation);
            }
        }
    }
};
function generateStructureName(blockTypeId) {
    // Remove the namespace and quotation marks, and keep the full name of the block - be sure your structure files are named the same as their block identifier
    const blockNamePart = blockTypeId.replace(/^betterend:/, "");
    return blockNamePart;
}
function getBlockStatesAndDirection(player, selectedItem, face) {
    const resolvedBlockId = selectedItem?.typeId.replace("_item", "");
    const blockPermutation = BlockPermutation.resolve(resolvedBlockId);
    const blockStates = blockPermutation.getAllStates();
    let stateName = null;
    let stateValue = null;
    // Prioritize block states in a specific order
    const statePriority = [
        "minecraft:vertical_half",
        "minecraft:block_face",
        "minecraft:cardinal_direction",
        "pillar_axis",
        "facing_direction",
    ];
    for (const state of statePriority) {
        if (blockStates[state] !== undefined) {
            stateName = state;
            if (state === "pillar_axis") {
                // Determine pillar_axis based on face
                if (["North", "South"].includes(face)) {
                    stateValue = "z";
                }
                else if (["East", "West"].includes(face)) {
                    stateValue = "x";
                }
                else {
                    stateValue = "y";
                }
            }
            else if (state === "minecraft:cardinal_direction") {
                // Calculate direction based on player's rotation
                const rotation = player.getRotation();
                const rad = (rotation.y * Math.PI) / 180;
                const directionX = -Math.sin(rad);
                const directionZ = Math.cos(rad);
                // Determine cardinal direction based on calculated direction
                if (Math.abs(directionX) > Math.abs(directionZ)) {
                    stateValue = directionX > 0 ? "east" : "west";
                }
                else {
                    stateValue = directionZ > 0 ? "south" : "north";
                }
            }
            else if (state === "facing_direction") {
                // Calculate direction based on player's rotation
                const rotation = player.getRotation();
                const rad = (rotation.y * Math.PI) / 180;
                const directionX = -Math.sin(rad);
                const directionZ = Math.cos(rad);
                // Determine cardinal direction based on calculated direction
                if (Math.abs(directionX) > Math.abs(directionZ)) {
                    stateValue = directionX > 0 ? 2 : 3;
                }
                else {
                    stateValue = directionZ > 0 ? 0 : 1;
                }
            }
            else if (state === "minecraft:block_face") {
                // Determine block_face based on face
                stateValue = face.toLowerCase();
            }
            else if (state === "minecraft:vertical_half") {
                // Use getBlockFromViewDirection to get the exact hit location on the block face
                const raycastOptions = {
                    maxDistance: 5, // Adjust as needed
                    includePassableBlocks: false,
                };
                const raycastHit = player.getBlockFromViewDirection(raycastOptions);
                if (raycastHit) {
                    const faceLocation = raycastHit.faceLocation;
                    if (face === "Up" || face === "Down") {
                        stateValue = face === "Up" ? "bottom" : "top";
                    }
                    else {
                        // For side faces, use the y-coordinate of the faceLocation
                        stateValue = faceLocation.y > 0.5 ? "top" : "bottom";
                    }
                }
                else {
                    // Fallback to default behavior if raycast fails
                    if (face === "Up") {
                        stateValue = "bottom";
                    }
                    else if (face === "Down") {
                        stateValue = "top";
                    }
                    else {
                        stateValue = "bottom"; // Default to bottom for non-slab blocks
                    }
                }
            }
            else {
                stateValue = blockStates[state];
            }
            break;
        }
    }
    return { stateName, stateValue };
}
// Function to calculate the new cardinal direction based on the player's rotation
function getNewCardinalDirection(currentDirection, angle) {
    const direction = directionDisplay(angle);
    if (['north', 'south'].includes(currentDirection)) {
        return direction.includes('south') ? 'south' : 'north';
    }
    else {
        return direction.includes('west') ? 'west' : 'east';
    }
}
// Function to calculate the direction a player is looking at
function directionDisplay(angle) {
    if (Math.abs(angle) > 112.5)
        return 'north';
    if (Math.abs(angle) < 67.5)
        return 'south';
    if (angle < 157.5 && angle > 22.5)
        return 'west';
    if (angle > -157.5 && angle < -22.5)
        return 'east';
    return '';
}
export { generateStructureName, getBlockStatesAndDirection };
