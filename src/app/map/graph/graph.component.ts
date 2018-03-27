import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	this.DrawGraph()
  }

  public DrawGraph(){
	// FAKE DATA
	  var data = {
		  "geocoded_waypoints": [
			  {
				  "geocoder_status": "OK",
				  "place_id": "ChIJGUWOjU9vxkcRYIQiGvYmQ9I",
				  "types": [
					  "street_address"
				  ]
			  },
			  {
				  "geocoder_status": "OK",
				  "place_id": "ChIJreJFArNoxkcRbxmDHGFKx2w",
				  "types": [
					  "street_address"
				  ]
			  }
		  ],
		  "geometry": {
			  "coordinates": [
				  [
					  5.124008,
					  52.09238490000001
				  ],
				  [
					  5.1239781,
					  52.09239299999999
				  ],
				  [
					  5.1239781,
					  52.09239299999999
				  ],
				  [
					  5.1245861,
					  52.09307829999999
				  ],
				  [
					  5.1245861,
					  52.09307829999999
				  ],
				  [
					  5.1263285,
					  52.0929029
				  ],
				  [
					  5.1263285,
					  52.0929029
				  ],
				  [
					  5.127883700000001,
					  52.0927589
				  ],
				  [
					  5.127883700000001,
					  52.0927589
				  ],
				  [
					  5.1328118,
					  52.0911588
				  ],
				  [
					  5.1328118,
					  52.0911588
				  ],
				  [
					  5.1378254,
					  52.0944897
				  ],
				  [
					  5.1378254,
					  52.0944897
				  ],
				  [
					  5.1385608,
					  52.0943631
				  ],
				  [
					  5.1385608,
					  52.0943631
				  ],
				  [
					  5.1380737,
					  52.0935745
				  ],
				  [
					  5.1380737,
					  52.0935745
				  ],
				  [
					  5.1391271,
					  52.0927647
				  ]
			  ],
			  "type": "LineString"
		  },
		  "routes": [
			  {
				  "bounds": {
					  "northeast": {
						  "lat": 52.0944897,
						  "lng": 5.1391271
					  },
					  "southwest": {
						  "lat": 52.0911588,
						  "lng": 5.1239781
					  }
				  },
				  "copyrights": "Map data ©2018 Google",
				  "legs": [
					  {
						  "distance": {
							  "text": "1.5 km",
							  "value": 1484
						  },
						  "duration": {
							  "text": "5 mins",
							  "value": 296
						  },
						  "end_address": "Oudwijkerlaan 28, 3581 TD Utrecht, Netherlands",
						  "end_location": {
							  "lat": 52.0927647,
							  "lng": 5.1391271
						  },
						  "start_address": "Kromme Nieuwegracht 3, 3512 HC Utrecht, Netherlands",
						  "start_location": {
							  "lat": 52.09238490000001,
							  "lng": 5.124008
						  },
						  "steps": [
							  {
								  "distance": {
									  "text": "2 m",
									  "value": 2
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 0
								  },
								  "end_location": {
									  "lat": 52.09239299999999,
									  "lng": 5.1239781
								  },
								  "html_instructions": "Head <b>northwest</b> on <b>Kromme Nieuwegracht</b> toward <b>Ambachtstraat</b>",
								  "polyline": {
									  "points": "kh}|Haxg^AD"
								  },
								  "start_location": {
									  "lat": 52.09238490000001,
									  "lng": 5.124008
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "87 m",
									  "value": 87
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 16
								  },
								  "end_location": {
									  "lat": 52.09307829999999,
									  "lng": 5.1245861
								  },
								  "html_instructions": "Turn <b>right</b> onto <b>Ambachtstraat</b>",
								  "maneuver": "turn-right",
								  "polyline": {
									  "points": "mh}|H{wg^}BcBKU"
								  },
								  "start_location": {
									  "lat": 52.09239299999999,
									  "lng": 5.1239781
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "0.1 km",
									  "value": 121
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 19
								  },
								  "end_location": {
									  "lat": 52.0929029,
									  "lng": 5.1263285
								  },
								  "html_instructions": "Turn <b>right</b> onto <b>Nobelstraat</b>",
								  "maneuver": "turn-right",
								  "polyline": {
									  "points": "wl}|Hu{g^FeADeA@S?SPqC@U"
								  },
								  "start_location": {
									  "lat": 52.09307829999999,
									  "lng": 5.1245861
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "0.1 km",
									  "value": 107
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 15
								  },
								  "end_location": {
									  "lat": 52.0927589,
									  "lng": 5.127883700000001
								  },
								  "html_instructions": "Continue onto <b>Lucasbolwerk</b>/<b>Lucasbrug</b><div style=\"font-size:0.9em\">Continue to follow Lucasbrug</div>",
								  "polyline": {
									  "points": "sk}|Hqfh^FkA?IFcA@W@QDsA@]"
								  },
								  "start_location": {
									  "lat": 52.0929029,
									  "lng": 5.1263285
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "0.4 km",
									  "value": 387
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 65
								  },
								  "end_location": {
									  "lat": 52.0911588,
									  "lng": 5.1328118
								  },
								  "html_instructions": "Continue onto <b>Nachtegaalstraat</b>",
								  "polyline": {
									  "points": "wj}|Hgph^JcCDc@Bg@BU?UJe@He@Rs@Ts@dAyCJYPe@d@{AL_@H[J_@VgAH[Ts@"
								  },
								  "start_location": {
									  "lat": 52.0927589,
									  "lng": 5.127883700000001
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "0.5 km",
									  "value": 505
								  },
								  "duration": {
									  "text": "2 mins",
									  "value": 109
								  },
								  "end_location": {
									  "lat": 52.0944897,
									  "lng": 5.1378254
								  },
								  "html_instructions": "Turn <b>left</b> onto <b>Maliebaan</b>",
								  "maneuver": "turn-left",
								  "polyline": {
									  "points": "w`}|Haoi^cDsFo@eAsJkPg@aAi@cA"
								  },
								  "start_location": {
									  "lat": 52.0911588,
									  "lng": 5.1328118
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "66 m",
									  "value": 66
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 36
								  },
								  "end_location": {
									  "lat": 52.0943631,
									  "lng": 5.1385608
								  },
								  "html_instructions": "At the roundabout, take the <b>3rd</b> exit onto <b>Museumlaan</b>",
								  "maneuver": "roundabout-right",
								  "polyline": {
									  "points": "qu}|Hmnj^@@@?@@@?@?@?@??A@?@??A@?@A@A@A@C@A?A@A?A?A@A?A?A?A?C?A?A?A?A?A?A?C?A?AA??A?A?AA??A?AAABW?EEs@"
								  },
								  "start_location": {
									  "lat": 52.0944897,
									  "lng": 5.1378254
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "94 m",
									  "value": 94
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 18
								  },
								  "end_location": {
									  "lat": 52.0935745,
									  "lng": 5.1380737
								  },
								  "html_instructions": "Turn <b>right</b> onto <b>Wolter Heukelslaan</b>",
								  "maneuver": "turn-right",
								  "polyline": {
									  "points": "wt}|H_sj^LBND~@j@~@j@"
								  },
								  "start_location": {
									  "lat": 52.0943631,
									  "lng": 5.1385608
								  },
								  "travel_mode": "BICYCLING"
							  },
							  {
								  "distance": {
									  "text": "0.1 km",
									  "value": 115
								  },
								  "duration": {
									  "text": "1 min",
									  "value": 18
								  },
								  "end_location": {
									  "lat": 52.0927647,
									  "lng": 5.1391271
								  },
								  "html_instructions": "Turn <b>left</b> onto <b>Oudwijkerlaan</b><div style=\"font-size:0.9em\">Destination will be on the left</div>",
								  "maneuver": "turn-left",
								  "polyline": {
									  "points": "yo}|H}oj^`DsE"
								  },
								  "start_location": {
									  "lat": 52.0935745,
									  "lng": 5.1380737
								  },
								  "travel_mode": "BICYCLING"
							  }
						  ],
						  "traffic_speed_entry": [],
						  "via_waypoint": []
					  }
				  ],
				  "overview_polyline": {
					  "points": "kh}|Haxg^AD}BcBKUFeAFyAPeDPoDJ{CXeF?UJe@\\yAxBmGhAwD`@cBTs@cDsFcLqRqAeCDBD?HEHO@QAOAE@]Ey@\\H~BvA`DsE"
				  },
				  "summary": "Nachtegaalstraat and Maliebaan",
				  "warnings": [
					  "Bicycling directions are in beta. Use caution – This route may contain streets that aren't suited for bicycling."
				  ],
				  "waypoint_order": []
			  }
		  ],
		  "status": "OK"
	  }
	//   GENERAL ROUTE
	  var route_length = data.routes[0].legs[0].distance.value;
	  var route_segments = data.routes[0].legs[0].steps;

	  // CRUNCH DATA
	  // Make data to usable line segments:
	  var i = 0;
	  var new_data = [];
	  var new_data2 = [];
	  var fakedata = [
		  { "y": 0, "camera": "no" },
		  { "y": 1, "camera": "yes" },
		  { "y": 0, "camera": "no" },
		  { "y": 2, "camera": "yes" },
		  { "y": 1, "camera": "yes" },
		  { "y": 2, "camera": "yes" },
		  { "y": 0, "camera": "no" },
		  { "y": 1, "camera": "yes" },
		  { "y": 0, "camera": "no" },
		  { "y": 1, "camera": "yes" },
		  { "y": 0, "camera": "no" },
		  { "y": 3, "camera": "yes" }
	  ];
	  for (var i = 0; i < route_segments.length - 1; i++) {
		  if (i == 0) {
			  new_data.push({
				  "id": i,
				  "x": route_segments[i].distance.value,
				  "y": fakedata[i].y,
				  "dist": route_segments[i].distance.value,
				  "duration": route_segments[i].duration.value,
				  "camera": fakedata[i].camera
			  })
		  }
		  else {
			  var j = new_data.length;
			  new_data.push({
				  "id": i,
				  "x": new_data[j - 1].x,
				  "y": fakedata[i].y,
				  "dist": route_segments[i].distance.value,
				  "duration": route_segments[i].duration.value,
				  "camera": fakedata[i].camera
			  })
			  new_data.push({
				  "id": i,
				  "x": new_data[j - 1].x + route_segments[i].distance.value,
				  "y": fakedata[i].y,
				  "dist": route_segments[i].distance.value,
				  "duration": route_segments[i].duration.value,
				  "camera": fakedata[i].camera
			  })
		  }
	  };
	  for (var i = 0; i < route_segments.length - 1; i++) {
		  if (i == 0) {
			  new_data2.push({
				  "id": i,
				  "x": route_segments[i].distance.value,
				  "y": fakedata[i].y,
				  "dist": route_segments[i].distance.value,
				  "duration": route_segments[i].duration.value,
				  "camera": fakedata[i].camera
			  })
		  }
		  else {
			  var j = new_data2.length;
			  new_data2.push({
				  "id": i,
				  "x": new_data2[j - 1].x + route_segments[i].distance.value,
				  "y": fakedata[i].y,
				  "dist": route_segments[i].distance.value,
				  "duration": route_segments[i].duration.value,
				  "camera": fakedata[i].camera
			  })
		  }
	  };
	// NEST DATA
	  var nest = d3.nest()
		  .key(function (d) {
			  return d.id;
		  })
		  .entries(new_data);

	// SIMPLE ROUTE DATA
	  var route_line = [
		  { "x": 0, "y": 0, "text": "start" },
		  { "x": route_length, "y": 0, "text": "end" }
	  ];

	// TOOLTIP DIV
	  var div = d3.select("#graph").append("div")
		  .attr("class", "tooltip")
		  .style("opacity", 0);

	// GET GRAPH ELEMENT FROM DOM
	  var element = d3.select('app-graph').node();
	// SET SVG DIMENSIONS
	  var margin = { top: 3, right: 10, bottom: 3, left: 10 },
		  width = element.getBoundingClientRect().width - margin.left - margin.right,
		  height = element.getBoundingClientRect().height - margin.top - margin.bottom;
	  var size = 5;
	// DRAW SVG
	  var svg = d3.select("#graph")
		  .append("svg")
		  .attr("height", height )
		  .attr("width", width )
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// SCALES
	  var x = d3.scaleLinear()
		  .range([10, width-20])
		  .domain([0, route_length]);
	  var y = d3.scaleLinear()
		  .range([height, 0])
		  .domain([0, d3.max(new_data, function (d) { return d.y })]);
	// LINE FUNCTION
	  var line = d3.line()
		  .x(function (d) { return x(d.x); })
		  .y(function (d) { return y(d.y); });

	  // GRAPH GROUP
	  // ROUTE
	  	var route = svg.selectAll("route")
		  .data([route_line])
		  .enter()
		  .append("path")
		  .attr("d", line)
		  .style("stroke-width", 3)
		  .style("stroke", "#f6be0e")
		  .style("stroke-dasharray", ("5,5")) // make the stroke dashed
		  .style("stroke-linecap", "round")  // stroke-linecap type
		  .attr("transform", "translate(0,-" + height / 2 + ")");
		var start_end = svg.selectAll(".circle_start")
			.data(route_line)
			.enter()
			.append("circle")
			.attr("cx", function (d) {
				return x(d.x)
			})
			.attr("cy", 0)
			.attr("r", size)
			.attr("class", "circle_start")
			.attr("transform", "translate(0," + height / 2 + ")")
			.style("fill", "rgba(0,0,0,1)")
			.style("stroke", "#f6be0e")
			.style("stroke-width", size / 2);

		// var start_end_text = svg.selectAll(".p")
		// 	.data(route_line)
		// 	.enter()
		// 	.append("text")
		// 	.attr("class", "p")
		// 	.attr("x", function (d) {
		// 		return x(d.x)
		// 	})
		// 	.attr("y", -10)           // set offset y position
		// 	.attr("transform", "translate(0," + height / 2 + ")")
		// 	.attr("text-anchor", "middle") // set
		// 	.text(function (d) {
		// 		return d.text
		// 	})
		// 	.style("fill", "#f6be0e");

		var lengte_route = svg.selectAll("text")
			.data([route_line[1]])
			.enter()
			.append("text")
			.attr("class", "p")
			.attr("x", function(d){
				return x(d.x)-(size/2)
			})
			.attr("y", -10)           // set offset y position
			.attr("transform", "translate(0," + height / 2 + ")")
			.attr("text-anchor", "end") // set
			.text(function (d) {
				return d.x + "m"
			})
			.style("fill", "#f6be0e")
			.style("font-size", "12px");
		// var start_end_text = svg.selectAll(".p")
		// 	.data(route_line)
		// 	.enter()
		// 	.append("text")
		// 	.attr("class", "p")
		// 	.attr("x", function (d) {
		// 		return x(d.x)
		// 	})
		// 	.attr("y", -10)           // set offset y position
		// 	.attr("transform", "translate(0," + height / 2 + ")")
		// 	.attr("text-anchor", "middle") // set
		// 	.text(function (d) {
		// 		return d.text
		// 	})
		// 	.style("fill", "#f6be0e");
	//   CIRCLES
	  var circle = svg.selectAll("g")
		  .data(new_data2)
		  .enter()
		  .append("g")
		  .filter(function (d) { return d.camera == "yes" })
		  .on("mouseover", function (d) {
			  	d3.select(this).select(".circle-fill")
				  .style("fill", "#690303");
				div.style("opacity", 0.9)
					.style("left", (d3.event.pageX + "px"))
					.style("top", (d3.event.pageY) + "px").html(d.x + "m");

		  })
		  .on("mouseout", function (d) {
			  d3.select(this).select(".circle-fill")
				  .style("fill", "#fb0000");
			  div.style("opacity", 0);
		  });
	  circle.append("circle")
		  .attr("cx", function (d) { return x(d.x - (d.dist / 2)) })
		  .attr("cy", 0)
		  .attr("transform", "translate(0," + height / 2 + ")")
		  .attr("class", "circle-fill")
		  .attr("r", function (d) {
			  return d.y * 10
		  })
		  .style("fill", "#fb0000");
	  circle.append("circle")
		  .attr("cx", function (d) { return x(d.x - (d.dist / 2)) })
		  .attr("cy", 0)
		  .attr("transform", "translate(0," + height / 2 + ")")
		  .attr("class", "circle-stroke")
		  .attr("r", function (d) {
			  return (d.y * 10) - 3
		  })
		  .style("stroke", "rgb(0,0,0)")
		  .style("stroke-width", 2)
		  .style("fill", "rgba(0,0,0,0)");
	  circle
		  .append("text")
		  .filter(function (d) { return d.camera == "yes" })
		  .attr("x", function (d) { return x(d.x - (d.dist / 2)) })
		  .attr("y", ".35em")           // set offset y position
		  .attr("text-anchor", "middle") // set anchor y justification
		  .text(function (d) { return d.y })
		  .style("font-size", size)
		  .attr("transform", "translate(0," + height / 2 + ")");



		}
}
