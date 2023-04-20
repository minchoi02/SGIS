(function(W, D) {

	W.contents = W.contents || {};
	
	$(document).ready(function() {
		
		contents.makeSchoolGradeCd();
		srvLogWrite('T0','02','04','02',contents.schoolGradeCd,'contents_id='+contents.contentsId);
		contents.makeContents();

	});

	contents = {
		themaId : null,
		contentsId : new URL(window.location.href).searchParams.get("contents_id"),
		schoolGrade : $("#school_grade").val() ,
		schoolGradeCd : null,
		// 콘텐츠 상세 정보
		makeContents : function () {
			var html = "";
			$.ajax({
				url: '/ServiceAPI/edu/eduContents.json',
				type: 'GET',
				data: {'contents_id': contents.contentsId} ,
				dataType: 'json'
			}).success(function(res){
				
				//콘텐츠 정보 
				$(".menuTi").html("<a href='/view/edu/"+contents.schoolGrade+"/issueList?issue_id="+res.result.contents.issue_id+"'>"+res.result.contents.issue_nm+"</a>");
				$("#contentsExp").text(res.result.contents.contents_exp);
				//$("#bodyTitle").text(res.result.contents.body_title);
				//$("#bodyCn").html(res.result.contents.body_cn);
				$(".lnbTi").text(res.result.contents.contents_title);
				contents.recommendList = res.result.recommendContents;

				// load된 jsp 페이지가 없을 경우 썸네일 이미지로 배경 바꿈 
				$(".slideBox").load("/view/edu/contents/body/"+contents.contentsId, function(response, status, xhr){
					if(status == "error"){
						console.log("error");
						$(".slideBox").css("background", 'url("'+res.result.contents.body_file_nm+'")');
						$(".slideBox").css("background-size", '100%');
					}else{
						$('main .slideBox').slick({
						    dots: true,
						    infinite: false,
						    speed: 300,
						    prevArrow : $(".btnPage02.prev"),
						    nextArrow : $(".btnPage02.next"),
						    slidesToShow: 1,
						    adaptiveHeight: false,
						    dotsClass:'naviSlide'
						});
						$(".overEvent").click(function(e){
							$(this).children(".tooltip").toggleClass("on");
						})
						
						$(".clickEvent").click(function(e){
							$(this).children(".clickImg").toggleClass("on");
						})
						//$(".imgTi").text(res.result.contents.body_title);
					}
				});
				
				//콘텐츠 sgis 활용하기 
				if("" != res.result.contents.link_sgis && null != res.result.contents.link_sgis){
					$("#sgisExp").css("display","inline-block");
					$("#popupSgis").load(res.result.contents.link_sgis);
				}else{
					$("#sgisExp").css("display","none");
				}
				
				//콘텐츠 랜덤 퀴즈 
				if("" != res.result.quiz && null != res.result.quiz){
					$("#question").text(res.result.quiz.quiz_que); //질문
					$(".quizCn").html(res.result.quiz.quiz_exp); //설명
					//콘텐츠 퀴즈 보기 
					$(".opt1").text(res.result.quiz.quiz_optn_1);
					$(".opt2").text(res.result.quiz.quiz_optn_2);
					$(".opt3").text(res.result.quiz.quiz_optn_3);
					$(".opt4").text(res.result.quiz.quiz_optn_4);
					
					//객관식 정답
					switch(res.result.quiz.quiz_ans){
					case '1' : 
						$(".opt1").attr("onclick", "incorrect()");
						break;
					case '2' : 
						$(".opt2").attr("onclick", "incorrect()");
						break;
					case '3' : 
						$(".opt3").attr("onclick", "incorrect()");
						break;
					case '4' : 
						$(".opt4").attr("onclick", "incorrect()");
						break;	
					}
					
					//퀴즈 설명 유무
					if("" != res.result.quiz.exp_file_nm && null != res.result.quiz.exp_file_nm){
						$(".quizExpImg").attr("src", res.result.quiz.exp_file_nm); //설명 이미지 파일
						$(".quizExpImg").css("display", "block");
						$(".exp").toggleClass("imgTrue");
					}
				//퀴즈없을때 
				}else {
					//다음 콘텐츠 있을 때
					if("" != res.result.nextContents && null != res.result.nextContents){
						$(".btnPage01.next").attr('href', '/view/edu/high/classDetail?contents_id='+res.result.nextContents.contents_id );
						$('.btnPage01.next i').text('다음 스토리');
					}else{
						$(".btnPage01.next").css("display",'none');
					}
				}
				
				//IS_07 통계이야기 일 때 (퀴즈, 다음콘텐츠 이동 미표시)
				if("IS_07" == res.result.contents.issue_id ){
					$(".btnPage01.next").css("display",'none');
				}
				
				
				//해시태그 
				$.each(res.result.tagList, function(i, val){
					html = "<i class='hashTag'>"+val.kwrd+"</i>";
					$("#contentsHashTagWrap").append(html);
				})
				
				
			}).fail(function(res){
				console.log(res);
			})
		},
		
		makeContentsHashTagList : function () {
			for(i = 0 ; i < contents.recommendList.length ; i++){
				var contents_id =  contents.recommendList[i].contents_id;
				var html = "";
				$.ajax({
					url: '/ServiceAPI/edu/eduContentsHashtag.json',
					type: 'POST',
					data: {'contents_id' : contents.recommendList[i].contents_id},
					dataType: 'json'
				}).success(function(res){
					html = "";
					$.each(res.result.resultList, function(j, val){
						html = "<i class='hashTag'>"+val.kwrd+"</i>";
						$("#tag_"+val.contents_id).append(html);
					});
				}).fail(function(res){
					console.log(res);
				})
			}
		},
		//학교등급 코드 생성
		makeSchoolGradeCd : function () {
			if("ele" == $("#school_grade").val()){ contents.schoolGradeCd = 'E';
			}else if("mid" == $("#school_grade").val()){ contents.schoolGradeCd = 'M';
			}else if("high" == $("#school_grade").val()){ contents.schoolGradeCd = 'H';
			}
		}
	};
	
}(window, document));



function detailExp(){
    $(".detailExp").addClass("on");
    $('.detailExp .slideBox').slick(
    	    "unslick"
	);
    
    $('.detailExp .slideBox').slick({
	    dots: true,
	    infinite: false,
	    speed: 300,
	    prevArrow : $(".detailExp .btnPage02.prev"),
	    nextArrow : $(".detailExp .btnPage02.next"),
	    slidesToShow: 1,
	    adaptiveHeight: false,
	    dotsClass:'naviSlide'
	});
}
function sgisExp(){
	
	srvLogWrite('T0','02','04','03',contents.schoolGradeCd,'contents_id='+contents.contentsId);

	$(".sgisExp").addClass("on");
    $('.sgisExp .slideBox').slick(
    	    "unslick"
	);
    
    $('.sgisExp .slideBox').slick({
	    dots: true,
	    infinite: false,
	    speed: 300,
	    prevArrow : $(".sgisExp .btnPage02.prev"),
	    nextArrow : $(".sgisExp .btnPage02.next"),
	    slidesToShow: 1,
	    adaptiveHeight: false,
	    dotsClass:'naviSlide'
	});
}
function quiz(){
	srvLogWrite('T0','02','04','04',contents.schoolGradeCd,'contents_id='+contents.contentsId);
	
    $(".quiz").addClass("on");
    $(".incrt").removeClass("on");
    $(".wrong").removeClass("on");
    $(".btnWrap").removeClass("on");
}
function incorrect(){
	$(".incrt").removeClass("on");
	$(".wrong").removeClass("on");
    $(".incrt").addClass("on");
    $(".btnWrap").addClass("on");
}

function wrong1(){
	$(".wrong").removeClass("on");
	$(".incrt").removeClass("on");
	$(".wrong.a1").addClass("on");
    $(".btnWrap").addClass("on");
}

function wrong2(){
	$(".wrong").removeClass("on");
	$(".incrt").removeClass("on");
	$(".wrong.a2").addClass("on");
    $(".btnWrap").addClass("on");
}

function wrong3(){
	$(".wrong").removeClass("on");
	$(".incrt").removeClass("on");
	$(".wrong.a3").addClass("on");
    $(".btnWrap").addClass("on");
}

function wrong4(){
	$(".wrong").removeClass("on");
	$(".incrt").removeClass("on");
	$(".wrong.a4").addClass("on");
    $(".btnWrap").addClass("on");
}