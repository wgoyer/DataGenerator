$(function(){
	function processCreate(multi){
		console.log(multi);
		var createUrl, jsStoryCount, jsStoryName, jsStoryState;
		if(multi){
			createUrl = "/multiStory";
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