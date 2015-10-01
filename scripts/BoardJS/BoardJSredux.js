

var jsondata; 
//All the data for payouts winning and losing numbers are stored here
	$.getJSON("JSON_Craps.json",function(data){
		jsondata = data;
		console.info(jsondata);
	});

window.onload = function () {
	//grab graphic in variable
	var svg_loc = document.getElementsByTagName('svg')[0];

	
	function createbet(e){
		//grab id
		var target = e.target.getAttribute('id') || e.srcElement.getAttribute('id');
		//check if id is in dataset
		if (jsondata[target]){
			//call function here
			allbets(target, e.target);
		};
	};
	
	
	function allbets(id, rect){
		
		if(bet != 0){
			//	var x = this.x.baseVal.value + this.width.baseVal.value / 2;
//				var y = this.y.baseVal.value + this.height.baseVal.value / 2;
//				
				svg_loc.append("use").attr(
					{"xlink:href":"#Chip",
					 "x":rect.x.baseVal.value + rect.width.baseVal.value / 2 , 
					 "y":rect.y.baseVal.value + rect.height.baseVal.value / 2 });

			
		}
		
	};
	
	
	
	 //put click listener on all of the SVG graphic
	svg_loc.addEventListener("click", createbet, true);
	

	

			
//Create object constructor
//Object contructor will be based on click of SVG
//It will take the ID of click region
//Find that win number in the JSON
//Make the name of the object the winning number [FIELD, ANYCRAPS, COME, PASS, DONT COME, DONT PASS]
//USE protoype to add the IDS of the clicked regions to the newly created Object
//Create observable with ID name
//Take object with IDS as properties and make bets equal observable with same id name

	function viewModel(id) {
				
		var self = this;

	}
	ko.applyBindings(new viewModel());

};

