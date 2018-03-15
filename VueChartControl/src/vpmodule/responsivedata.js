import { Line } from 'vue-chartjs'

export default {
	//extends: Line,
	template: '<canvas id="myChart" width="500" height="300"></canvas>',
	mounted() {
		this.printChart('myChart');
	},
	data() {
		return {
			rows: [],
			labels: [],
			label: '',
			yAxes: 0,
			xAxes: 0,
		}
	},
	methods: {
		printChart(canvasid) {
			var context = document.getElementById(canvasid);
			var data = {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [
					{
						data: [0, 0, 20, 0, 0, 100, 100],
						fill: false,
						lineTension: 0.1,
						backgroundColor: 'rgba(75,192,192,0.4)',
						borderWidth: 3,
						borderColor: 'rgba(75,192,192,1)',
						borderCapStyle: 'round',
						borderJoinStyle: 'round',
						pointBorderColor: 'rgba(75,192,192,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(75,192,192,1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 3,
						pointHitRadius: 20,
						pointStyle: 'circle',
					}
				]
			};
			var myBarChart = Chart.Line(context, {
				data: data,
				options: {}
			});
		}
	}
}
