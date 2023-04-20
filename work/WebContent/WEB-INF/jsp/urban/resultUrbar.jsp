<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type='text/javascript' src='https://sgisapi.kostat.go.kr/OpenAPI3/auth/javascriptAuth?consumer_key=[8d03aad7-577d-4e65-bf92-875e1f4b348c]'></script>
<title>Insert title here</title>
</head>
<body>
<div id="map" style="width:100%-20px;height:480px"></div>
<script type="text/javascript">
		var map = sop.map("map");
		map.setView(sop.utmk(953820, 1953437), 9);
</script>
</body>
</html>