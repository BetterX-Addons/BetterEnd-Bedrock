// Import necessary modules from Minecraft server API
import { world, BlockPermutation, ItemStack, system } from '@minecraft/server';
import { trapSet } from './main';

// Subscribe to the 'worldInitialize' event to register custom components
system.beforeEvents.startup.subscribe(eventData => {
    // Register a custom component named betterend:on_interact for trapdoor interaction
    eventData.blockComponentRegistry.registerCustomComponent('betterend:TD_interact', {
        // Define the behavior when a player interacts with the trapdoor block
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
    const sound = currentState ? 'open.wooden_trapdoor' : 'close.wooden_trapdoor';

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
        } else if (!isPowered && hasRedstone) {
            block.setPermutation(block.permutation.withState("betterend:powered", true));
            if (!isOpen) {
                toggleTrapdoor(block, dimension);
            }
        }
    },
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Get the current state of the 'betterend:open' block trait
            const currentState = block.permutation.getState('betterend:open');

            // Determine the new state of the 'betterend:open' block trait (toggle between true and false)
            const newOpenState = !currentState;

            // Resolve the new block permutation based on the current block type and updated states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'betterend:open': newOpenState
            });

            // Set the block permutation to the newly resolved permutation
            block.setPermutation(newPermutation);

            // Determine the sound effect to play based on the current state of the trapdoor
            const sound = currentState ? 'open.wooden_trapdoor' : 'close.wooden_trapdoor';

            // Play the corresponding sound effect for opening or closing the trapdoor
            player.playSound(sound);

            // Check if the current dimension is not the Nether
        if (e.dimension.id !== "minecraft:nether") {
            // Check if the selected item is a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Play sound effect
                player.playSound( "bucket.empty_water" );
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }
            // Check if the block interacted is a betterend:trapdoor and the player is using a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Save the current block states
                const currentStates = block.permutation.getAllStates();

                const verticalHalf = block.permutation.getState(
                    "minecraft:vertical_half"
                  );
                const structureName = generateStructureName(block.typeId, verticalHalf);

                // Place the structure
                const { x, y, z } = block.location;
                block.setWaterlogged(true);

                // Get the new block at the same location
                const newBlock = e.dimension.getBlock({ x, y, z });

                // Reapply the old block states to the new block
                const newStates = { ...newBlock.permutation.getAllStates(), ...currentStates };
                const newPermutation = BlockPermutation.resolve(newBlock.typeId, newStates);
                newBlock.setPermutation(newPermutation);
            }
            // Check if the selected item is a empty bucket and handle un-waterlogging
            else if ( selectedItem?.typeId === "minecraft:bucket" ) {

                if (block.permutation.getState("betterend:waterlogged") ) {
        
                // Save the state of the block
                const currentPermutation = block.permutation;
                const currentBlock = block.typeId;
        
                player.playSound( "bucket.fill_water" );
                block.setWaterlogged(false);
        
                // If not in creative mode, replace empty bucket with water bucket
                if (player.getGameMode() !== "creative") {
                    if (selectedItem.amount === 1) {
                equipment.setEquipment("Mainhand", undefined);
              } else {
                selectedItem.amount -= 1;
                equipment.setEquipment("Mainhand", selectedItem);
              }
            player.runCommandAsync(`gamerule sendcommandfeedback false`);
            player.runCommandAsync(`give @s minecraft:water_bucket 1`);
            player.runCommandAsync(`gamerule sendcommandfeedback true`);
                }
                
                // Apply the new permutation
                block.setType(currentBlock);
        
                // Apply the previous permutation (now un waterlogged)
                const newPermutation = currentPermutation
                    .withState("betterend:waterlogged", false)
                    .withState("minecraft:vertical_half", currentPermutation.getState("minecraft:vertical_half"));
                block.setPermutation(newPermutation);       
                }
            }
        } else if (trapSet.has(block.typeId) && selectedItem?.typeId === 'minecraft:water_bucket') {
                e.dimension.spawnParticle("minecraft:water_evaporation_bucket_emitter", block.center());
                player.playSound("random.fizz", { pitch: 1.0, volume: 1.0 });
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                  equipment.setEquipment( "Mainhand", new ItemStack("minecraft:bucket", 1) );
                }
              }
        }
    });
});

function generateStructureName(blockTypeId, verticalHalf) {
    // Remove the namespace and quotation marks, and keep the full name of the block
    const blockNamePart = blockTypeId.replace(/^betterend:/, "");
  
    // Construct the structure name
    const structureName =
      verticalHalf === "bottom"
        ? `bottom_${blockNamePart}`
        : `top_${blockNamePart}`;
  
    return structureName;
  }