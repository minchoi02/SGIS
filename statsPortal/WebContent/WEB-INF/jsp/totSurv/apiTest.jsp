<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="/js/plugins/jquery.min.js"></script>

<script type="text/javascript">
	$(document).ready(function() {
		var param = {
			surv_year_list: "2020,2019"							// 수록시점
				, org_id_list: "101"							// 조직번호
					, tbl_id_list: "DT_1A02002"						// 통계표 ID
					, list_var_ord_list: "" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
					, prt_type: "total"								    // 출력방식 total:합계
					, char_itm_id_list: "T01"						// 표특성항목
					, adm_cd: ""								// 지역코드
					, adm_unit: "atdrc"								// 지역단위
					, ov_l1_list: "up:00"								// 항목 1
					, ov_l2_list: "0,1,2"								// 항목 2
					, ov_l3_list: ""								// 항목 3
					, ov_l4_list: ""								// 항목 4
					, ov_l5_list: ""								// 항목 5
					, category: "sgg"									// 카테고리 sido, sgg
					, orderby: ""
		}
		$.ajax({
    		type:"GET",
    		url: "/view/kosisApi/TotsurvStatData.do",
    		//url: "/view/totSurv/proxy?" + "https://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?",
	 		data: param,
    		success:function( result ){
    			if( result ){
    				$(document).find("body").html(JSON.stringify(result));    			
    			}
    		},
    		error:function(data) {
    			alert('오류발생~!');
    		}
    	});
	});
</script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="test">333333333333333</div>
</body>
</html>