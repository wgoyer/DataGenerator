$(function(){
	var singleFields = [iName, iStartDate, iEndDate, iState];
	var multiFields = [iMName, ]
	$("#iteration").draggable();
	$("#multiIteration").draggable();
	$("#spinMe").spinner({min:2}).val(2);
	$(".inp-buttons").button();
	$(".dateField").datepicker();
	$("#createIteration").click(function(){

	});
	$("#iCreate").click(function(){

	});

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