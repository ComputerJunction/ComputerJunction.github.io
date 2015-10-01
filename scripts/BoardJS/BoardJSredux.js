"use strict";

var jsondata; 
//All the data for payouts winning and losing numbers are stored here
	$.getJSON("JSON_Craps.json",function(data){
		jsondata = data;
		
	});

window.onload = function () {
	//grab graphic in variable
	

	

//Create object constructor
//Object contructor will be based on click of SVG
//It will take the ID of click region
//Find that win number in the JSON
//Make the name of the object the winning number [FIELD, ANYCRAPS, COME, PASS, DONT COME, DONT PASS]
//USE protoype to add the IDS of the clicked regions to the newly created Object
//Create observable with ID name
//Take object with IDS as properties and make bets equal observable with same id name

var viewModel = function(bet) {
				
		var self = this;
		self.denomination = ko.observable(0);
		self.allbets = ko.observableArray();
		self.firstdie = ko.observable();
		self.seconddie = ko.observable();
		self.min = ko.observable(5);
		self.minbet = ko.observable(6);
		self.bank = ko.observable(100);
		self.total = ko.observable(0);
		
		self.findid = function(data, event){
			var target = event.target || event.scrElement;
			var id = target.getAttribute('id');
			
			if(id == "five"){
				self.denomination(5);
			}else if(id == "twentyfive"){
				self.denomination(25);
			}else if(id == "onehundred")	{
				self.denomination(100);
			}else {
				
				self.addbet(id,target);
			}
		};
		self.addbet = function (id, target){
			
			if (id){
				console.log(jsondata[id]['Loss']);
				self.addchip(target);
			}else{
				console.info(id);
			}
			
		};
		
		self.addchip = function(target){
			var svg_loc = document.getElementsByTagName('svg')[0];
			
			d3.select(svg_loc).append("use").attr(
				{"xlink:href":"#Chip",
				"x":target.x.baseVal.value + target.width.baseVal.value / 2 , 
				"y":target.y.baseVal.value + target.height.baseVal.value / 2 });
		};
			
	}
	ko.applyBindings(new viewModel());
	
}

