<script>
	import { page } from '$app/stores';
	import { HeaderRoutes } from '../routes';
</script>

<header class="bg-white p-4 shadow-md">
	<!-- Logo Section -->
	<div class="container mx-auto flex justify-between items-center">
		<div class="flex items-center w-full">
			<a href="/" class="flex items-center space-x-2">
				<img src="" alt="Closet Logo" class="w-8 h-8" />
				<span class="text-xl font-semibold text-gray-700">Overfitter</span>
			</a>

			<!-- Navigation Bar -->
			<nav class="w-full">
				<ul class="flex gap-4 mx-4">
					{#each HeaderRoutes as { path, name }}
						<li aria-current={$page.url.pathname === path ? 'page' : undefined}>
							<a href={path} class="text-gray-600 hover:text-gray-800">{name}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="flex items-center">
			<!-- Search Bar -->
			<div class="relative">
				<input
					type="text"
					id="search"
					placeholder="Search..."
					class="border border-gray-300 rounded-md p-2 pl-10"
				/>
				<svg
					class="absolute top-2 left-2 w-6 h-6 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>

			<!-- Profile Dropdown (This can be further enhanced with JS for dropdown behavior) -->
			<div class="ml-4 relative">
				<img
					src="path-to-user-profile-pic.jpg"
					alt="User's Profile Pic"
					class="w-8 h-8 rounded-full"
				/>
				<ul
					class="absolute mt-2 right-0 w-48 bg-white shadow-lg rounded-lg py-2 hidden"
					id="profile-dropdown"
				>
					<li>
						<a href="#my-profile" class="block px-4 py-2 text-gray-600 hover:bg-gray-100"
							>My Profile</a
						>
					</li>
					<li>
						<a href="#notifications" class="block px-4 py-2 text-gray-600 hover:bg-gray-100"
							>Notifications</a
						>
					</li>
					<li>
						<a href="#settings" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">Settings</a>
					</li>
					<li>
						<a href="#logout" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</header>
