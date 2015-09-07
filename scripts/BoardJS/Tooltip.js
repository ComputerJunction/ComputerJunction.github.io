window.onload = function () {
	var data = {
  "Big_Eight": { "Payout":1, "Percent":"45%", "Odds":"2 to 1", "EV":"$0.91", "Type":"Multiple Roll", "Win":"6 / 8"},
  "Buy_Ten": { "Payout":1.9, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "Buy_Nine": { "Payout":1.43, "Percent":"40%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "Buy_Eight": { "Payout":1.14, "Percent":"45%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "Come": { "Payout":1, "Percent":"49%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Contract", "Win":"4 / 5 / 6 / 7 / 8 / 9 / 10 / 11"},
  "Come_Ten": { "Payout":2, "Percent":"33%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"4 / 10"},
  "Come_Nine": { "Payout":1.5, "Percent":"40%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"5 / 9"},
  "Come_Eight": { "Payout":1.2, "Percent":"45%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"6 / 8"},
  "Dont_Come": { "Payout":1, "Percent":"48%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Non-Contract", "Win":"2 / 3 / 7"},
  "Dont_Come_Ten": { "Payout":0.5, "Percent":"67%", "Odds":"1 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "Dont_Come_Nine": { "Payout":0.67, "Percent":"60%", "Odds":"4 to 3", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "Dont_Come_Eight": { "Payout":0.83, "Percent":"55%", "Odds":"1 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "Hard_Ten": { "Payout":7, "Percent":"11%", "Odds":"8 to 1", "EV":"$0.89", "Type":"Multiple Roll", "Win":"4 / 10"},
  "Hard_Eight": { "Payout":9, "Percent":"9%", "Odds":"10 to 1", "EV":"$0.91", "Type":"Multiple Roll", "Win":"6 / 8"},
  "Horn_Twelve": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"2 / 12"},
  "Horn_YoEleven": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"3 / 11"},
  "Dont_Buy_Ten": { "Payout":0.48, "Percent":"67%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Buy_Nine": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Buy_Eight": { "Payout":0.79, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Place_Ten": { "Payout":1.8, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.93", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "Place_Nine": { "Payout":1.4, "Percent":"40%", "Odds":"2 to 1", "EV":"$0.96", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "Place_Eight": { "Payout":1.17, "Percent":"45%", "Odds":"2 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "Dont_Place_Ten": { "Payout":0.45, "Percent":"67%", "Odds":"1 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Place_Nine": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Place_Eight": { "Payout":0.8, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "YoEleven": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"3 / 11"},
  "Any_Craps": { "Payout":7, "Percent":"11%", "Odds":"8 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"2 / 3 / 12"},
  "Any_Seven": { "Payout":4, "Percent":"17%", "Odds":"5 to 1", "EV":"$0.83", "Type":"Single Roll- Proposition", "Win":"7"},
  "Big_Six": { "Payout":1, "Percent":"45%", "Odds":"2 to 1", "EV":"$0.91", "Type":"Multiple Roll", "Win":"6 / 8"},
  "Buy_Four": { "Payout":1.9, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "Buy_Five": { "Payout":1.43, "Percent":"40%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "Buy_Six": { "Payout":1.14, "Percent":"45%", "Odds":"2 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "CE_Split": { "Payout":"14 for Yo / 6 ", "Percent":"17%", "Odds":"5 to 1", "EV":"$0.78", "Type":"Single Roll- Proposition", "Win":"2 / 3 / 11 / 12"},
  "Pass_Line": { "Payout":1, "Percent":"49%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Contract", "Win":"4 / 5 / 6 / 7 / 8 / 9 / 10 / 11"},
  "Come_Four": { "Payout":2, "Percent":"33%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"4 / 10"},
  "Come_Five": { "Payout":1.5, "Percent":"40%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"5 / 9"},
  "Come_Six": { "Payout":1.2, "Percent":"45%", "Odds":"2 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"6 / 8"},
  "Dont_Pass_Line": { "Payout":1, "Percent":"48%", "Odds":"1 to 1", "EV":"$0.99", "Type":"Multiple Roll - Non-Contract", "Win":"2 / 3 / 7"},
  "Dont_Come_Four": { "Payout":0.5, "Percent":"67%", "Odds":"1 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "Dont_Come_Five": { "Payout":0.67, "Percent":"60%", "Odds":"4 to 3", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "Dont_Come_Six": { "Payout":0.83, "Percent":"55%", "Odds":"1 to 1", "EV":"$1", "Type":"Multiple Roll - Non-Contract", "Win":"7"},
  "Field": { "Payout": "1 or 2 rarely 3", "Percent":"44%", "Odds":"2 to 1", "EV":"$0.94", "Type":"Single Roll", "Win":"2 / 3 / 4 / 9 / 10 / 11 / 12"},
  "Hard_Four": { "Payout":7, "Percent":"11%", "Odds":"8 to 1", "EV":"$0.89", "Type":"Multiple Roll", "Win":"Matching Dice 4 / 10"},
  "Hard_Six": { "Payout":9, "Percent":"9%", "Odds":"10 to 1", "EV":"$0.91", "Type":"Multiple Roll", "Win":"Matching Dice 6 / 8"},
  "Horn_Aces": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"2 / 12"},
  "Horn_Three": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"3 / 11"},
  "Dont_Buy_Four": { "Payout":0.48, "Percent":"67%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Buy_Five": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Buy_Six": { "Payout":0.79, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Place_Four": { "Payout":1.8, "Percent":"33%", "Odds":"2 to 1", "EV":"$0.93", "Type":"Multiple Roll - Line", "Win":"4 / 10"},
  "Place_Five": { "Payout":1.4, "Percent":"40%", "Odds":"2 to 1", "EV":"$0.96", "Type":"Multiple Roll - Line", "Win":"5 / 9"},
  "Place_Six": { "Payout":1.17, "Percent":"45%", "Odds":"2 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"6 / 8"},
  "Dont_Place_Four": { "Payout":0.45, "Percent":"67%", "Odds":"1 to 1", "EV":"$0.97", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Place_Five": { "Payout":0.63, "Percent":"60%", "Odds":"4 to 3", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Dont_Place_Six": { "Payout":0.8, "Percent":"55%", "Odds":"1 to 1", "EV":"$0.98", "Type":"Multiple Roll - Line", "Win":"7"},
  "Hop_Four": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 4"},
  "Hop_Five": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 5"},
  "Hop_Six": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 6"},
  "Hop_Seven": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 7"},
  "Hop_Eight": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 8"},
  "Hop_Nine": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 9"},
  "Hop_Ten": { "Payout":15, "Percent":"6%", "Odds":"17 to 1", "EV":"$0.89", "Type":"Single Roll- Proposition", "Win":"Specific Dice Set 10"},
  "HopHard_Four": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 4"},
  "HopHard_Six": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 6"},
  "HopHard_Eight": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 8"},
  "HopHard_Ten": { "Payout":30, "Percent":"3%", "Odds":"35 to 1", "EV":"$0.86", "Type":"Single Roll- Proposition", "Win":"Matching Dice 10"}
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
	