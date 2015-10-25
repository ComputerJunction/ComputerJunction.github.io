
window.onload = function () {
	
	'use strict';
	
	var jsondata,
		tip = d3.tip().attr('class', 'd3-tip').html(function(d) {return d; }),
		d3_svg = d3.select('svg').call(tip);
	//All the data for payouts winning and losing numbers are stored here
		$.getJSON("JSON_Craps.json", function (data) {
			jsondata = data;
		$.each(jsondata, function(key,val){
			var svg_loc = d3.select(document.body).select('svg')
			svg_loc.select("#"+key)
				.on('mouseover', function(d,i){d3.select(this).classed('hover',true);})
				.on('mouseout', function(d,i){d3.select(this).classed('hover',false);})
		});
			});
			

		//Functionality wrapped in knockout function
	var viewModel = function () {
		//List of variables
		var self = this;
		self.removal= ko.observable(false);
		self.singleremove = false;
		self.denomination = ko.observable(0);
		self.winlist = ko.observableArray();
		self.repeatlist = ko.observableArray();
		self.denom = {'five':5 , 'twentyfive':25, 'onehundred':100};
		self.textdenomination = ko.observable("");
		self.clickid = ko.observable("");
		self.point = ko.observable(0);
		self.firstdie = ko.observable();
		self.seconddie = ko.observable();
		self.bets = ko.observableArray();
		self.ev = ko.observable(0);
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
				//Makes the bet amount negative for removal
				self.removal(!self.removal());

			}else if(jsondata[id] && self.denomination()){
								
				if(self.bankrollcheck()){

					if(self.passcomecheck(id)){
						//This is a check for odds bets
						self.clickid() != id ? id = self.clickid() : null;

						self.chip(id);
					};
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
		self.bankrollcheck = function(){
			var check = true;
			var nextamt = self.denomination();
			
			var nextbank = self.bank() - nextamt;
			
			if(nextbank <= 0){
				window.alert('Please lower your bet amount, your bankroll is too low to make such a large wager');
				check = false;
				if(window.confirm("Want to just start again with $1000?"))
				{self.clear();self.bank(1000); self.ev(0);self.total(0)}
			}
			
			
			return check;
		};
		self.passcomecheck = function(id){

			var placechip = true,
				alldependentbets = 
				['Come_Ten', 'Come_Nine', 'Come_Eight', 'Come_Six', 'Come_Five', 
				'Come_Four','Dont_Come_Ten', 'Dont_Come_Nine', 'Dont_Come_Eight', 'Dont_Come_Six', 
				 'Dont_Come_Five', 'Dont_Come_Four', 'Come_Ten_Odds', 'Come_Nine_Odds', 'Come_Eight_Odds',
				 'Come_Six_Odds', 'Come_Five_Odds', 'Come_Four_Odds','Dont_Come_Ten_Odds', 'Dont_Come_Nine_Odds', 
				 'Dont_Come_Eight_Odds', 'Dont_Come_Six_Odds', 'Dont_Come_Five_Odds', 'Dont_Come_Four_Odds','Come', 
				 'Dont_Come','Pass_Line', 'Dont_Pass_Line', 'Pass_Line_Odds', 'Dont_Pass_Line_Odds'];

			if(self.removal() && !d3_svg.select(".Chip__" + id)[0][0]){

				placechip = false;
			}else{

				if(alldependentbets.indexOf(id) != -1){

					if(id.slice(-4).includes("Line")) {
						placechip = self.passlinecheck(id);}
					else if(id === 'Come' || id === 'Dont_Come'){
						placechip = self.comebetcheck(id);}
					else if(id.slice(-5).includes('_Odds')){ 
						placechip = self.oddscheck(id);}
					else{
						placechip = self.numbercomecheck(id)};
				};
			};

			return placechip;

		};
		self.passlinecheck = function(id){
			var placechip = true;

			self.point() === 0 ? null: 

				self.bets().includes(id) && !self.removal() ? self.addoddstoid(id) : placechip=false;

			return placechip;
		};
		self.comebetcheck = function(id){
			var placechip = true;

			self.point() != 0? null: placechip = false;

			return placechip;

		};
		self.oddscheck = function(id){
			var placechip = true;

			if(!self.removal()){
			self.point() != 0 && d3_svg.select(".Chip__" + id.slice(0,-5))[0][0] ? null: placechip = false;
			}else{
			self.point() != 0 && d3_svg.select(".Chip__" + id)[0][0] ? null: placechip = false;
			}

			return placechip;
		};
		self.numbercomecheck = function(id){
			var placechip = true;

			if(d3_svg.select(".Chip__" + id)[0][0] && !self.removal()){
				self.addoddstoid(id);}
			else{
				placechip = false}

			return placechip;
		}
		self.addoddstoid = function(id){

			self.clickid(id + "_Odds");
			return;
		};
		self.tally = function(d,i,id){

			var returnval = 0;
			d===undefined ? d = 0 : null;

			if(self.removal() && Math.abs(self.denomination()) >= d && !self.singleremove){
				self.bank(self.bank() + d);
				self.total(self.total() - d);
				self.ev(self.ev() - d * Number(jsondata[id]['EV'].slice(1)));
				returnval = -d;
				
			}else if(self.removal() && Math.abs(self.denomination()) < d && !self.singleremove){
				self.bank(self.bank() - self.denomination());
				self.total(self.total() + self.denomination());
				self.ev(self.ev() + self.denomination() * Number(jsondata[id]['EV'].slice(1)));
				returnval = self.denomination();
				
			}else if(self.singleremove){
				self.ev(self.ev() - d * Number(jsondata[id]['EV'].slice(1)))
				returnval = -d;
				self.singleremove = false;
				
			}else if(!self.removal() && !self.singleremove){
				self.bank(self.bank() - self.denomination());
				self.total(self.total() + self.denomination());
				self.ev(self.ev() + self.denomination() * Number(jsondata[id]['EV'].slice(1)));
				
				returnval = self.denomination();
				
			};

			return d + returnval;
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

					d3_svg.append('use')
						.datum(function(d,i) {return self.tally(d,i,id)})
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
						.on('mouseover', function(d) {tip.show(d, target);})
						.on('mouseout', function(d) {tip.hide(d, target);})
						;
					}

			}else{
				//update data for accurate counting of wager on specific bet
				chip.datum(function(d,i) {return self.tally(d,i,id)})
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
		self.collectbets = function(id){

			if(self.removal()){
				!d3_svg.select(".Chip__" + id)[0][0] ? 
					self.bets.remove(id)			
				: 
				null;
			}else{
				self.bets().indexOf(id) === - 1 ? 
					self.bets.push(id)
				: null;
			}
			
		};
		self.singleclear = function(id){

			self.singleremove = true;
			self.removal(true);
			self.chip(id);

			self.removal(false);
		};
		self.clear = function(){

			if(self.bets().length > 0) { 
				self.removal(true);

				self.bets().forEach(function (item, index, array){

					if (['Pass_Line','Dont_Pass_Line'].indexOf(item) != -1 && self.point() != 0){
						null;//They can not be removed

					}else if(['Come_Four','Come_Five','Come_Six','Come_Eight','Come_Nine','Come_Ten',
							 'Dont_Come_Four','Dont_Come_Five','Dont_Come_Six',
							  'Dont_Come_Eight','Dont_Come_Nine','Dont_Come_Ten'].indexOf(item) != -1){null;//They can not be removed
						null;//They can not be removed

					}else{

						self.chip(item);
	//					self.tally();
						self.clear();
					};
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
			self.repeat();
			self.netresults(dice,0, hard);
			self.movepuck(dice);
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
				puck.datum(0);
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
				var name = 'Come';
				var run = true;
			}else if(self.bets().includes('Dont_Come')){
				var targetid = "Dont_" + comerects[dice];
				var chip = d3_svg.select('.Chip__Dont_Come');
				var name = 'Dont_Come'
				var run = true;
			};
				
			if(run){
				self.denomination(chip.datum());
				self.chip(targetid);
				//pass it the target, id , datum
				self.singleclear(name);
				self.bank(self.bank() + self.denomination());
				self.total(self.total() - self.denomination());
				self.denomination(self.denom[self.textdenomination()]);
				self.movecomebets(dice);
			}
			
			
		};
		self.netresults = function(dice,net,hard){
			
			self.net(net);

			if (self.bets().length > 0){
				
				//This removeAll function returns an array so it could be useful in logging wins
				self.winlist().length > 50 ? self.winlist.removeAll() : null; 

				self.bets().forEach(function (item, index, array){

					var winloss = d3_svg.select('.Chip__'+item).datum(),
						
					loss_arr, win_arr, payout_arr, passpayout = false;
					
					if (self.point() != 0 && item === 'Pass_Line'){
						loss_arr = [7]; 
						win_arr = [self.point()];
						payout_arr = [1];
						passpayout = true;
					}else if(self.point() != 0 && item === 'Dont_Pass_Line'){
						loss_arr = [self.point()];
						win_arr = [7];
						payout_arr = [1];
						passpayout = true;
					}else if (self.point() != 0 && item === 'Pass_Line_Odds'){
						win_arr = [self.point()];
						loss_arr = [7];
						payout_arr = jsondata[item]['Payout'];
					}else if(self.point() != 0 && item === 'Dont_Pass_Line_Odds'){
						loss_arr = [self.point()];
						win_arr = [7];
						payout_arr = jsondata[item]['Payout'];
					}else{
						loss_arr = jsondata[item]['Loss'];
						win_arr = jsondata[item]['Win'];
						payout_arr = jsondata[item]['Payout'];	
					};
									
					//if first three string are Har or Hop
					//Win arr is one of the dice then one of the die
					if(item.substr(0,4)==='Hard') { 
						loss_arr.includes(dice) && hard ? 
							win_arr = jsondata[item]['Win'] && loss_arr.pop(dice) 
						: 
							loss_arr = jsondata[item]['Loss'], win_arr.pop();
					}; 
					
					if(item.substr(0,4)==='Hop_') {
						
						if(win_arr[0] === dice){
							var needed_digit = jsondata[item]['HopDigit'][0];
							
						 	self.firstdie() === needed_digit || self.seconddie() === needed_digit ? 
								
								loss_arr.pop(dice)
							: 
								
								win_arr.pop(dice)
						}
						
					};
					
					if(item.substr(0,7)==='HopHard') { 
						win_arr[0] === dice && hard ? 
							win_arr = jsondata[item]['Win'] && loss_arr.pop(dice) 
						: 
							loss_arr = jsondata[item]['Loss'], win_arr.pop();
					};

					if(loss_arr.includes(dice)){
						
						self.winlist.push(new self.Winloss(item, -winloss));
						self.net(self.net() - winloss);
						self.total(self.total() - winloss);
						self.singleclear(item);
						self.netresults(dice,self.net());
						
					};

					if(win_arr.includes(dice)){
						
						if(['Pass_Line', 'Dont_Pass_Line', 'Pass_Line_Odds', 'Dont_Pass_Line_Odds', 
							'Come', 'Dont_Come',
						   'Come_Four','Come_Five','Come_Six','Come_Eight','Come_Nine','Come_Ten',
							 'Dont_Come_Four','Dont_Come_Five','Dont_Come_Six',
							  'Dont_Come_Eight','Dont_Come_Nine','Dont_Come_Ten',
						   'Come_Four_Odds','Come_Five_Odds','Come_Six_Odds','Come_Eight_Odds','Come_Nine_Odds','Come_Ten_Odds',
							 'Dont_Come_Four_Odds','Dont_Come_Five_Odds','Dont_Come_Six_Odds',
							  'Dont_Come_Eight_Odds','Dont_Come_Nine_Odds','Dont_Come_Ten_Odds'].indexOf(item) != -1){
							
							item === 'Dont_Pass_Line_Odds' ? win_arr = jsondata[item]['Loss']: null;
							item === 'Pass_Line_Odds' ? win_arr = jsondata[item]['Win']: null;
							
							var win = passpayout ? winloss : Math.ceil(payout_arr[win_arr.indexOf(dice)] * winloss);
							
							self.winlist.push(new self.Winloss(item, win));
//							win = win + winloss; 
							self.total(self.total() - winloss);
							self.singleclear(item);
							self.bank(self.bank() + win);
							self.netresults(dice,self.net());
						}else{
							
							var win = Math.ceil(payout_arr[win_arr.indexOf(dice)] * winloss);
						}
						
						self.winlist().indexOf(item) === -1 ? self.winlist.push(new self.Winloss(item, win)) : null;
						self.net(self.net() + win);
						self.bank(self.bank() + win);
						
					};
					
					
				});
				
				
			};

		};
		self.Winloss = function(betname, amount){
		this.name = betname;
		this.amount = amount;
		};
		self.winlisttotal = function(){
			var total = 0;
			if (self.winlist().length > 0){
				
				self.winlist().forEach(function(item, index, array){
					//The item is a Winloss object with amount as a property
					total += item.amount;
					
				})
			}
			return total;
		};
		self.repeat = function(){
			if (self.bets().length > 0){
				
				self.repeatlist().length > 0 && self.repeatlist.removeAll();
				
				self.bets().forEach(function(item, index, array){
					var betamt = d3_svg.select('.Chip__'+item).datum();
					self.repeatlist.push(new self.Winloss(item,betamt))
				})
			};
		};
		self.betrepeat = function(){
			
			if(self.repeatlist().length > 0){
				
				self.repeatlist().forEach(function(item, index, array){
					
					var name = item.name, amt = item.amount;
					if (!self.bets().includes(name)){
						
						self.removal(false);
						self.denomination(amt);
						self.chip(name);
						self.denomination(self.denom[self.textdenomination()]);
						self.repeatlist.remove(item);
						self.betrepeat();
						} ;
				})
			}
		};
		
		}
		ko.applyBindings(new viewModel());

}

