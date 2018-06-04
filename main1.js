// constant inherited from data.js
dataSet = dataSet

// ### HTML construction zone ###

// make the table
let ball = d3.select("body")
	.append("table")
	.attr("id", "main_table");
// make the header row
ball.append("thead")
	.attr("id", "header_row");
// make the body
ball.append("tbody")
	.attr("id", "table_body");

// ### coding zone ###

// # build the table based on the data	
function update_table(curr_data) {
	// make the headers
	var headers = d3.select("#header_row")
		.selectAll("th")
		.data(d3.keys(curr_data[0]));
	headers.enter()
		.append("th")
		.text((d) => {return d});
	// create rows
	var rows = d3.select("#table_body")
		.selectAll("tr")
		.data(curr_data);
	rows.enter()
		.append("tr");
	// cells
	var cells = rows.selectAll("td")
		.data(d3.values(curr_data));
	cells.enter()
		.append("td")
		.text((d) => {return d});
};

update_table(dataSet);