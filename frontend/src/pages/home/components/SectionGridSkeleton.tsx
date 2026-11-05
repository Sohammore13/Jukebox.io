const SectionGridSkeleton = () => {
	return (
		<div className='mb-10'>
			<div className='h-6 w-48 bg-[#18203B]/60 rounded-full mb-5 animate-pulse' />
			<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className='glass-panel border border-white/5 p-3.5 rounded-2xl animate-pulse flex flex-col'>
						<div className='aspect-square rounded-xl bg-[#18203B]/70 mb-3.5' />
						<div className='h-3.5 bg-[#18203B]/80 rounded-full w-3/4 mb-2' />
						<div className='h-2.5 bg-[#18203B]/50 rounded-full w-1/2' />
					</div>
				))}
			</div>
		</div>
	);
};
export default SectionGridSkeleton;
