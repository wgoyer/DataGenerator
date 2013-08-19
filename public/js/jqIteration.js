$(function(){
	var validation = true;
	var processCreate;
	var singleFieldLabels = ["#tagName", "#tagStartDate", "#tagEndDate"];
	var multiFieldLabels = ["#mNameTag","#mStartDateTag","#mEndDateTag"];
	var singleFields = ["#iName", "#iStartDate", "#iEndDate", "#iState"];
	var multiFields = ["#iMName", "#iMStartDate", "#iMEndDate"];

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