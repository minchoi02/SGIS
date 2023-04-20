/**
 * 갤러리 수정
 * 
 * history : 2016-10-12 
 * author : 최재영
 * version : 1.0
 * see : 
 *
 */

function dragImageOn(){
	$(".imgIcon").draggable({
		containment : "#mapArea",
		zIndex : 22000,
		helper: "clone",
	});
	
	
	$(".imgTextArea").draggable({
		containment : "#mapArea",
		zIndex : 22000,
		helper: "clone",
	});
	
	//이게 캔버스가 되는게 좋을듯 싶다.
	//$("#mapArea").droppable({
	$("#div_mapImage").droppable({
		drop:function(e,ui){	
			var imgObj = new Object();
			var margin = ($("#mapArea").width() - $(".gcMap").width())/2 + 21; //2017.04.03 아이콘 위치 마진계산
			//var idx = $collectionModify.targetIconArray.length;
			
			//var positionTop = Number(ui.position.top+204);
			//var positionLeft = Number(ui.position.left+margin); //2017.04.03 말풍선 위치보정
			
			if( $collectionModify.removeIconFlag != 0 ) { //아이콘 삭제시 idx가 겹치는 문제 발생으로 flag처리함.
				var idx = $collectionModify.targetIconArray.length + $collectionModify.removeIconFlag; 
			} else {
				var idx = $collectionModify.targetIconArray.length; 
			}
			
			var canvas_top = $("#div_mapImage").height();
			var canvas_width = $("#div_mapImage").width();
			
			var positionTop = Number((ui.position.top-50)/canvas_top*100);
			
			var positionLeft = Number(ui.position.left/canvas_width*100);
			
			
			var imgSrc, imgSrcSplit;
			
			var className = ui.draggable.attr("class");
			
			//처음 아이콘영역에서 특정 아이콘 드래그 시
			if(className.indexOf("imgIcon") != -1 || className.indexOf("imgTextArea") != -1){
				imgSrcSplit = ui.draggable.attr('src').split("/");
				srcFileName = imgSrcSplit[imgSrcSplit.length-1];
				var html="";
				
				//if(srcFileName =="ico_mal01.png" || srcFileName =="ico_mal02.png"){
				if(srcFileName =="icon_stk03.png") { //메모입력 textarea
					
					imgObj.type =2;
					
					/*
					html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'">'
					html +='<div class="mal01">';
					html +='<textarea class="malType"></textarea></div>';
					html +='<a href="javascript:$collectionModify.deleteIcon('+idx+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a></div>';
					*/
					
					html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
					html +='<a href="javascript:$collectionModify.deleteIcon('+idx+');" class="mapIconClose"><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; right:-8px; transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;" /></a>';
					html +='<div class="mal01" style="background-image: url(/sgis_edu/resource/images/img_stk03.png); width:215px; height:130px; padding:15px 15px 30px 15px;" >';
					//html +='<textarea style="background: none; border:none; width:100%; height:100%;" row=4 placeholder="메모를 입력하세요."></textarea></div>';
					//html +='<textarea style="background: none; border:none; width:100%; height:100%;"></textarea></div>';
					html +='<textarea row=4 placeholder="메모를 입력하세요."></textarea></div>';
					html +='</div>';
						
				
				} else if(srcFileName =="icon_stk01.png"){
					imgObj.type =1;
					html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
					html +='<a href="javascript:$collectionModify.deleteIcon('+idx+');" ><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; top:-10px; right:-15px; transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;" /></a>';
					html +='<img src="';
					html += "/sgis_edu/resource/images/img_stk01.png";
					html +='" style="width:28px;height:34px;" />';
					
					html +="</div>";
				} else if(srcFileName =="icon_stk02.png"){
					imgObj.type =1;
					html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
					
					html +='<a href="javascript:$collectionModify.deleteIcon('+idx+');" ><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; top:-5px; right:-10px;  transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;" /></a>';
					
					html +='<img src="';
					html += "/sgis_edu/resource/images/img_stk02.png";
					html +='" style="width:184px;height:153px;" />';
					html +="</div>";
				}
				
				
				
				$("#div_mapImage").append(html);
				$("#ico_"+idx).css({
					"z-index" : "20000",
					"position" : "absolute",
					//"top" : positionTop + "px",
					//"left" : positionLeft + "px"
					"top" : positionTop + "%",
					"left" : positionLeft + "%"
				});
				
				imgObj.icon_type = imgObj.type;
				/*imgObj.positionTop = positionTop;
				imgObj.positionLeft = positionLeft;*/
				imgObj.x_coor = positionTop;
				imgObj.y_coor = positionLeft;
				imgObj.imgSrc = ui.draggable.attr('src');
				/*imgObj.srcFileName = srcFileName;*/
				imgObj.icon_nm = srcFileName;
				imgObj.seqId = idx;
				imgObj.html_src = html;
				imgObj.exp = '';
		
				$collectionModify.targetIconArray.push(imgObj);
			}else{//드랍한 후에 드래그 시
				
				/*
				for (var i=0; i<$collectionModify.targetIconArray.length; i++) {
					//비교식이 idx가 아닌
					if ("ico_"+i == ui.draggable.attr('id')) {
						
						console.log("positionTop [" + positionTop + "]");
						console.log("$collectionModify.targetIconArray[i].x_coor [" + $collectionModify.targetIconArray[i].x_coor + "]");
						
						$collectionModify.targetIconArray[i].x_coor = positionTop;
						$collectionModify.targetIconArray[i].y_coor = positionLeft;
						
						break;
					}
				}
				*/
				
				if( $collectionModify.removeIconFlag != 0 ) { //아이콘 삭제시 idx가 겹치는 문제 발생으로 flag처리함.
					
					for (var i=0; i<=$collectionModify.removeIconFlag +20; i++) {
						if( $collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].seqId != undefined && 
							"ico_"+$collectionModify.targetIconArray[i].seqId == ui.draggable.attr('id')) {
								
								console.log("positionTop [" + positionTop + "]");
								console.log("$collectionModify.targetIconArray[i].x_coor [" + $collectionModify.targetIconArray[i].x_coor + "]");
								
								var positionTop = Number((ui.position.top)/canvas_top*100);
								var positionLeft = Number(ui.position.left/canvas_width*100);
								
								$collectionModify.targetIconArray[i].x_coor = positionTop;
								$collectionModify.targetIconArray[i].y_coor = positionLeft;
								
								break;
								
						} else if($collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].icon_id != undefined && 
							"ico_"+$collectionModify.targetIconArray[i].icon_id == ui.draggable.attr('id')) {
							
							    var positionTop = Number((ui.position.top)/canvas_top*100);
							    var positionLeft = Number(ui.position.left/canvas_width*100);
							
								$collectionModify.targetIconArray[i].x_coor = positionTop;
								$collectionModify.targetIconArray[i].y_coor = positionLeft;
								
								break;
						}						
						
					}
				} else {
					for (var i=0; i<$collectionModify.targetIconArray.length; i++) {
						//비교식이 idx가 아닌
						if ("ico_"+i == ui.draggable.attr('id')) {
							
							console.log("positionTop [" + positionTop + "]");
							console.log("$collectionModify.targetIconArray[i].x_coor [" + $collectionModify.targetIconArray[i].x_coor + "]");
							
							var positionTop = Number((ui.position.top)/canvas_top*100);
							var positionLeft = Number(ui.position.left/canvas_width*100);
							
							$collectionModify.targetIconArray[i].x_coor = positionTop;
							$collectionModify.targetIconArray[i].y_coor = positionLeft;
							
							break;
						}
					}
				}
				
				
			}
			dropImageEvent("#ico_"+idx);
		}
	});
	
	$("#mapArea").removeAttr("onclick");
}

//문자열을 UTF8 16 진수 문자열로 변환 
function string_to_utf8_hex_string(text)
{
    var bytes1 = string_to_utf8_bytes (text);
    var hex_str1 = bytes_to_hex_string (bytes1);
    return hex_str1;
}

// UTF8 16 진수 문자열을 문자열로 변환 
function utf8_hex_string_to_string(hex_str1)
{ 
    var bytes2 = hex_string_to_bytes (hex_str1);
    var str2 = utf8_bytes_to_string (bytes2);
    return str2;
}

// 문자열을 UTF8 바이트 배열로 변환 
function string_to_utf8_bytes(text)
{
    var result = [] ;

    if (text == null )
        return result;

    for ( var i = 0; i <text.length; i ++) {
        var c = text.charCodeAt (i);
        if (c <= 0x7f) {
            result.push (c);
        } else if (c <= 0x07ff) {

            result.push (((c >> 6) & 0x1F) | 0xC0);

            result.push ((c & 0x3F) | 0x80);

        } else {

            result.push (((c >> 12) & 0x0F) | 0xE0);

            result.push (((c >> 6) & 0x3F) | 0x80);

            result.push ((c & 0x3F) | 0x80);

        }

    }

    return result;

}

// 바이트 값을 16 진수 문자열로 변환

function byte_to_hex(byte_num)
{

    var digits = (byte_num).toString (16);

    if (byte_num <16)

        return '0' + digits;

    return digits;

}

// 바이트 배열을 16 진수 문자열로 변환 
function bytes_to_hex_string(bytes)
{
    var result = "" ;

    for ( var i = 0; i <bytes.length; i ++) { 
        result += byte_to_hex (bytes[i]);
    }
    return result;
}

// 16 진수 문자열을 바이트 값으로 변환 
function hex_to_byte(hex_str)
{
    return parseInt(hex_str, 16);
}

// 바이트 배열을 16 진수 문자열로 변환 
function hex_string_to_bytes(hex_str)
{ 
    var result = [] ;
    for ( var i = 0; i <hex_str.length; i += 2) {
        result.push (hex_to_byte (hex_str.substr (i, 2)));
    }
    return result;
}

// UTF8 바이트 배열을 문자열로 변환
function utf8_bytes_to_string(arr)
{
    if (arr == null)
        return null;
    var result = "";

    var i;
    while (i = arr.shift()) {

        if (i <= 0x7f) {

            result += String.fromCharCode(i);

        } else if (i <= 0xdf) { 

            var c = ((i & 0x1f) << 6);

            c += arr.shift() & 0x3f;

            result += String.fromCharCode(c);

        } else if (i <= 0xe0) { 

            var c = ((arr.shift () & 0x1f) << 6) | 0x0800;

            c += arr.shift() & 0x3f;

            result += String.fromCharCode(c);

        } else {

            var c = ((i & 0x0f) << 12);

            c += (arr.shift() & 0x3f) << 6;

            c += arr.shift() & 0x3f;

            result += String.fromCharCode(c);

        }

    }
    return result;
}



function dropImageEvent(id){
	if ($(id).data("draggable")) {
		$(id).draggable("destroy");
	}
	
	$(id).draggable({
		containment : "parent",
	});
}

(function(W, D) {
	W.$collectionModify = W.$collectionModify || {};
	
	$collectionModify = {
			srv_type : null,
			selectId : null,
			selectImgList : new Array(),
			selectIconList : new Array(),
			targetIconArray : new Array(),
			selectTitle : null,
			selectContent : null,
			selectTag : null,
			selectSurvey : null,
			selectSurvey_type : null,
			publicType : null,
			modify_open_yn : "Y",
			selectImgIdx : 0,
			intervalContent : null,
			that : null,
			sortableImgIndex : null,
			removeIconFlag : 0,
			
			//현재 상세보기 수정 
			modifyData : function(){
				
				//statsGalleryDialog
				
				//$("#penButton").show();
				//titleTxt
				//$(".gvInfo").hide();
				//$(".gvIconEventBox").hide();
				//$(".gvReplyForm").hide();
				//$(".gvReplyListBox").hide();
				//$("#gvTag").hide();
				
				/*
				<li>
	                <label class="formTi">타이틀</label>
	                <input type="text" id="gallery_title" name="title" maxlength="100" placeholder="타이틀을 입력하세요."> 
	            </li>
	            <li>
	                <label class="formTi">설명</label>
	                <textarea rows="10" id="applicationContent" name="applicationContent" placeholder="설명을 입력하세요."></textarea>
	            </li>
	            <li>
	                <label class="formTi">해쉬태그</label>
	                <input type="text" id="hashTag" placeholder="해쉬태그를 입력하세요."> 
	            </li>
	            <li>
	                <label class="formTi">비밀번호 <i>댓글작성을 위한 비밀번호</i></label>
	                <input type="password" placeholder="4자 이상 (숫자,영문 가능)"> 
	            </li>
	            <li>
	                <input type="radio" value="Y" class="radio" name="private" id="yes" checked><label for="yes">공개</label>
                    <input type="radio" value="N" class="radio" name="private" id="no" ><label for="no">비공개</label>
	            </li>
				*/
				
				//$("#titleTxt").html("<input class='inp' id='modifyTitle' type='text' value='"+$collectionModify.selectTitle+"'/>");
				//$("#postContentTxt").html("<textArea class='gvTextArea'>"+$collectionModify.selectContent+"</textArea>");
				$("#span_gallery_title").html("<input id='modifyTitle' type='text' maxlength='100' value='"+$collectionModify.selectTitle+"'/>");
				$("#span_applicationContent").html("<textArea class='gvTextArea' rows='10'>"+$collectionModify.selectContent+"</textArea>");
				$("#span_hashTag").html("<input id='hashTag' type='text'  value='"+$collectionModify.selectTag+"'/>");
				
				if($collectionModify.modify_open_yn == "Y") {
					$("#span_open_yn").html("<input type='radio' value='Y' class='radio' name='private' id='yes' checked><label for='yes'>공개</label><input type='radio' value='N' class='radio' name='private' id='no' ><label for='no'>비공개</label>");
				} else {
					$("#span_open_yn").html("<input type='radio' value='Y' class='radio' name='private' id='yes' ><label for='yes'>공개</label><input type='radio' value='N' class='radio' name='private' id='no' checked><label for='no'>비공개</label>");
				}
				
				if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
					if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','04',$('#hidden_ss_school_grade').val(),'');}
				}
				
				
				
				//$("#mapImage").attr("src", this.src);
				//$("#div_image_add_btn").css("display", "none");
				$("#div_mapImage").attr("class", "map addClass on");
				$("#div_sticker").attr("class", "editWrap addClass on");
				//$(".imgIcon").show();
				$("#view_stats_area").hide(); //보기영역
				$("#modify_stats_area").show();//편집하기영역
				$("#modify_stats_area2").show();//편집하기영역
				$("#div_title_sticker").hide();//편집하기영역
				
				/*
				if($collectionModify.selectSurvey.survey_title == undefined){
					$collectionModify.selectSurvey.survey_title = "";
				}
				*/
				
				var html ="";
				/*
					html +='<div class="usForm">';
					html +='<input name="surveySubject" id="surveySubject" type="text" placeholder="설문제목" value="'+$collectionModify.selectSurvey.survey_title+'" />';
					html +='</div>';
					html +='<div class="josaListBox">';
					html +='<div id="surveyDetail" class="josaListBoxScroll">';
					html +='<ul id="surveyDetailUl">';
					for(var i = 0; i < $collectionModify.selectSurvey.surveyList.length; i ++){
						html +='<li name="ansLi"><div class="rela"><input type="text" name="ansDetail" placeholder="항목 입력" value="'+$collectionModify.selectSurvey.surveyList[i].ans_content+'"/><a style="display:none;"name="removePoll" href="javascript:void(0)" onclick="$collectionModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></div></li>';
					}
					
					html +='<li id="surveyAdd_1"><a href="javascript:$collectionModify.addPollDetail()">+ 항목추가</a></li>';
					html +='</ul>';
					html +='</div>';
					
					if($collectionModify.selectSurvey.survey_title != ""){
						var dtStr = $collectionModify.selectSurvey.end_dt.replace(/\"/gi,""); 
						dtStr = dtStr.replace(/\s/g,'');
						dtStr = dtStr.replace("년","-");
						dtStr = dtStr.replace("월","-");
						dtStr = dtStr.replace("일","");
						if(dtStr == "1900-01-01"){
							var date = new Date();
							date.setDate(date.getDate() + 7);
							dtStr = date.getFullYear() + "-" + leadingZeros((date.getMonth()+1),2) +"-" + leadingZeros(date.getDate(),2);
						}
						html +='<a href="javascript:void(0)" class="radioLink on"';
						html +='onclick="radioCross(this);" data-event="toggle" id="endSurveyTime">마감시간 설정</a>';
						html +='<div class="calendarEtcBox" style="display: block;">';
						html +='<input id="survey_surv_end_dt" type="text" class="date" value="'+dtStr+'"/>';
						html +='</div>';
					}else{
						var date = new Date();
						date.setDate(date.getDate() + 7);
						dtStr = date.getFullYear() + "-" + leadingZeros((date.getMonth()+1),2) +"-" + leadingZeros(date.getDate(),2);
						
						html +='<a href="javascript:void(0)" class="radioLink"';
						html +='onclick="radioCross(this);" data-event="toggle" id="endSurveyTime">마감시간 설정</a>';
						html +='<div class="calendarEtcBox">';
						html +='<input id="survey_surv_end_dt" type="text" class="date" value="'+dtStr+'"/>';
						html +='</div>';
					}
					
					if($collectionModify.selectSurvey_type =="1"){
						html +='<a href="javascript:void(0)" class="radioLink"';
						html +='onclick="radioCross(this)" id="surveyType">복수선택</a>';
					}else{
						html +='<a href="javascript:void(0)" class="radioLink on"';
						html +='onclick="radioCross(this)" id="surveyType">복수선택</a>';
					}
					
					if($collectionModify.publicType =="1"){
						html +='<a href="javascript:void(0)" class="radioLink on"';
						html +='onclick="radioCross(this)" id="publicType">공개여부</a>';
					}else{
						html +='<a href="javascript:void(0)" class="radioLink"';
						html +='onclick="radioCross(this)" id="publicType">공개여부</a>';
					}
					
					html +='</div>';
				*/

				//$collectionModify.selectImgIdx = collectionGallery.selectImgIdx;
				
				$collectionModify.selectImgIdx = $collectionModify.that.selectImgIdx;
					
				
				
				/*
				//$(".gvVote").show();
				$(".gvVote").hide(); //mng_s 20210729 수정 창에서 투표관련 내용 않보이게 하기
				$("#gvVote").html(html);		
				$("#gvVote").css("border","1px");
				datePicker();
				var oriTag ="";
				var tagStr ="";
				$(".hashTag").show();
				
				if($collectionModify.selectTag != null && $collectionModify.selectTag !=""){
					tagStr= $collectionModify.selectTag.split(",");
					for(var i = 0 ; i < tagStr.length;i++){
						//2017.03.08 ie에서 해시태그 하나만 나오는 이슈
						var d = new Date();
						var tmpId = d.getMilliseconds();
						var html  = "<span class='tag' id='tag_id_"+tmpId+"-"+tagStr[i]+"'>";
							html += 	"<span>" + tagStr[i] + "&nbsp; &nbsp;</span>";
							html += 	"<a href='#' title='Removing tag' class='Removing' id='tags_"+tmpId+"-"+tagStr[i]+"'>x</a>";
							html += "</span>";
						$("#hashTag_tagsinput").prepend(html);	
						$("#hashTag_tag").focus();
						$("#hashTag_tag").blur();
					}
				}
				
				//2017.03.08 ie에서 해시태그 하나만 나오는 이슈
				//======================START=========================//
				$(".Removing").click(function() {
					var id = $(this).attr("id");
					id = id.split("_")[1];
					$("#tag_id_"+id).remove();
					$("#hashTag_tagsinput").scrollTop(0);
				});
				
				$("#hashTag_tag").change(function() {
					var value = this.value;
					setTimeout(function() {
						var hashTags = $("#hashTag_tagsinput > span").last();
						var d = new Date();
						var tmpId = d.getMilliseconds();
						$(hashTags).attr("id", "tag_id_"+tmpId+"_"+value);
						$(hashTags).find("a").attr("class", "Removing");
						$(hashTags).find("a").attr("id", "tags_"+tmpId+"-"+value);
					}, 100);
				});
				
				$("#hashTag_tag").keydown(function(e) {
					if (e.which == 13) {
						var value = this.value;
						setTimeout(function() {
							var hashTags = $("#hashTag_tagsinput > span").last();
							var d = new Date();
							var tmpId = d.getMilliseconds();
							$(hashTags).attr("id", "tag_id_"+tmpId+"_"+value);
							$(hashTags).find("a").attr("class", "Removing");
							$(hashTags).find("a").attr("id", "tags_"+tmpId+"-"+value);
						}, 100);
					}
				});
				//======================END=========================//
				
				//2017.03.22 수정시, 해시태그가 보이지 않는 현상
				//$("#hashTag_tagsinput").scrollTop(0);
				
				*/
				
				//이미지 생성
				/*$("div[name='slickImage']").remove();*/
				
				//jsp 구조 변경 시작
				//2017.03.22 수정시 썸네일 슬라이더 prev/next 동작안하는 이슈
				//이파일 내, gcSlideArea -> gvSlideArea로 모두 변경
				
				/*
				$("#imgSlideBox").attr('style','width=500px;').attr('class','gcSlideBox');
				$("#gvSlideArea").css('margin','0 auto');
				$("#gvPrev").css({
					"position" : "absolute",
					"left" : "5px",
					"top" : "30px"
				});
				$("#gvNext").css({
					"position" : "absolute",
					"right" : "5px",
					"top" : "30px"
				});
				$(".gvController").hide();
				
				//jsp 구조변경 끝gcSlideArea
				
				var slickDiv = $(".gvSlideArea").find(".item");
				if(slickDiv.length == 0){
					
				}else{
					for(var i =slickDiv.length; i > 0 ; i--){
						$('.gvSlideArea').slick('slickRemove',i-1);
					}
				}
				
				
				
				for(var i = 0; i < $collectionModify.selectImgList.length;i++){
					var paramInfo = JSON.parse($collectionModify.selectImgList[i].param_info);
					var item = '<div class="item" name="slickImage">';
					item += 		'<div class="rela">';
					item += 			'<a href="javascript:void(0)" class="showImg" onclick="$collectionModify.selectShowImage(this);"><img src="/upload/gallery/galleryView/'+paramInfo.fileName+'" onerror="this.src=\'/img/common/testimg01.png\'" width="100" height="62"/></a>'; //2017.03.22 수정모드일 때, 이미지가 작게 나오는 문제
					item += 			'<a href="javascript:void(0)" class="gdel" onclick="$collectionModify.galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
					item += 		'</div>';
					item += 	'</div>';
					
					$("#gvSlideArea").slick('slickAdd',item);
				}
				
				//로컬파일 추가 아이콘
				$("#imgSlideBox").after('<form id="gallerySaveForm" method="post" enctype="multipart/form-data"><a class="gadd2" onclick="fileEvent(\'#imgFile\')"><span id="viewText">이미지 첨부하기</span><span id="preViewImage" style="display:none;"><img id="target" src="#" width="260px" height="150px" /></span></a><input type="file" name="preView" class="hidden" id="imgFile" onchange="console.log(\'collectionGalleryModify.js 로컬파일업로드클릭\');$collectionModify.imageUploadAndEdit();" /></form>');
				
				//이미지 추가 아이콘
				$("#imgSlideBox").after('<a href="javascript:void(0)" class="gadd" onclick="gadd();$collectionModify.selectBookMarkList();">맵추가</a>');
				$(".useSide").append('<div class="josaListEtcBox"><a onclick="javascript:$collectionModify.modifyUpdateDataSave();" class="btnGtype on" style="cursor:pointer;">저장</a></div>'); //2017.03.22 커서설정
				*/
				
				//debugger;
				//현재 선택 이미지 조회
				$collectionModify.getImgIconList($collectionModify.selectId);
				
				
				/*
				if($(".josaListBoxScroll").length) $(".josaListBoxScroll").mCustomScrollbar({axis:"y"});
				if($(".gdContScrollBox").length) $(".gdContScrollBox").mCustomScrollbar({axis:"xy"});
				if($("#hashTag").length) $('#hashTag').tagsInput({width:'auto'});
				*/
				
				dragImageOn();
				
				
				/*
				$(".slick-track").sortable({
					connectWith :".slick-track",
					start : function(ev, ui){
						$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						$collectionModify.sortableImgIndex =$(ui.item).index(); // 시작 인덱스 
					},
					
					update : function(ev,ui){
						
						//바뀌게 될 selectIdx의 값을 구한다.
						if($collectionModify.selectImgIdx == $collectionModify.sortableImgIndex){
							//보여주고 있는 대상을 옮길 경우
							$collectionModify.selectImgIdx = $(ui.item).index();
						}else{
							//보여주고 있는 대상이 아닐경우
							if($(ui.item).index() > $collectionModify.sortableImgIndex){
								//뒤로 밀었을 경우
								if($collectionModify.selectImgIdx > $(ui.item).index()){
									//변경 없음
								}else{
									if($collectionModify.selectImgIdx != 0){
										$collectionModify.selectImgIdx = $collectionModify.selectImgIdx -1;
									}
								}
							}else if($(ui.item).index() < $collectionModify.sortableImgIndex){
								//앞으로 밀었을 경우
								if($collectionModify.selectImgIdx != $collectionModify.selectImgList.length-1){
									$collectionModify.selectImgIdx = $collectionModify.selectImgIdx +1;
								}else{
									
								}
							}
						}
						//ex 1 ) 0 1 2 3 4 5 의 배열에 4번이 2번의 위치에 들어갈때						
						//sortableImgIndex에 해당 하는 image와 iconList를 swap공간에 넣는다. 
						var swapImage = $collectionModify.selectImgList[$collectionModify.sortableImgIndex];
						var swapIconArray = $collectionModify.selectIconList[$collectionModify.sortableImgIndex];
						//ex 2 ) 0 1 2 3 5  //옮겨지는 곳의 배열을 제거						
						//해당 index의 배열을 제거 한다.
						$collectionModify.selectImgList.splice($collectionModify.sortableImgIndex,1);
						$collectionModify.selectIconList.splice($collectionModify.sortableImgIndex,1);

						//ex 3 ) 0 1 | 2 3 5 // 옮겨지는곳까지의 인덱스를 기준으로 배열을 짜른다.
						var firstImageArray = new Array();
						var firstIconArray = new Array();
						for(var i = 0; i <$(ui.item).index(); i++){
							firstImageArray.push($collectionModify.selectImgList[i]);
							firstIconArray.push($collectionModify.selectIconList[i]);
						}
						
						var secondImageArray = new Array();
						var secondIconArray = new Array();
						for(var i = $(ui.item).index(); i < $collectionModify.selectImgList.length; i++){
							secondImageArray.push($collectionModify.selectImgList[i]);
							secondIconArray.push($collectionModify.selectIconList[i]);
						}
						
						//ex 4) 가른곳에서 firstArray의 끝에 swapData를 삽입한다.
						firstImageArray.push(swapImage);
						firstIconArray.push(swapIconArray);
						
						//ex 5) 두개로 갈라진 배열을 하나로 합친다.
						$collectionModify.selectImgList = firstImageArray.concat(secondImageArray);
						$collectionModify.selectIconList = firstIconArray.concat(secondIconArray);
						
						//배열이 완성이 되었을경우 해당 IMG와 ICON에 넣어진 img_id들을 바꾸어준다.
						//기준 : 해당 Object의 data_id + _ + i
						for(var i = 0; i < $collectionModify.selectImgList.length; i++){
							var oriId = $collectionModify.selectImgList[i].data_id;
							$collectionModify.selectImgList[i].img_id = oriId +"_" + i;
							//이미지에 해당하는 icon의 img_id 역시 변경 한다.
							for(var j = 0; j < $collectionModify.selectIconList[i].length; j++){
								$collectionModify.selectIconList[i][j].img_id = oriId +"_" + i;
							}
						}
						
						$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						
						//$galleryAdd.selectIdx를 showGalleryImage 할때 문제 발생 .. 떨어진 ui.item.index 앞에 이미지의 아이콘이 덮침당함
						
						
					}
				});
				
				$("body").on("focus","input[name='surveySubject']",function(){
					//endSurveyTime
					var ck = $("#endSurveyTime").hasClass("on");
					if(!ck){
						$("#endSurveyTime").addClass("on");
						$(".calendarEtcBox").show();
					}
				});
				
				
				//2017.03.31 
				$("body").on("mouseover", ".gvSlideArea .item .rela", function() {
					$(this).find(".gdel").show();
					if ($collectionModify.selectImgList != undefined && $collectionModify.selectImgList.length == 1) {
						$(".gdel").hide();
					}
				});
				
				$("body").on("mouseout", ".gvSlideArea .item .rela", function() {
					$(this).find(".gdel").hide();
				});
				
				*/

			},
			
			/**
			 * mng_s 20210727 로컬파일 저장 후 교안 만드는 영역에 이미지 띄우기
			 */
			imageUploadAndEdit : function(){
				//imageArray
				var jsonParam = $collectionModify.usecaseCrateParam();
								
		    	var supportType = supportPahtValue();
				var surveyduplication = $("#surveyType").hasClass("on");
				
				srv_type=2;
				
				var date = new Date();
				$("#gallerySaveForm").ajaxForm({
					async : false,
					type : "POST",
					url : "/view/edu_gallery/galleryAddLocalFile",
					contentType : "application/json",
					dataType : "json",
					data : {
						title : $("#gallery_title").val(),
						content : $("#applicationContent").val(),
						tag : $("#hashTag").val(),
						srv_type : srv_type,
						survey_surv_start_dt : date.getFullYear() + "-" + Number(date.getMonth()+1) + "-" + date.getDate(),
						survey_surv_end_dt : $("#survey_surv_end_dt").val(),
						//surveyData : surveyData,
						param : jsonParam,
						supportType : supportType,
						surveyduplication : surveyduplication
					},
					
					success : function(data){
						
					},
					error : function(xhr,textStatus,error){
						
					},
					complete : function(data){
						
					}
				
				}).submit();
				
				
				$collectionModify.galleryItemAddLocalFile('',JSON.parse(jsonParam).preViewImg.saveFileName);
			},
			
			//로컬파일 갤러리 목록 추가
			galleryItemAddLocalFile : function(amugerna,hist_id){
				var object = new Object();
				var param_info = new Object();
			
				object.fileName = $.trim(hist_id);
				object.api_call_url="";
				param_info.hist_id = $.trim(hist_id);
				param_info.type = "bookMark";
				param_info.fileName = $.trim(hist_id);
				object.param_info = JSON.stringify(param_info);
				object.data_id = $collectionModify.selectId;
				object.img_id = $collectionModify.selectId + "_"+$collectionModify.selectImgList.length;
				//object.data_id
				//object.img_id
				$collectionModify.selectImgList.push(object);
				$collectionModify.selectIconList.push(new Array());
				var item = '<div class="item" name="slickImage">';
				item += 		'<div class="rela">';
				item += 			'<a href="javascript:void(0)" class="showImg" onclick="$collectionModify.selectShowImage(this);"><img src="/upload/gallery/galleryView/'+param_info.fileName+'" onerror="this.src=\'/img/common/testimg01.png\'" width="100px" height="62px;" /></a>';
				item += 			'<a href="javascript:void(0)" class="gdel" onclick="$collectionModify.galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
				item += 		'</div>';
				item += 	'</div>';
				$('#gvSlideArea').slick('slickAdd', item);
				$(".gcFavBox").hide();
				$(".fovScrollBox").mCustomScrollbar('destroy');
				
				$(".slick-track").sortable({
					connectWith :".slick-track",
					start : function(ev, ui){
						$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						$collectionModify.sortableImgIndex =$(ui.item).index(); // 시작 인덱스 
					},
					update : function(ev,ui){
						//바뀌게 될 selectIdx의 값을 구한다.
						if($collectionModify.selectImgIdx == $collectionModify.sortableImgIndex){
							//보여주고 있는 대상을 옮길 경우
							$collectionModify.selectImgIdx = $(ui.item).index();
						}else{
							//보여주고 있는 대상이 아닐경우
							if($(ui.item).index() > $collectionModify.sortableImgIndex){
								//뒤로 밀었을 경우
								if($collectionModify.selectImgIdx > $(ui.item).index()){
									//변경 없음
								}else{
									if($collectionModify.selectImgIdx != 0){
										$collectionModify.selectImgIdx = $collectionModify.selectImgIdx -1;
									}
								}
							}else if($(ui.item).index() < $collectionModify.sortableImgIndex){
								//앞으로 밀었을 경우
								if($collectionModify.selectImgIdx != $collectionModify.selectImgList.length-1){
									$collectionModify.selectImgIdx = $collectionModify.selectImgIdx +1;
								}else{
									
								}
							}
						}
						
						//ex 1 ) 0 1 2 3 4 5 의 배열에 4번이 2번의 위치에 들어갈때						
						//sortableImgIndex에 해당 하는 image와 iconList를 swap공간에 넣는다. 
						var swapImage = $collectionModify.selectImgList[$collectionModify.sortableImgIndex];
						var swapIconArray = $collectionModify.selectIconList[$collectionModify.sortableImgIndex];
						console.log("swapArray ========");
						console.log(swapIconArray);
						//ex 2 ) 0 1 2 3 5  //옮겨지는 곳의 배열을 제거						
						//해당 index의 배열을 제거 한다.
						$collectionModify.selectImgList.splice($collectionModify.sortableImgIndex,1);
						$collectionModify.selectIconList.splice($collectionModify.sortableImgIndex,1);

						//ex 3 ) 0 1 | 2 3 5 // 옮겨지는곳까지의 인덱스를 기준으로 배열을 짜른다.
						var firstImageArray = new Array();
						var firstIconArray = new Array();
						console.log("firstArray ========");
						for(var i = 0; i <$(ui.item).index(); i++){
							firstImageArray.push($collectionModify.selectImgList[i]);
							console.log($collectionModify.selectIconList[i]);
							firstIconArray.push($collectionModify.selectIconList[i]);
						}
						
						var secondImageArray = new Array();
						var secondIconArray = new Array();
						console.log("secondArray ========");
						for(var i = $(ui.item).index(); i < $collectionModify.selectImgList.length; i++){
							secondImageArray.push($collectionModify.selectImgList[i]);
							console.log($collectionModify.selectIconList[i]);
							secondIconArray.push($collectionModify.selectIconList[i]);
						}
						
						//ex 4) 가른곳에서 firstArray의 끝에 swapData를 삽입한다.
						firstImageArray.push(swapImage);
						firstIconArray.push(swapIconArray);
						
						//ex 5) 두개로 갈라진 배열을 하나로 합친다.
						$collectionModify.selectImgList = firstImageArray.concat(secondImageArray);
						$collectionModify.selectIconList = firstIconArray.concat(secondIconArray);
						
						$galleryAdd.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						
						//$galleryAdd.selectIdx를 showGalleryImage 할때 문제 발생 .. 떨어진 ui.item.index 앞에 이미지의 아이콘이 덮침당함
						
						
					}
				});
			},
			
			usecaseCrateParam : function(){
				var dt = new Date();
				
				var object = new Object();
				
				var preViewImage= new Object();
				
				var imgFileFullPath  = $("#imgFile").val();
				var imgPathHeader = imgFileFullPath.lastIndexOf("\\");
	            var imgPathMiddle = imgFileFullPath.lastIndexOf(".");
	            var imgPathEnd = imgFileFullPath.length;
	            var imgOriFileName = imgFileFullPath.substring(imgPathHeader+1, imgPathMiddle);
				var imgExtName = imgFileFullPath.substring(imgPathMiddle+1, imgPathEnd);
				var imgFileName = imgOriFileName +"."+imgExtName;
				var imgSaveName = imgOriFileName+"_"+dt.getFullYear()+Number(dt.getMonth()+1)+dt.getDate()+dt.getHours()+dt.getMinutes()+dt.getSeconds()+"."+imgExtName;
				
				preViewImage.imgFileName = imgFileName;
				preViewImage.saveFileName = imgSaveName;
				
				var fileList = new Array();
				
				var fileNameList = $("input[name='refFiles[]']");
				for(var i=0; i < fileNameList.length; i++){
					
					var fileObject = new Object();
					
					var selectObject = fileNameList[i];
					/*var selectFileFullPath = $("#"+selectObject.id).val();*/
					var selectFileFullPath = $("input[name='refFiles[]']").eq(i).val();
					var pathHeader = selectFileFullPath.lastIndexOf("\\");
		            var pathMiddle = selectFileFullPath.lastIndexOf(".");
		            var pathEnd = selectFileFullPath.length;
		            var fileName = selectFileFullPath.substring(pathHeader+1, pathMiddle);
					var selectExtName = selectFileFullPath.substring(pathMiddle+1, pathEnd);
					
					
					
					fileObject.fileName = fileName +"."+selectExtName;
					fileObject.saveName = fileName+"_"+dt.getFullYear()+Number(dt.getMonth()+1)+dt.getDate()+dt.getHours()+dt.getMinutes()+dt.getSeconds()+"."+selectExtName;
					fileList[i] = fileObject;
				}
				object.refFileList = fileList;
				object.preViewImg = preViewImage;
				//파일명도 추가 해야 함
				//fileName 파일 저장될때의 이름
				//fileRealName 실제 파일 원본 이름
				
				return JSON.stringify(object);
			},
			
			//갤러리 추가할 목록
			selectBookMarkList : function(){
				var selectBook = new sop.portal.collectionBookMarkList.api();
				selectBook.request({
					method: "POST",
					async : false,
					url : contextPath +"/ServiceAPI/edu_gallery/selectBookMarkList.json"
				});
			},
			//갤러리 목록 추가
			galleryItemAdd : function(amugerna,hist_id){
				var object = new Object();
				var param_info = new Object();
			
				object.fileName = $.trim(hist_id)+".png";
				object.api_call_url="";
				param_info.hist_id = $.trim(hist_id);
				param_info.type = "bookMark";
				param_info.fileName = $.trim(hist_id)+".png";
				object.param_info = JSON.stringify(param_info);
				object.data_id = $collectionModify.selectId;
				object.img_id = $collectionModify.selectId + "_"+$collectionModify.selectImgList.length;
				//object.data_id
				//object.img_id
				$collectionModify.selectImgList.push(object);
				$collectionModify.selectIconList.push(new Array());
				var item = '<div class="item" name="slickImage">';
				item += 		'<div class="rela">';
				item += 			'<a href="javascript:void(0)" class="showImg" onclick="$collectionModify.selectShowImage(this);"><img src="/upload/gallery/galleryView/'+param_info.fileName+'" onerror="this.src=\'/img/common/testimg01.png\'" width="100px" height="62px;" /></a>';
				item += 			'<a href="javascript:void(0)" class="gdel" onclick="$collectionModify.galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
				item += 		'</div>';
				item += 	'</div>';
				$('#gvSlideArea').slick('slickAdd', item);
				$(".gcFavBox").hide();
				$(".fovScrollBox").mCustomScrollbar('destroy');
				
				
				$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
				
				$(".slick-track").sortable({
					connectWith :".slick-track",
					start : function(ev, ui){
						$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						$collectionModify.sortableImgIndex =$(ui.item).index(); // 시작 인덱스 
					},
					update : function(ev,ui){
						//바뀌게 될 selectIdx의 값을 구한다.
						if($collectionModify.selectImgIdx == $collectionModify.sortableImgIndex){
							//보여주고 있는 대상을 옮길 경우
							$collectionModify.selectImgIdx = $(ui.item).index();
						}else{
							//보여주고 있는 대상이 아닐경우
							if($(ui.item).index() > $collectionModify.sortableImgIndex){
								//뒤로 밀었을 경우
								if($collectionModify.selectImgIdx > $(ui.item).index()){
									//변경 없음
								}else{
									if($collectionModify.selectImgIdx != 0){
										$collectionModify.selectImgIdx = $collectionModify.selectImgIdx -1;
									}
								}
							}else if($(ui.item).index() < $collectionModify.sortableImgIndex){
								//앞으로 밀었을 경우
								if($collectionModify.selectImgIdx != $collectionModify.selectImgList.length-1){
									$collectionModify.selectImgIdx = $collectionModify.selectImgIdx +1;
								}else{
									
								}
							}
						}
						
						//ex 1 ) 0 1 2 3 4 5 의 배열에 4번이 2번의 위치에 들어갈때						
						//sortableImgIndex에 해당 하는 image와 iconList를 swap공간에 넣는다. 
						var swapImage = $collectionModify.selectImgList[$collectionModify.sortableImgIndex];
						var swapIconArray = $collectionModify.selectIconList[$collectionModify.sortableImgIndex];
						console.log("swapArray ========");
						console.log(swapIconArray);
						//ex 2 ) 0 1 2 3 5  //옮겨지는 곳의 배열을 제거						
						//해당 index의 배열을 제거 한다.
						$collectionModify.selectImgList.splice($collectionModify.sortableImgIndex,1);
						$collectionModify.selectIconList.splice($collectionModify.sortableImgIndex,1);

						//ex 3 ) 0 1 | 2 3 5 // 옮겨지는곳까지의 인덱스를 기준으로 배열을 짜른다.
						var firstImageArray = new Array();
						var firstIconArray = new Array();
						console.log("firstArray ========");
						for(var i = 0; i <$(ui.item).index(); i++){
							firstImageArray.push($collectionModify.selectImgList[i]);
							console.log($collectionModify.selectIconList[i]);
							firstIconArray.push($collectionModify.selectIconList[i]);
						}
						
						var secondImageArray = new Array();
						var secondIconArray = new Array();
						console.log("secondArray ========");
						for(var i = $(ui.item).index(); i < $collectionModify.selectImgList.length; i++){
							secondImageArray.push($collectionModify.selectImgList[i]);
							console.log($collectionModify.selectIconList[i]);
							secondIconArray.push($collectionModify.selectIconList[i]);
						}
						
						//ex 4) 가른곳에서 firstArray의 끝에 swapData를 삽입한다.
						firstImageArray.push(swapImage);
						firstIconArray.push(swapIconArray);
						
						//ex 5) 두개로 갈라진 배열을 하나로 합친다.
						$collectionModify.selectImgList = firstImageArray.concat(secondImageArray);
						$collectionModify.selectIconList = firstIconArray.concat(secondIconArray);
						
						$galleryAdd.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						
						//$galleryAdd.selectIdx를 showGalleryImage 할때 문제 발생 .. 떨어진 ui.item.index 앞에 이미지의 아이콘이 덮침당함
						
						
					}
				});
			},
			
			//이미지 삭제
			galleryItemDel : function(o){
				var inx = $(o).index(".gdel");
				var slickImages = $("div[name='slickImage']");
				
				$(".gvSlideArea").slick("slickRemove",inx);
				$collectionModify.selectImgList.splice(inx,1);
				$collectionModify.selectIconList.splice(inx,1);
				
				//2017.03.31 썸네일 삭제 시, 이미지가 없을 때 default 이미지로 표출
				if ($collectionModify.selectImgList.length > 0) {
					if ($collectionModify.selectImgList[0].param_info != undefined) {
						var paramInfo = JSON.parse($collectionModify.selectImgList[0].param_info);
						var imageUrl;
						if (imageUrl != undefined && imageUrl.indexOf("data:image/") != -1) {
							$("#mapArea").attr("src", imageUrl);
							imageUrl = paramInfo.fileName;
						}else {
							imageUrl = "/upload/gallery/galleryView/" + paramInfo.fileName;
						}
						var image = new Image();
						image.src = imageUrl;
						image.onload = function() {
							var pWidth = $(".gcMap").width();
							var pHeight = $(".gcMap").height();
							this.width = (this.width * pHeight)/this.height;
							var margin = -(this.width - pWidth)/2;
							$("#mapArea").css("background-image", "url("+this.src+")");
							$("#mapArea").css({"width" : this.width + "px", "margin-left" : margin + "px"});
						};
						image.onerror = function() {
							$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
							$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
						};
					}
				}else {
					$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
					$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
				}
			},
			
			getImgIconList : function(data_id){
				var iconList = new sop.portal.getImgIconList.api();
				
				iconList.addParam("data_id", data_id);
				//iconList.addParam("img_id", img_id);
				
				iconList.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/galleryImgIconListAll.json"
				});
			},
			
			//편집하기 클릭시 가운데 이미지 로딩하기
			selectShowImage : function(o){
				var idx = $(o).index(".showImg");
				if(idx == -1){
					idx =0;
				}
				//기존에 있던거 저장
				//아이콘을 저장하기
				/*
				for(var i = 0; i < $collectionModify.targetIconArray.length;i++){
					if($collectionModify.targetIconArray[i].icon_type=="2"){
						if($("#ico_"+i+" > div > textArea").val() != undefined){
							$collectionModify.targetIconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
						}
					}
				}
				*/
				
				if( $collectionModify.removeIconFlag != 0 ) { //아이콘 삭제시 idx가 겹치는 문제 발생으로 flag처리함.
					for (var i=0; i<= collectionModify.removeIconFlag +20; i++) {
						/*
						if($collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].icon_type =="2"){
							$collectionModify.targetIconArray[i].exp = $("#ico_" + $collectionModify.targetIconArray[i].seqId +" > div > textArea").val();
						}
						*/
						if( $collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].seqId != undefined && $collectionModify.targetIconArray[i].icon_type=="2"){
							if($("#ico_"+$collectionModify.targetIconArray[i].seqId+" > div > textArea").val() != undefined){
								$collectionModify.targetIconArray[i].exp = $("#ico_"+$collectionModify.targetIconArray[i].seqId+" > div > textArea").val();
							}
						} else if($collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].icon_id != undefined && $collectionModify.targetIconArray[i].icon_type=="2"){
							if($("#ico_"+$collectionModify.targetIconArray[i].icon_id+" > div > textArea").val() != undefined){
							    $collectionModify.targetIconArray[i].exp = $("#ico_"+$collectionModify.targetIconArray[i].icon_id+" > div > textArea").val();
							}
						} 
						
					}
					
					
					
					
				} else {
					for(var i = 0; i < $collectionModify.targetIconArray.length;i++){
						if($collectionModify.targetIconArray[i].icon_type=="2"){
							if($("#ico_"+i+" > div > textArea").val() != undefined){
								$collectionModify.targetIconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
							}
						}
					}
				}
				
				
				
				$collectionModify.selectIconList[$collectionModify.selectImgIdx] = $collectionModify.targetIconArray;
				var selectImg = $collectionModify.selectImgList[idx];
				$collectionModify.selectImgIdx = idx;
				
				
				console.log("selectImg.param_info [" + selectImg);
				//debugger;
				//console.log("selectImg.param_info [" + selectImg.param_info);
				
				
				//2017.03.31 이미지 선택시, 찌그러짐 보정
				if (selectImg.img_file_nm != undefined) {
					//var paramInfo = selectImg.img_file_nm;	
					var image = new Image();
					image.src = "/upload/gallery/galleryView/" + selectImg.img_file_nm;
					image.onload = function() {
						
						$("#mapImage").attr("src", this.src);
						
						$("#div_mapImage").attr("class", "map addClass on");
						$("#div_sticker").attr("class", "editWrap addClass on");
						
						
					};
					image.onerror = function() {
						//$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
						//$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
						$("#mapArea").html("이미지가 존재하지 않습니다.");
					};
				}else {
					//$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
					//$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
					$("#mapArea").html("이미지가 존재하지 않습니다.");
				}
				
				$("div[name='ico']").remove();
				$collectionModify.gridModifyIcon($collectionModify.selectIconList[idx]);
			},
			
			saveModifyIcon : function(){
				
			},
			
			//편집하기 버튼 클릭시 아이콘 수정하기
			gridModifyIcon : function(galleryImgIconListItem){
				/*
				$(".gviewMap").find(".imgIcon").each(function(){
					$(this).remove();
				})
				*/
				$collectionModify.targetIconArray = galleryImgIconListItem;
				
				for(var i = 0; i < galleryImgIconListItem.length; i++) {
					
					
					var imgIconSrc = "/sgis_edu/resource/images/"+galleryImgIconListItem[i].icon_nm;
					var html ="";
					//if("1" ==galleryImgIconListItem[i].icon_type){
					if("icon_stk01.png" == galleryImgIconListItem[i].icon_nm){
						
						
						//html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>';
						
						html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor)) +'%;left:'+Number(Number(galleryImgIconListItem[i].y_coor))+'%">';
						html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; top:-10px; right:-15px; transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;"  /></a>';
						html +='<img src="';
						html +="/sgis_edu/resource/images/img_stk01.png";
						html +='" style="width:28px;height:34px;" />';
						//html +='" class="mapIconCont"/>';
						
						html +="</div>";
						
					} else if("icon_stk02.png" == galleryImgIconListItem[i].icon_nm){
							
							
							//html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>';
							
							html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor)) +'%;left:'+Number(Number(galleryImgIconListItem[i].y_coor))+'%">';
							html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; top:-5px; right:-10px; transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;"  /></a>';
							html +='<img src="';
							html +="/sgis_edu/resource/images/img_stk02.png";
							html +='" style="width:184px;height:153px;" />';
							//html +='" class="mapIconCont"/>';
							
							html +="</div>";
							
						
					}else if("icon_stk03.png" == galleryImgIconListItem[i].icon_nm){
						
						
						
						html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;top:'+galleryImgIconListItem[i].x_coor+'%;left:'+galleryImgIconListItem[i].y_coor+'%">'
						//html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>';
						html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; right:-8px; transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;" /></a>';
						
						//html +='<div class="mal01">';
						html +='<div class="mal01" style="background-image: url(/sgis_edu/resource/images/img_stk03.png); width:215px; height:130px; padding:15px 15px 30px 15px;" >';
						
						if(galleryImgIconListItem[i].exp != undefined){
							//html +='<textarea class="malType">'+galleryImgIconListItem[i].exp+'</textarea></div>';
							html +='<textarea  style="background: none; border:none; width:100%; height:100%;" row=4 >'+galleryImgIconListItem[i].exp+'</textarea></div>';
						}else{
							//html +='<textarea class="malType">'+''+'</textarea></div>';
							html +='<textarea  style="background: none; border:none; width:100%; height:100%;" row=4 >'+''+'</textarea></div>';
						}
						
						
						html +='</div>';
					}
					
					//$(".gviewMap").append(html);
					//$("#mapArea").append(html);
					$("#div_mapImage").append(html);
					
					/*
					var html="";
					if(srcFileName =="icon_stk03.png") { //메모입력 textarea
						imgObj.type =2;
						
						html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
						html +='<a href="javascript:$galleryAdd.removeIcon('+idx+');" class="mapIconClose"><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; right:-8px; transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;"  /></a>';
						html +='<div class="mal01" style="background-image: url(/sgis_edu/resource/images/img_stk03.png); width:215px; height:230px; padding:15px 15px 30px 15px;" >';
						html +='<textarea style="background: none; border:none; width:100%; height:100%;" row=4  placeholder="메모를 입력하세요."></textarea></div>';
						html +='</div>';
							
						
					} else if(srcFileName =="icon_stk01.png"){
						imgObj.type =1;
						html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
						html +='<a href="javascript:$galleryAdd.removeIcon('+idx+');" ><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; top:-10px; right:-15px; transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;" /></a>';
						html +='<img src="';
						//html += imgSrc;
						html += "/sgis_edu/resource/images/img_stk01.png";
						html +='" style="width:28px;height:34px;" />';
						
						html +="</div>";
					} else if(srcFileName =="icon_stk02.png"){
						imgObj.type =1;
						html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
						
						html +='<a href="javascript:$galleryAdd.removeIcon('+idx+');" ><img src="/sgis_edu/resource/images/icon_close.png"  style="width:19px; height:19px; position: absolute; top:-5px; right:-10px;  transform: translateY(-3px); background-color: #fff; border: 2px solid #000; background-size: 8px; border-radius: 20px; vertical-align: middle;" /></a>';
						
						html +='<img src="';
						//html += imgSrc;
						html += "/sgis_edu/resource/images/img_stk02.png";
						html +='" style="width:184px;height:153px;" />';
						html +="</div>";
					}
					//$("#mapArea").append(html);
					*/
					
				} //end of for
				
				/*
				for(var i =0; i < galleryImgIconListItem.length; i++){
					dropImageEvent("#ico_"+i);
				}
				*/
				
				if( $collectionModify.removeIconFlag != 0 ) { //아이콘 삭제시 idx가 겹치는 문제 발생으로 flag처리함.
					
					for (var i=0; i<=$collectionModify.removeIconFlag +20; i++) {
						if( $collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].seqId != undefined ) {
							dropImageEvent("#ico_"+$collectionModify.targetIconArray[i].seqId);
						} else if($collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].icon_id != undefined ) {
							dropImageEvent("#ico_"+$collectionModify.targetIconArray[i].icon_id);
						}
					}
				} else {
					for(var i =0; i < galleryImgIconListItem.length; i++){
						dropImageEvent("#ico_"+i);
					}
				}
				
				
			},
			
			deleteIcon : function(idx){
				
				$collectionModify.removeIconFlag = $collectionModify.removeIconFlag + 20;
				
				$("#ico_"+idx).remove();
				
				/*
				for(var i =0; i < $collectionModify.targetIconArray.length; i++){
					var object = $collectionModify.targetIconArray[i];
					
					if(i== idx){
						$collectionModify.targetIconArray.splice(i,1);
					}
				}
				*/
				if( $collectionModify.removeIconFlag != 0 ) { //아이콘 삭제시 idx가 겹치는 문제 발생으로 flag처리함.
					for (var i=0; i<= $collectionModify.removeIconFlag +20; i++) {
						var object = $collectionModify.targetIconArray[i];
						
						if(object != undefined && object.seqId != undefined && object.seqId == idx){
							$collectionModify.targetIconArray.splice(i,1);
							$collectionModify.selectIconList.splice(i,1);
						} else if(object != undefined && object.icon_id != undefined && object.icon_id == idx){
							$collectionModify.targetIconArray.splice(i,1);
							$collectionModify.selectIconList.splice(i,1);
						} 
					}
				} else {
					for(var i =0; i < $collectionModify.targetIconArray.length; i++){
						var object = $collectionModify.targetIconArray[i];
						
						if(i== idx){
							$collectionModify.targetIconArray.splice(i,1);
							$collectionModify.selectIconList.splice(i,1);
						}
					}
				}
				
			},
			
			deleteIconAll : function(){
				
				if ( $collectionModify.removeIconFlag == 0 ) {
					for(var i =0; i < $collectionModify.targetIconArray.length; i++){
						$("#ico_"+i).remove();
					}
					$collectionModify.targetIconArray = []; //배열 초기화
				} else {
					for(var i =0; i <= $collectionModify.removeIconFlag + 20; i++){
						$("#ico_"+i).remove();
					}
					$collectionModify.targetIconArray = []; //배열 초기화
				}
				
				
				
				//$collectionModify.targetIconArray.splice(0,$collectionModify.targetIconArray.length);
			},
	
			makeModifyData : function(){
				//surveyData 정리
				//selectSurvey
				
				//imgList 정리
				//삭제 한거만 반영
				//현재 ICON 정리 start
				//기존에 있던거 저장
				//아이콘을 저장하기
				/*
				for(var i = 0; i < $collectionModify.targetIconArray.length;i++){
					if($collectionModify.targetIconArray[i].icon_type=="2"){
						if($("#ico_"+i+" > div > textArea").val() != undefined){
							$collectionModify.targetIconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
						}
					}
				}
				*/
				
				if( $collectionModify.removeIconFlag != 0 ) { //아이콘 삭제시 idx가 겹치는 문제 발생으로 flag처리함.
					
					for(var i = 0; i < $collectionModify.removeIconFlag +20;i++){
						if( $collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].seqId != undefined && $collectionModify.targetIconArray[i].icon_type=="2"){
							if($("#ico_"+$collectionModify.targetIconArray[i].seqId+" > div > textArea").val() != undefined){
								$collectionModify.targetIconArray[i].exp = $("#ico_"+$collectionModify.targetIconArray[i].seqId+" > div > textArea").val();
							}
						} else if($collectionModify.targetIconArray[i] != undefined && $collectionModify.targetIconArray[i].icon_id != undefined && $collectionModify.targetIconArray[i].icon_type=="2"){
							if($("#ico_"+$collectionModify.targetIconArray[i].icon_id+" > div > textArea").val() != undefined){
							    $collectionModify.targetIconArray[i].exp = $("#ico_"+$collectionModify.targetIconArray[i].icon_id+" > div > textArea").val();
							}
						} 
					}
					
					
				} else {
					for(var i = 0; i < $collectionModify.targetIconArray.length;i++){
						if($collectionModify.targetIconArray[i].icon_type=="2"){
							if($("#ico_"+i+" > div > textArea").val() != undefined){
								$collectionModify.targetIconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
							}
						}
					}
				}
				
				
				
				$collectionModify.selectIconList[$collectionModify.selectImgIdx] = $collectionModify.targetIconArray;
				//ICON 정리 END
				
				//console.log ($collectionModify.targetIconArray);
				
				/*
				//설문조사 START
				if($.trim($("#surveySubject").val()) !=""){
					$collectionModify.selectSurvey.survey_title = $("#surveySubject").val();
					$collectionModify.selectSurvey.end_dt = $("#survey_surv_end_dt").val();
					
					$collectionModify.selectSurvey.surveyList = new Array();
					var ansList = $("input[name='ansDetail']");
					for(var i = 0; i < ansList.length ; i++ ){
						var ansObject = new Object;
						ansObject.ans_serial = i;
						ansObject.ans_content =ansList[i].value;
						$collectionModify.selectSurvey.surveyList[i] = ansObject;
					}
				}
				//설문조사 END
				*/
				
			},
			
			/**
			 * 
			 * @name         :insertDataValidate
			 * @description  :입력할데이터의 유효성 검사
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			insertDataValidate : function(){
				if($("#gallery_title").val() ==""){
					return false;
				}else if($("#applicationContent").val ==""){
					return false;
				}else if($("#teach_pwd").val() ==""){
					return false;
				}else if($collectionModify.selectImgList.length < 1){
					//이미지가 하나 이상 있는가?
					return false;
				}else{
					return true;
				}
					
			},
			
			
			/**
			 * 
			 * @name         :surveyDataValidate
			 * @description  :입력할데이터의 유효성 검사
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			surveyDataValidate : function(){
				//설문조사 제목
				//설문상세항목
				//설문항목에서 공백이 있는데이터는 지울까?
				var ansDetail = $("input[name='ansDetail']");
				if(ansDetail.length == 0 ){
					if($.trim($("input[name='surveySubject']").val()) ==""){
						return true;
					}
				}else{
					for(var i = 0; i < ansDetail.length; i++){
						if($.trim(ansDetail.val()) == ""){
							if(ansDetail.length > 1 && $.trim($("input[name='surveySubject']").val() != "")){
								return false;
							}
						}
					}
				}
				return true;
				
			},
			

			modifyUpdateDataSave : function(){
				
				$collectionModify.makeModifyData();
				
				var jsonImgList = new Object();
				jsonImgList.imgList = $collectionModify.selectImgList;
				var jsonIconList = new Object();
				jsonIconList.iconList = $collectionModify.selectIconList;
				
				console.log("jsonImgList ["+ jsonImgList);
				console.log("jsonIconList ["+ jsonIconList);
				
				
				var dataValidate = $collectionModify.insertDataValidate();
				if(dataValidate == false){
					messageAlert.open("알림","비밀번호, 제목, 컨텐츠를 올바르게 입력 해주세요.");
					return;
				}
				
				/*
				var surveyValidate = $collectionModify.surveyDataValidate();
				if(surveyValidate == false){
					messageAlert.open("알림","설문조사 내용을 올바르게 입력해주세요.");
					return;
				}
				*/
				
				
				var srv_type = "";
				if($("#publicType").hasClass("on")){
					srv_type=1;
				}else{
					srv_type=3;
				}
				var surveyduplication = $("#surveyType").hasClass("on");
				
				var updateData = new sop.portal.modifyUpdateDataSave.api();
				updateData.addParam("data_id", $collectionModify.selectId);
				updateData.addParam("title",$("#modifyTitle").val());
				updateData.addParam("content",$(".gvTextArea").val());
				if($("#hashTag").val() !=""){
					updateData.addParam("tag",$("#hashTag").val());
				}
				
				/*
				if($("#endSurveyTime").hasClass("on")){
					if($.trim($("#survey_surv_end_dt").val()) != "" || $.trim($("#survey_surv_end_dt").val()) != null){
						updateData.addParam("survey_surv_end_dt",$("#survey_surv_end_dt").val());
					}else{
						updateData.addParam("survey_surv_end_dt","");
					}
				}
				*/
				
				
				//updateData.addParam("survey",JSON.stringify($collectionModify.selectSurvey));
				
				//이미지리스트는 변경이 없기때문에 업데이트가 필요없다.
				updateData.addParam("imgList",JSON.stringify(jsonImgList));
				//updateData.addParam("iconList",JSON.stringify(jsonIconList));
				updateData.addParam("iconList",  string_to_utf8_hex_string(JSON.stringify(jsonIconList))); //mng_s 20211117 방화벽에서 img src 태그때문에 막혀서 인코딩해서 보냄
				
				
				
				updateData.addParam("teach_pwd", $("#teach_pwd").val());
				updateData.addParam("open_yn", $(":input:radio[name=private]:checked").val());
				
				
				
				//console.log(JSON.stringify(jsonIconList));
				
				updateData.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/updateGalleryData.json"
				});
				
				window.location.href = "/view/edu_gallery/resultGallery?param_ss_page_info=T&param_ss_school_grade=" + $('#hidden_ss_school_grade').val();
				
			},
			
			//편집하기의 미리보기 
			modifyUpdateDataSave2 : function(){
				
				$collectionModify.makeModifyData();
				
				var jsonImgList = new Object();
				jsonImgList.imgList = $collectionModify.selectImgList;
				var jsonIconList = new Object();
				jsonIconList.iconList = $collectionModify.selectIconList;
				
				var dataValidate = $collectionModify.insertDataValidate();
				if(dataValidate == false){
					messageAlert.open("알림","비밀번호, 제목, 컨텐츠를 올바르게 입력 해주세요.");
					return;
				}
				
				/*
				//=============================
				//var updateData = new sop.portal.modifyUpdateDataSave.api();
				//updateData.addParam("data_id", $collectionModify.selectId);
				updateData.addParam("title",$("#modifyTitle").val());
				updateData.addParam("content",$(".gvTextArea").val());
				if($("#hashTag").val() !=""){
					updateData.addParam("tag",$("#hashTag").val());
				}
				updateData.addParam("imgList",JSON.stringify(jsonImgList));
				updateData.addParam("iconList",JSON.stringify(jsonIconList));
				
				updateData.addParam("teach_pwd", $("#teach_pwd").val());
				updateData.addParam("open_yn", $(":input:radio[name=private]:checked").val());
				//=============================
				*/
				
				var tempContent = $(".gvTextArea").val();
				if (tempContent == null || tempContent == '') {
					tempContent = ' ';
				}
				
				var preViewTagHtml = "";
				var kwrd_preview = $("#hashTag").val();
				if( kwrd_preview == null || kwrd_preview == undefined  || kwrd_preview == "") {
					kwrd_preview = "";
				}
				
				kwrd_preview = replaceAll(kwrd_preview, "," , " ");
				kwrd_preview = replaceAll(kwrd_preview, "#" , " ");
				
				console.log("kwrd_preview [" + kwrd_preview);
				
				var tagArr = kwrd_preview.split(" ");
				
				var tagLength = tagArr.length;
				
				for(var j = 0; j < tagLength; j++) {
					if($.trim(tagArr[j]).length == 0) {
						continue;
					}
					preViewTagHtml += '<i class="hashTag" style="margin-top: 15px;">' + $.trim(tagArr[j]) + ' ' + '</i>';
				}
				
				var img_file_nm = $collectionModify.selectImgList[0].img_file_nm;
				
				/*
				title : $("#gallery_title").val(),
				content : tempContent,
				tag : $("#kwrd").val(),
				img_file_nm : img_file_nm,
				param : jsonParam,
				iconParam : iconParam,
				teach_pwd : $("#teach_pwd").val(),
				open_yn : $(":input:radio[name=private]:checked").val(),
				*/
				var preViewHtml = "";
				preViewHtml += '    <div class="popup preview">                                                                   '   ;
				
				if( $(":input:radio[name=private]:checked").val() == "N" ){ //비공개시
					preViewHtml += '        <section class="sub view private">                                                        '   ;
				} else {
					preViewHtml += '        <section class="sub view">                                                        '   ;
				}
				
				
				preViewHtml += '            <div class="lnb">                                                                     '   ;
				preViewHtml += '                <h2 class="menuTi"><a>가르치는 지도</a></h2>                                        '    ;
				preViewHtml += '                <h3 class="lnbTi">' + $("#modifyTitle").val() + '</h3>                                    '   ;
				preViewHtml += '                <p>' + tempContent + '</p>                                           '    ;
				preViewHtml += '                <div class="hashTagWrap">                                                         '     ;
				preViewHtml += '                    ' + preViewTagHtml + '                                                '     ;
				
				preViewHtml += '                </div>                                                                             '     ;
				preViewHtml += '            </div>                                                                                 '     ;
				preViewHtml += '            <main>                                                                                 '     ;
				preViewHtml += '                <section class="flexWrap">                                                         '     ;
				preViewHtml += '                    <article class="mapWrap">                                                      '     ;
				preViewHtml += '                        <div style="text-align:center;max-width:100%;max-height:100%;" class="map">                                                          '     ;
				preViewHtml += '                            <img style="text-align:center;max-width:100%;max-height:100%;"  src="/upload/gallery/galleryView/'+ img_file_nm +'">                        '     ;
				
				
				if($collectionModify.selectIconList.length > 0 ){
					if( $collectionModify.removeIconFlag != 0 ) { //아이콘 삭제시 idx가 겹치는 문제 발생으로 flag처리함.
						for (var i=0; i<= $collectionModify.removeIconFlag +20; i++) {
							if( $collectionModify.selectIconList[i] != undefined && $collectionModify.selectIconList[i].seqId != undefined && $collectionModify.selectIconList[i].icon_type=="2"){
								if($("#ico_"+$collectionModify.selectIconList[i].seqId+" > div > textArea").val() != undefined){
									$collectionModify.selectIconList[i].exp = $("#ico_"+$collectionModify.selectIconList[i].seqId+" > div > textArea").val();
								}
							} else if($collectionModify.selectIconList[i] != undefined && $collectionModify.selectIconList[i].icon_id != undefined && $collectionModify.selectIconList[i].icon_type=="2"){
								if($("#ico_"+$collectionModify.selectIconList[i].icon_id+" > div > textArea").val() != undefined){
								    $collectionModify.selectIconList[i].exp = $("#ico_"+$collectionModify.selectIconList[i].icon_id+" > div > textArea").val();
								}
							} 
							
						}
					} else {
						for(var i = 0; i < $collectionModify.selectIconList.length;i++){
							if($collectionModify.selectIconList[i].icon_type=="2"){
								if($("#ico_"+i+" > div > textArea").val() != undefined){
									$collectionModify.selectIconList[i].exp = $("#ico_"+i+" > div > textArea").val();
								}
							}
						}
					}
					
				}
				
				var galleryImgIconListItem = $collectionModify.selectIconList[0];
				
				var icon_html = "";
				for(var i = 0; i < galleryImgIconListItem.length; i++) {
					var html ="";
					if("icon_stk01.png" == galleryImgIconListItem[i].icon_nm){
						html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor) ) +'%;left:'+Number(Number(galleryImgIconListItem[i].y_coor) )+'%">';
						html +='<img src="';
						html +="/sgis_edu/resource/images/img_stk01.png";
						html +='" style="width:28px;height:34px;" />';
						html +="</div>";
					} else if("icon_stk02.png" == galleryImgIconListItem[i].icon_nm){
							
						html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor) ) +'%;left:'+Number(Number(galleryImgIconListItem[i].y_coor) )+'%">';
						html +='<img src="';
						html +="/sgis_edu/resource/images/img_stk02.png";
						html +='" style="width:184px;height:153px;" />';
						html +="</div>";
					}else if("icon_stk03.png" == galleryImgIconListItem[i].icon_nm){
						html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor) ) +'%;left:'+Number(Number(galleryImgIconListItem[i].y_coor) )+'%">'
						html +='<div class="mal01" style="background-image: url(/sgis_edu/resource/images/img_stk03.png); width:215px; height:130px; padding:15px 15px 30px 15px;" >';
						
						if(galleryImgIconListItem[i].exp != undefined){
							html +='<textarea  style="background: none; border:none; width:100%; height:100%;" row=4 ">'+galleryImgIconListItem[i].exp+'</textarea></div>';
						}else{
							html +='<textarea  style="background: none; border:none; width:100%; height:100%;" row=4 ">'+''+'</textarea></div>';
						}
						html +='</div>';
					}
					icon_html = icon_html + html;
				}
				preViewHtml += icon_html;
				preViewHtml += '                        </div>                                                                     '     ;
				preViewHtml += '                    </article>                                                                     '     ;
				preViewHtml += '                </section>                                                                         '     ;
				preViewHtml += '            </main>                                                                                '     ;
				preViewHtml += '            <button type="button" class="btn btnClose" onclick="$(\'.preview\').removeClass(\'on\');">닫기</button>                                '    ;
				preViewHtml += '        </section>                                                                                 '     ;
				preViewHtml += '    </div>                                                                                         '     ;
				
				$("#preview_popup").html(preViewHtml);
				$(".preview").addClass("on");
				
				
				
				
				
				
			},
			
			
			removePollDetail : function(o){
				var delIdx = $(o).parents("li").eq(0).index();
				$('li[name="ansLi"]').eq(delIdx).remove();
				
				$collectionModify.selectSurvey.surveyList.splice(delIdx,1);
				
			},
			addPollDetail : function(){
				var html = "";
				html +='<li name="ansLi"><input type="text" name="ansDetail" placeholder="항목 입력" value=""/><a name="removePoll" href="javascript:void(0)" onclick="$collectionModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>';
				$(html).insertBefore("#surveyAdd_1");
				$("#surveyDetailUl").mCustomScrollbar('destroy');
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
			}
			
	
	};
	
	
	
	
}(window, document));