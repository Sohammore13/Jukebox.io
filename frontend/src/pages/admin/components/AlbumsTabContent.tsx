import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Disc } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTabContent = () => {
	return (
		<Card className='glass-panel border border-[#9B5CFF]/20 rounded-2xl'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='flex items-center gap-2 text-white'>
							<Disc className='h-5 w-5 text-[#FF5CA8]' />
							Master Albums Catalog
						</CardTitle>
						<CardDescription className='text-[#94A3B8] text-xs'>
							Manage full albums and associated tracklists
						</CardDescription>
					</div>
					<AddAlbumDialog />
				</div>
			</CardHeader>

			<CardContent>
				<AlbumsTable />
			</CardContent>
		</Card>
	);
};
export default AlbumsTabContent;
