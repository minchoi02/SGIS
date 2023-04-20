<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<!-- 태그 토글 -->


     
      <!------------------------------------->
      <div class="map_wrap">

        <div class="table_map_close">
          <button type="button" name="button">
            <span>지도접기</span>
            <div class="">
              <img src="/images/common/search_arr_03.png" alt=""/>
            </div>
          </button>
        </div>
        <script type="text/javascript">
          $(".table_map_close button").click(function() {
            $('.table_map').toggleClass('mapview');
            $(".table_map_close button > div").toggleClass("updown");
          });
        </script>
        <script type="text/javascript" language="javascript" src="/publish_2018/include/js/markFumction.js"></script>
		<script>
			
			var selectSido = "";
		
			var areaSelectMaker = function(target){
				if(target == null || $(target).length == 0){
					console.warn("Unkwon Area Tag");
					return;
				}
				
				
				var area = {
						"서울특별시" : [ "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구" ],
						"경기도" : [ "수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "성남시 수정구", "성남시 중원구", "성남시 분당구", "의정부시", "안양시 만안구", "안양시 동안구", "부천시", "광명시", "평택시", "동두천시", "안산시 상록구", "안산시 단원구", "고양시 덕양구", "고양시 일산동구","고양시 일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군","양평군" ],
						"인천광역시" : [ "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군" ],
						"강원도" : [ "춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군" ],		 
						"충청북도" : [ "청주시 상당구", "청주시 서원구", "청주시 흥덕구", "청주시 청원구", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군" ],
						"충청남도" : [ "천안시 동남구", "천안시 서북구", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군" ],
						"대전광역시" : [ "대덕구", "동구", "서구", "유성구", "중구" ],
						"세종특별자치시" : [ "세종시" ],
						"전라북도" : [ "전주시 완산구", "전주시 덕진구", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군" ],
						"전라남도" : [ "목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군" ],
						"광주광역시" : [ "광산구", "남구", "동구", "북구", "서구" ] ,
						"경상북도" : [ "포항시 남구", "포항시 북구", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군" ],
						"경상남도" : [ "창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군" ],
						"부산광역시" : [ "강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군" ],
						"대구광역시" : [ "남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군" ],
						"울산광역시" : [ "남구", "동구", "북구", "중구", "울주군" ],
						"제주특별자치도" : [ "서귀포시", "제주시" ]     
				};
			
				for(var i=0; i<$(target).length; i++){
					console.log(i);
					(function(z){
						var a1 = $(target).eq(z);
						var a2 = a1.next();
			
						//초기화
						init(a1, true);
			
						//권역 기본 생성
						var areaKeys1 = Object.keys(area);
						areaKeys1.forEach(function(sido){
							a1.append("<option value="+sido+">"+sido+"</option>");
						});
						var sido = "";
						//변경 이벤트
						$(a1).on("change", function(){
							init($(this), false);
							sido = $(this).val();
							var keys = area[sido];
							selectSido = sido;
							
							keys.forEach(function(SiGunGu){									
								a2.append("<option value='"+SiGunGu+"'>"+SiGunGu+"</option>");    
							});
							
							
							$(".map_area").css("display","none");
							
							if(sido =="서울특별시"){
								$(".color_map1").css("display","block");
							}else if(sido =="경기도"){
								$(".color_map2").css("display","block");
							}else if(sido =="인천광역시"){
								$(".color_map").css("display","block");
							}else if(sido =="강원도"){
								$(".color_map3").css("display","block");
							}else if(sido =="충청북도"){
								$(".color_map7").css("display","block");
							}else if(sido =="충청남도"){
								$(".color_map4").css("display","block");
							}else if(sido =="대전광역시"){
								$(".color_map6").css("display","block");
							}else if(sido =="세종특별자치시"){
								$(".color_map5").css("display","block");
							}else if(sido =="전라북도"){
								$(".color_map10").css("display","block");
							}else if(sido =="전라남도"){
								$(".color_map14").css("display","block");
							}else if(sido =="광주광역시"){
								$(".color_map15").css("display","block");
							}else if(sido =="경상북도"){
								$(".color_map8").css("display","block");
							}else if(sido =="경상남도"){
								$(".color_map11").css("display","block");
							}else if(sido =="부산광역시"){
								$(".color_map13").css("display","block");
							}else if(sido =="대구광역시"){
								$(".color_map12").css("display","block");
							}else if(sido =="울산광역시"){
								$(".color_map9").css("display","block");
							}else if(sido =="제주특별자치도"){
								$(".color_map16").css("display","block");
							}
							
							changeSidoBox(sido);
			
						});
						$(a2).on("change", function(){
					 
							var sigungu2 = $(this).val();
							
							if(sigungu2!= "undefined" &&  sigungu2 != "" && sigungu2 != null){
								makerMark(sido,sigungu2);
								changeSigunguBox(sigungu2);
							}else{
								changeSidoBox(sido);
							}
							
							
							
						});
			
					})(i);        
			
					function init(t, first){
						first ? t.empty().append("<option value=''>선택</option>") : "";
						t.next().empty().append("<option value=''>선택</option>");
					}
					
					
				}
			}
			
			</script>



            <div class="table_map">
              <div class="map_head">
                <button type="button" name="button" onclick="openHeadMenu()">해당격자찾기</button>
              </div>
            <div class="map_head_02" id="searchHead">
              <div class="head_contect">
				<div class="select-wrap2">
					<select name="addressRegion" id="addressRegion1"></select>
					<select name="addressDo" id="addressDo1"></select>
				</div>
				
              <button type="button" name="button" onclick="setSiData();">선택지역 추가</button>
            </div>
            <button class="btn_close"  id="map_close_btn" type="button" onclick="this.parentNode.style.display = 'none';closeMapBtn();"> 삭제</button>
            <!-- <span id='close' onclick="this.parentNode.style.display = 'none';">&times;</span> -->
            <script type="text/javascript" language="javascript">
              $('.map_head_02').hide();

              // function return() {
            	  
              //     $('#map_code' + i).removeClass("activeClass");
              //     $('#map_code_color' + i).removeClass("activeClassColor");
              //     $('#map_option2 img').hide();
              //
              //   };

              function openHeadMenu() {
                if ($('.map_head_02').css('display') == 'block') {
                  $('.map_head_02').hide();
                  selectflag = true;
                } else {
                  $('.map_head_02').show();
                  selectflag = false;
                }
              };

              
            </script>
          </div>
          <div class="map_body">
            <div class="">

              <div class="map_line" cellpadding="1" cellspacing="1">
                <ul style="padding-top:15px" id="sgis_map_ul">
                  <li onclick="mapSelectcode(1)" id="map_code1"><span id="map_code_color1">가아</span></td>
                  <li class="empty">
                    </td>
                  <li onclick="mapSelectcode(2)" id="map_code2"><span id="map_code_color2">다아</span></td>
                  <li onclick="mapSelectcode(3)" id="map_code3"><span id="map_code_color3">라아</span></td>
                  <li onclick="mapSelectcode(4)" id="map_code4"> <span id="map_code_color4">마아</span></td>
                  <li class="empty">
                    </td>
                  <li class="empty">
                    </td>


                  <li onclick="mapSelectcode(5)" id="map_code5"><span id="map_code_color5">가사</span></li>
                  <li onclick="mapSelectcode(6)" id="map_code6"><span id="map_code_color6">나사</span></li>
                  <li onclick="mapSelectcode(7)" id="map_code7"><span id="map_code_color7">다사</span></li>
                  <li onclick="mapSelectcode(8)" id="map_code8"><span id="map_code_color8">라사</span></li>
                  <li onclick="mapSelectcode(9)" id="map_code9"><span id="map_code_color9">마사</span></li>
                  <li onclick="mapSelectcode(10)" id="map_code10"><span id="map_code_color10">바사</span></li>
                  <li onclick="mapSelectcode(11)" id="map_code11"><span id="map_code_color11">사사</span></li>

                  <li class="empty"><span></span></li>
                  <li onclick="mapSelectcode(12)" id="map_code12"><span id="map_code_color12">나바</span></li>
                  <li onclick="mapSelectcode(13)" id="map_code13"><span id="map_code_color13">다바</span></li>
                  <li onclick="mapSelectcode(14)" id="map_code14"><span id="map_code_color14">라바</span></li>
                  <li onclick="mapSelectcode(15)" id="map_code15"><span id="map_code_color15">마바</span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>




                  <li class="empty"><span></span></li>
                  <li onclick="mapSelectcode(16)" id="map_code16"><span id="map_code_color16">나마</span></li>
                  <li onclick="mapSelectcode(17)" id="map_code17"><span id="map_code_color17">다마</span></li>
                  <li onclick="mapSelectcode(18)" id="map_code18"><span id="map_code_color18">라마</span></li>
                  <li onclick="mapSelectcode(19)" id="map_code19"><span id="map_code_color19">마마</span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>


                  <li onclick="mapSelectcode(20)" id="map_code20"><span id="map_code_color20">가라</span></li>
                  <li onclick="mapSelectcode(21)" id="map_code21"><span id="map_code_color21">나라</span></li>
                  <li onclick="mapSelectcode(22)" id="map_code22"><span id="map_code_color22">다라</span></li>
                  <li onclick="mapSelectcode(23)" id="map_code23"><span id="map_code_color23">라라</span></li>
                  <li onclick="mapSelectcode(24)" id="map_code24"><span id="map_code_color24">마라</span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>

                  <li onclick="mapSelectcode(25)" id="map_code25"><span id="map_code_color25">가다</span></li>
                  <li onclick="mapSelectcode(26)" id="map_code26"><span id="map_code_color26">나다</span></li>
                  <li onclick="mapSelectcode(27)" id="map_code27"><span id="map_code_color27">다다</span></li>
                  <li onclick="mapSelectcode(28)" id="map_code28"><span id="map_code_color28">라다</span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>



                  <li class="empty"><span></span></li>
                  <li onclick="mapSelectcode(29)" id="map_code29"><span id="map_code_color29">나나</span></li>
                  <li onclick="mapSelectcode(30)" id="map_code30"><span id="map_code_color30">다나</span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>
                  <li class="empty"><span></span></li>
                </ul>
              </div>
              <div class="map_navi">
                <div class="mark">
                 
                </div>
              </div>
              <div class="map_item">
                <div class="">
                  <!-- 격자지도에서 시도 선택 시 나오는 이미지 -->

                <div class="map_area color_map" id="">
                  <img src="/images/main/color_map.png" alt="인천광역시">
                </div>
                <div class="map_area color_map1" id="">
                  <img src="/images/main/color_map1.png" alt="서울특별시">
                </div>
                <div class="map_area color_map2" id="">
                  <img src="/images/main/color_map2.png" alt="경기도">
                </div>
                <div class="map_area color_map3" id="">
                  <img src="/images/main/color_map3.png" alt="강원도">
                </div>
                <div class="map_area color_map4" id="">
                  <img src="/images/main/color_map4.png" alt="충청남도">
                </div>
                <div class="map_area color_map5" id="">
                  <img src="/images/main/color_map5.png" alt="세종특별자치시">
                </div>
                <div class="map_area color_map6" id="map_option2">
                  <img src="/images/main/color_map6.png" alt="대전광역시">
                </div>
                <div class="map_area color_map7" id="">
                  <img src="/images/main/color_map7.png" alt="충청북도">
                </div>
                <div class="map_area color_map8" id="">
                  <img src="/images/main/color_map8.png" alt="경상북도">
                </div>
                <div class="map_area color_map9" id="">
                  <img src="/images/main/color_map9.png" alt="대구광역시">
                </div>
                <div class="map_area color_map10" id="">
                  <img src="/images/main/color_map10.png" alt="전라북도">
                </div>
                <div class="map_area color_map11" id="">
                  <img src="/images/main/color_map11.png" alt="경상남도">
                </div>
                <div class="map_area color_map12" id="">
                  <img src="/images/main/color_map12.png" alt="울산광역시">
                </div>
                <div class="map_area color_map13" id="">
                  <img src="/images/main/color_map13.png" alt="부산광역시">
                </div>
                <div class="map_area color_map14" id="">
                  <img src="/images/main/color_map14.png" alt="전라남도">
                </div>
                <div class="map_area color_map15" id="">
                  <img src="/images/main/color_map15.png" alt="광주광역시">
                </div>
                <div class="map_area color_map16" id="">
                  <img src="/images/main/color_map16.png" alt="제주특별자치도">
                </div>

              </div>
              </div>
            </div>
            <script>
           function changeSidoBox(val){            	
				var sido = sidoCode[val];
				var sidoBox = sidoMappingCode[sido];
				
				
				if(selectMapData.length >0)	resetMapSelect();
				
				$(".map_body .map_navi .mark").css("display","none");
				$(".mark").empty().append("");
				
				sidoBox.forEach(function(item,index,arr2){
					var mCode = mapCodes[item];
					if(mCode != "undefined" && mCode != null && mCode != ""){
						selectMapData.push(mCode);
						$('#map_code' + mCode).toggleClass("activeClassblue");
					}
		       })
				
			}
            
            function changeSigunguBox(val){
				var sigungu = sigunguCode[selectSido+" "+val];
				console.log(selectSido+" "+val);
				if(selectMapData.length >0)	resetMapSelect();
				
				sigungu.forEach(function(item,index,arr2){
					var mCode = mapCodes[item];
					console.log(mCode);
					if(mCode != "undefined" && mCode != null && mCode != ""){ 
						selectMapData.push(mCode);
						$('#map_code' + mCode).toggleClass("activeClassblue");
					}
		       })
			}
            
            function closeMapBtn(){
            	//resetMapBoxGrid();
            	//selectBoxData = null;
            	
            	$('.map_area').hide();
                $('.map_body .map_navi .mark').hide();
                
                $('#addressRegion1').val("");
                $('#addressDo1 option').remove();
                $('#addressDo1').append('<option value="">선택</option>');
                
                //init($(this), false);
            	resetMapSelect();
            	setMapGrid();
            }
            
            
            function resetMapSelect(){

            	selectMapData.forEach(function(item,index,arr2){
            		$('#map_code' + item).removeClass("activeClassblue");
            	})
            	selectMapData = new Array();
            }
            
            
            function setSiData() {
            	
               selectMapData.forEach(function(item,index,arr2){
            	   if(selectBoxData.indexOf(item[0]) <= -1){
            		   selectBoxData.push(item[0]);
            	   }
		       })
		       
		        $('.map_area').hide();
                $('.map_body .map_navi .mark').hide();
                
                $('#addressRegion1').val("");
                $('#addressDo1 option').remove();
                $('#addressDo1').append('<option value="">선택</option>');
		       
		       resetMapSelect();
               setMapGrid();
               $('#searchHead').hide();
            };
            
            $('.tag').addClass('off');
            $('.map_area').addClass('displaynone');
              // $('#map_option1 ').hide();
              // $('#map_option2 ').hide();
				
              function mapSelectcode(number) {
            	  
            	  if(number == 99){
            		  selectBoxData = new Array();
            	  }
            	  
	               if(selectBoxData.indexOf(number+"")>=0){
	            	   for (var i = 0; i < selectBoxData.length; i++) {
	            		    if (selectBoxData[i] === number+"") { 
	            		    	selectBoxData.splice(i, 1);
	            		    }
	            		}
	               }else{
	            	   console.log(2);
	            	   if(number != 99)selectBoxData.push(number+"");   
	               }
	               setMapGrid();
              };
              
              function setMapGrid(){
            	  resetMapBoxGrid();
            	  console.log(selectBoxData);
            	  selectBoxData.forEach(function(item,index,arr2){
            		 $('#selectMapBox' + item).show();
                 	 $('#map_code' + item).attr("class","activeClass");
                     $('#map_code_color' + item).attr("class","activeClassColor");
      		       });
            	  
            	  if(selectBoxData.length > 0 ){
            		  $('#selectMapBox99').show();
            		  $('#selectMapBox0').hide();
            	  }else{
            		  $('#selectMapBox0').show();
            		  $('#selectMapBox99').hide();
            	  }
            	  
            	  //$('#selectMapBox' + i).toggle();
              }
              
              function resetMapBoxGrid(){
            	  
            	  $('#sgis_map_ul li').each(function(index,item){
            		  var boxSpan = $(item).find("span");
            		  if(selectflag == true)$(item).removeClass("activeClassblue");
            		  $(item).removeClass("activeClass");
            		  boxSpan.removeClass("activeClassColor");
            	  });
            	  
            	  $('#sgis_map_name_btn_ul li span').each(function(index,item){
            		  $(item).hide();
            	  });
            	  
              }

              function colormap() {
                $('#map_option2 ').show();
                $('#map_code13').addClass("activeClass2");
                $('#map_code17').addClass("activeClass2");

              };

              function navi() {
                $('#map_option1 ').show();

              };
              
			areaSelectMaker("select[name=addressRegion]");
          	show_keyboard_layout("2-KSX5002");
    
      </script>
            
          </div>

        </div>
        
      </div>
    </div>
</div>
