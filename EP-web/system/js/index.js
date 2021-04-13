$(document).ready(function(){ 
	var adminId=getQueryString("adminId");
	$('#thisUser').html("欢迎你 "+adminId)
}); 
function getQueryString(name) {
var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
if (result == null || result.length < 1) {
return "";
}
return result[1];
}
function pageClick(k) {
	$(k).parent().find("div").removeClass("active");
	$(k).addClass("active");
	$("#flTitle").text($(k).text());
	if($(k).text()=="停车场位置信息")
	{
	window.location.href="index.html";
	}
	if($(k).text()=="实时监控管理")
	{
	window.location.href="../cctv/cn/cctv.html";
	}
	if($(k).text()=="车位信息管理")
	{
	window.location.href="parkinginformation.html";
	}
	if($(k).text()=="添加停车场")
	{
	window.location.href="drawpark.html";
	}
	if($(k).text()=="停车场管理")
	{
	window.location.href="insertpark.html";
	}

}

