$(function(){
	$("#createStory").click(function(){
		if($("#sName").val() === ""){
			$("#nameTag").css("color","red");
		} else {
			$("#nameTag").css("color","black");
			processCreate(false);
		}
	});
	$("#multiCreate").click(function(){
		if($("#sMName").val() === ""){
			$("#mNameTag").css("color", "red");
		} else {
			$("#mNameTag").css("color", "black");
			processCreate(true);	
		}
	});
	$("#story").draggable();
	$("#multiStory").draggable();
	$("#sCount").spinner({min:2}).val(2);
	$(".inp-buttons").button();
	$("#xPlode").click(function(){
		$("#story").toggle("explode", function(){
			$("#multiStory").toggle("explode")
		});
	});
	$("#rPlode").click(function(){
		$("#multiStory").toggle("explode", function(){
			$("#story").toggle("explode")
		});	
	});
	function processCreate(multi){
		console.log(multi);
		var createUrl, jsStoryCount, jsStoryName, jsStoryState;
		if(multi){
			createUrl = "/multiStory"
			jsStoryName = $("#sMName").val();
			jsStoryState = $("#sMState").val();
			jsStoryCount = $("#sCount").val();
		} else {
			createUrl = "/createStory"
			jsStoryName = $("#sName").val();
			jsStoryState = $("#sState").val();
		}
		var storyData = {
			storyName: jsStoryName,
			storyState: jsStoryState,
			storyCount: jsStoryCount
		};
		console.log(storyData, createUrl);
		$.ajax({
			type: "POST",
			url: createUrl,
			dataType: "json",
			data: storyData,
			success: function(msg){
				if(msg){
					console.log(msg);
				}
			}
		});
	};
});