
window.onload = function () {
			
//			$("button").click(function () {
//				//butnumber, butbet, butpayout, butev
//				if (this.id === butnumber){
//					$()
//				}
//			});

	function viewModel() {
				
		var self = this;

		self.min = ko.observable(5);
		self.point = ko.observable(0);
		self.firstdie = ko.observable(0);
		self.seconddie = ko.observable(0);
		self.bankroll = ko.observable(1000);
		self.minbet = [5, 10, 25, 50, 100, 200];

		self.scale = ko.pureComputed(function () {return [0, 1, 1 * self.min(), 2 * self.min(), 3 * self.min(), 4 * self.min()];
			});
		self.first = function () {return Math.floor(Math.random() * (6)) + 1;
			};
		self.second = function () {return Math.floor(Math.random() * (6)) + 1;
			};
		
		
		self.roll = function(){
			var firstroll = self.first(), 
				secondroll = self.second(), 
				dice = firstroll+secondroll,
				win = 0;
				
			self.firstdie(firstroll);self.seconddie(secondroll);
				
			//if total is not empty
			if(self.total() > 0) {
				if (dice>3 && dice<11 && dice!=7){
					if (self.point() === 0){
						self.point(dice);
						d3.select("svg #puck").transition().delay(550).attr('cx', (268 + 19.50*dice));
					}else if (self.point() === dice){
						self.point(0);
						d3.select("svg #puck").transition().delay(550).attr('cx', 300.4);
					}else{;};
					
					if (firstroll === secondroll){
						var hard = true;
					}else{
						var hard = false};
					win += self.numberseval(hard,dice);
					win += self.horneval(dice);
					win += self.fieldeval(dice);
					win += self.anycrapeval(dice);
					win += self.bigredeval(dice);
					
				}else if(dice==7){
					win += self.bigredeval(dice);
//					var loss = self.layfour()+ self.layfive()+ self.laysix()+ self.layeight()+ 
//						self.laynine()+ self.layten()+self.againstfour()+ 
//						self.againstfive()+ self.againstsix()+self.againsteight() + 
//						self.againstnine()+ self.againstten();
//					win -= self.total - loss;
					win += self.horneval(dice);
					win += self.fieldeval(dice);
					win += self.anycrapeval(dice);
					win +=self.numberseval(false,dice);
//						//check come/dontcome/pass/dontpass
						//call payout for pass
						//call loss on dont pass
					self.point(0);
					if (d3.select("svg #puck").attr('cx') != 300.4){
						d3.select("svg #puck").transition().delay(550).attr('cx', 300.4);
					};
				}else{
					//check if 2,3,11,12 bets are filled
					win += self.horneval(dice);
					win += self.fieldeval(dice);
					win += self.anycrapeval(dice);
				}
				var oldbankroll = self.bankroll();
				self.bankroll(oldbankroll + win);
				alert(win);
				
			}else{//total is zero want to make a bet
				alert("Make a bet");
			};

		};

		self.anycraps = ko.observable();
		self.ce = ko.observable();
		self.field = ko.observable();
		
		self.yo = ko.observable();
		self.anyseven = ko.observable();
		
		self.horntwo = ko.observable();
		self.hornthree = ko.observable();
		self.horntwelve = ko.observable();
		self.horneleven = ko.observable();
		
		self.buyfour = ko.observable();
		self.buyfive = ko.observable();
		self.buysix = ko.observable();
		self.buyeight = ko.observable();
		self.buynine = ko.observable();
		self.buyten = ko.observable();
		
		self.placefour = ko.observable();
		self.placefive = ko.observable();
		self.placesix = ko.observable();
		self.placeeight = ko.observable();
		self.placenine = ko.observable();
		self.placeten = ko.observable();
		
		self.layfour = ko.observable();
		self.layfive = ko.observable();
		self.laysix = ko.observable();
		self.layeight = ko.observable();
		self.laynine = ko.observable();
		self.layten = ko.observable();
		
		self.againstfour = ko.observable();
		self.againstfive = ko.observable();
		self.againstsix = ko.observable();
		self.againsteight = ko.observable();
		self.againstnine = ko.observable();
		self.againstten = ko.observable();

		self.hardfour = ko.observable();
		self.hardsix = ko.observable();
		self.hardeight = ko.observable();
		self.hardten = ko.observable();

		self.bigsix = ko.observable();
		self.bigeight = ko.observable();
		
		self.total = function(){
			
				return self.bigsix()+
				self.bigeight()+self.hardfour() 
				+self.hardsix()+ self.hardeight()
				+self.hardten()+self.againstfour() 
				+self.againstfive()+ self.againstsix() 
				+self.againsteight()+ self.againstnine() 
				+self.againstten()+self.layfour() 
				+self.layfive()+ self.laysix() 
				+self.layeight()+ self.laynine() 
				+self.layten()+ self.placefour() 
				+self.placefive()+ self.placesix() 
				+self.placeeight()+ self.placenine() 
				+self.placeten()+self.anycraps() 
				+self.ce()+ self.yo() 
				+self.field()+ self.anyseven()
				+self.buyfour()+ self.buyfive() 
				+self.buysix()+ self.buyeight() 
				+self.buynine()+ self.buyten()
				+self.horntwo()+ self.hornthree()
				+self.horneleven()+ self.horntwelve();
						   
		};
		self.bank = function(){
			return self.bankroll() - self.total();
		};
		
		self.horneval = function(number){
			//2,3,11,12
			var bets = [self.horntwo(), self.hornthree(), self.horneleven(), self.horntwelve()],
				check = 0;
			if ($.each(bets, function(index,value){check+=value;}) > 0){
				if (number === 2){
					return bets[0] * 27;
				}else if (number === 3){
					return bets[1] * 12;
				}else if (number === 11){
					return bets[2] * 12;
				}else if (number === 12){
					return bets[3] * 27;
				}else {
					return -(bets[0]+bets[1]+bets[2]+bets[3]);	
				};
			};
		};
			
		self.fieldeval = function (number){
			//2,3,4,9,10,11,12
			if (self.field() > 0){
				if (number > 4 && number < 9){
					return self.field() * -1;
				}else if (number === 2 || number === 12 ){
					return (self.field() * 2);
				}else{
					return (self.field());
				};
			};
		};
		self.anycrapeval = function(number){
			//2,3,12 and 11
			var bets = [self.anycraps(), self.ce()];
			
			if (bets[0] > 0 || bets[1] > 0 && number < 4 && number > 10){
				if (number == 11){
					return bets[1] * 14;
				}else{
					return bets [0] * 6;
				};
			}else{
				return -(bets[0] + bets[1]);
			};
		};
			
		self.numberseval = function(hardway,number){
			//4,5,6,8,9,10
			var win = 0;
				switch(number){
					case 4:
						win += self.numberspayout([self.buyfour(), self.placefour(), self.hardfour()], number, hardway)
						break;
					case 5:
						win += self.numberspayout([self.buyfive(),self.placefive()], number, hardway)
						break;
					case 6:
						win += self.numberspayout([self.buysix(),self.placesix(),self.bigsix(),self.hardsix()], number, hardway);
						break;
					case 8:
						win += self.numberspayout([self.buyeight(),self.placeeight(),self.bigeight(),  
											  self.hardeight()], number, hardway);
						break;
					case 9:
						win += self.numberspayout([self.buynine(), self.placenine()], number, hardway);
						break;
					case 10:
						win += self.numberspayout([self.buyten(), self.placeten(), self.hardten()], number, hardway)
						break;
					default:
						win += self.numberspayout([
							self.buyten(),self.placeten(),self.hardten(),
							self.buynine(),self.placenine(),
							self.buysix(),self.placesix(),self.bigsix(),self.hardsix(), 
							self.buyfour(),self.placefour(),self.hardfour(),
							self.buyfive(),self.placefive(),
							self.buyeight(),self.placeeight(),self.bigeight(),self.hardeight()],
												  number, hardway);
						break;
				
			};
		
			return win;
			
		};
		self.numberspayout = function(bets, number, hardway){
			var odd = 0, win = 0;
			if (number === 7){
				win = $.each(bets, function(index, value){win+=value;});
			}else{
				for (var i = 0;i<bets.length;i++){
					if (bets[i]>0){
						switch (i){
							case 0://buy
								if (number == 4 || number == 10){
									odd = 1.90;
								}else if (number == 6 || number == 8){
									odd = 1.14;
								}else{
									odd = 1.425;
								};
								break;
							case 1://place
								if (number == 4 || number == 10){
									odd = 1.80;
								}else if (number == 6 || number == 8){
									odd = 1.17;
								}else{
									odd = 1.40;
								};
								break;
							case 2://bigsix bigeight four/ten hard
								if (number == 4 || number == 10){
									if (hardway == true){
										odd = 7;
									}else{
										odd = -1}
								}else{
									odd = 1;
								};
								break;
							case 3://hard
								if (hardway == true){
									odd = 9;
								}else{
									odd = -1;	
									};
								break;
						};
						win += bets[i] * odd;
					};
				};
			};
			return win;
		};
		
		self.bigredeval = function(number){
			var win = 0,
			//positive returns
				laybets = [self.layfour(), self.layfive(), self.laysix(), 
						   self.layeight(), self.laynine(), self.layten()],
				againstbets = [self.againstfour(), self.againstfive(), self.againstsix(),
						   self.againsteight() , self.againstnine(), self.againstten()];
			
			if (number === 7){
				//find all the bets
				for (var i = 0; i < laybets.length; i++){
					if (laybets[i]>0){
						win += self.bigredpayout(i, laybets[i]);
					};
					if (againstbets[i]>0){
						win += self.bigredpayout(i+6, againstbets[i])
					};
				};
				//find just that numbers lay and against bets
			}else if (number > 8){
				var index = number - 5;
				win = -(laybets[index] + againstbets[index]);
			}else{
				var index = number - 4;
				win = -(laybets[index] + againstbets[index]);
				};
			
			return win;
		};
		self.bigredpayout = function(index, wager){
			var win = 0, odds = 0,
				payouts = [1.48,1.63,1.79,1.45,1.80];
			
			if (index == 0 || index == 5){
				 odds = payouts[0];
			}else if (index == 1 || index == 4 || index == 7 || index == 10){
				odds = payouts[1];
			}else if (index == 2 || index == 3 ){
				odds = payouts[2];
			}else if (index == 6 || index == 11){
				odds = payouts[3];
			}else if (index == 8 || index == 9){
				odds = payouts[4];
			}
			return win += wager * odds;
			
		};
	};

	ko.applyBindings(new viewModel());

};



//array with all the ids, bet names, EV, and oddss

	$('svg #RollRect').attr({
        'title': 'Here I am Me too',
        });
    
    $('svg #RollRect').tooltip({
        'container': 'body',
        'placement': 'right'
    });
