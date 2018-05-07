import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
	@Input() data;

	constructor() { }

	ngOnInit() {
		this.DrawGraph()
		// console.log(this.data);
	}

	public DrawGraph(){
		var data = this.data;
		console.log(data)
		//MAIN ROUTE STATS
		var route_length = data.route.length;

		var features = data.route.geojson.features;
	
		//   GENERAL ROUTE INFO
		// function sum_dist(obj,) {
		// 	var sum = 0;
		// 	for (let i = 0; i < data.length; i++) {
		// 		sum += data[i].distance;
		// 	}
		// 	return sum;
		// };
		function sum_cam(obj, ) {
			var sum = 0;
			for (let i = 0; i < features.length; i++) {
				sum += features[i].properties.cameras;
			}
			return sum;
		};

		var sum_camera = sum_cam(data);

		console.log("lengte " + route_length);
		console.log("sum: " + sum_camera);

		// SIMPLE ROUTE DATA OVERVIEW
		var route_line = [
			{ "x": 0, "y": 0, "text": "start" },
			{ "x": route_length, "y": 0, "text": "end" }
		];


		//   CRUNCH DATA
		//   Make data usable as line segments:
		var i = 0;
		var new_data = [];

		// }; //end for loop
		for (var i = 0; i < features.length - 1; i++) {
			if (i == 0) {
				new_data.push({
					"id": i,
					"x": features[i].properties.length,
					"y": 0,
					"dist": features[i].properties.length,
					"camera": features[i].properties.cameras
				})
			}
			else {
				var j = new_data.length;
				new_data.push({
					"id": i,
					"x": new_data[j - 1].x + features[i].properties.length,
					"y": 0,
					"dist": features[i].properties.length,
					"camera": features[i].properties.cameras
				})
			}
		}; //end for loop


		// CLEAR BEFORE REDRAW
		d3.select("#graph").selectAll("svg").remove();
		d3.select("#graph").selectAll("h2").remove();
		d3.select("#graph").selectAll("div").remove();
		// TOOLTIP DIV
		var div = d3.select("#graph").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);
		// SET SVG DIMENSIONS
		// GET GRAPH ELEMENT FROM DOM
		var element = d3.select('app-graph').node();
		// var margin = { top: 3, right: 10, bottom: 3, left: 10 },
		var width = element.getBoundingClientRect().width-40,
		height = element.getBoundingClientRect().height - 10;
		var size = 5;
		
		// TITLE
		var title = d3.select("#graph")
			.append("h2")
			.attr("id", "camera-titel")
			.html("Totaal aantal cameras op je route: <span id=\"camera_getal\"> " + sum_camera + "</span>")
			.style("font-size", "17px")
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
		
		// TRANSITION SETTINGS
		var animation_time = 3000;
		var animation_circle_time = 1500;
		var amount_of_circles = new_data.length;
		var animation_circle_delay = animation_time/amount_of_circles;
		
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
			.duration(animation_time)
			.ease(d3.easeLinear)
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
			.attr("class", "end-text")
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
			.style("font-size", "12px")
			.style("opacity", 0)
			.transition()
			.duration(200)
			.delay(animation_time)
			.style("opacity", 1);
		
		//   Tooltip popup
		var circle = svg.selectAll("g")
			.data(new_data)
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
				return animation_circle_delay * (i+1)
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
				return animation_circle_delay * (i + 1)
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
				return animation_circle_delay * (i + 1)
			})
			.attr("width", function (d) {
				return (d.camera * 15) 
			})
			.attr("height",  function(d) {
				return (d.camera * 15) 
			});
	
	}; //END DRAW GRAPH FUNCTION	

	
}//GRAPH COMPONENT
