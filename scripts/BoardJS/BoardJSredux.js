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
			var id = target.getAttribute('id'),
				denom = {'five':5 , 'twentyfive':25, 'onehundred':100};
			
			if(denom.hasOwnProperty(id)) {
				
				self.denomination(denom[id]);
				
				self.svgtogclass(id, Object.keys(denom), 'clicked');
				
			}else if (id ==='remove'){
				
				self.removal(!self.removal());
				self.svgtogclass(id, null, 'clicked');
				
			}else{
				var wager = self.denomination();
				
				self.addbet(id, target, wager)
			};
		};
		self.addbet = function (id, target, wager){
			
			if (jsondata[id] && wager !=0){
				
				var wager = wager,
					winwager = Math.round(wager * jsondata[id]['Payout']);
				
				if(self.removal()) {
					wager = -wager; winwager = -winwager;
				};
				
				var checkwager = self.chip(id, target, wager);
				
				if(wager < 0 && Math.abs(wager) > checkwager) {
					wager = -checkwager;
					winwager = -Math.round(checkwager * jsondata[id]['Payout']);
				}
				
				if(wager != 0){
					self.addbettoobj(jsondata[id]['Loss'],wager);
					self.addbettoobj(jsondata[id]['Win'], winwager);
					//update total bets and bankroll
					self.total(self.total()+wager);
					self.bank(self.bank()-wager);
					self.bank() < 4 ? alert("Remove some bets to continue") : null;
				};
				
								 
			}
			
		};
		
		self.addbettoobj = function(arr, wager){
			
			arr.forEach(function (item, index, array){
					
				if(!betobj.hasOwnProperty(item)) {
					Object.defineProperty(betobj, item, {value:null, writable:true})
					
				};
				
				betobj[item] += wager
			});
				
			console.info(betobj);
			
		};

		self.chip = function(id,target,wager){
			
			var svg_loc = d3.select('svg'),
				chip_class = "Chip__" + id,
				checkwager = wager;
			//Chip is classed for easy removal
			var chip = svg_loc.select("." + chip_class);
			
			//if chip is in the nest array or not
			if(!chip[0][0]){
				//will the wager be negative or positve
				if(wager > 0){
					//put the chip on the screen
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
					//make sure nothing is put in the object of bets
					checkwager = 0;
				};
				
			}else{
					//update data for accurate counting of wager on specific bet
					chip.datum(function(d,i){checkwager = d; console.log(d); return wager + d;})
					//remove if zero
					if(chip.datum() <= 0){
						chip.remove();
					};
			};		
			return checkwager;
			
		};
		self.svgtogclass = function(id, arr, classname){
			var svg = d3.select('svg');
			//takes array and removes a class
			if(Array.isArray(arr)){
				arr.forEach(function(item, index, array){
					var needclass = svg.select("." + item);
					needclass.classed(classname, false);
				});
			};
			//toggles the class on the lone target
			svg.select("." + id).classed(classname, !svg.select("." + id).classed(classname));
				   
				   
		};
			
	}
	ko.applyBindings(new viewModel());
	
}

