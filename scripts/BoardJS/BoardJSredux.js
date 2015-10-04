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
	self.bets = ko.observableArray();
	self.bank = ko.observable(1000);
	self.total = ko.observable(0);
	self.net = ko.observable(0);
//Click graphic portion
	self.findid = function(data, event){
		//One click function for the entire SVG
		var target = event.target || event.scrElement,
			id = target.getAttribute('id'),
			denom = {'five':5 , 'twentyfive':25, 'onehundred':100};

		if(denom.hasOwnProperty(id)) {

			self.denomination(denom[id]);
			self.svgtogclass(id, Object.keys(denom), 'clicked');

		}else if (id ==='remove'){

			self.removal(!self.removal());
			self.svgtogclass(id, null, 'clicked');

		}else{
			
			if(jsondata[id] && self.denomination() > 0 || self.bets[id]){
				
					if(id == "Place_Six" || id == "Place_Eight"){
						var prev_den = self.denomination();
						if(self.denomination() > 5) {
							self.denomination(self.denomination() - self.denomination()%6);
						}else{self.denomination(6)};
};

					if(self.removal() && self.total() != 0) {
						var wager = -self.denomination();
						self.bets.remove(id);
					}else if(!self.removal()){
						var wager = self.denomination();
						self.bets.push(id);
					}else{
						return;
					};

					self.tally(wager);

					self.chip(id, target, wager);

					if(id == "Place_Six" || id == "Place_Eight"){
						if(self.denomination() > 5) {
							self.denomination(prev_den);
						}else{self.denomination(5)};
					}
				
			};
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
	self.chip = function(id,target,wager){
			
		var chip_class = "Chip__" + id,
		//Chip is classed for easy removal
			chip = d3_svg.select("." + chip_class);

		//if chip is not in nested array create the chip on the board with styling and tooltip
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
							var color = {5:'#9f0', 6:'#9f0', 25:'#FF0DDF', 100:'#17F'}
							return color[d];	
						;})
					.on('mouseover', function(d) 
						{tip.attr('class','d3-tip')
							.html(function(){return '<span>'+ '$' + d + '</span>'})
							.show(d, target)
						;})
					.on('mouseout', function(d) {tip.hide(d, target)});
				}

		}else{
			//update data for accurate counting of wager on specific bet
			chip.datum(function(d,i)
					   {
						return wager + d;
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
		return;		
	};
	
	self.tally = function(wager){
		
		self.total(self.total()+ wager);
		self.bank(self.bank()- wager);
		
		self.bank() < 4 ? alert("Remove some bets to continue") : null;
	}
	self.clear = function(){
		
		if(self.bets().length > 0) { 
			self.bets().forEach(function (item, index, array){
				
				var data = d3_svg.select('.Chip__'+item).datum();
				d3_svg.select('.Chip__'+item).datum(0);
				self.chip(item, null, 0);
				self.tally(-data);
		});
			self.bets.removeAll()
		}else{
			alert('You have no bets to reset');	
		
		};
	};
//Roll Portion of Code
	self.roll = function(){
		self.firstdie(self.die());
		self.seconddie(self.die());
		var dice = self.firstdie() + self.seconddie(),
			hard = (self.firstdie() === self.seconddie()) ? true : false;
//		self.suggestcount(dice);
		self.movepuck(dice);
		self.netresults(dice);
		
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
	self.netresults = function(dice){
		
		self.net(0);
		var net = 0, delarray = [];
		
		self.bets().forEach(function (item, index, array){
			
			var winloss = d3_svg.select('.Chip__'+item).datum();
			
			if(jsondata[item]['Loss'].includes(dice)){
				
				net += -winloss;
				self.total(self.total() - winloss);
				self.chip(item,null,-winloss);
				delarray.push(item);
			};
			
			if(jsondata[item]['Win'].includes(dice)){
				var win = Math.ceil(
					jsondata[item]['Payout']
					[jsondata[item]['Win'].indexOf(dice)] * winloss);
						
				self.bank(self.bank() + win);
						 
				net += win;
			};	
		});
		
		(delarray.length > 0) ? self.bets.removeAll(delarray) : null;
		self.net(net);
	};
		
	 
		
			
	}
	ko.applyBindings(new viewModel());
	
}

