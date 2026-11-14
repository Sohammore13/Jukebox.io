const PlaylistSkeleton = () => {
	return Array.from({ length: 6 }).map((_, i) => (
		<div key={i} className='p-2 rounded-xl flex items-center gap-3'>
			<div className='size-11 bg-[#18203B]/60 rounded-lg shrink-0 animate-pulse' />
			<div className='flex-1 min-w-0 hidden md:block space-y-2'>
				<div className='h-3.5 bg-[#18203B]/60 rounded-full animate-pulse w-3/4' />
				<div className='h-2.5 bg-[#18203B]/40 rounded-full animate-pulse w-1/2' />
			</div>
		</div>
	));
};
export default PlaylistSkeleton;
