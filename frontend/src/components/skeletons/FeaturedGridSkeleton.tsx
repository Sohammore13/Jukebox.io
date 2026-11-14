const FeaturedGridSkeleton = () => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-10'>
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className='flex items-center glass-panel border border-white/5 rounded-2xl overflow-hidden animate-pulse'>
					<div className='size-18 sm:size-20 bg-[#18203B]/70 shrink-0' />
					<div className='flex-1 p-3.5 space-y-2'>
						<div className='h-3.5 bg-[#18203B]/80 rounded-full w-3/4' />
						<div className='h-2.5 bg-[#18203B]/50 rounded-full w-1/2' />
					</div>
				</div>
			))}
		</div>
	);
};
export default FeaturedGridSkeleton;
