function getEc2InstanceHtml(ec2Instance, elementId, elementLabel) {
	var ec2InfoHtml = '<li>';
	ec2InfoHtml += '<a data-toggle="collapse" href="#' + elementId + '" aria-expand="false" aria-controls="' + elementId + '">';
	ec2InfoHtml += 'Instance:' + elementLabel + '<span class="badge pull-right">+</span></a>';
	ec2InfoHtml += '<div class="collapse" id="' + elementId + '">';
	ec2InfoHtml += '<ul class="nav nav-list nav-list-vivid">';
	jQuery.each(ec2Instance, function(name, value) {
		if (typeof value == "object") {
			ec2InfoHtml += getEc2InstanceHtml(value, elementId + name, name);
		} else {
			ec2InfoHtml += '<li><a>' + name  + ':' + value + '</a></li>';
		}
	});
	return ec2InfoHtml + '</ul></div></li>';
}

function setEc2Info(data) {
	var ec2InfoHtml = "";
	jQuery.each(data, function(){
		jQuery.each(this.Instances, function() {
			ec2InfoHtml += getEc2InstanceHtml(this, this.InstanceId, this.InstanceId);
		});
	});
	$("#wrap").html('<ul class="nav nav-list nav-list-vivid">' + ec2InfoHtml  + '</ul>').css('display','block');
	$('#loader-bg ,#loader').css('display','none');
}

function getEc2Info() {
	$('#wrap').css('display','none');
	$('#loader-bg ,#loader').css('display','block');
	$.ajax({
		type : "GET",
		url : "https://app57971f8a02581.mobingicloud.com/get_ec2_info.php",
		dataType: 'json',
		success : setEc2Info
	});
}

$(function() {
	$('#wrap').css('display','none');
	$('#loader-bg ,#loader').css({'display':'none', 'text-align':'center'});
	$("div#LinkMenu").css("background-color", "#edeff1");
	$("button#viewEc2Info").click(getEc2Info);
});
