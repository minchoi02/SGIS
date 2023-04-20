//mng_s 20201007 index 페이지에서 https로 가도록 수정
if(location.protocol == 'http:'){
//	location.href = location.href.replace('http:','https:');
}

// djlee 2019-07-15 수정 시작
document.write('<script src="/publish_2018/include/plugin/jquery-1.11.3.min.js" type="text/javascript"></script>');
document.write('<script src="/publish_2018/include/plugin/slick/slick.min.js" type="text/javascript"></script>');
document.write('<script src="/publish_2018/include/js/ui.js" type="text/javascript"></script>');
document.write('<link rel="stylesheet" type="text/css" href="/publish_2018/include/plugin/slick/slick.css">');
document.write('<link rel="stylesheet" type="text/css" href="/publish_2018/include/plugin/slick/slick-theme.css">');
if(location.href.indexOf("/view/index") < 1  ){
	document.write("<link rel='stylesheet' type='text/css' href='/css/common.css'>");
}else{
	document.write("<link rel='stylesheet' type='text/css' href='/css/main_common.css'>");
}
document.write("<link rel='stylesheet' type='text/css' href='/css/jquery-ui-1.10.4.custom.css'>");
if(location.href.indexOf("/view/index") < 1  ){
	document.write('<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>');
	document.write("<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>");
	document.write("<script src='/js/plugins/durian-v2.0.js'></script>");
	document.write("<script src='/js/common/sop.portal.absAPI.js'></script>");
	document.write("<script type='text/javascript' src='/js/plugins/jquery.sha256.js'></script>");
	document.write("<script type='text/javascript' src='/js/plugins/common.js'></script>");
	document.write("<script type='text/javascript' src='/js/plugins/ui.js'></script>");
	document.write("<script type='text/javascript' src='/js/plugins/html5shiv.js'></script>");
}else{
	document.write('<script type="text/javascript" src="/js/util/proj4js-combined.min.js"></script>');
	document.write('<script type="text/javascript" src="/js/common/login.js"></script>'); // djlee 2019-06-27 추가
}
//djlee 2019-07-15 수정 끝