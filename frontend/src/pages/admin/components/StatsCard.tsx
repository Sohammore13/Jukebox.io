import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
	icon: React.ElementType;
	label: string;
	value: string;
	bgColor: string;
	iconColor: string;
	borderColor: string;
};

const StatsCard = ({ bgColor, icon: Icon, iconColor, borderColor, label, value }: StatsCardProps) => {
	return (
		<Card className={`glass-panel border ${borderColor} hover:scale-[1.02] transition-all duration-300 shadow-lg`}>
			<CardContent className='p-5'>
				<div className='flex items-center gap-4'>
					<div className={`p-3 rounded-xl ${bgColor} border ${borderColor} shadow-sm`}>
						<Icon className={`size-6 ${iconColor}`} />
					</div>
					<div>
						<p className='text-xs font-semibold uppercase tracking-wider text-[#94A3B8]'>{label}</p>
						<p className='text-2xl font-black text-white mt-0.5'>{value}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
export default StatsCard;
