$(function(){
	var validation = true;
	var processCreate;
	var singleFieldLabels = ["#tagName", "#tagStartDate", "#tagEndDate"];
	var multiFieldLabels = ["#mNameTag","#mStartDateTag","#mEndDateTag"];
	var singleFields = ["#iName", "#iStartDate", "#iEndDate", "#iState"];
	var multiFields = ["#iMName", "#iMStartDate", "#iMEndDate"];
	$("#iteration").draggable();
	$("#multiIteration").draggable();
	$("#spinMe").spinner({min:2}).val(2);
	$(".inp-buttons").button();
	$(".dateField").datepicker();
	$("#createIteration").click(function(){
		for(i=0;i<=singleFieldLabels.length;i++){
			if($(singleFields[i]).val()===""){
				validation = false;
				$(singleFieldLabels[i]).css("color","red");
			} else {
				$(singleFieldLabels[i]).css("color","black");
			}
			console.log(i+1 + " :: "+ singleFields.length+ " "+ validation);
			if(i+1 === singleFields.length && validation === true){
				console.log('got to process create')
				processCreate(false);
			} else {
				console.log("never made it");
			}
		}
	});
	$("#iCreate").click(function(){
		for(i=0;i<=multiFieldLabels.length;i++){
			if($(multiFields[i]).val()===""){
				validation = false;
				$(multiFieldLabels[i]).css("color","red");
			} else {
				$(multiFieldLabels[i]).css("color","black");
			}
			if(i === multiFields.length && validation === true){
				processCreate(true);
			}
		}
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

	function processCreate(multi){
		var createUrl, jsIterationName, jsStartDate, jsEndDate, jsIterationCount;
		if(multi){
			createUrl = "/multiIteration";
			jsIterationName = $(multiFields[0]).val();
			jsStartDate = $(multiFields[1]).val();
			jsEndDate = $(multiFields[2]).val();
			jsState = $("#iMState").val();
			jsIterationCount = $("#spinMe").val();
		} else {
			createUrl = "/iteration"
			jsIterationName = $(singleFields[0]).val();
			jsStartDate = $(singleFields[1]).val();
			jsEndDate = $(singleFields[2]).val();
			jsState = $("#iState").val();
		}
		var iterationData = {
			iterationName: jsIterationName,
			iterationStartDate: jsStartDate,
			iterationEndDate: jsEndDate,
			iterationState: jsState,
			iterationCount: jsIterationCount
		};
		console.log(iterationData);
		$.ajax({
			type: "POST",
			url: createUrl,
			dataType: "json",
			data: iterationData,
			success: function(msg){
				if(msg){
					console.log(msg);
				}
			}
		});
	};
});