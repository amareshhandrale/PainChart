<template id="boxes-template">
	<div >
		<boxes-checks></boxes-checks>
		<!--<CommitChart  :width="600" :height="400"></CommitChart>-->
	</div>
   
</template>



<script>
	import BoxesChecks from '@/vpmodule/responsivedata'

	export default {
	name: 'app',
	components: {
	BoxesChecks
	}
}


</script>