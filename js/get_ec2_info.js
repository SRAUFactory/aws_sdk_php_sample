function getEc2InstanceHtml(ec2Instance) {
	var viewInfo = {
		"インスタンスID" : ec2Instance.InstanceId,
		"インスタンスタイプ" : ec2Instance.InstanceType,
		"アベイラビリティーゾーン" : ec2Instance.Placement.AvailabilityZone,
		"インスタンスの状態" : ec2Instance.State.Name,
		"パブリックIP" : ec2Instance.PublicIpAddress,
	};
	var ec2InfoHtml = "<dl>";
	jQuery.each(viewInfo, function(name, value) { 
		ec2InfoHtml += "<dt>" + name  + "<dt><dd>" + value + "</dd>";
	});
	return ec2InfoHtml + "</dl>";
}

function setEc2Info(data) {
	var modalBody = $($("button#viewEc2Info").attr("data-target") + " .modal-body");
	modalBody.html("");
	jQuery.each(data, function(){
		jQuery.each(this.Instances, function() {
			modalBody.html(modalBody.html() + getEc2InstanceHtml(this));
		});
	});
}

function getEc2Info() {
	$.ajax({
		type : "GET",
		url : "https://app57971f8a02581.mobingicloud.com/get_ec2_info.php",
		dataType: 'json',
		success : setEc2Info
	});
	$($("button#viewEc2Info").attr("data-target") + " .modal-body").html("Now loading...");
}

$(function() {
	$("div#LinkMenu").css("background-color", "#edeff1");
	$("button#viewEc2Info").click(getEc2Info);
});
