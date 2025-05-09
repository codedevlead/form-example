// data.ts
export const formOptions = {
    type: [
      { value: "flayer", label: "Flayers" },
      { value: "posters", label: "Posters" },
      { value: "postCard", label: "Post-Card" },
    ],
    postCard: {
      size: ["7x5"],
      materials: ["Card-stock", "Cover glossy"],
      pricing: 5
    },
    posters: {
      size: ["12x18", "80x200"],
      materials: ["Photo paper glosy", "Photo paper mate"],
      pricing: 7.15,
      rush: 10
    },
    flayer: {
      size: ["7x8", "8.5x11"],
      materials: ["Regular paper", "Glosy text 80lb", "Glosy text 100lb"],
      pricing: 0.12
    },
  };
  