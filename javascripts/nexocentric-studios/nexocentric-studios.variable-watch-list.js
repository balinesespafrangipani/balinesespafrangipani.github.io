function setVariableSummary(information)
{
	information = information['information'];
	$('#phpVariableName').text(information['name']);
	$('#phpVariableType').text(information['type']);
	$('#phpVariableFile').text(information['file']);
	$('#phpVariableFunction').text(information['function']);
}

function formatHumanReadable(string)
{
	console.log(string);
	return string;
}

function setVariableData(key)
{
	var frameCount = 0;
	key = key.split(':');
	var selectedIndex = key[0];
	key.splice(0, 2);
	key = key.join(':');

	$('#phpVariableFrameList').empty();
	$('#phpVariableWatchFrames').find('*').removeClass('active hide');
	console.log(phpVariableInformation);
	for (var element = 0; element < 15; element++) {
		var compositeKey = element + ":" + key;
		var variableInformation = phpVariableInformation[compositeKey];
		if (typeof phpVariableInformation[compositeKey] === 'undefined') {
			continue;
		}
		frameCount++;
		var frameTab = '<dd id="frameTab' + frameCount + '"><a href="#' + frameCount + '">' + frameCount + '</a></dd>';
		var frameInformation = '<div class="content" id="frame' + frameCount + '"><p>' + frameCount + '</p></div>';
		$(frameTab).appendTo('#phpVariableFrameList');
		var humanReadableFormat = formatHumanReadable(phpVariableInformation[compositeKey]['raw_data']);
		$('#frame' + frameCount + ' .phpVariableData').html(humanReadableFormat);
		$('#frame' + frameCount + ' p span').text(phpVariableInformation[compositeKey]['information']['line']);

		if (variableInformation['information']['call_number'] == selectedIndex) {
			$('#phpVariableFrameList').children('#frameTab' + frameCount).addClass('active');
			$('#phpVariableWatchData').children('#frame' + frameCount).addClass('active');	
		}
	}

	$('#phpVariableWatchFrames dd').on('click', function (event) {
		var selectedTab = $(this).text();
		$('#phpVariableWatchFrames').find('*').removeClass('active');
		$('#phpVariableFrameList').children('#frameTab' + selectedTab).addClass('active');
		$('#phpVariableWatchData').children('#frame' + selectedTab).addClass('active');
	});
}

function displayPhpVariableInformation(key)
{
	setVariableSummary(phpVariableInformation[key]);
	setVariableData(key);
}

$('#phpVariableWatchFrames dd').on('click', function (event) {
	var selectedTab = $(this).text();
	$('#phpVariableWatchFrames').find('*').removeClass('active');
	$('#phpVariableFrameList').children('#frameTab' + selectedTab).addClass('active');
	$('#phpVaribleWatchData').children('#frame' + selectedTab).addClass('active');
});