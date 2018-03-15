import Vue from 'vue'
import Router from 'vue-router'
import PainTrend from '@/components/PainChartTrend'
import PainChartJs from '@/components/PainChartChartjs'
import ResponsiveJs from '@/components/ResponsiveChart'
import ActivityGraph from '@/components/ActivityGraph'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
	  name: 'PainChart',
	  component: PainTrend
	  },
	{
		path: '/PainChartChartjs',
		name: 'PainChart',
		component: PainChartJs
	},
	{
		path: '/ResponsiveChart',
		name: 'PainChart',
		component: ResponsiveJs
	},
	{
		path: '/ResponsiveChart',
		name: 'PainChart',
		component: ResponsiveJs
	},
	{
		path: '/ActivityGraph',
		name: 'PainChart',
		component: ActivityGraph
	}
  ]
})
