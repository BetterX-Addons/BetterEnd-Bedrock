import { EnchantmentType, ItemStack, system, world, } from "@minecraft/server";
const enchantments = {
    aquaAffinity: "aqua_affinity",
    baneOfArthropods: "bane_of_arthropods",
    blastProtection: "blast_protection",
    channeling: "channeling",
    depthStrider: "depth_strider",
    efficiency: "efficiency",
    featherFalling: "feather_falling",
    fireAspect: "fire_aspect",
    fireProtection: "fire_protection",
    flame: "flame",
    fortune: "fortune",
    frostWalker: "frost_walker",
    impaling: "impaling",
    infinity: "infinity",
    knockback: "knockback",
    looting: "looting",
    loyalty: "loyalty",
    luckOfTheSea: "luck_of_the_sea",
    lure: "lure",
    mending: "mending",
    multishot: "multishot",
    piercing: "piercing",
    power: "power",
    projectileProtection: "projectile_protection",
    protection: "protection",
    punch: "punch",
    quickCharge: "quick_charge",
    respiration: "respiration",
    riptide: "riptide",
    sharpness: "sharpness",
    silkTouch: "silk_touch",
    smite: "smite",
    soulSpeed: "soul_speed",
    thorns: "thorns",
    unbreaking: "unbreaking",
};
let enchantedBooks;
enchantedBooks = system.run(() => {
    [
        {
            id: enchantments.aquaAffinity,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.aquaAffinity),
            },
        },
        {
            id: enchantments.baneOfArthropods,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.baneOfArthropods),
            },
        },
        {
            id: enchantments.blastProtection,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.blastProtection),
            },
        },
        {
            id: enchantments.channeling,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.channeling),
            },
        },
        {
            id: enchantments.depthStrider,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.depthStrider),
            },
        },
        {
            id: enchantments.efficiency,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.efficiency),
            },
        },
        {
            id: enchantments.featherFalling,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.featherFalling),
            },
        },
        {
            id: enchantments.fireAspect,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.fireAspect),
            },
        },
        {
            id: enchantments.fireProtection,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.fireProtection),
            },
        },
        {
            id: enchantments.flame,
            enchantment: { level: 1, type: new EnchantmentType(enchantments.flame) },
        },
        {
            id: enchantments.fortune,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.fortune),
            },
        },
        {
            id: enchantments.frostWalker,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.frostWalker),
            },
        },
        {
            id: enchantments.impaling,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.impaling),
            },
        },
        {
            id: enchantments.infinity,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.infinity),
            },
        },
        {
            id: enchantments.knockback,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.knockback),
            },
        },
        {
            id: enchantments.looting,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.looting),
            },
        },
        {
            id: enchantments.loyalty,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.loyalty),
            },
        },
        {
            id: enchantments.luckOfTheSea,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.luckOfTheSea),
            },
        },
        {
            id: enchantments.lure,
            enchantment: { level: 1, type: new EnchantmentType(enchantments.lure) },
        },
        {
            id: enchantments.mending,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.mending),
            },
        },
        {
            id: enchantments.multishot,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.multishot),
            },
        },
        {
            id: enchantments.piercing,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.piercing),
            },
        },
        {
            id: enchantments.power,
            enchantment: { level: 1, type: new EnchantmentType(enchantments.power) },
        },
        {
            id: enchantments.projectileProtection,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.projectileProtection),
            },
        },
        {
            id: enchantments.protection,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.protection),
            },
        },
        {
            id: enchantments.punch,
            enchantment: { level: 1, type: new EnchantmentType(enchantments.punch) },
        },
        {
            id: enchantments.quickCharge,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.quickCharge),
            },
        },
        {
            id: enchantments.respiration,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.respiration),
            },
        },
        {
            id: enchantments.riptide,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.riptide),
            },
        },
        {
            id: enchantments.sharpness,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.sharpness),
            },
        },
        {
            id: enchantments.silkTouch,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.silkTouch),
            },
        },
        {
            id: enchantments.smite,
            enchantment: { level: 1, type: new EnchantmentType(enchantments.smite) },
        },
        {
            id: enchantments.soulSpeed,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.soulSpeed),
            },
        },
        {
            id: enchantments.thorns,
            enchantment: { level: 1, type: new EnchantmentType(enchantments.thorns) },
        },
        {
            id: enchantments.unbreaking,
            enchantment: {
                level: 1,
                type: new EnchantmentType(enchantments.unbreaking),
            },
        },
    ];
});
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const inv = player.getComponent("inventory")?.container;
        for (let i = 0; i < inv?.size; i++) {
            const item = inv?.getItem(i);
            const enchantedBook = item?.hasTag("betterend:enchanted_book");
            if (item && enchantedBook) {
                const enchant = item.typeId.split(":")[1];
                const book = new ItemStack("minecraft:enchanted_book");
                const enchantable = book.getComponent("enchantable");
                const index = enchantedBooks.findIndex((e) => e.id === enchant);
                enchantable.addEnchantment(enchantedBooks[index].enchantment);
                inv?.setItem(i, book);
            }
        }
    }
}, 100);
