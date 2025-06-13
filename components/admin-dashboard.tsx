import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, BarChart3, Download, Filter, Loader2 } from "lucide-react"
import axios from 'axios'
import { moods, type Mood } from "@/lib/moods"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge"

export function AdminDashboard() {

    const [entries, setEntries] = useState<Mood[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchMoods = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("/api/moods")
            console.log(response);
            setEntries(response.data.data)
        } catch (error) {
            setError("Error loading data. Please try again.")
            console.log(error);
        } finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchMoods();
    }, [])

    const averageMood =
        entries.length > 0
            ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1)
            : "0"

    const getMoodEmoji = (moodValue: number) => {
        return moods.find((m) => m.value === moodValue)?.emoji || "😐"
    }

    const getMoodLabel = (moodValue: number) => {
        return moods.find((m) => m.value === moodValue)?.label || "Neutral"
    }

    const moodDistribution = moods.map((mood) => ({
        ...mood,
        count: entries.filter((entry) => entry.mood === mood.value).length,
    }))

    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
                    <p className="text-gray-600 dark:text-gray-300">Monitor team mood and wellness</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{entries.length}</div>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            {averageMood}
                            <span className="text-lg">{getMoodEmoji(Math.round(Number.parseFloat(averageMood)))}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Out of 5.0 scale</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Most Common Mood</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            {moodDistribution.reduce((prev, current) => (prev.count > current.count ? prev : current)).emoji}
                            <span className="text-base">
                                {moodDistribution.reduce((prev, current) => (prev.count > current.count ? prev : current)).label}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {moodDistribution.reduce((prev, current) => (prev.count > current.count ? prev : current)).count}{" "}
                            responses
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Mood Distribution</CardTitle>
                    <CardDescription>Visual breakdown of team mood responses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {moodDistribution.map((mood) => (
                            <div key={mood.value} className="flex items-center gap-4">
                                <div className="flex items-center gap-2 w-24">
                                    <span className="text-2xl">{mood.emoji}</span>
                                    <span className="text-sm font-medium">{mood.label}</span>
                                </div>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                                    <div
                                        className={`${mood.color} h-4 rounded-full transition-all duration-500`}
                                        style={{
                                            width: entries.length > 0 ? `${(mood.count / entries.length) * 100}%` : "0%",
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-medium w-12 text-right">{mood.count}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Mood Entries</CardTitle>
                    <CardDescription>Latest mood submissions from your team</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2">Loading mood entries...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">
                            <p>{error}</p>
                            <Button variant="outline" className="mt-4" onClick={() => fetchMoods()}>
                                Retry
                            </Button>
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No mood entries found</p>
                            <p className="text-sm">Encourage your team to submit their mood!</p>
                        </div>
                    ) : (
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Mood</TableHead>
                                        <TableHead className="hidden md:table-cell">Comment</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {entries.map((entry, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{entry.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{entry.department.charAt(0).toUpperCase() + entry.department.slice(1)}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                                                    <span className="text-sm hidden sm:inline">{getMoodLabel(entry.mood)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate hidden md:table-cell">{entry.comment || "No comment"}</TableCell>
                                            <TableCell>{new Date(entry.timestamp).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}