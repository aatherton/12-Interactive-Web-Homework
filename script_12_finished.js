// json
let parameters = {
	columns : [
	{
		title: 'date/time',
		html: function (row) { return row.datetime; }
	},
	{
		title: 'city',
		html: function (row) { return row.city; }
	},
	{
		title: 'state',
		html: function (row) { return row.state; }
	},
	{
		title: 'country',
		html: function (row) { return row.country; }
	},
	{
		title: 'shape',
		html: function (row) { return row.shape; }
	},
	{
		title: 'comment',
		html: function (row) { return row.comments; }
	},
	],
	data: null,
	filtered_data: null
};

let myD3 = d3.select('#my-d3');

let incomeDropDown = d3.select('#income');

function loadDropDown() {
	let dropDownOptions = new Set();
	dropDownOptions.add('All');
	dropDownOptions.add('35000');
	dropDownOptions.add('60000');
	dropDownOptions.add('80000');
	dropDownOptions.add('100000');

	incomeDropDown.on('change', onchange);

	let options = incomeDropDown
		.selectAll('option')
		.data([...dropDownOptions])
		.enter()
		.append('option')
		.attr('value', function(d) { return d;})
		.text(function(d) {return d;});

}

function onchange() {
	let selectValue = d3.select('#income')
		.property('value');
	console.log(selectValue);
	parameters.filtered_data = [];
	for (let row of parameters.data) {
		if (selectValue === 'All') {
			parameters.filtered_data.push(row);
		}
		else if (parseFloat(row['Household Income']) >= parseFloat(selectValue)) {
		parameters.filtered_data.push(row);
		}
	}
	//console.log(parameters.filtered_data);
	createTables();
}

function init(censusData) {
	parameters.data = censusData;
	parameters.filtered_data = censusData;
	createTables();
	loadDropDown();
}

// d3.json('data/census.json', init);
// replace this with just calling init on the incoming variable

init(dataSet)

function createTables() {
	myD3.html('');
	let table = d3.select('#my-d3')
		.append('table')
		.attr('class', 'table');

	table.append('thead')
		.append('tr')
		.selectAll('th')
		.data(parameters['columns'])
		.enter()
		.append('th')
		.text(function (data) { return data.title; });

	table.append('tbody')
		.selectAll('tr') // create row for each row of data
		.data(parameters.filtered_data)
		.enter()
		.append('tr')
		.selectAll('td')
		.data(function (row) {
		// evaluate column objects against the current row
		return parameters.columns.map(function (column) {
			var cell = {};
			d3.keys(column).forEach(function (k) {
				if (typeof (column[k]) === 'function') {
					cell[k] = column[k](row)
				}
			});
			return cell;
		});
		})
		.enter()
		.append('td')
		.text(function (data) { return data.html; });
}