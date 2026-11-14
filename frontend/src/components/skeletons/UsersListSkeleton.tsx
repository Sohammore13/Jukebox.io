const UsersListSkeleton = () => {
	return Array.from({ length: 4 }).map((_, i) => (
		<div key={i} className='flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-xl animate-pulse'>
			<div className='size-10 rounded-full bg-[#18203B]/60 shrink-0' />
			<div className='flex-1 lg:block hidden space-y-2'>
				<div className='h-3.5 w-24 bg-[#18203B]/70 rounded-full' />
				<div className='h-2.5 w-16 bg-[#18203B]/40 rounded-full' />
			</div>
		</div>
	));
};
export default UsersListSkeleton;
