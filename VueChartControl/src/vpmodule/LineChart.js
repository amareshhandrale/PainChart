import { Line } from 'vue-chartjs'

export default {
	//extends: Line,
	template: '<div style="width:60%;height:60%" id="myChartDiv"></div>',
	mounted() {
		//axios.get('api/VPVueapi/PainChartDetails/painlist').then(function (response) {
		//	var values = response.data.data;
		//	for (var item in values) {
		//		self.data.datasets[0].data.push(values[item]['value']);
		//		self.data.labels.push(values[item]['id']);
		//	}
		//	self.isLoading = false;
		//}).catch(function (error) {
		//	console.log(error);
		//	self.isLoading = false;
		//	self.isError = true;
		//});

		var paindata = [
			{
				"PainScoringtype": 4,//0-10
				"PainType": 0,//standard
				"PainScore": -1,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			},
			{
				"PainScoringtype": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 8,
				"PainAssessmentTime": "2018-03-02T10:27:10Z"
			},

			{
				"PainScoringtype": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 5,
				"PainAssessmentTime": "2018-03-03T09:29:15Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 1,
				"PainAssessmentTime": "2017-03-02T10:27:10Z"
			},

			{
				"PainScoringtype": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 3,
				"PainAssessmentTime": "2018-04-02T09:29:15Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 1,
				"PainAssessmentTime": "2018-03-02T10:34:56Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T10:13:00Z"
			},

			{
				"PainScoringtype": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 0,
				"PainAssessmentTime": "2018-03-06T06:21:22Z"
			},
			{
				"PainScoringtype": 3,//0-18
				"PainType": 1,//abbey
				"PainScore": 6,
				"PainAssessmentTime": "2018-03-05T07:31:08Z"
			},
			{
				"PainScoringtype": 3,//0-18
				"PainType": 1,//abbey
				"PainScore": 9,
				"PainAssessmentTime": "2018-04-05T07:31:08Z"
			},
			{
				"PainScoringtype": 3,//0-18
				"PainType": 1,//abbey
				"PainScore": 3,
				"PainAssessmentTime": "2018-03-08T07:31:08Z"
			}

		]

		function organize(rows, groupBy) {
			var last = groupBy.length - 1;
			return rows.reduce((res, obj) => {
				groupBy.reduce((res, grp, i) =>
					res[obj[grp]] || (res[obj[grp]] = i == last ? [] : {}), res).push(obj);
				return res;
			}, {});
		}
		function getChildren(source) {
			var lineChartData = {
				labels: [],
				rows: [],
				label: '',
				yAxesMax: 0,
				yAxesMin: 0
			};
			if (source.find(x => x.PainScore == -1)){
				lineChartData.yAxesMin = -1;
			}
			for (var index in source) {
				switch (source[index]['PainType']) {
					case 0:
						lineChartData.label = 'Standard';
						break;
					case 1:
						lineChartData.label = 'Abbey';
						break;
					case 2:
						lineChartData.label = 'Flacc';
						break;
					case 3:
						lineChartData.label = 'Wongbaker';
						break;
				}
				switch (source[index]['PainScoringtype']) {
					case 0:
						lineChartData.yAxesMax = 3;//StandardZeroToThree
						break;
					case 1:
						lineChartData.yAxesMax = 3;//BakerZeroToThree
						break;
					case 2:
						lineChartData.yAxesMax = 10;//FLACCZeroToten
						break;
					case 3:
						lineChartData.yAxesMax = 18;//AbbeyZeroToEighteen
						break;
					case 4:
						lineChartData.yAxesMax = 10;//StandardZeroToTen
						break;
					case 5:
						lineChartData.yAxesMax = 10;//WongBakerZeroToTen
						break;
				}
				lineChartData.labels.push(new Date(source[index]['PainAssessmentTime']));
				lineChartData.rows.push(source[index]['PainScore']);
			}
			return lineChartData;
		}
		function loadCanvas(id) {
			var canvas = document.createElement('canvas');
			var div = document.getElementById('myChartDiv');
			canvas.id = id;
			div.appendChild(canvas)
		}

		function sortData(value) {
			value.sort((a, b) => {
				return new Date(a.PainAssessmentTime) - new Date(b.PainAssessmentTime);
			});
			return value;
		}
		var values = organize(paindata, ['PainType', 'PainScoringtype']);
		for (var item in values) {
			this.labels = [];
			this.rows = [];
			this.yAxesMax = 0;
			this.yAxesMin = 0;
			this.xAxes = 0;
			var childnode = values[item];
			for (var child in childnode) {
				var canvasid = "myChart" + item + child;
				loadCanvas(canvasid)
				sortData(childnode[child])
				var result = getChildren(childnode[child])
				this.labels = result.labels;
				this.rows = result.rows;
				this.label = result.label;
				this.yAxesMin = result.yAxesMin;
				this.yAxesMax = result.yAxesMax;
				var newdate = new Date(this.labels[this.labels.length - 1]);
				//this.xAxes = new Date(this.labels[this.labels.length - 1]);
				//this.labels.push(new Date(newdate.setDate(3)));
				this.printChart(canvasid);
			}
		}


	},
	data() {
		return {
			rows: [],
			labels: [],
			label: '',
			yAxesMin:0,
			yAxesMax: 0,
            xAxes:0,
		}
	},
	methods: {
		printChart(canvasid) {
			var context = document.getElementById(canvasid);
			var data = {
				labels: this.labels,
				datasets: [
					{
						data: this.rows,
						label: this.label,
						borderColor: "rgb(0, 89, 179)",
						fill: false,
						pointBackgroundColor: '#0059b3',
						borderWidth: 2,
						pointBorderColor: '#0059b3',
						pointRadius: 4,
						linetension: '0',
						//borderWidth: 5,
                        pointborderwidth : '10',
						pointbordercolor: '#0059b3',
                        pointhoverborderwidth : '3',
						pointhoverbackgroundcolor: '#4a70ad',
						pointhoverbordercolor: '#4a70ad',
					}
				]
			};
			var myLineChart = Chart.Line(context, {
				//type: 'line',
				data: data,
				options: {
					//title: {
					//	display: true,
					//	text: 'Pain Chart'
					//},
					scaleShowValues: true,
					scales: {
						yAxes: [{
							ticks: {
								min: this.yAxesMin,
								max: this.yAxesMax,
								callback: function (value, index, values) {
									if (value == -1) {
										return 'U/A';
									}
									else {
										return value;
									}
									
								}
							},
							gridLines: {
								drawBorder: true,
								displayOnChartArea: true,
							}
            }],
						xAxes: [{
							ticks: {
								//min: 0,
								//max: this.xAxes,
								autoSkip: false
							},
                            position: 'top',
							gridLines: {
								drawBorder: true,
								displayOnChartArea: true,
							},
							type: 'time',
							time: {
								displayFormats: {
									'millisecond': 'DD-MMM-YY h:mm:ss',
									'second': 'DD-MMM-YY h:mm:ss',
									'minute': 'DD-MMM-YY h:mm:ss',
									'hour': 'DD-MMM-YY h:mm:ss',
									'day': 'DD-MMM-YY h:mm:ss',
									'week': 'DD-MMM-YY h:mm:ss',
									'month': 'DD-MMM-YY h:mm:ss',
									'quarter': 'DD-MMM-YY h:mm:ss',
									'year': 'DD-MMM-YY h:mm:ss',
								}
							}
                             
						}],
					},
				}
			},);
		}
	}
}
