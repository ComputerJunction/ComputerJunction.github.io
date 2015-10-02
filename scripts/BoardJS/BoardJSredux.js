"use strict";

var jsondata; 
//All the data for payouts winning and losing numbers are stored here
	$.getJSON("JSON_Craps.json",function(data){
		jsondata = data;
		
	});
//object for all the bets
var betobj = {};

window.onload = function () {
	//grab graphic in variable
	
var viewModel = function() {
				
		var self = this;
		self.removal= ko.observable(false);
		self.denomination = ko.observable(0);
		self.allbets = ko.observableArray();
		self.firstdie = ko.observable();
		self.seconddie = ko.observable();
		self.min = ko.observable(5);
		self.minbet = ko.observable(6);
		self.bank = ko.observable(1000);
		self.total = ko.observable(0);
		
		self.findid = function(data, event){
			var target = event.target || event.scrElement;
			var id = target.getAttribute('id');
			
			if(['five', 'twentyfive', 'onehundred'].indexOf(id) != -1) {
				var den = {'five':5 , 'twentyfive':25, 'onehundred':100};
				self.denomination(den[id]);
				var circle = d3.select('svg').select("." + id);
				circle.classed('clicked', !circle.classed('clicked'));
			
			}else if (id ==='remove'){
				self.removal(!self.removal());
				var circle = d3.select('svg').select("." + id);
				circle.classed('clicked', !circle.classed('clicked'));
				
			}else{
				var wager = (self.removal()) ?  -self.denomination(): self.denomination();
				self.addbet(id,target,wager);
			}
		};
		self.addbet = function (id, target, wager){
			
			if (jsondata[id] && wager !=0){
				
				self.ifarray(jsondata[id]['Loss'], -wager);

				self.ifarray(jsondata[id]['Win'], Math.round(wager * jsondata[id]['Payout']));
				
				self.chip(id, target, wager);
			
				self.total(self.total()+wager)
			}
			
		}
		
		self.ifarray = function(array, wager){
			array.isArray ?
				
			array.forEach(function (element, index){
				self.addbettoobj(element, wager);
			})
			:
				self.addbettoobj(array, wager);
		}
			
		self.addbettoobj = function(element, wager){
			
			betobj.hasOwnProperty(element) ? 
				
				betobj[element] += wager
				
			:
				Object.defineProperty(betobj, element, {value:wager, writable:true})
				
//			betobj[element] < 4 && (betobj[element] = 0); 
				
			console.info(betobj);
			
		};

		
		self.chip = function(id,target,wager){
			
			var svg_loc = d3.select('svg'),
				chip_class = "Chip__" + id;
			
			var chip = svg_loc.select("." + chip_class);
			
			if(!chip[0][0]){
				var x = target.x.baseVal.value + target.width.baseVal.value / 2,
					y = target.y.baseVal.value + target.height.baseVal.value / 2;
				
				svg_loc.append('use')
					.datum(wager)
					.attr({
						"xlink:href":"#Chip",
						"x":x, 
						"y":y})
					.classed(chip_class, true);
			}else{
				chip.datum(function(d,i){return wager + d;})
			}
			
			if(svg_loc.select("." + chip_class).datum()  == 0){
				chip.remove();
			};
				
		};
			
	}
	ko.applyBindings(new viewModel());
	
}

