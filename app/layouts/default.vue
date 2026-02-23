<template>
	<div class="flex min-h-screen bg-slate-50 font-sans text-slate-900">
		<aside
			class="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white hidden md:flex flex-col border-r border-slate-800">
			<div
				class="p-4 text-xl font-bold tracking-tight flex items-center gap-2 border-b border-slate-800 min-h-[75px]">
				<span class="text-blue-400">
					<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 73 73" version="1.1">
						<g id="frameworks-and-libraries/vue" stroke="none" stroke-width="1" fill="none"
							fill-rule="evenodd">
							<g id="container" transform="translate(2.000000, 2.000000)" fill="#FFFFFF"
								fill-rule="nonzero" stroke="#34495E" stroke-width="2">
								<rect id="mask" x="-1" y="-1" width="71" height="71" rx="14">

								</rect>
							</g>
							<g id="Vue.js_Logo_2" transform="translate(11.000000, 14.000000)" fill-rule="nonzero">
								<g id="Group"
									transform="translate(26.036066, 22.633736) scale(-1, 1) rotate(-180.000000) translate(-26.036066, -22.633736) translate(0.134827, 0.133669)">
									<g transform="translate(0.015698, 0.002616)" fill="#41B883" id="Shape">
										<polygon
											points="31.6570702 44.7385042 25.7262097 34.4659157 19.7953491 44.7385042 0.0447385042 44.7385042 25.7262097 0.256396106 51.4076808 44.7385042">

										</polygon>
									</g>
									<g transform="translate(10.219216, 17.793366)" fill="#34495E" id="Shape">
										<polygon
											points="21.4535517 26.947754 15.5226912 16.6751655 9.59183064 26.947754 0.113808475 26.947754 15.5226912 0.259012392 30.9315739 26.947754">

										</polygon>
									</g>
								</g>
							</g>
						</g>
					</svg>
				</span>
				<h2 class="text-2xl px-2">
					<NuxtLink :to="'/'">
						AuditSystem
					</NuxtLink>
				</h2>
			</div>

			<nav class="flex-1 p-4 space-y-1">
				<AppNavItem to="/audits" label="Auditorias">
					<svg viewBox="0 0 24 24" width="18" height="18" class="inline-block">
						<path fill="currentColor"
							d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z">
						</path>
					</svg>
				</AppNavItem>
			</nav>

			<div class="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
				v1.0.0 - Prueba Técnica
			</div>
		</aside>
		<div class="flex-1 md:pl-64 flex flex-col w-full">
			<header
				class="bg-white border-b border-slate-200 flex items-center justify-between md:justify-end md:px-8 p-4 sticky top-0 z-10 shadow-sm min-h-[75px]">
				<h2 class="md:hidden block text-2xl font-bold text-blue-500">AuditSystem</h2>
				<AppMediaObject></AppMediaObject>
			</header>
			<main class="p-4 md:p-8 max-w-7xl mx-auto w-full">
				<slot></slot>
			</main>
		</div>
	</div>
</template>