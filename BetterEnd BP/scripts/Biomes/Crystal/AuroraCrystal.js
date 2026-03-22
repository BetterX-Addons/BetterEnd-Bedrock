import { system } from "@minecraft/server";
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:aurora_crystal', {
        onPlayerBreak({ block }) {
            const auroraCrystal = new AuroraCrystal(block);
            auroraCrystal.onDestroy();
        },
        onTick({ block }) {
            const auroraCrystal = new AuroraCrystal(block);
            auroraCrystal.onTick();
        }
    });
});
class AuroraCrystal {
    constructor(block) {
        this.block = block;
    }
    onTick() {
        const { dimension, location } = this.block;
        const belowLocation = { x: location.x, y: location.y - 1, z: location.z };
        const belowBlock = dimension.getBlock(belowLocation);
        // Verificar si el bloque de abajo es 'betterend:aurora_crystal'
        if (belowBlock && belowBlock.typeId === 'betterend:aurora_crystal2') {
            this.updateCrystallizationState(belowBlock);
        }
        if (belowBlock && belowBlock.typeId === 'betterend:aurora_crystal') {
            this.updateCrystallizationState(belowBlock);
        }
    }
    updateCrystallizationState(belowBlock) {
        const permutation = belowBlock.permutation;
        const belowStateCrystallization = permutation.getState('betterend:crystallization');
        const belowStateCrystallization2 = permutation.getState('betterend:crystallization2');
        const crystallizationState = Number(belowStateCrystallization);
        const crystallization2State = Number(belowStateCrystallization2);
        let newState = null;
        let newStateType = null;
        // Manejo del estado de crystallization
        if (!isNaN(crystallizationState)) {
            if (crystallizationState >= 0 && crystallizationState < 15) {
                newState = crystallizationState + 1;
                newStateType = 'betterend:crystallization';
            }
            else if (crystallizationState === 15) {
                newState = 16;
                newStateType = 'betterend:crystallization2';
            }
        }
        // Manejo del estado de crystallization2
        if (!isNaN(crystallization2State)) {
            if (crystallization2State >= 16 && crystallization2State < 28) {
                newState = crystallization2State + 1;
                newStateType = 'betterend:crystallization2';
            }
            else if (crystallization2State === 28) {
                return; // No hacer nada si el estado ya es el máximo
            }
        }
        if (newState !== null && newStateType !== null) {
            if (newStateType === 'betterend:crystallization') {
                this.block.setPermutation(this.block.permutation.withState('betterend:crystallization', newState));
            }
            else if (newStateType === 'betterend:crystallization2') {
                this.block.setPermutation(this.block.permutation.withState('betterend:crystallization2', newState));
            }
        }
    }
    onDestroy() {
        // Lógica para el loot o cualquier comportamiento al destruir el bloque
        const lootTable = "loot_tables/aurora_crystal.json"; // Definir tabla de loot
        // Aquí puedes implementar el código para que el loot caiga o hacer cualquier otra cosa
    }
}
