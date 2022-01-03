export const ACCORDION_TITLES = [
    { key: "0", title: "Basic Info" },
    { key: "1", title: "Abilities" },
    { key: "2", title: "Stats" },
    { key: "3", title: "Moves" },
    { key: "4", title: "Encounters" },
];

export const constructBasicInfo = (pokemon) => {
    const { base_experience, height, order, weight } = pokemon;
    return {
        "Base Experience": base_experience,
        Height: height,
        Weight: weight,
        Rank: order,
    };
};
