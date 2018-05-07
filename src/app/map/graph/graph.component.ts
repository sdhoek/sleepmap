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
		var data = [
			{ "distance": 1, "camera":0},
			{ "distance": 100, "camera": 0 },
			{ "distance": 20, "camera": 2 },
			{ "distance": 100, "camera": 0 },
			{ "distance": 10, "camera": 1 },
			{ "distance": 15, "camera": 0 },
			{ "distance": 5, "camera": 1 },
			{ "distance": 60, "camera": 0 },
			{ "distance": 47, "camera": 1 },
			{ "distance": 35, "camera": 0 },
			{ "distance": 9, "camera": 2 },
			{ "distance": 1, "camera": 0 },
			{ "distance": 5, "camera": 1 },
			{ "distance": 180, "camera": 0 },
			{ "distance": 14, "camera": 0 }
		]
		//   GENERAL ROUTE INFO
		function sum_dist(obj,) {
			var sum = 0;
			for (let i = 0; i < data.length; i++) {
				sum += data[i].distance;
			}
			return sum;
		};
		function sum_cam(obj, ) {
			var sum = 0;
			for (let i = 0; i < data.length; i++) {
				sum += data[i].camera;
			}
			return sum;
		};
		var route_length = sum_dist(data);
		var sum_camera = sum_cam(data);

		//   CRUNCH DATA
		//   Make data usable as line segments:
		var i = 0;
		var new_data = [];
		var new_data2 = [];

		for (var i = 0; i < data.length - 1; i++) {
			if (i == 0) {
				new_data.push({
					"id": i,
					"x": data[i].distance,
					"y": 0,
					"dist": data[i].distance,
					"camera": data[i].camera
				})
			}
			else {
				var j = new_data.length;
				new_data.push({
					"id": i,
					"x": new_data[j - 1].x,
					"y": 0,
					"dist": data[i].distance,
					"camera": data[i].camera
				})
				new_data.push({
					"id": i,
					"x": new_data[j - 1].x + data[i].distance,
					"y": 0,
					"dist": data[i].distance,
					"camera": data[i].camera
				})
			}
		}; //end for loop
		for (var i = 0; i < data.length - 1; i++) {
			if (i == 0) {
				new_data2.push({
					"id": i,
					"x": data[i].distance,
					"y": 0,
					"dist": data[i].distance,
					"camera": data[i].camera
				})
			}
			else {
				var j = new_data2.length;
				new_data2.push({
					"id": i,
					"x": new_data2[j - 1].x + data[i].distance,
					"y": 0,
					"dist": data[i].distance,
					"camera": data[i].camera
				})
			}
		}; //end for loop

		// SIMPLE ROUTE DATA
		var route_line = [
			{ "x": 0, "y": 0, "text": "start" },
			{ "x": route_length, "y": 0, "text": "end" }
		];
		
		// GET GRAPH ELEMENT FROM DOM
		var element = d3.select('app-graph').node();

		// CLEAR BEFORE REDRAW
		d3.select("#graph").selectAll("svg").remove();
		d3.select("#graph").selectAll("h1").remove();
		d3.select("#graph").selectAll("div").remove();
		// TOOLTIP DIV
		var div = d3.select("#graph").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);
		// SET SVG DIMENSIONS
		// var margin = { top: 3, right: 10, bottom: 3, left: 10 },
		var width = element.getBoundingClientRect().width-40,
		height = element.getBoundingClientRect().height - 10;
		var size = 5;
		
		// TITLE
		var title = d3.select("#graph")
			.append("h1")
			.attr("id", "camera-titel")
			.html("Totaal aantal cameras op je route: " + sum_camera)
			.style("font-size", "10pt")
			.attr("transform", "translate(0 , 0)");

		// DRAW SVG
		var svg = d3.select("#graph")
			.append("svg")
			.attr("height", height )
			.attr("width", width+20 )
			.attr("transform", "translate( 10 , -10)");
		
		// SCALES
		var x = d3.scaleLinear()
			.range([10, width])
			.domain([0, route_length]);
		var y = d3.scaleLinear()
			.range([height, 0])
			.domain([0, height]);
		// LINE FUNCTION
		var line = d3.line()
			.x(function (d) { return x(d.x); })
			.y(function (d) { return y(d.y); });

		// GRAPH GROUP
		// DASH ARRAY
		var dashing = "5,5";
		var dashCount = Math.ceil((Math.abs(x(route_line[1].x)) / 5) / 2);
		var newDashes = new Array(dashCount).join(dashing + ",");
		var dashArray = "0," + newDashes  + x(route_line[1].x);

		// ROUTE
		var route = svg.selectAll("route")
			.data([route_line])
			.enter()
			.append("path")
			.attr("d", line)
			.style("stroke-width", 3)
			.style("stroke", "#f6be0e")
			.style("stroke-dasharray", dashArray)
			.style("stroke-linecap", "round")  // stroke-linecap type
			.attr("transform", "translate(0,-" + height / 2 + ")")
			.attr("stroke-dashoffset", x(route_line[1].x))
			.transition()
			.duration(3000)
			.attr("stroke-dashoffset",0);

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

		var lengte_route = svg.selectAll("text")
			.data([route_line])
			.enter()
			.append("text")
			.attr("class", "p")
			.attr("x", function (d) {
				return x(d.x) - (size / 2)
			})
			.attr("y", -10)           // set offset y position
			.attr("transform", "translate(0," + height / 2 + ")")
			.attr("text-anchor", "end") // set 
			.text(function (d) {
				return d.text 
			})
			.style("fill", "#f6be0e")
			.style("font-size", "12px");

		var animation_circle_time = 1500;
		var animation_circle_delay = 200;

		// Graph CIRCLES
		
		//   Tooltip popup
		var circle = svg.selectAll("g")
			.data(new_data2)
		.enter()
			.append("g")
			.filter(function (d) { return d.camera > 0 })
			.on("mouseover", function (d) {
				d3.select(this).select(".circle-fill")
				.style("fill", "#690303");
				div.style("opacity", 0.9)
				.style("left", (d3.event.pageX + "px"))
				.style("top", (d3.event.pageY) - 100 + "px")
				.html("<img src='../assets/camera-icon@2x.png' /><b>Aantal cameras op dit punt:</b> <span>" + d.camera + " </span> <img src='../assets/route-icon@2x.png' /> <b>Afstand in beeld bij deze camera(s):</b> <span>" + d.x + " meter </span>");
			})
			.on("mouseout", function (d) {
				d3.select(this).select(".circle-fill")
				.style("fill", "#fb0000");
				div.style("opacity", 0);
			});

		// Red fill Background
		circle.append("circle")
			.attr("cx", function (d) { return x(d.x - (d.dist / 2)) })
			.attr("cy", 0)
			.attr("transform", "translate(0," + height / 2 + ")")
			.attr("class", "circle-fill")
			.style("fill", "#fb0000")
			.attr("r", 0)
			.transition()
			.duration(animation_circle_time)
			.delay(function(d,i){
			return animation_circle_delay * i
			})
			.attr("r", function (d) {
			return d.camera * 15
			});
		
		//   Black line stroke
		circle.append("circle")
			.attr("cx", function (d) { return x(d.x - (d.dist / 2)) })
			.attr("cy", 0)
			.attr("transform", "translate(0," + height / 2 + ")")
			.attr("class", "circle-stroke")
			.style("stroke", "rgb(0,0,0)")
			.style("stroke-width", 2)
			.style("fill", "rgba(0,0,0,0)")
			.transition()
			.duration(animation_circle_time)
			.delay(function (d, i) {
				return animation_circle_delay * i
			})
			.attr("r", function (d) {
			return (d.camera * 15) - 3
			});
			
		// Image in circle
		circle
			.append("svg:image")
			.filter(function (d) { return d.camera > 0 })
			.attr("x", function (d) { return x(d.x - (d.dist / 2)) - ((d.camera*15)/2) })
			.attr("y", function (d) { return -((d.camera * 15) / 2) })       // set offset y position
			.attr("transform", "translate(0," + (height / 2)  + ")")
			// .attr("text-anchor", "middle") // set anchor y justification
			// .text(function (d) { return d.camera })
			// .style("font-size", size)
			.attr("xlink:href", "../assets/camera-icon@2x.png")
			.attr("z-index", 500)
			.transition()
			.duration(animation_circle_time)
			.delay(function (d, i) {
				return animation_circle_delay * i
			})
			.attr("width", function (d) {
			return (d.camera * 15) 
			})
			.attr("height",  function(d) {
			return (d.camera * 15) 
			});
	
	}; //END DRAW GRAPH FUNCTION	

	
}//GRAPH COMPONENT
