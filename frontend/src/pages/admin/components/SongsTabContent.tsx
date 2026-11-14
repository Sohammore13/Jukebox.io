import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
	return (
		<Card className='glass-panel border border-[#9B5CFF]/20 rounded-2xl'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='flex items-center gap-2 text-white'>
							<Music className='size-5 text-[#32D9FF]' />
							Aurora Tracks Catalog
						</CardTitle>
						<CardDescription className='text-[#94A3B8] text-xs'>
							Manage audio streams, durations and metadata
						</CardDescription>
					</div>
					<AddSongDialog />
				</div>
			</CardHeader>
			<CardContent>
				<SongsTable />
			</CardContent>
		</Card>
	);
};
export default SongsTabContent;
