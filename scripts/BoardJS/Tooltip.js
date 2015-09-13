window.onload = function () {

	function viewModel (){
		var self = this;
		
		self.info = ko.observable("Hover Over Board for Information");
			

			$.getJSON('JSON_Craps.json', function(data){
				$.each(data, function(key,val){
					var svg_loc = d3.select(document.body).select('svg')
					svg_loc.select("#"+key).datum(val).on('mouseover', function(d,i){
						return self.info(
						//Make this a table
							"<table class='table table-bordered'>" + 
							"<tr>" +
							"<td> Name of Bet: </td>" +
							"<td>" + this.id + "</td>" +
							"</tr> <tr>" +
							"<td> Payout: </td>" +
							"<td>" + d.Payout + "</td>" +
							"</tr> <tr>" +
							"<td> Percentage: </td>" +
							"<td>" + d.Percent + "</td>" +
							"</tr> <tr>" +
							"<td> Odds: </td>" +
							"<td>" + d.Odds + "</td>" +
							"</tr> <tr>" +
							"<td> EV: </td>" +
							"<td>" + d.EV + "</td>" +
							"</tr> <tr>" +
							"<td> Type: </td>" +
							"<td>" + d.Type + "</td>" +
							"</tr>" +
							"</table>"
						//Make blurb in span)
						);
					});
				});
			})
	};
		ko.applyBindings(new viewModel);
};
	