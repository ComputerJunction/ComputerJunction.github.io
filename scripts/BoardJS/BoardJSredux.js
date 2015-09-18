
window.onload = function () {
			

	function viewModel() {
				
		var self = this;

		self.min = ko.observable(5);
		self.point = ko.observable(0);
		self.firstdie = ko.observable(0);
		self.seconddie = ko.observable(0);
		self.bankroll = ko.observable(1000);
		self.minbet = [5, 10, 25, 50, 100, 200];
		self.internal_count = ko.observable(0);
		self.previous_count = ko.observable(0);
		self.count = ko.observable(0);
		self.suggest=ko.observable("");
		self.fremontcheck = ko.observable(false);
		self.buycheck = ko.observable(false);

		self.scale = ko.pureComputed(function () {return [0, 1, 1 * self.min(), 2 * self.min(), 3 * self.min(), 4 * self.min()];
			});
		self.first = function () {return Math.floor(Math.random() * (6)) + 1;};
		self.second = function () {return Math.floor(Math.random() * (6)) + 1;};
		
		self.roll = function(){
			self.firstdie(self.first());
			self.seconddie(self.second());
			var dice = self.firstdie() + self.seconddie(),
				win = 0, oldbankroll = self.bankroll(),
				hard = (self.firstdie() === self.seconddie()) ? true : false;
			
			self.suggestcount(dice);
			
			///Set the point and move the puck
			if (dice == self.point() || dice == 7){
				d3.select("svg #puck").transition().delay(350).attr('cx', 300.4);
				self.point(0);
			}else if (dice > 3 && dice < 11 && self.point()=== 0){
					//move this to a function(dice) with dictionary 4:342.4, 5:367.4
				self.movepuck(dice);
				self.point(dice);
			};
			//Point tooltip
			$('svg #puck')
				.attr({
				'title': "Point: " + self.point(),
			})
				.tooltip({
			'container': '.gamearticle',
			'placement': 'top'
			});
			//Above point tooltip
			//if total is not empty
			if(self.total() > 0) {
				//put losses for anyseven
				//put losses for odds bets
				switch (dice){
					case 2:
						if(self.horntwo() != 0){
							win += 27 * self.horntwo();
							//bet stays
						};
						if(self.anycraps() != 0){
							win += 6 * self.anycraps();
							//bet stays
						};
						if(self.ce() != 0){
							win += 6 * self.ce();
							//bet stays
						};
						if(self.point() === 0){
							win -= self.pass();
							win += self.dontpass();
							//bets returned to zero
							self.pass(0);
							self.dontpass(0);
							};
						if(self.come_total() != 0){
							win -= self.come();
							win += self.dontcome();
							//bets returned to zero
							self.come(0);
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							win -= self.allhops();
						};
						if(self.field() != 0){
							win += self.field()*2;
							//bet stays
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						break;
					case 3:
						if(self.hornthree() != 0){
							win += 12 * self.hornthree();
							//bet stays
						};
						if(self.anycraps() != 0){
							win += 6 * self.anycraps();
							//bet stays
						};
						if(self.ce() != 0){
							win += 6 * self.ce();
							//bet stays
						};
						if(self.point() === 0){
							win -= self.pass();
							win += self.dontpass();
							//bets returned to zero
							self.pass(0);
							self.dontpass(0);
							};
						if(self.come_total() != 0){
							win -= self.come();
							win += self.dontcome();
							//bets returned to zero
							self.come(0);
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							win -= self.allhops();
						};
						if(self.field() != 0){
							win += self.field();
							//bet stays
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						break;
					case 11:
						if(self.horneleven() != 0){
							win += 12 * self.horneleven();
							//bets stay
						};
						if(self.ce() != 0){
							win += 14 * self.ce();
							//bets stay
						};
						if(self.yo() != 0){
							win += 15 * self.yo();
							//bets stays
						};
						if(self.point() === 0){
							win += self.pass();
							win -= self.dontpass();
							//bets returned
							self.pass(0);
							self.dontpass(0);
							};
						if(self.come_total() != 0){
							win += self.come();
							win -= self.dontcome();
							//bets returned
							self.come(0);
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							win -= self.allhops();
						};
						if(self.field() != 0){
							win += self.field();
							//bet stays
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						break;
					case 12:
						if(self.horntwelve() != 0){
							win += 27 * self.horntwelve();
							//bets stay
						};
						if(self.anycraps() != 0){
							win += 6 * self.anycraps();
							//bets stay
						};
						if(self.ce() != 0){
							win += 6 * self.ce();
							//bets stays
						};
						if(self.point() === 0){
							win -= self.pass();
							win += self.dontpass();
							//bets returned
							self.pass(0);
							self.dontpass(0);
							};
						if(self.come_total() != 0){
							win -= self.come();
							win += self.dontcome();
							//bets returned
							self.come(0);
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							win -= self.allhops();
						};
						if(self.field() != 0){
							win += self.field()*2;
							//bet stays
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						break;

					case 4:
						//subtract all other hops NOT HARD HOPS
						
						if(self.placefour() != 0){
							win += Math.ceil(1.80 * self.placefour());
							//bet stays
						};
						if(self.buyfour() != 0){
							win += Math.ceil(1.90 * self.buyfour());
							//bets stay
						};
						if(self.field() != 0){
							win += self.field();
							//bet stays
						};
						if(self.hophardfour() != 0 || self.hardfour() != 0){
							if (hard === true){
								win += 7 * self.hardfour();	
								win += 30 * self.hophardfour();
							}else{
								win -= self.hardfour();
								win -= self.hophardfour();
								//bets returned to zero
								self.hardfour(0);
								self.hophardfour(0);
							}
						};
						if(self.sub_horn_total() != 0){
							win -= self.sub_horn_total();
							//losing bets are still up
						};
						if(self.sub_single_total() != 0){
							win -= self.sub_single_total();
							//losing bets are still up
						};
						if(self.againstfour() !=0){
							win -= self.againstfour();
							//losing bet comes down
							self.againstfour(0);
							};
						if(self.layfour() != 0){
							win -= self.layfour();
							//losing bet comes down
							self.layfour(0)
							};
						if(self.fourcome() != 0){
							win += self.fourcome();
							win += 2 * self.fourcomeodds();
							//bet is zeroed
							self.fourcome(0);
							self.fourcomeodds(0);
						};
						if(self.come() != 0){
							self.fourcome(self.come());
							self.come(0);
						};
						if(self.fourdontcome() != 0){
							win -= self.fourdontcome();
							win -= self.fourdontcomeodds();
							//bets are zeroed
							self.fourdontcome(0);
							self.fourdontcomeodds(0);
						};
						if(self.dontcome() != 0){
							self.fourdontcome(self.dontcome());
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							//includes the hophards in the total
							//hophards will be zeroed out above
							if (hard===true){
									win -= self.hopfour();
									self.hopfour(0);
								}else{
									win += self.hopfour();
									self.hopfour(0);
								}
							win -= self.allhops();
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						if(self.pass() != 0){
							win += self.pass();
							win += Math.ceil(self.passodds() * 2);
							//bets returned
							self.pass(0);
							self.passodds(0);
							};
						if(self.dontpass() != 0){
							win += self.dontpass();
							win += self.dontpassodds();
							//bets returned
							self.dontpass(0);
							self.dontpassodds(0);
							};
						
						break; //put hops here
					case 5:
						if(self.placefive() != 0){
							win += Math.ceil(1.40 * self.placefive());
							//bet stays
						};
						if(self.buyfive() != 0){
							win += Math.ceil(1.425 * self.buyfive());
							//bet stays
						};
						if(self.field() != 0){
							win -= self.field();
							//reset bet
							self.field(0);
						};
						if(self.sub_horn_total() != 0){
							win -= self.sub_horn_total();
							//losing bets are still up
						};
						if(self.sub_single_total() != 0){
							win -= self.sub_single_total();
							//losing bets still up
						};
						if(self.againstfive() !=0){
							win -= self.againstfive();
							//losing bets come down
							self.againstfive(0);
							};
						if(self.layfive() != 0){
							win -= self.layfive();
							//losing bets come down
							self.layfive(0)
							};
						if(self.fivecome() != 0){
							win += self.fivecome();
							win += 2 * self.fivecomeodds();
							//bets come down
							self.fivecome(0);
							self.fivecomeodds(0);
						};
						if(self.come() != 0){
							self.fivecome(self.come());
							self.come(0);
						};
						if(self.fivedontcome() != 0){
							win -= self.fivedontcome();
							win -= self.fivedontcomeodds();
							//bets come down
							self.fivedontcome(0);
							self.fivedontcomeodds(0);
						};
						if(self.dontcome() != 0){
							self.fivedontcome(self.dontcome());
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							//includes the hophards in the total
							//hophards will be zeroed out above
							if(self.firstdie()===1 || self.seconddie() ===1){
								win += self.hopfiveone();
								self.hopfiveone(0);
							}else{
								win += self.hopfive();
								self.hopfive(0);
							};
							win -= self.allhops();
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						if(self.pass() != 0){
							win += self.pass();
							win += Math.ceil(self.passodds() * 1.5);
							//bets returned
							self.pass(0);
							self.passodds(0);
							};
						if(self.dontpass() != 0){
							win += self.dontpass();
							win += self.dontpassodds();
							//bets returned
							self.dontpass(0);
							self.dontpassodds(0);
							};
						break;
					case 6:
						if(self.placesix() != 0){
							win += Math.ceil(1.17 * self.placesix());
							//leave bet
						};
						if(self.buysix() != 0){
							win += Math.ceil(1.14 * self.buysix());
							//leave bet
						};
						if(self.bigsix() != 0){
							win += self.bigsix();
							//leave bet
						};
						if(self.hardsix() != 0|| self.hophardsix() != 0){
						   if(hard===true){
							   win += 9 * self.hardsix();
							   win += 30 * self.hophardsix();
							}else{
								win -= self.hardsix();
								win -= self.hophardsix();
							};
							//leave bets
							self.hardsix(0);
							self.hophardsix(0);
						};
						if(self.field() != 0){
							win -= self.field();
							//reset loss
							self.field(0);
						};
						if(self.sub_horn_total() != 0){
							win -= self.sub_horn_total();
							//keep bets
						};
						if(self.sub_single_total() != 0){
							win -= self.sub_single_total();
							//keep bets
						};
						if(self.againstsix() !=0){
							win -= self.againstsix();
							//reset bet
							self.againstsix(0);
							};
						if(self.laysix() != 0){
							win -= self.laysix();
							//reset loss
							self.laysix(0)
						};
						if(self.sixcome() != 0){
							win += self.sixcome();
							win += 1.2 * self.sixcomeodds();
							//reset win
							self.sixcome(0);
							self.sixcomeodds(0);
						};
						if(self.come() != 0){
							self.sixcome(self.come());
							self.come(0);
						};
						if(self.sixdontcome() != 0){
							win -= self.sixdontcome();
							win -= self.sixdontcomeodds();
							//reset loss
							self.sixdontcome(0);
							self.sixdontcomeodds(0);
						};
						if(self.dontcome() != 0){
							self.sixdontcome(self.dontcome());
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							if (self.firstdie() === 1 || self.seconddie() === 1){
								win += self.hopsixtwo();
								self.hopsixtwo(0);
							}else{
								win += self.hopsix();
								self.hopsix(0);
							};
							win -= self.allhops();
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						if(self.pass() != 0){
							win += self.pass();
							win += Math.ceil(self.passodds() * 1.2);
							//bets returned
							self.pass(0);
							self.passodds(0);
							};
						if(self.dontpass() != 0){
							win += self.dontpass();
							win += self.dontpassodds();
							//bets returned
							self.dontpass(0);
							self.dontpassodds(0);
							};
						break;
					case 7:
						if(self.sub_seven_total() != 0){
							//reseting all separately why??? just did it refactor????
							if (self.againstfour() !=0){
								win += Math.ceil(.45 * self.againstfour());
								
							};
							if(self.layfour() != 0){
								win += Math.ceil(.48 * self.layfour());
								
							};
							
							if(self.againstfive() != 0){
								win += Math.ceil(.63 * self.againstfive());
								
							};
							if(self.layfive() != 0){
								win += Math.ceil(.63 * self.layfive());
								
							};
							
							if(self.againstsix() != 0){
								win += Math.ceil(.80 * self.againstsix());
								
							};
							if(self.laysix() != 0){
								win += Math.ceil(.79 * self.laysix());
								
							};
							
							if(self.againsteight() != 0){
								win += Math.ceil(.80 * self.againsteight());  
								
							};
							if(self.layeight() != 0){
								win += Math.ceil(.79 * self.layeight ()); 
								
							};
							
							if(self.againstnine() != 0){
								win += Math.ceil(.63 * self.againstnine());  
								
							};
							if(self.laynine() != 0){
								win += Math.ceil(.63 * self.laynine()); 
								
							};
							if (self.againstten() !=0){
								win += Math.ceil(.45 * self.againstten()); 
								
							};
							if(self.layten() != 0){
								win += Math.ceil(.48 * self.layten()); 
								
							};
							if(self.anyseven() != 0){
								win += Math.ceil(4 * self.anyseven());                                 
							};
							
						};
						if(self.sub_line_total() != 0){
							win -= self.sub_line_total();
							//reset line
							
						}
						if(self.field() !=0){
							win -=self.field();
							//reset bet
							
						};
						if(self.sub_horn_total() != 0){
							win -= self.sub_horn_total();
							//reset the bet
						};
						if(self.sub_single_total() != 0){
							win -= self.sub_single_total();
							//reset the bets
						};
						if(self.contract_total() != 0){
							//first roll
							if (self.point() === 0){
								win += self.pass();
								win -= self.dontpass();
							}else{//after first roll
								win -= self.pass();
								win -= self.passodds();
								win += self.dontpass();
								if (self.dontpassodds() != 0){
									switch (self.point()){
										case 4:
											win += self.dontpassodds * .50;
											break;
										case 5:
											win += self.dontpassodds * .67;
											break;
										case 6:
											win += self.dontpassodds * .83;
											break;
										case 8:
											win += self.dontpassodds * .83;
											break;
										case 9:
											win += self.dontpassodds * .67;
											break;
										case 10:
											win += self.dontpassodds * .50;
											break;
									};
								};

							};
						};
						if(self.come_total() != 0){
							win += self.come() + self.alldontcome();
							win -= self.dontcome() + self.allcome() + self.allcomeodds();
							win += self.fourdontcomeodds() * .50;
							win += self.fivedontcomeodds() * .67;
							win += self.sixdontcomeodds() * .83;
							win += self.eightdontcomeodds() * .83;
							win += self.ninedontcomeodds() * .67;
							win += self.tendontcomeodds() * .50;
							
							self.come_total(true)
							self.allcomeodds(true);
						}
						if(self.allhops() != 0){
							if (self.firstdie()===1 || self.seconddie() === 1){
								win += self.hopseven();
								self.hopseven(0);
							}else if (self.firstdie() === 2 || self.seconddie() === 2){
								win += self.hopseventwo();
								self.hopseventwo(0);
							}else{
								win += self.hopseventhree();
								self.hopseventhree(0);
							};
						};
						self.clear();
						break; //put hops here
					case 8:
						if(self.placeeight() != 0){
							win += Math.ceil(1.17 * self.placeeight());
							//leave bet
						};
						if(self.buyeight() != 0){
							win += Math.ceil(1.14 * self.buyeight());
							//leave bet
						};
						if(self.bigeight() != 0){
							win += self.bigeight();
							//leave bet
						};
						if(self.hardeight() != 0 || self.hophardeight() != 0){
							if(hard==true){
								win += 9 * self.hardeight();
								win += 30 * self.hophardeight();
							}else{
								win -= self.hardeight();
								win -= self.hophardeight();
							}
							//zero out bets
							self.hardeight(0);
							self.hophardeight(0);
						};
						if(self.field() != 0){
							win -= self.field();
							//zero out loss
							self.field(0);
						};
						if(self.sub_horn_total() != 0){
							win -= self.sub_horn_total();
							//leave bets
						};
						if(self.sub_single_total() != 0){
							win -= self.sub_single_total();
							//leave bets
						};
						if(self.againsteight() !=0){
							win -= self.againsteight();
							//reset bet
							self.againsteight(0);
							};
						if(self.layeight() != 0){
							win -= self.layeight();
							//reset bet
							self.layeight(0)
							};
						if(self.eightcome() != 0){
							win += self.eightcome();
							win += 1.2 * self.eightcomeodds();
							//reset bets
							self.eightcome(0);
							self.eightcomeodds(0);
						};
						if(self.come() != 0){
							self.eightcome(self.come());
							self.come(0);
						};
						if(self.eightdontcome() != 0){
							win -= self.eightdontcome();
							win -= self.eightdontcomeodds();
							//reset bets
							self.eightdontcome(0);
							self.eightdontcomeodds(0);
						};
						if(self.dontcome() != 0){
							self.eightdontcome(self.dontcome());
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							if (self.firstdie() === 2 || self.seconddie() === 2){
								win += self.hopseight();
								self.hopeight(0);
							}else{
								win += self.hopeightthree();
								self.hopeightthree(0);
							};
							win -= self.allhops();
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						if(self.pass() != 0){
							win += self.pass();
							win += Math.ceil(self.passodds() * 1.2);
							//bets returned
							self.pass(0);
							self.passodds(0);
							};
						if(self.dontpass() != 0){
							win += self.dontpass();
							win += self.dontpassodds();
							//bets returned
							self.dontpass(0);
							self.dontpassodds(0);
							};
						break;
					case 9:
						if(self.placenine() != 0){
							win += Math.ceil(1.40 * self.placenine());
							//keep bet up
						};
						if(self.buynine() != 0){
							win += Math.ceil(1.425 * self.buyfive());
							//keep bet up
						};
						if(self.field() != 0){
							win += self.field();
							//keep bet up
						};
						if(self.sub_horn_total() != 0){
							win -= self.sub_horn_total();
							//bets stay 
						};
						if(self.sub_single_total() != 0){
							win -= self.sub_single_total();
							//bet stay
						};
						if(self.againstnine() !=0){
								win -= self.againstnine();
							//reset bet
								self.againstnine(0);
							};
						if(self.laynine() != 0){
								win -= self.laynine();
							//reset bet
								self.laynine(0)
							};
						if(self.ninecome() != 0){
							win += self.ninecome();
							win += 1.5 * self.ninecomeodds();
							//bets zero out
							self.ninecome(0);
							self.ninecomeodds(0);
						};
						if(self.come() != 0){
							self.ninecome(self.come());
							self.come(0);
						}
						if(self.ninedontcome() != 0){
							win -= self.ninedontcome();
							win -= self.ninedontcomeodds();
							//bets zero out
							self.ninedontcome(0);
							self.ninedontcomeodds(0);
						};
						if(self.dontcome() != 0){
							self.ninedontcome(self.dontcome());
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							//includes the hophards in the total
							//hophards will be zeroed out above
							if(self.firstdie()===3 || self.seconddie() ===3){
								win += self.hopninethree();
								self.hopninethree(0);
							}else{
								win += self.hopninefour();
								self.hopninefour(0);
							};
							win -= self.allhops();
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						if(self.pass() != 0){
							win += self.pass();
							win += Math.ceil(self.passodds() * 1.5);
							//bets returned
							self.pass(0);
							self.passodds(0);
							};
						if(self.dontpass() != 0){
							win += self.dontpass();
							win += self.dontpassodds();
							//bets returned
							self.dontpass(0);
							self.dontpassodds(0);
							};
						break;
					case 10:
						if(self.placeten() != 0){
							win += Math.ceil(1.80 * self.placeten());
							//bet stays up
						};
						if(self.buyten() != 0){
							win += Math.ceil(1.90 * self.buyten());
							//bet stays up
						};
						if(self.field() != 0){
							win += self.field();
							//bets stays up 
						};
						if(self.hardten() != 0 || self.hophardten() != 0){
							if(hard==true){
								win += 7 * self.hardten();
								win += 30 * self.hophardten();
							}else{
								win -= self.hardten();
								win -= self.hophardten();
							};
							//bets stay up
							self.hardten(0);
							self.hophardten(0);
						};
						if(self.sub_horn_total() != 0){
							win -= self.sub_horn_total();
							//leave bets up
						};
						if(self.sub_single_total() != 0){
							win -= self.sub_single_total();
							//leave bets up
						};
						if(self.againstten() !=0){
							win -= self.againstten();
							//reset bet
							self.againstten(0);
							};
						if(self.layten() != 0){
							win -= self.layten();
							//reset bet
							self.layten(0)
							};
						if(self.tencome() != 0){
							win += self.tencome();
							win += 2 * self.tencomeodds();
							//reset bets
							self.tencome(0);
							self.tencomeodds(0);
						};
						if(self.come() != 0){
							self.tencome(self.come());
							self.come(0);
						};
						if(self.tendontcome() != 0){
							win -= self.tendontcome();
							win -= self.tendontcomeodds();
							//reset bets
							self.tendontcome(0);
							self.tendontcomeodds(0);
						};
						if(self.dontcome() != 0){
							self.tendontcome(self.dontcome());
							self.dontcome(0);
						};
						if(self.allhops() != 0){
							//includes the hophards in the total
							//hophards will be zeroed out above
							if (hard===true){
									win -= self.hopten();
									self.hopten(0);
								}else{
									win += self.hopten();
									self.hopten(0);
								}
							win -= self.allhops();
						};
						if(self.anyseven() !=0){
							win-=self.anyseven();self.anyseven(0)
						};
						if(self.pass() != 0){
							win += self.pass();
							win += Math.ceil(self.passodds() * 2);
							//bets returned
							self.pass(0);
							self.passodds(0);
							};
						if(self.dontpass() != 0){
							win += self.dontpass();
							win += self.dontpassodds();
							//bets returned
							self.dontpass(0);
							self.dontpassodds(0);
							};
						break;
					default:
						return alert ("This is crazy some how number was rolled that was not possible with two fair dice.  Weird, very weird.");
				};
//				alert(win);
				self.bankroll(win+oldbankroll);
			}else{
//				alert("You did not bet but you can still watch the dice!")
			};
			//Point puck use d3 tooltip
			//place tooltip on all bets
			

		};
		self.dontpass = ko.observable(0);
		self.dontpassodds = ko.observable(0);
		self.pass = ko.observable(0);
		self.passodds = ko.observable(0);
		
		self.come = ko.observable(0);
		//self.sixcome
		//self.sixcomeodds
		self.fourcome = ko.observable(0);
		self.fourcomeodds = ko.observable(0);
		self.fivecome = ko.observable(0);
		self.fivecomeodds = ko.observable(0);
		self.sixcome = ko.observable(0);
		self.sixcomeodds = ko.observable(0);
		self.eightcome = ko.observable(0);
		self.eightcomeodds = ko.observable(0);
		self.ninecome = ko.observable(0);
		self.ninecomeodds = ko.observable(0);
		self.tencome = ko.observable(0);
		self.tencomeodds = ko.observable(0);
		
		self.dontcome = ko.observable(0);
		//self.sixdontcome
		//self.sixdontcomeodds
		self.fourdontcome = ko.observable(0);
		self.fourdontcomeodds = ko.observable(0);
		self.fivedontcome = ko.observable(0);
		self.fivedontcomeodds = ko.observable(0);
		self.sixdontcome = ko.observable(0);
		self.sixdontcomeodds = ko.observable(0);
		self.eightdontcome = ko.observable(0);
		self.eightdontcomeodds = ko.observable(0);
		self.ninedontcome = ko.observable(0);
		self.ninedontcomeodds = ko.observable(0);
		self.tendontcome = ko.observable(0);
		self.tendontcomeodds = ko.observable(0);
		
		self.anycraps = ko.observable(0);
		self.ce = ko.observable(0);
		self.field = ko.observable(0);
		
		self.yo = ko.observable(0);
		self.anyseven = ko.observable(0);
		
		self.horntwo = ko.observable(0);
		self.hornthree = ko.observable(0);
		self.horntwelve = ko.observable(0);
		self.horneleven = ko.observable(0);
		
		self.buyfour = ko.observable(0);
		self.buyfive = ko.observable(0);
		self.buysix = ko.observable(0);
		self.buyeight = ko.observable(0);
		self.buynine = ko.observable(0);
		self.buyten = ko.observable(0);
		
		self.placefour = ko.observable(0);
		self.placefive = ko.observable(0);
		self.placesix = ko.observable(0);
		self.placeeight = ko.observable(0);
		self.placenine = ko.observable(0);
		self.placeten = ko.observable(0);
		
		self.layfour = ko.observable(0);
		self.layfive = ko.observable(0);
		self.laysix = ko.observable(0);
		self.layeight = ko.observable(0);
		self.laynine = ko.observable(0);
		self.layten = ko.observable(0);
		
		self.againstfour = ko.observable(0);
		self.againstfive = ko.observable(0);
		self.againstsix = ko.observable(0);
		self.againsteight = ko.observable(0);
		self.againstnine = ko.observable(0);
		self.againstten = ko.observable(0);

		self.hardfour = ko.observable(0);
		self.hardsix = ko.observable(0);
		self.hardeight = ko.observable(0);
		self.hardten = ko.observable(0);

		self.bigsix = ko.observable(0);
		self.bigeight = ko.observable(0);
		
		self.hopfour = ko.observable(0);
		
		self.hopfive = ko.observable(0);
		self.hopfiveone = ko.observable(0);
		
		self.hopsix = ko.observable(0);
		self.hopsixtwo = ko.observable(0);
		
		self.hopeight = ko.observable(0);
		self.hopeightthree = ko.observable(0);
		
		self.hopninethree = ko.observable(0);
		self.hopninefour = ko.observable(0);
		
		self.hopten = ko.observable(0);
		
		self.hopseven = ko.observable(0);
		self.hopseventwo = ko.observable(0);
		self.hopseventhree = ko.observable(0);
		
		self.hophardfour = ko.observable(0);
		self.hophardsix = ko.observable(0);
		self.hophardeight = ko.observable(0);
		self.hophardten = ko.observable(0);
		
		
		self.sub_seven_total = function(reset){
			if (reset === undefined){
				return self.againstfour()+ +self.againstfive()+ self.againstsix() 
				+self.againsteight()+ self.againstnine() +self.againstten()
				+self.layfour() +self.layfive()+ self.laysix() 
				+self.layeight()+ self.laynine() +self.layten()+ self.anyseven()
				;
			}else{
				self.againstfour(0);self.layfour(0);
				self.againstfive(0);self.layfive(0);
				self.againstsix(0);self.laysix(0);
				self.againsteight(0);self.layeight(0);
				self.againstnine(0);self.laynine(0);
				self.againstten(0);self.layten(0);
				self.anyseven(0);self.hopseven(0);
				self.hopseventhree(0);self.hopseventwo(0);
			}
		};
		self.sub_horn_total = function(number){
			//horn bets and the yo bet 2, 3, 11, 12
			if (number === undefined){
				return self.horntwo()+ self.hornthree()+self.horneleven()+ self.horntwelve()+self.yo() ;
			}else if (number === "all"){
				self.horntwo(0); self.hornthree(0); self.horneleven(0); self.yo(0);self.horntwelve(0);
			}else{
				switch(number){
					case 2:self.horntwo(0);
						break;
					case 3:self.hornthree(0);
						break;
					case 11:self.horneleven(0); self.yo(0);
						break;
					case 12: self.horntwelve(0);
						break;
				};
			};
		};
		self.sub_single_total = function(reset){
			if (reset === undefined){
				return self.anycraps() +self.ce();
			}else{
				self.anycraps(0);self.ce(0); self.field(0);
			};
		};
		self.contract_total = function(reset){
			if (reset === undefined){
				return self.pass()+self.dontpass()+self.passodds()+self.dontpassodds();
			}else{
				self.dontpass(0);self.passodds(0);self.dontpassodds(0);
				if (self.point() !=0 && self.pass() != 0){
//					alert("Pass Line is Contract Bet and can't be removed once wagered!")
				}else{
					self.pass(0);
				}
			};
		};
		self.come_total = function(reset){
			if (reset === undefined){
				return self.come()+self.dontcome()+self.allcome()+self.dontcome();
			}else{
				self.dontcome(0);self.come(0);
				self.fourdontcome;self.fivedontcome(0);
				self.sixdontcome(0);self.eightdontcome(0);
				self.ninedontcome(0);self.tendontcome(0);
				self.fourcome(0);self.fivecome(0);
				self.sixcome(0);self.eightcome(0);
				self.ninecome(0);self.tencome(0);
			};
		};
		//Aggregrating functions below
		self.allcome = function(){
			return self.fourcome()+self.fivecome()
			+self.sixcome()+self.eightcome()
			+self.ninecome()+self.tencome();
		};
		self.alldontcome = function(){
			return self.fourdontcome()+self.fivedontcome()
			+self.sixdontcome()+self.eightdontcome()
			+self.ninedontcome()+self.tendontcome();
				
		};
		self.allcomeodds = function(reset){
			if (reset === undefined){
				return self.fourcomeodds()+self.fivecomeodds()
			+self.sixcomeodds()+self.eightcomeodds()
			+self.ninecomeodds()+self.tencomeodds();
			}else{
			self.fourcomeodds(0);self.fivecomeodds(0)
			;self.sixcomeodds(0);self.eightcomeodds(0)
			;self.ninecomeodds(0);self.tencomeodds(0);
			};
		};
		self.alldontcomeodds = function(){
			return self.fourdontcomeodds()+self.fivedontcomeodds()
			+self.sixdontcomeodds()+self.eightdontcomeodds()
			+self.ninedontcomeodds()+self.tendontcomeodds();
//			}else{
//			self.fourcomeodds(0);self.fivecomeodds(0)
//			;self.sixcomeodds(0);self.eightcomeodds(0)
//			;self.ninecomeodds(0);self.tencomeodds(0);
//			}
			;
		};
		self.allhops = function(){
			return self.hopfour()+self.hophardfour()
				+self.hopfive()+self.hopfiveone()
				+self.hopsix()+self.hopsixtwo()+self.hophardsix()
				+self.hopeight()+self.hopeightthree()+self.hophardeight()
				+self.hopninefour()+self.hopninethree()
				+self.hopten()+self.hophardten()
				+self.hopseven()+self.hopseventhree()+self.hopseventwo();
		};
		//Aggregrating functions above
		self.sub_line_total = function(number){
			if (number === undefined){
				return self.bigsix()+self.bigeight()
				+self.hardfour()+self.hardsix()+self.hardeight()+self.hardten()
				+self.placefour()+self.placefive()+self.placesix()+self.placeeight()
				+self.placenine()+self.placeten()
				+self.buyfour()+self.buyfive() 
				+self.buysix()+self.buyeight()+self.buynine()+self.buyten()
				+self.hopfour()+self.hophardfour()
				+self.hopfive()+self.hopfiveone()
				+self.hopsix()+self.hopsixtwo()+self.hophardsix()
				+self.hopeight()+self.hopeightthree()+self.hophardeight()
				+self.hopninefour()+self.hopninethree()
				+self.hopten()+self.hophardten();
			}else if (number === "all"){
			 	self.hardfour(0);self.buyfour(0);self.placefour(0);
				self.buyfive(0);self.placefive(0);
				self.bigsix(0);self.placesix(0);self.hardsix(0);self.buysix(0);
				self.bigeight(0);self.hardeight(0);self.buyeight(0);self.placeeight(0);
				self.buynine(0);self.placenine(0);
				self.hardten(0);self.buyten(0);self.placeten(0);
				self.hopfour(0);self.hophardfour(0);
				self.hopfive(0);self.hopfiveone(0);
				self.hopsix(0);self.hopsixtwo(0);self.hophardsix(0);
				self.hopeight(0);self.hopeightthree(0);self.hophardeight(0);
				self.hopninefour(0);self.hopninethree(0);
				self.hopten(0);self.hophardten(0);
			}else{
				switch (number){
					case 4: self.hardfour(0);self.buyfour(0);self.placefour(0);self.hopfour(0);self.hophardfour(0);
						break;
					case 5:
						self.buyfive(0);self.placefive(0);self.hopfive(0);self.hopfiveone(0);
						break;
					case 6:	self.bigsix(0);self.placesix(0);self.hardsix(0);self.buysix(0);self.hopsix(0);self.hopsixtwo(0);self.hophardsix(0);
						break;
					case 8:	self.bigeight(0);self.hardeight(0);self.buyeight(0);self.placeeight(0);self.hopeight(0);self.hopeightthree(0);self.hophardeight(0);
						break;
					case 9:
						self.buynine(0);self.placenine(0);self.hopninefour(0);self.hopninethree(0);
						break;
					case 10:
						self.hardten(0);self.buyten(0);self.placeten(0);self.hopten(0);self.hophardten(0);
						break;
				};
			};
		};
		self.clear = function(){
			
			self.sub_seven_total(true);
			self.sub_horn_total("all");
			self.sub_line_total("all");
			self.sub_single_total(true);
			self.contract_total(true);
			
		};
		self.total = function(){
			return self.sub_line_total()+self.sub_horn_total()
			+self.sub_seven_total()+self.sub_single_total()+self.field()
			+self.contract_total()+self.come_total()+self.allcomeodds()+self.alldontcomeodds();
						   
		};
		self.bank = function(){
			return self.bankroll() - self.total();
		};
		self.movepuck = function(dice){
			var coord = {4:342.4,5:367.4,6:392.4,8:417.4,9:442.4,10:467.4};
			d3.select("svg #puck").transition().delay(350).attr('cx', coord[dice]);
		};
		ko.bindingHandlers.chip = {
			update:function(element, valueAccessor, allBindings){
				var value = valueAccessor();
				var actualvalue = ko.unwrap(value);
				if (actualvalue != 0){
					
					$(element).attr({
						'title': actualvalue,
						
					});
					$(element).tooltip({
						'container': '.gamearticle',
						'placement': 'top'
					});
				};
			}
		};
		self.suggestcount = function(dice){
			var conversion = {2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 12:2, 11:3, 10:4, 9:5, 8:6};
			
			self.internal_count(self.internal_count()+1);
			self.count(self.count() + conversion[dice]);
			self.suggest("");
			
			if (self.internal_count() == 6){
				self.count(0);
				self.internal_count(0);
				self.previous_count(0);
			};
			
			if (self.internal_count() == 5){
				var num = 31 - self.count();
				var pop = "";
				if (num > 7){
					pop = "Come";
				}else if (num < 8 && num > 3){
					pop = "Fremont";
				}else{
					pop = "Field";
				}
				self.suggest("Bet this " + pop);
				self.previous_count(self.count())
			};
	};
		
		self.systemreset = function(){
			self.buyfive(0);self.buysix(0);
			self.buyeight(0);self.placefive(0);
			self.placesix(0);self.placeeight(0);
			self.field(0);
							
		};
		self.fremontsystem = ko.computed(function() {

				if (self.fremontcheck()){ 
					
					if (self.buycheck()){
						self.systemreset();
						self.buyfive(self.scale()[4]);
						self.buysix(self.scale()[4]);
						self.buyeight(self.scale()[4]);
						
					}else{
						self.systemreset();
						self.placefive(self.scale()[4]);
						self.placesix(self.scale()[4]);
						self.placeeight(self.scale()[4]);
						};
					self.field(self.scale()[2]);
				}else{
					self.systemreset();
			}
		});

	};
					
//		$.getJSON('JSON_Craps.json', function(data){
//				$.each(data, function(key,val){
//					var newkey = key.split('_').join(''),
//						svg_loc = d3.select(document.body).select('svg');
//					
//					svg_loc.select('#'+newkey).on('mouseup', function(){
//						alert(newkey);
//						var n = "self."+newkey;
//						n(self.min())
//					});
//				});
//		});
	ko.applyBindings(new viewModel());

};


