import { world, system, ItemStack, BlockPermutation } from '@minecraft/server';
//converts the dimensionID to a Y value
function dimensionToHeight(dimension) {
    const heights = [
        {
            id: "minecraft:overworld",
            maxHeight: 320
        },
        {
            id: "minecraft:nether",
            maxHeight: 128
        },
        {
            id: "minecraft:the_end",
            maxHeight: 256
        }
    ];
    const data = heights.find((f)=>f.id == dimension);
    if (data != undefined) {
        //return the Y value
        return data.maxHeight;
    } else return undefined;
}
const blockComps = [
    //define the block component
    {
        //the id of the block component
        id: "betterend:door",
        //the code of the block component
        code: {
            //on interact with door
            onPlayerInteract: (data)=>{
                //interact with the door
                doorManager.interactWithDoor(data.block);
            },
            //on place door
            onPlace: (data) => {
    const { block, dimension } = data;
    const loc = block.location;

    // If the placed block is already the top of the door, it does nothing.

    // If the world's maximum height is reached, do nothing
    if (loc.y + 1 >= dimensionToHeight(dimension.id)) return;

    // Take the block above
    let blockAbove;
    try {
        blockAbove = dimension.getBlock({ x: loc.x, y: loc.y + 1, z: loc.z });
    } catch {}

    if (blockAbove && blockAbove.permutation.getState('betterend:upper_block_bit') === true) {
        return; // Avoid duplicating the top of the door
    }
    
    // If the block above is valid and is air or liquid, place the top of the door
    if (blockAbove && (blockAbove.isAir || blockAbove.isLiquid) && block.permutation.getState('betterend:upper_block_bit') === false) {
    // Prevents duplication and places the door correctly
    doorManager.placeDoor(block, blockAbove);
      }
},
onTick: (data) => {
    const { block, dimension } = data;
const isTopBit = block.permutation.getState("betterend:upper_block_bit");

    if (!isTopBit && block.above().typeId !== block.typeId) {
        // Quando a porta for quebrada no modo sobrevivência
        const doorData = doorManager.doors.find(f => f.id === block.typeId);
        if (doorData) {
            const item = new ItemStack(doorData.itemID, 1); // Cria o item da porta quebrada
            const loc = block.location;
            // Spawna o item na localização da porta quebrada
            spawnItemAnywhere(item, {
                x: loc.x + 0.5,
                y: loc.y + 0.5,
                z: loc.z + 0.5
            }, block.dimension);
            
            // Remove o bloco e o transforma em ar
            block.dimension.runCommand(`setblock ${loc.x} ${loc.y} ${loc.z} air destroy`);
        }
        }
        // Verificação de estado da porta
        const isOpen = block.permutation.getState("betterend:open_bit");
        const isPowered = block.permutation.getState("betterend:powered");
        const hasRedstone = block.getRedstonePower() > 0;

        if (isPowered && !hasRedstone) {
            block.setPermutation(block.permutation.withState("betterend:powered", !isPowered));

            if (isOpen)
                doorManager.interactWithDoor(data.block);
        } else if (!isPowered && hasRedstone) {
            block.setPermutation(block.permutation.withState("betterend:powered", !isPowered));
            
            if (!isOpen)
                doorManager.interactWithDoor(data.block);
        };
    }
    }
    }
];
function spawnItemAnywhere(item, location, dimension) {
    //spawn the item at y100
    const itemEntity = dimension.spawnItem(item, {
        x: location.x,
        y: 100,
        z: location.z
    });
    //tp the item to the specified location
    itemEntity.teleport(location);
    //return the itemEntity
    return itemEntity;
}
class doorManager {
    //interact with a door block
    static interactWithDoor(block) {
        const dim = block.dimension;
        const loc = block.location;
        const topHalf = block.permutation.getState("betterend:upper_block_bit");
        const open = block.permutation.getState("betterend:open_bit");
        let doorPart = undefined;
        let adjacentDoor = undefined;
    
        // Get the top/bottom half of the door
        if (topHalf == false) {
            try {
                doorPart = block.above(1);
            } catch {}
        } else {
            try {
                doorPart = block.below(1);
            } catch {}
        }
    
        // Check for adjacent doors in all four directions
        const directions = ["North", "South", "East", "West"];
        for (const direction of directions) {
            let adjacentBlockPos;
            switch (direction) {
                case "North":
                    adjacentBlockPos = { x: block.location.x, y: block.location.y, z: block.location.z - 1 };
                    break;
                case "South":
                    adjacentBlockPos = { x: block.location.x, y: block.location.y, z: block.location.z + 1 };
                    break;
                case "East":
                    adjacentBlockPos = { x: block.location.x + 1, y: block.location.y, z: block.location.z };
                    break;
                case "West":
                    adjacentBlockPos = { x: block.location.x - 1, y: block.location.y, z: block.location.z };
                    break;
            }
    
            try {
                const adjacentBlock = dim.getBlock(adjacentBlockPos);
                if (adjacentBlock.typeId === block.typeId) {
                    adjacentDoor = adjacentBlock;
                    break; // Exit the loop once we find an adjacent door
                }
            } catch (error) {
                console.warn(`Error: ${error}`);
            }
        }
    
        if (doorPart != undefined) {
            const data = this.doors.find((f) => f.id == block.typeId);
            let bool = !open;
    
            // Play sound
            if (bool) {
                if (data != undefined && data.openSound != undefined) {
                    dim.playSound(data.openSound.id, loc, {
                        pitch: data.openSound.pitch,
                        volume: data.openSound.volume
                    });
                }
            } else {
                if (data != undefined && data.closeSound != undefined) {
                    dim.playSound(data.closeSound.id, loc, {
                        pitch: data.closeSound.pitch,
                        volume: data.closeSound.volume
                    });
                }
            }
    
            const blocksToUpdate = [block, doorPart];
    
            // If there's an adjacent door, add it and its other half to the update list
            if (adjacentDoor != undefined) {
                blocksToUpdate.push(adjacentDoor);
                const adjacentDoorPart = adjacentDoor.permutation.getState("betterend:upper_block_bit") ? 
                    adjacentDoor.below(1) : adjacentDoor.above(1);
                if (adjacentDoorPart != undefined) {
                    blocksToUpdate.push(adjacentDoorPart);
                }
            }
    
            // Update all relevant blocks
            for (const door of blocksToUpdate) {
                try {
                    door.setPermutation(door.permutation.withState("betterend:open_bit", bool));
                } catch {}
            }
        }
    }
    static breakDoor(blockID, block, topHalf, player) {
        //does this stuff a tick later
        system.runTimeout(()=>{
            let doorPart = undefined;
            if (topHalf == false) {
                try {
                    doorPart = block.above(1);
                } catch  {}
            } else try {
                doorPart = block.below(1);
            } catch  {}
            //sets the doorPart to air
            if (doorPart != undefined && doorPart.hasTag(this.doorTag)) doorPart.setPermutation(BlockPermutation.resolve("minecraft:air"));
            //gets the door data
            const data = this.doors.find((f)=>f.id == blockID);
            if (data == undefined) return;
            const item = new ItemStack(data.itemID, 1);
            const loc = block.location;
            // Checks if the player is in creative mode before spawning the item
        if (player.getGameMode() !== "creative") {
            // If not in creative, spawns the item at the location of the broken door
            spawnItemAnywhere(item, {
                x: loc.x + 0.5,
                y: loc.y + 0.5,
                z: loc.z + 0.5
            }, block.dimension) //spawns the item
            ;
            }
            block.dimension.runCommand(`setblock ${loc.x} ${loc.y} ${loc.z} air destroy`);
            ;
        });
    }
    static placeDoor(block, aboveBlock) {
        system.runTimeout(() => {
            let reversed = false;
            const facing = block.permutation.getState("minecraft:cardinal_direction");
            let adjacentDoor = null;
            let adjacentDirection = null;
    
            const checkAndUpdateAdjacentDoor = (direction) => {
                let otherBlock;
                switch(direction) {
                    case "north": otherBlock = block.dimension.getBlock({ x: block.location.x, y: block.location.y, z: block.location.z - 1 }); break;
                    case "south": otherBlock = block.dimension.getBlock({ x: block.location.x, y: block.location.y, z: block.location.z + 1 }); break;
                    case "east": otherBlock = block.dimension.getBlock({ x: block.location.x + 1, y: block.location.y, z: block.location.z }); break;
                    case "west": otherBlock = block.dimension.getBlock({ x: block.location.x - 1, y: block.location.y, z: block.location.z }); break;
                }
    
                if (otherBlock.typeId.includes("door")) {
                    const otherfacing = otherBlock.permutation.getState("minecraft:cardinal_direction");
                    
                    adjacentDoor = otherBlock;
                    adjacentDirection = direction;
                    
                    // Determine if the door should be reversed based on facing and adjacent direction
                    reversed = shouldReverseDoor(facing, direction);
                    return true;
                }
                return false;
            };
    
            const shouldReverseDoor = (facing, adjacentDirection) => {
                switch(facing) {
                    case "north": return adjacentDirection !== "east";
                    case "south": return adjacentDirection !== "west";
                    case "east": return adjacentDirection !== "south";
                    case "west": return adjacentDirection !== "north";
                    default: return true;
                }
            };
    
            // Check all four directions
            ["north", "south", "east", "west"].forEach(direction => {
                try {
                    if (checkAndUpdateAdjacentDoor(direction)) {
                    }
                } catch (error) {
                    console.warn(`Error checking ${direction} direction: ${error}`);
                }
            });
    
            // Update the main door
            block.setPermutation(block.permutation.withState("betterend:reversed", reversed));
            aboveBlock.setPermutation(BlockPermutation.resolve(block.typeId));
            aboveBlock.setPermutation(aboveBlock.permutation.withState("betterend:upper_block_bit", true));
            aboveBlock.setPermutation(aboveBlock.permutation
                .withState("minecraft:cardinal_direction", facing)
                .withState("betterend:reversed", reversed));
    
            // Update the adjacent door if found
            if (adjacentDoor) {
                const adjacentAboveBlock = block.dimension.getBlock({
                    x: adjacentDoor.location.x,
                    y: adjacentDoor.location.y + 1,
                    z: adjacentDoor.location.z
                });
                
                // The adjacent door should have the opposite 'reversed' state
                const adjacentReversed = !reversed;
                
                adjacentDoor.setPermutation(adjacentDoor.permutation
                    .withState("betterend:reversed", adjacentReversed));
                
                if (adjacentAboveBlock) {
                    adjacentAboveBlock.setPermutation(adjacentAboveBlock.permutation
                        .withState("betterend:reversed", adjacentReversed));
                }
            } 
        });
    }
}
//set the door tag
doorManager.doorTag = "betterend:is_door";
doorManager.doors = [
    //door data
    {
        //the typeId of the block
        id: "betterend:helix_tree_door",
        //the typeId of the item
        itemID: "betterend:helix_tree_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:dragon_tree_door",
        //the typeId of the item
        itemID: "betterend:dragon_tree_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:jellyshroom_door",
        //the typeId of the item
        itemID: "betterend:jellyshroom_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:lacugrove_door",
        //the typeId of the item
        itemID: "betterend:lacugrove_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:lucernia_door",
        //the typeId of the item
        itemID: "betterend:lucernia_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:mossy_glowshroom_door",
        //the typeId of the item
        itemID: "betterend:mossy_glowshroom_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:pythadendron_door",
        //the typeId of the item
        itemID: "betterend:pythadendron_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:tenanea_door",
        //the typeId of the item
        itemID: "betterend:tenanea_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:umbrella_tree_door",
        //the typeId of the item
        itemID: "betterend:umbrella_tree_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    },
    {
        //the typeId of the block
        id: "betterend:end_lotus_door",
        //the typeId of the item
        itemID: "betterend:end_lotus_door",
        //the opening sound data
        openSound: {
            id: "open.wooden_door",
            volume: 1,
            pitch: 1
        },
        //the closing sound data
        closeSound: {
            id: "close.wooden_door",
            volume: 1,
            pitch: 1
        }
    }
];

world.beforeEvents.playerBreakBlock.subscribe((data)=>{
    if (data.block.hasTag(doorManager.doorTag)) {
        //if the block has the door tag, breakDoor
        data.cancel = true;
        doorManager.breakDoor(data.block.typeId, data.block, data.block.permutation.getState("betterend:upper_block_bit"), data.player);
    } else try {
        const blockAbove = data.block.above(1);
        //if the above block has the door tag, breakDoor
        if (blockAbove.hasTag(doorManager.doorTag)) doorManager.breakDoor(blockAbove.typeId, blockAbove, blockAbove.permutation.getState("betterend:upper_block_bit"));
    } catch  {}
});
let int = 0;
system.beforeEvents.startup.subscribe((data)=>{
    //needed to stop crashes when leaving the world
    int = int + 1;
    if (int != 1) return;
    for (const comp of blockComps){
        //registers all custom block components
        data.blockComponentRegistry.registerCustomComponent(comp.id, comp.code);
    }
});
