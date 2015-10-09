"use strict";

var jsondata,
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
	self.denom = {'five':5 , 'twentyfive':25, 'onehundred':100};
	self.textdenomination = ko.observable("");
	self.clickid = ko.observable("");
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
			id = target.getAttribute('id');
					
		self.clickid(id);

		if(self.denom.hasOwnProperty(self.clickid())) {

			self.denomination(self.denom[self.clickid()]);
			self.textdenomination(self.clickid());
			
		}else if(id ==='remove'){

			self.removal(!self.removal());
			
		}else if(jsondata[id] && self.denomination() != 0){
			
				
				if(self.passcomecheck(id)){
					
					self.clickid() != id ? id = self.clickid() : null;
					self.tally();
					self.chip(id);
				};
		};
	};
	self.remove = ko.computed(function() {
		self.removal() ? self.denomination(self.denomination() * -1) : self.denomination(Math.abs(self.denomination()));
	});
	self.specialsixeight = ko.computed(function(){
		
		self.clickid() === "Place_Six" || self.clickid() ==="Place_Eight" ? 
			self.denomination() > 5 ? 
				self.denomination(self.denomination() - self.denomination()%6) : self.denomination(6)
		:
			self.denomination(self.denom[self.textdenomination()]);
	});		
	self.passcomecheck = function(id){
		
		var placechip = true,
			alldependentbets = 
			['Come_Ten', 'Come_Nine', 'Come_Eight', 'Come_Six', 'Come_Five', 
			'Come_Four','Dont_Come_Ten', 'Dont_Come_Nine', 'Dont_Come_Eight', 'Dont_Come_Six', 
			 'Dont_Come_Five', 'Dont_Come_Four', 'Come_Ten_Odds', 'Come_Nine_Odds', 'Come_Eight_Odds',
			 'Come_Six_Odds', 'Come_Five_Odds', 'Come_Four_Odds','Dont_Come_Ten_Odds', 'Dont_Come_Nine_Odds', 
			 'Dont_Come_Eight_Odds', 'Dont_Come_Six_Odds', 'Dont_Come_Five_Odds', 'Dont_Come_Four_Odds','Come', 
			 'Dont_Come','Pass_Line', 'Dont_Pass_Line'];
		
		if(alldependentbets.indexOf(id) != -1){
			if(id.slice(-4).includes("Line")) {placechip = self.passlinecheck(id);}
			else if(id === 'Come' || id === 'Dont_Come'){placechip = self.comebetcheck(id);}
			else if(id.slice(-5).includes('_Odds')){ placechip = self.oddscheck(id);}
			else{placechip = self.numbercomecheck(id)};
		};
		
		return placechip;
		
	};
	self.passlinecheck = function(id){
		var placechip = true;
		
		self.point() === 0 ? null: 
			
			self.bets().includes(id) ? self.addoddstoid(id) : placechip=false;
	
		return placechip;
	};
	self.comebetcheck = function(id){
		var placechip = true;
		
		self.point() != 0 ? null: placechip = false;
		
		return placechip;
		
	};
	self.oddscheck = function(id){
		var placechip = true;
		
		d3_svg.select(".Chip__" + id.slice(0,-5))[0][0] ? null: placechip = false;
		
		return placechip;
	};
	self.numbercomecheck = function(id){
		var placechip = true;
		
		if(d3_svg.select(".Chip__" + id)[0][0]){self.addoddstoid(id);}
		else{placechip = false}
		
		return placechip;
	}
	self.addoddstoid = function(id){
		
		self.clickid(id + "_Odds");
		return;
	};
	self.collectbets = function(id){
		
		if(self.removal()){
			!d3_svg.select(".Chip__" + id)[0][0] ? self.bets.remove(id) : null;
		}else{
			self.bets().indexOf(id) === - 1 ? self.bets.push(id) : null;
		}
	};
	self.tally = function(){
		
		if(self.total() === 0 && self.denomination() < 0 ){
			///if it will make it negative do nothing
		}else{
		self.total(self.total()+ self.denomination());
		self.bank(self.bank()- self.denomination());
		self.bank() < 4 ? self.tally(-self.denomination()) : null;
		};
	};
	self.chip = function(id){
			
		var chip_class = "Chip__" + id,
			target = d3_svg.select("#"+id)[0][0],
			wager = self.denomination(),
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
					   { if(d === 0 && wager < 0){
						   wager = 0;
					   };
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
		self.collectbets(id);		
	};
	self.singleclear = function(id,amount){
		var amount = amount || self.denomination();
		
		self.removal(true);
		self.denomination(amount);
		self.chip(id);
		self.denomination(self.denom[self.textdenomination()]);
		self.removal(false);
	};
	self.clear = function(){
		
		if(self.bets().length > 0) { 
			self.removal(true);
			
			self.bets().forEach(function (item, index, array){
				
				self.chip(item);
				self.tally();
				self.clear();
		});
			
			self.removal(false);
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
		self.movecomebets(dice);
		
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
	self.movecomebets = function(dice){
		var comerects =  {4:'Come_Four', 5:'Come_Five',6:'Come_Six',8:'Come_Eight',9:'Come_Nine',10:'Come_Ten'};

		
		if(self.bets().includes('Come')){
			var targetid = comerects[dice];
			var chip = d3_svg.select('.Chip__Come');
			self.denomination(chip.datum());
			self.chip(targetid);
			//pass it the target, id , datum
			self.singleclear('Come', chip.datum())
		};
		
		if(self.bets().includes('Dont_Come')){
			var targetid = "Dont_" + comerects[dice];
			var chip = d3_svg.select('.Chip__Dont_Come');
			self.denomination(chip.datum());
			self.chip(targetid);
			//pass it the target, id , datum
			self.singleclear('Dont_Come', chip.datum())
			
			
		};
	};
	self.netresults = function(dice){
		
		self.net(0);
		var net = 0
		
		self.bets().forEach(function (item, index, array){
		
			var winloss = d3_svg.select('.Chip__'+item).datum();
						
			if(jsondata[item]['Loss'].includes(dice)){
				
				net += -winloss;
				self.total(self.total() - winloss);
				self.singleclear(item, winloss);
				self.netresults(dice);
			};
			
			if(jsondata[item]['Win'].includes(dice)){
				var win = Math.ceil(
					jsondata[item]['Payout']
					[jsondata[item]['Win'].indexOf(dice)] * winloss);
						
				if(item.indexOf('Come') != -1 || item.indexOf('Dont_Come') != -1){
					win = win + winloss; 
					self.total(self.total() - winloss);
					self.singleclear(item, winloss);
					self.netresults(dice);
				}
				
				self.bank(self.bank() + win);
				net += win;
			};	
		});
		
		
		self.net(net);
		
	};
		
			
	}
	ko.applyBindings(new viewModel());
	
}

