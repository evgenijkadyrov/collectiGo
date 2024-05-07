export type Category =
    "Prints and Drawing" | "Drawing" | "Paper" | "Collage"

export interface ArtCollection {
    collection_id: string;
    title: string;
    category: Category;
    picture: string;
}

export interface ArtDataItem {
    items_id: string;
    collection_id: string;
    title: string;
    tags: string[];
    author?: string;
    content?: string;
    year?: number;
}

export const collections: ArtCollection[] = [
    {
        collection_id: "1",
        title: "Abstract Forms",
        category: "Prints and Drawing",
        picture: "abstract1.jpg",
    },
    {
        collection_id: "2",
        title: "Nature's Beauty",
        category: "Drawing",
        picture: "nature1.jpg",

    }
];

export const items: ArtDataItem[] = [
    {
        items_id: "1",
        collection_id: "1",
        title: "Sunset Serenade",
        tags: ["nature", "landscape", "sunset"],
        author: "Emma Wilson",
        content: "Pencil on paper",
        year: 2023,
    },
    {
        items_id: "2",
        collection_id: "1",
        title: "Floral Symphony",
        tags: ["nature", "flowers", "colorful"],
        author: "David Thompson",
        content: "Watercolor on paper",
        year: 2022,
    },
    {
        items_id: "3",
        collection_id: "1",
        title: "Enchanted Forest",
        tags: ["nature", "trees", "mystical"],
        author: "Sophia Adams",
        content: "Ink on paper",
        year: 2021,
    },
    {
        items_id: "4",
        collection_id: "1",
        title: "Coastal Breeze",
        tags: ["nature", "seascape", "waves"],
        author: "Ryan Miller",
        content: "Charcoal on paper",
        year: 2019,
    },
    {
        items_id: " 5",
        collection_id: "1",
        title: "Mountain Majesty",
        tags: ["nature", "mountains", "scenic"],
        author: "Ethan Davis",
        content: "Graphite on paper",
        year: 2020,
    },
    {
        items_id: "1",
        collection_id: " 2",
        title: "Untitled",
        tags: ["abstract", "shapes", "lines"],
        author: "John Smith",
        content: "Mixed media on paper",
        year: 2020,
    },
    {
        items_id: "2",
        collection_id: "2",
        title: "Exploration",
        tags: ["geometric", "colorful", "patterns"],
        author: "Emily Johnson",
        content: "Graphite on paper",
        year: 2019,
    },
    {
        items_id: " 3",
        collection_id: " 2",
        title: "Transcendence",
        tags: ["organic", "fluid", "movement"],
        author: "Sarah Thompson",
        content: "Ink on paper",
        year: 2021,
    },
    {
        items_id: "4",
        collection_id: "2",
        title: "Symphony in Blue",
        tags: ["abstract", "expressionism", "blue"],
        author: "Michael Anderson",
        content: "Watercolor on paper",
        year: 2018,
    },
    {
        items_id: "5",
        collection_id: "2",
        title: "Harmony",
        tags: ["balance", "serenity", "pastel"],
        author: "Olivia Davis",
        content: "Charcoal on paper",
        year: 2022,
    },
]