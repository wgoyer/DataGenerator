$(function(){
	$("#iteration").draggable();
	$("#multiIteration").draggable();
	$("#spinMe").spinner({min:2}).val(2);
	$(".inp-buttons").button();
	$(".dateField").datepicker();
	$("#xPlode").click(function(){
		$("#iteration").toggle("explode", function(){
			$("#multiIteration").toggle("explode")
		});
	});
	$("#rPlode").click(function(){
		$("#multiIteration").toggle("explode", function(){
			$("#iteration").toggle("explode")
		});	
	});
});