"use client"

import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingDown, TrendingUp } from "lucide-react";


const chartData = [
    { date: "2024-04-01", marketValue: 1050, costBasis: 1000 },
    { date: "2024-04-02", marketValue: 1100, costBasis: 1000 },
    { date: "2024-04-03", marketValue: 1200, costBasis: 1000 },
    { date: "2024-04-04", marketValue: 1300, costBasis: 1000 },
    { date: "2024-04-05", marketValue: 1400, costBasis: 1000 },
    { date: "2024-04-06", marketValue: 1500, costBasis: 1000 },
    { date: "2024-04-07", marketValue: 1600, costBasis: 1000 },
    { date: "2024-04-08", marketValue: 1700, costBasis: 1000 },
    { date: "2024-04-09", marketValue: 1800, costBasis: 1000 },
    { date: "2024-04-10", marketValue: 1900, costBasis: 1000 },
    { date: "2024-05-10", marketValue: 1500, costBasis: 1000 },
    { date: "2024-05-26", marketValue: 1300, costBasis: 1000 },
    { date: "2024-06-14", marketValue: 1100, costBasis: 1200 },
    { date: "2024-06-24", marketValue: 1000, costBasis: 1200 },
    { date: "2024-07-01", marketValue: 900, costBasis: 4200 },
    { date: "2025-03-01", marketValue: 3000, costBasis: 4200 },
    { date: "2025-04-01", marketValue: 2000, costBasis: 5200 },
    { date: "2025-04-02", marketValue: 1900, costBasis: 6200 },
    { date: "2025-04-05", marketValue: 1190, costBasis: 6222 },
    { date: "2025-04-05", marketValue: -2900, costBasis: 6220 },

]
const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    marketValue: {
        label: "Market Value",
        color: "hsl(var(--chart-2))",
    },
    costBasis: {
        label: "Cost Basis",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig
const PerformanceChart = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const metric = searchParams.get("metric") ?? "100";

    const filteredData = useMemo(() => {
        return chartData.filter((item) => {
            const date = new Date(item.date)
            const referenceDate = new Date()
            let daysToSubtract = Number(metric)
            switch (metric) {
                case "1":
                    daysToSubtract = 30
                    break;
                case "3":
                    daysToSubtract = 90
                    break;
                case "6":
                    daysToSubtract = 180
                    break;
                case "12":
                    daysToSubtract = 365
                    break;
                case "24":
                    daysToSubtract = 730
                    break;
                case "60":
                    daysToSubtract = 1825
                    break;
                case "100":
                    daysToSubtract = 0
                    break;
            }
            const startDate = new Date(referenceDate)
            startDate.setDate(startDate.getDate() - daysToSubtract)
            return date >= startDate
        })
    }, [metric])

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("metric", value)
        router.replace(`/dashboard/performance?${params}`)
    }
    const showTrend = () => {
        if (filteredData.length < 1)
            return ""
        const difference = filteredData[filteredData.length - 1]!.marketValue -
            filteredData[filteredData.length - 1]!.costBasis

        const trend = difference > 0 ? (<p className="flex gap-2 text-green-500"> Trending up by {difference}$<TrendingUp />
        </p>) : <p className="flex gap-2 text-red-500">Trending down by {difference}$ <TrendingDown /></p>
        return trend
    }
    return (
        <div className="mt-6 gap-5 flex flex-col w-full justify-between items-center">
            <div className="flex justify-between items-center w-full">
                <div>
                    <h1 className="text-2xl">Market Value</h1>
                </div>
                <Tabs onValueChange={handleTabChange} defaultValue={metric} className="w-[400px]">
                    <TabsList >
                        <TabsTrigger value="1">1M</TabsTrigger>
                        <TabsTrigger value="3">3M</TabsTrigger>
                        <TabsTrigger value="6">6M</TabsTrigger>
                        <TabsTrigger value="12">1Y</TabsTrigger>
                        <TabsTrigger value="24">2Y</TabsTrigger>
                        <TabsTrigger value="60">5Y</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        Performance
                    </CardTitle>
                    <CardDescription>
                        {showTrend()}

                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full" style={{ height: "300px" }}>
                        <ChartContainer className="w-full h-full" config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={filteredData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value: string) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-Us", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "2-digit",
                                        })
                                    }}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <Line
                                    dataKey="marketValue"
                                    type="monotone"
                                    stroke="var(--color-marketValue)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    dataKey="costBasis"
                                    type="monotone"
                                    stroke="var(--color-costBasis)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                <div className="text-sm text-muted-foreground">Total money invested vs. current market value</div>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>

        </div>
    );
}

export default PerformanceChart;