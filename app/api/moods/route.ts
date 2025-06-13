import { addMoodEntry, getAllMoods } from "@/lib/moods";
import { NextResponse } from "next/server";

export async function POST(request:any) {
    try {
        const {name, department, mood, comment} = await request.json();
    
        if(!name || !department || !mood) {
            return new Response(JSON.stringify(
                { 
                    error: "Missing required fields" 
                }), 
                { 
                    status: 400 
                });
        }
    
        const newEntry = {
            name,
            department,
            mood,
            comment,
            timestamp: new Date().toISOString()
        }

        addMoodEntry(newEntry);
        return NextResponse.json({
            success: true,
            data: newEntry,
            message: "Mood entry added successfully!"
        },{
            status: 201
        })
    } catch (error) {
        console.error("Error processing mood entry:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to process mood entry"
        }, {
            status: 500
        })
    }
}

export async function GET() {
    try {
        const moodEntries = getAllMoods();
        return NextResponse.json({
            success: true,
            data: moodEntries
        }, {
            status: 200
        });        
    } catch (error) {
        console.error("Error fetching mood entries:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch mood entries"
        }, {
            status: 500
        })
    }
}