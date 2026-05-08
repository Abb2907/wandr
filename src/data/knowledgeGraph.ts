import { 
  Sun, Star, Coffee, Utensils, Mountain, Camera, Zap, Home 
} from "lucide-react";

export type ActivityTag = "aurora" | "ember" | "sapphire";

export interface Activity {
  id: string;
  name: string;
  type: string;
  icon: any; // Lucide icon
  duration: string;
  cost: number;
  tag: ActivityTag;
  location?: { lat: number; lng: number; area: string };
  weatherDependency?: "indoor" | "outdoor" | "all-weather";
}

export const KnowledgeGraph: Record<string, Activity> = {
  "act-001": {
    id: "act-001",
    name: "Check in: Alaya Resort",
    type: "Stay",
    icon: Home,
    duration: "30m",
    cost: 0,
    tag: "aurora",
    weatherDependency: "all-weather",
    location: { lat: -8.518, lng: 115.263, area: "Ubud" }
  },
  "act-002": {
    id: "act-002",
    name: "Ubud Sacred Monkey Forest",
    type: "Attraction",
    icon: Camera,
    duration: "2h",
    cost: 640,
    tag: "aurora",
    weatherDependency: "outdoor",
    location: { lat: -8.519, lng: 115.258, area: "Ubud" }
  },
  "act-003": {
    id: "act-003",
    name: "Sunset at Campuhan Ridge Walk",
    type: "Nature",
    icon: Mountain,
    duration: "1.5h",
    cost: 0,
    tag: "aurora",
    weatherDependency: "outdoor",
    location: { lat: -8.503, lng: 115.254, area: "Ubud" }
  },
  "act-004": {
    id: "act-004",
    name: "Dinner: Locavore Restaurant",
    type: "Dining",
    icon: Utensils,
    duration: "2h",
    cost: 5200,
    tag: "ember",
    weatherDependency: "indoor",
    location: { lat: -8.509, lng: 115.262, area: "Ubud" }
  },
  "act-005": {
    id: "act-005",
    name: "Sunrise yoga: Bali Spirit",
    type: "Wellness",
    icon: Sun,
    duration: "1.5h",
    cost: 1600,
    tag: "sapphire",
    weatherDependency: "indoor",
    location: { lat: -8.520, lng: 115.260, area: "Ubud" }
  },
  "act-006": {
    id: "act-006",
    name: "Tirta Empul Water Temple",
    type: "Culture",
    icon: Star,
    duration: "2h",
    cost: 400,
    tag: "sapphire",
    weatherDependency: "outdoor",
    location: { lat: -8.414, lng: 115.315, area: "Tampaksiring" }
  },
  "act-007": {
    id: "act-007",
    name: "Lunch: Warung Sopa",
    type: "Dining",
    icon: Utensils,
    duration: "1h",
    cost: 960,
    tag: "ember",
    weatherDependency: "indoor",
    location: { lat: -8.509, lng: 115.263, area: "Ubud" }
  },
  "act-008": {
    id: "act-008",
    name: "Goa Gajah (Elephant Cave)",
    type: "Attraction",
    icon: Camera,
    duration: "1.5h",
    cost: 320,
    tag: "aurora",
    weatherDependency: "outdoor",
    location: { lat: -8.523, lng: 115.286, area: "Bedulu" }
  },
  "act-009": {
    id: "act-009",
    name: "Kecak Fire Dance, Uluwatu",
    type: "Culture",
    icon: Zap,
    duration: "2h",
    cost: 1440,
    tag: "ember",
    weatherDependency: "outdoor",
    location: { lat: -8.829, lng: 115.084, area: "Uluwatu" }
  },
  "act-010": {
    id: "act-010",
    name: "Mount Batur Sunrise Trek",
    type: "Adventure",
    icon: Mountain,
    duration: "6h",
    cost: 4400,
    tag: "aurora",
    weatherDependency: "outdoor",
    location: { lat: -8.239, lng: 115.377, area: "Kintamani" }
  },
  "act-011": {
    id: "act-011",
    name: "Kintamani hot springs recovery",
    type: "Wellness",
    icon: Coffee,
    duration: "2h",
    cost: 1760,
    tag: "sapphire",
    weatherDependency: "outdoor",
    location: { lat: -8.245, lng: 115.380, area: "Kintamani" }
  },
  "act-012": {
    id: "act-012",
    name: "Tegallalang Rice Terrace",
    type: "Nature",
    icon: Camera,
    duration: "2h",
    cost: 240,
    tag: "aurora",
    weatherDependency: "outdoor",
    location: { lat: -8.433, lng: 115.279, area: "Tegallalang" }
  },
  "act-013": {
    id: "act-013",
    name: "Dinner: Mozaic Restaurant",
    type: "Dining",
    icon: Utensils,
    duration: "2.5h",
    cost: 7600,
    tag: "ember",
    weatherDependency: "indoor",
    location: { lat: -8.504, lng: 115.253, area: "Ubud" }
  },
  "act-014": {
    id: "act-014",
    name: "Puri Lukisan Art Museum",
    type: "Indoor Culture",
    icon: Star,
    duration: "2h",
    cost: 400,
    tag: "sapphire",
    weatherDependency: "indoor",
    location: { lat: -8.505, lng: 115.259, area: "Ubud" }
  },
  "act-015": {
    id: "act-015",
    name: "Bali Swing Experience",
    type: "Adventure",
    icon: Zap,
    duration: "2h",
    cost: 2000,
    tag: "aurora",
    weatherDependency: "outdoor",
    location: { lat: -8.489, lng: 115.244, area: "Ubud" }
  },
  "act-016": {
    id: "act-016",
    name: "Nusa Penida Day Trip",
    type: "Adventure",
    icon: Star,
    duration: "10h",
    cost: 5600,
    tag: "sapphire",
    weatherDependency: "outdoor",
    location: { lat: -8.727, lng: 115.544, area: "Nusa Penida" }
  },
  "act-017": {
    id: "act-017",
    name: "Traditional Balinese Cooking Class",
    type: "Culture",
    icon: Utensils,
    duration: "3h",
    cost: 3200,
    tag: "ember",
    weatherDependency: "indoor",
    location: { lat: -8.500, lng: 115.260, area: "Ubud" }
  },
  "act-018": {
    id: "act-018",
    name: "Sekumpul Waterfall Trek",
    type: "Nature",
    icon: Mountain,
    duration: "4h",
    cost: 1200,
    tag: "aurora",
    weatherDependency: "outdoor",
    location: { lat: -8.173, lng: 115.184, area: "Singaraja" }
  },
  "act-019": {
    id: "act-019",
    name: "Beach Club: Potato Head",
    type: "Nightlife",
    icon: Coffee,
    duration: "4h",
    cost: 4000,
    tag: "ember",
    weatherDependency: "all-weather",
    location: { lat: -8.681, lng: 115.151, area: "Seminyak" }
  }
};
