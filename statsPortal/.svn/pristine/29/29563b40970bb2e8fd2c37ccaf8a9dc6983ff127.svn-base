<%@ page language="java" contentType="text/html;charset=utf-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<title>e-지방지표 데이터 테스트</title>
	
	<script src="/js/plugins/jquery.min.js"></script>

	<script type="text/javascript">
		$(document).ready(function() {
			$("button").click(function(){
				var url = $( this ).closest('div').find('span.url').text();
				var parameter = '';
				
				$.each( $( this ).closest('div').find('input'), function( i, item ){
					if( $( item ).val() ){
						parameter += ( parameter != '' ? '&' : '' ) + $( item ).prop('id')+'='+$( item ).val();
					}
				});
				
				if( parameter != '' ){
					url = url + '?' + parameter;
				}
				
				console.log( url );
				fnAjax( url );
			});
		});
		
		function fnAjax( url ){
			//var domain = 'https://dev.kostat.go.kr'; 
			var domain = 'http://localhost:8080';
			
			jQuery.ajax({
        		type:"GET",
        		url: domain+url,
    	 		data:{},
        		success:function( result ){
        			if( result ){
						console.log( 'result', result );

        				if( result.success ){
		        			$("textarea").val( JSON.stringify( result ) );
        				} else {
        					$("textarea").val( JSON.stringify( result ) );
        				}
        			}
        		},
        		error:function(data) {
        			alert('오류발생~!');
        		}
        	});
		}
	</script>
</head>
<body>
<div>
	<h2>1.카테고리 목록 가져오기</h2>
	<div style="width:600px;">
		<span class="url">/view/ecountry/getCategory</span>?upper_list_id=<input id="upper_list_id" type="text" style="width:40px;"/>
		<button class="confirm">결과확인</button>
	</div>
	<h2>2.지표 목록 가져오기</h2>
	<div style="width:600px;">
		<span class="url">/view/ecountry/getList</span>?<span style="color:red">list_id</span>=<input id="list_id" type="text" style="width:40px;"/>
		<button class="confirm">결과확인</button>
	</div>
	<h2>3.항목들 가져오기</h2>
	<div style="width:600px;">
		<span class="url">/view/ecountry/getItem</span>?<span style="color:red">tbl_id</span>=<input id="tbl_id" type="text" style="width:40px;"/>
		<button class="confirm">결과확인</button>
	</div>
	<h2>4.데이터 목록 가져오기</h2>
	<div style="width:600px;">
		<span class="url">/view/ecountry/getData</span>?<br/><span style="color:red">tbl_id</span>=<input id="tbl_id" type="text" style="width:60px;"/>&
		<br/><span style="color:red">base_item_id</span>=<input id="base_item_id" type="text" style="width:60px;"/>&add_item_id =<input id="add_item_id" type="text" style="width:120px;"/>&
		<br/><span style="color:red">prd_id</span>=<input id="prd_id" type="text" style="width:60px;"/>&<span style="color:red">prid_value</span>=<input id="prid_value" type="text" style="width:60px;"/>&
		<br/>adm_cd=<input id="adm_cd" type="text" style="width:60px;"/>&opt=<input id="opt" type="text" style="width:40px;"/>
		<button class="confirm">결과확인</button>
	</div>
	<br/><br/>
	<textarea style="width:800px; height:400px;">
	</textarea>
</div>

</body>
</html>
