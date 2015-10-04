"use strict";

var jsondata,
	betobj = {},
	tip = d3.tip(),
	d3_svg = d3.select('svg').call(tip);
//All the data for payouts winning and losing numbers are stored here
	$.getJSON("JSON_Craps.json",function(data){
		jsondata = data;
		
	});

window.onload = function () {
	//Functionality wrapped in knockout function
var viewModel = function() {
				
	var self = this;
	self.removal= ko.observable(false);
	self.denomination = ko.observable(0);
	self.point = ko.observable(0);
	self.firstdie = ko.observable();
	self.seconddie = ko.observable();
	
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
	self.svgtogclass = function(id, arr, classname){
		//takes array and removes a class
		var id = id || null, classname = classname || null;
		
		if(Array.isArray(arr)){
			arr.forEach(function(item, index, array){
				var needclass = d3_svg.select("." + item);
				needclass.classed(classname, true);
			});
		};
		//toggles the class on the lone target
		if(id) d3_svg.select("." + id).classed(classname, !d3_svg.select("." + id).classed(classname));
	};
	self.addbet = function (id, target, wager){
		var target = target || null;
		
		if (jsondata[id] && wager !=0){

			var wager = wager,
				winwager = Math.round(wager * jsondata[id]['Payout']);
			
//important: LINEAR FLOW SELF.REMOVAL FUNCTION INFLUENCES SELF.CHIP FUNCTION INFLUENCES SELF.ADDBETOOBJ FUNCTION
			if(self.removal()) {
				wager = -wager; 
				winwager = -winwager;
			};

			var checkwager = self.chip(id, target, wager);

			if(wager < 0 && Math.abs(wager) > checkwager) {
				wager = -checkwager;
				winwager = -Math.round(checkwager * jsondata[id]['Payout']);
			}

			if(wager != 0){
				self.addbettoobj(jsondata[id]['Loss'],-wager);
				self.addbettoobj(jsondata[id]['Win'], winwager);
				//update total bets and bankroll
				self.tally(wager);
			};
		}
	};
	self.chip = function(id,target,wager){
			
		var chip_class = "Chip__" + id,
			checkwager = wager,
		//Chip is classed for easy removal
			chip = d3_svg.select("." + chip_class);

		//if chip is in the nest array or not
		if(!chip[0][0]){
			//will the wager be negative or positve
			if(wager > 0){
				//put the chip on the screen
				var x = target.x.baseVal.value + target.width.baseVal.value / 2,
					y = target.y.baseVal.value + target.height.baseVal.value / 2;

				d3_svg.append('use').datum(wager)
					.attr({
						"xlink:href":"#Chip",
						"x":x, 
						"y":y})
					.classed(chip_class, true)
					.style('fill', function(d,i)
						 {
							
							if(d===5) {return'#9f0'};
							if(d===25) {return '#FF0DFF'};
							if(d===100) {return '#17F'};
						;})
					.on('mouseover', function(d) 
						{tip.attr('class','d3-tip')
							.html(function(){return '<span>'+ '$' + d + '</span>'})
							.show(d, target)
						;})
					.on('mouseout', function(d) {tip.hide(d, target)});
				}else{
				//make sure nothing is put in the object of bets
					checkwager = 0;
				};

		}else{
			//update data for accurate counting of wager on specific bet
			chip.datum(function(d,i)
					   {
						checkwager = d; return wager + d;
					   })
				.style('fill', function(d,i)
					   {
						if(d < 25) {return'#9f0'};
						if(d >= 25 && d < 100) {return '#FF0DFF'};
						if(d >= 100) {return '#17F'};
						});
			//remove if zero
			if(chip.datum() <= 0){
				chip.datum(0);
				chip.remove();
			};
		};		
		return checkwager;
			
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
	self.tally = function(wager){
		var wager = wager || 0;
		
		self.total(self.total()+ wager);
		self.bank(self.bank()- wager);
		
		self.bank() < 4 ? alert("Remove some bets to continue") : null;
	}
	
	//Roll portion of code
	self.clear = function(){
		self.removal(true);
		var allids = d3_svg.selectAll('use')[0];
		
		(allids.length > 0) ? 
			allids.forEach(function(item, index, array){
				var nonstripclass = d3.select(item).attr('class').slice(6);
				self.addbet(nonstripclass,null,1000);}) 
		: 
			alert('You have no bets to reset');	
		
		self.svgtogclass(null, ['remove'], 'clicked');
		self.removal(false);
		};

	self.roll = function(){
		self.firstdie(self.die());
		self.seconddie(self.die());
		var dice = self.firstdie() + self.seconddie(),
			hard = (self.firstdie() === self.seconddie()) ? true : false;
//		self.suggestcount(dice);
		self.movepuck(dice);
		
		
	};
	self.die = function(){
		return Math.floor(Math.random() * (6)) + 1;
	};
	self.movepuck = function(dice){
		var coord = {4:342.4,5:367.4,6:392.4,8:417.4,9:442.4,10:467.4},
			puck = d3_svg.select("#puck");
		
		if (dice === self.point() || dice === 7){
			puck.transition().delay(350).attr('cx', 300.4);
			
			self.point(0);
		}else if (dice > 3 && dice < 11 && self.point()=== 0){
			self.point(dice);
			
			puck.datum(self.point()).on('mouseover',function(d){
				tip.attr('class', 'd3-tip')
					.html(function(){return '<span>' + d + '</span>'})
					.show(d,this);
			})
			.on('mouseout',function(d){
				tip.hide(d,this)
			}).transition().delay(350).ease('linear').attr('cx', coord[dice]);
			
		};
	};
		
			
	}
	ko.applyBindings(new viewModel());
	
}

