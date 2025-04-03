import PerformanceChart from "./Chart";

const Performance = () => {
    return (<div className="flex flex-col w-full">
        <h1 className="text-2xl">Market Value</h1>
        <PerformanceChart />
    </div>);
}

export default Performance;