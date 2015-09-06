window.onload = function () {
	var data = {
  "BigEight": { "Payout":1, "Percent":"45%", "Odds":"8 to 4", "EV":"$0.91", "Type":"Multiple Roll", "Win":"6 / 8"},
  "BuyTen": { "Payout":1.9, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "BuyNine": { "Payout":1.43, "Percent":"40%", "Odds":"4 to 2", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "BuyEight": { "Payout":1.14, "Percent":"45%", "Odds":"8 to 4", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "Come": { "Payout":1, "Percent":"49%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Contract", "Win":"4 / 5 / 6 / 7 / 8 / 9 / 10 / 11"},
  "ComeTen": { "Payout":2, "Percent":"33%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"4 / 10"},
  "ComeNine": { "Payout":1.5, "Percent":"40%", "Odds":"4 to 2", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"5 / 9"},
  "ComeEight": { "Payout":1.2, "Percent":"45%", "Odds":"8 to 4", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"6 / 8"},
  "DCome": { "Payout":1, "Percent":"48%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Non-Contract", "Win":"2 / 3 / 7"},
  "DontComeTen": { "Payout":0.5, "Percent":"67%", "Odds":"2 to 2", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "DontComeNine": { "Payout":0.67, "Percent":"60%", "Odds":"4 to 3", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "DontComeEight": { "Payout":0.83, "Percent":"55%", "Odds":"1 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "HardTen": { "Payout":7, "Percent":"11%", "Odds":"8 to 1", "EV":"$0.89", "Type":"Multiple Roll", "Win":"4 / 10"},
  "HardEight": { "Payout":9, "Percent":"9%", "Odds":"10 to 1", "EV":"$0.91", "Type":"Multiple Roll", "Win":"6 / 8"},
  "Horn": { "Payout":27 / 12, "Percent":"17%", "Odds":"5 to 1", "EV":"$0.5", "Type":"Single Roll- Proposition", "Win":"2 / 3 / 11 / 12"},
  "HornTwelve": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"2 / 12"},
  "HornYoEleven": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"3 / 11"},
  "DontBuyTen": { "Payout":0.48, "Percent":"67%", "Odds":"2 to 2", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontBuyNine": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontBuyEight": { "Payout":0.79, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "PlaceTen": { "Payout":1.8, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.93", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "PlaceNine": { "Payout":1.4, "Percent":"40%", "Odds":"4 to 2", "EV":"$0.96", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "PlaceEight": { "Payout":1.17, "Percent":"45%", "Odds":"8 to 4", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "DontPlaceTen": { "Payout":0.45, "Percent":"67%", "Odds":"2 to 2", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontPlaceNine": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontPlaceEight": { "Payout":0.8, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "YoEleven": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"3 / 11"},
  "AnyCraps": { "Payout":7, "Percent":"11%", "Odds":"8 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"2 / 3 / 12"},
  "SevenBet": { "Payout":4, "Percent":"17%", "Odds":"5 to 1", "EV":"$0.83", "Type":"Single Roll- Proposition", "Win":"7"},
  "BigSix": { "Payout":1, "Percent":"45%", "Odds":"8 to 4", "EV":"$0.91", "Type":"Multiple Roll", "Win":"6 / 8"},
  "BuyFour": { "Payout":1.9, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "BuyFive": { "Payout":1.43, "Percent":"40%", "Odds":"4 to 2", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "BuySix": { "Payout":1.14, "Percent":"45%", "Odds":"8 to 4", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "CELine": { "Payout":14 / 6, "Percent":"17%", "Odds":"5 to 1", "EV":"$0.78", "Type":"Single Roll- Proposition", "Win":"2 / 3 / 11 / 12"},
  "PassLine": { "Payout":1, "Percent":"49%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Contract", "Win":"4 / 5 / 6 / 7 / 8 / 9 / 10 / 11"},
  "ComeFour": { "Payout":2, "Percent":"33%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"4 / 10"},
  "ComeFive": { "Payout":1.5, "Percent":"40%", "Odds":"4 to 2", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"5 / 9"},
  "ComeSix": { "Payout":1.2, "Percent":"45%", "Odds":"8 to 4", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"6 / 8"},
  "DontPassLine": { "Payout":1, "Percent":"48%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Non-Contract", "Win":"2 / 3 / 7"},
  "DontComeFour": { "Payout":0.5, "Percent":"67%", "Odds":"2 to 2", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "DontComeFive": { "Payout":0.67, "Percent":"60%", "Odds":"4 to 3", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "DontComeSix": { "Payout":0.83, "Percent":"55%", "Odds":"1 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "Field": { "Payout": "1 or 2 rarely 3", "Percent":"44%", "Odds":"8 to 4", "EV":"$0.94", "Type":"Single Roll", "Win":"2 / 3 / 4 / 9 / 10 / 11 / 12"},
  "HardFour": { "Payout":7, "Percent":"11%", "Odds":"8 to 1", "EV":"$0.89", "Type":"Multiple Roll", "Win":"Matching Dice 4 / 10"},
  "HardSix": { "Payout":9, "Percent":"9%", "Odds":"10 to 1", "EV":"$0.91", "Type":"Multiple Roll", "Win":"Matching Dice 6 / 8"},
  "HornAces": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"2 / 12"},
  "HornThree": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"3 / 11"},
  "DontBuyFour": { "Payout":0.48, "Percent":"67%", "Odds":"2 to 2", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontBuyFive": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontBuySix": { "Payout":0.79, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "PlaceFour": { "Payout":1.8, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.93", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "PlaceFive": { "Payout":1.4, "Percent":"40%", "Odds":"4 to 2", "EV":"$0.96", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "PlaceSix": { "Payout":1.17, "Percent":"45%", "Odds":"8 to 4", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "DontPlaceFour": { "Payout":0.45, "Percent":"67%", "Odds":"2 to 2", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontPlaceFive": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "DontPlaceSix": { "Payout":0.8, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "HopFour": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 4"},
  "HopFive": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 5"},
  "HopSix": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 6"},
  "HopSeven": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 7"},
  "HopEight": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 8"},
  "HopNine": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 9"},
  "HopTen": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 10"},
  "HopHardFour": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 4"},
  "HopHardSix": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 6"},
  "HopHardEight": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 8"},
  "HopHardTen": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 10"}
};

			var tip = d3.tip()
			.attr('class', 'd3-tip')
			.html(function(d,i) {
				return "<span>" + 
							"<p>" + 
							"Name of Bet: " + this.id + 
							"</p>" +
							"<p>" +
							"Payout: " + d.Payout + 
							"</p>" +
							"<p>" + 
							"Percentage: " + d.Percent + 
							"</p>" +
							"<p>" + 
							"Odds: " + d.Odds + 
							"</p>" +
							"<p>" + 
							"EV: " + d.EV+ 
							"</p>" +
							"<p>" + 
							"Type: " + d.Type+ 
							"</p>" +
						"</span>";
			}),
			svg_loc = d3.select(document.body).select('svg').call(tip);
	
			Object.getOwnPropertyNames(data).forEach(function(value, index, array){
			svg_loc.select("#"+value).datum(data[value]).on('mouseover', tip.show).on('mouseout', tip.hide);
		});
		
};
	