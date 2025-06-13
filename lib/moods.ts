export interface Mood{
    name: string;
    department: string;
    mood: number;
    comment: string;
    timestamp: string;
}

export const moods = [
    { emoji: "😄", label: "Excellent", value: 5, color: "bg-green-500" },
    { emoji: "😊", label: "Good", value: 4, color: "bg-lime-500" },
    { emoji: "😐", label: "Neutral", value: 3, color: "bg-yellow-500" },
    { emoji: "😔", label: "Poor", value: 2, color: "bg-orange-500" },
    { emoji: "😢", label: "Terrible", value: 1, color: "bg-red-500" },
]

let moodEntries: Mood[] = [];

export function addMoodEntry(mood: Mood) {
    moodEntries.push(mood);
}

export function getAllMoods(): Mood[] {
    return moodEntries;
}