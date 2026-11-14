import { useMusicStore } from "@/stores/useMusicStore";
import { Disc, ListMusic, Users, Radio } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
	const { stats } = useMusicStore();

	const statsData = [
		{
			icon: ListMusic,
			label: "Aurora Tracks",
			value: stats.totalSongs.toString(),
			bgColor: "bg-[#9B5CFF]/15",
			iconColor: "text-[#9B5CFF]",
			borderColor: "border-[#9B5CFF]/30",
		},
		{
			icon: Disc,
			label: "Master Albums",
			value: stats.totalAlbums.toString(),
			bgColor: "bg-[#32D9FF]/15",
			iconColor: "text-[#32D9FF]",
			borderColor: "border-[#32D9FF]/30",
		},
		{
			icon: Users,
			label: "Featured Artists",
			value: stats.totalArtists.toString(),
			bgColor: "bg-[#FF5CA8]/15",
			iconColor: "text-[#FF5CA8]",
			borderColor: "border-[#FF5CA8]/30",
		},
		{
			icon: Radio,
			label: "Cosmic Listeners",
			value: stats.totalUsers.toLocaleString(),
			bgColor: "bg-indigo-500/15",
			iconColor: "text-indigo-400",
			borderColor: "border-indigo-500/30",
		},
	];

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 select-none'>
			{statsData.map((stat) => (
				<StatsCard
					key={stat.label}
					icon={stat.icon}
					label={stat.label}
					value={stat.value}
					bgColor={stat.bgColor}
					iconColor={stat.iconColor}
					borderColor={stat.borderColor}
				/>
			))}
		</div>
	);
};
export default DashboardStats;
