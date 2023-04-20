
$(document).ready(function(){

/*결과 list*/
/*$('#statsMeCatalogBtn').click(function() {
       $('#result_list').slideToggle('slow', function() {
         // 객체가 다 펼치지거나 접히고 나면 여기에 든 내용이 실행된다.
        $("#result_list").css( { height : "280px"} );
       	$("#dataWrap").css( { margintop : "0"} );

       });
     });*/

/*생활환경종합 popup*/ 
$("#poiOpen").click(function(event){  //팝업 Open 버튼 클릭 시

          $("#common_popup_back").css("display","block"); //팝업 뒷배경 display block
          $("#poipopDiv").css("display","block"); //팝업창 display block

          $("body").css("overflow","hidden");//body 스크롤바 없애기
      });

      $("#popCloseBtn").click(function(event){
          $("#common_popup_back").css("display","none"); //팝업창 뒷배경 display none
          $("#poipopDiv").css("display","none"); //팝업창 display none
          $("body").css("overflow","auto");//body 스크롤바 생성
      });


   });
