<template>
	<div id="">
		<commit-chart  :width="600" :height="400"></commit-chart>
		<commit-chart  :width="600" :height="400"></commit-chart>
	</div>
   
</template>

<script>
	import CommitChart from '@/vpmodule/chartdata'

	export default {
	name: 'app',
	components: {
	CommitChart
	}
	}
</script>

<style>
</style>