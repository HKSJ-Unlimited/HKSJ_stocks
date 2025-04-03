"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation";

const PerformanceChart = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const metric = searchParams.get("metric") ?? "100";

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("metric", value)
        router.replace(`/dashboard/performance?${params}`)
    }
    return (
        <div className="mt-6 flex w-full justify-between items-center">
            <div></div>
            <Tabs onValueChange={handleTabChange} defaultValue={metric} className="w-[400px]">
                <TabsList >
                    <TabsTrigger value="1">1M</TabsTrigger>
                    <TabsTrigger value="3">3M</TabsTrigger>
                    <TabsTrigger value="6">6M</TabsTrigger>
                    <TabsTrigger value="12">1Y</TabsTrigger>
                    <TabsTrigger value="24">2Y</TabsTrigger>
                    <TabsTrigger value="60">5Y</TabsTrigger>
                    <TabsTrigger value="100">YTD</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}

export default PerformanceChart;