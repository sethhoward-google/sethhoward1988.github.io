$(document).ready(function(){

	//find all items of class toggleIt, then headers in those sections, and apply this code when they are clicked
	$(".toggleIt header").click(function(){
		//get the parent, then the child called section, and toggle it
		$(this).parent().children("section").slideToggle();
	});

	//whenever the class radioPlay is clicked, do this.
	$(".radioPlay").change(function(){
		if( $(".radioPlay:checked").val() == 3){
			//if the third radio button is selected, then check a different radio button.
			$("#r"+getRand()).prop("checked", true);
		}
	});

	//returns a random number between 1-5, but NOT 3.
	function getRand(){
		//get a random number between 1-5
		var newNum = Math.floor((Math.random()*5)+1);
		if (newNum == 3){
			//if that number is 3, use recursion to get a new number between 1-5
			newNum = getRand();
		}
		return newNum;
	}

});