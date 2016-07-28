function getEc2InstanceHtml(ec2Instance) {
	var ec2InfoHtml = "";
	jQuery.each(ec2Instance, function(name, value) {
		ec2InfoHtml += "<dt>" + name  + "<dt><dd>";
		ec2InfoHtml += (typeof value == "object")? getEc2InstanceHtml(value) : value;
		ec2InfoHtml += "</dd>";
	});
	return ec2InfoHtml;
}

function setEc2Info(data) {
	var modalBody = $($("button#viewEc2Info").attr("data-target") + " .modal-body");
	modalBody.html("");
	jQuery.each(data, function(){
		jQuery.each(this.Instances, function() {
			modalBody.html(modalBody.html() + "<dl>" + getEc2InstanceHtml(this) + "</dl>");
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
