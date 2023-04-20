$(function() {
	$("body");
	scrollWidth();
	quickEvent();
	legendEvent();
	sideEvent();

	mapClick();
	linkTooltip();
	if ($(".jumSlide").length) {
		jumSlider();
	}
	//    if ($(".heatTable").length){
	//    	heatTable();
	//    }
	if ($(".popBox").length) {
		popClose();
	}
	//    if ($(".goganList").length){ 
	//    	lvSelect();
	//    	goganConfirm();
	//    } 
	if ($(".tabs.only").length) {
		userColorSetting();
	}
	if ($(".thematicCharts").length) {
		//    	thematicCharts(); 
	}

	popEvent();
	$(".etcPopScroll").mCustomScrollbar({ axis: "xy", advanced: { autoExpandHorizontalScroll: true } });
	$(".normalBox").mCustomScrollbar({ axis: "xy", advanced: { autoExpandHorizontalScroll: true } });
	$(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({ axis: "xy" });
	$(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({ axis: "xy" });

	//데이터보드를 미리 연다.

	Highcharts.setOptions({
		lang: {
			thousandsSep: ','
		}
	});

});

function mapClick() {
	var body = $("body");
	body.on("click", ".sop-interactive", function() {
		var ck = $(".interactiveDataBoard").hasClass("on");
		if (!ck) {
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({ "right": "0" }, 200);
			if (!full) {
				$(".interactiveDataBoard").addClass("on").stop().animate({ "right": "280px" }, 200);
			} else {
				$(".interactiveDataBoard").addClass("on").stop().animate({ "right": "670px" }, 200);
			}

		}
	});
}

function pvcCharts() {
	$('.pvContents>.charts').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			borderWidth: 0,
			align: 'right',
			verticalAlign: 'top',
			layout: 'vertical',
			x: 0,
			y: 50
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: "Brands",
			colorByPoint: true,
			data: [{
				name: "기업",
				y: 56.33
			}, {
				name: "쇼핑",
				y: 24.03
			}, {
				name: "음식점",
				y: 10.38
			}, {
				name: "생활/편의",
				y: 4.77
			}, {
				name: "교육",
				y: 0.91
			}]
		}]
	});
}

function popEvent() {
	$("body").on("click", ".hangjungArea .resizeIcon", function() {
		var cls = $(".hangjungArea");
		var ck = cls.hasClass("on");
		if (!ck) {
			cls.addClass("on");
		} else {
			cls.removeClass("on");
		}
	});
}

function popClose() {
	$("body").on("click", ".topbar>a, .hanClose", function() {
		$(this).parents(".popBox").eq(0).hide();
		var id = $(this).parents(".popBox").eq(0).attr("id");
		if (id == "guganSettingLayer") {
			$(".legendPopEvent").eq(0).removeClass("on");
			$(".JCLRgrips").remove();
			goganListResize();
		} else if (id == "colorSettingLayer") {
			$(".legendPopEvent").eq(1).removeClass("on");
		}
	});
}

function userColorSetting() {
	$("body").on("click", ".tabs .btnStyle01", function() {
		$(this).parents(".tabs").eq(0).find(".btnStyle01").removeClass("on");
		$(this).addClass("on");
	});
	$("body").on("click", ".tabs.only>a", function() {
		$("#colorSetting").hide();
		$(".colorSettingList01").css({ "width": "380px" });
		$(".colorbarBox>a").css("top", "-5000px");
		var inx = $(this).index(".tabs.only>a");
		if (inx == 0) {
			$("#colorSetting").show();
			legendColor("#666", "#890e4f", ".colorSettingList01", 10);
		} else if (inx == 1) {
			legendColor("#ff1b00", "#048cfc", ".colorSettingList01", 10);
		} else {
			$(".colorbarBox>a").css("top", "5px");
			$(".colorSettingList01").css({ "width": "300px" });
			legendColor("#193b70", "#00b051", ".colorSettingList01", 10);
		}
	});
	$('.colorbarBox>a').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });

	$('body').on('click', ".legendPopEvent", function() {
		var ck = $("#typeArea").attr("class");
		if (ck == "jum") {
			$("#jumSettingLayer").show();
		} else {
			var id = $(this).attr("data-id");
			$("#" + id).show();
			if (id == "guganSettingLayer") {
				goganListResize();
			}
		}
	});
	$('body').on('click', ".markerLib ul li a", function() {
		$(".markerLib ul li a").removeClass("on");
		$(this).addClass("on");
	});
	$('body').on('click', "#markerPopup", function() {
		$("#markerLibLayer").show();
	});
	$('body').on('click', ".markerList li a", function() {
		$(".markerList li a").removeClass("on");
		$(this).addClass("on");
		$(".jumMarkerLink").empty().html($(this).html());
	});
	$('body').on('click', ".opacityBox .colorck li a", function() {
		$(".jumColorLink").css("background", $(this).text());
	});

	$('.jumColorLink').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
	$('body').on('change sliderup sliderdown slidermove', ".jumColorLink", function() {
		$(".opacityBox .colorck li a.on").css("background", $(this).val()).text($(this).val());
	});
	$('body').on('change', "#opacitySel01", function() {
		var val = $(this).val();
		$("#colorSetting01").css("opacity", val);
	});
	$('body').on('change', "#opacitySel", function() {
		var val = $(this).val();
		$(".colorbarBox").css("opacity", val);
	});


	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fl", function() {
		var colorEnd = $(".colorbarBox>.fr").text();
		$(".colorbarBox>.fl").text($(this).val());
		legendColor(colorEnd, $(this).val(), ".colorSettingList01", 10);
	});
	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fr", function() {
		var colorStart = $(".colorbarBox>.fl").text();
		$(".colorbarBox>.fr").text($(this).val());
		legendColor($(this).val(), colorStart, ".colorSettingList01", 10);
	});
}

function heatTable() {
	$('.heatTable').wheelColorPicker({
		layout: 'block',
		format: 'css'
	});
	$('.heatTable').on('slidermove', function() {
		$('#color-label').text($(this).val());
	});
}

function jumSlider() {
	$(".jumSlide").slider({
		range: false,
		min: 0,
		max: 10,
		values: [10],
		slide: function(e, ui) { //ui.values[0]
			$("#typeArea .colorck>li>a").css({
				"width": parseInt(ui.values[0] + 7) + "px",
				"height": parseInt(ui.values[0] + 7) + "px",
				"margin-top": parseInt(10 - ui.values[0]) + "px"
			});
		}
	});
}
/*
function datePicker() {
	$(".date").datepicker({
		showOn: "button",
		buttonImage: "/img/ico/ico_calendar.png",
		buttonImageOnly: true,
		buttonText: "Select date"
	});
}

function clickAppend(selector, bgColor) {
	$(selector).append("<span class='mask'></span><span class='color'></span>");
	$(selector).children(".color").css("background-color", bgColor);
}

function clickListColor(bgColor) {
	var selector = ".sqListBox.sq03 .sqList ul li a.on .color";
	$(selector).animate({ "opacity": "1" }, 1500)
		.animate({ "opacity": ".5" }, 1500, null, clickListColor);
}

function clickAnimate(bgColor) {
	var selector = ".sqListBox.sq03 .sqList ul li a.on";
	clickAppend(selector, bgColor);
	clickListColor();
}

function dragAppend(selector, bgColor) {
	$(selector).css("background-color", bgColor);
	$(selector).append("<span class='mask'></span><span class='color'></span>");
}

function dragListColor() {
	var selector = ".sqListBox.sq03 .sqList ul li a.drag>.color";
	$(selector).animate({ "background-position-x": "260px" }, 1200)
		.animate({ "background-position-x": "0" }, 0, null, dragListColor);
}

function dragAnimate(bgColor) {
	var selector = ".sqListBox.sq03 .sqList ul li a.drag";
	dragAppend(selector, bgColor);
	dragListColor();
}

function colorck() {
	$(".colorck li").each(function(i) {
		var selector = $(this).children("a");
		selector.css("background", selector.text());
	});
	$("body").on("click", ".colorck li>a", function() {
		$(this).parents(".colorck").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		var id = $(this).parents(".colorck").eq(0).attr("id");
		var color = $(this).text();
		var listLegnth = $(".lvSelect").val();
		if (id == "colorSetting") {
			legendColor("#ccc", color, ".colorSettingList01", listLegnth);
		} else if (id == "legendColor") {
			legendColor("#ccc", color, ".colorbar", listLegnth);
			resizeColor("#ccc", color, ".goganList tr", listLegnth);
		}
		$(".JCLRgrips").remove();
		goganListResize();

	});
}

*/

function linkTooltip() {
	$("a").tooltip({
		open: function(event, ui) {
			$(".ui-tooltip .subj").text($(this).attr("data-subj"));
		},
		position: {
			my: "right-45 bottom-35",
			at: "center bottom",
			using: function(position, feedback) {
				$(this).css(position).prepend("<span class='subj'></span>");
				$("<div>")
					.addClass("arrow")
					.addClass(feedback.vertical)
					.addClass(feedback.horizontal)
					.appendTo(this);
			}
		}
	});
}

function stepCloseAnimate(inx) {
	var time = 300;
	var fx = '.quickBox';
	var btn = '.sideQuick.sq02';

	$(fx).queue("step03", function() {
		$(fx + '.step04').css({ "left": "-385px" });
		$(btn).stop().animate({ "left": "0px" }, time);
		$(fx + '.step03').animate({ "left": "-385px" }, time);
	});
	$(fx).queue("step02", function() {
		$(fx + '.step05' + fx + '.step04, ' + fx + '.step03').css({ "left": "80px" });
		$('.interactiveBar h3').animate({ "left": "0" }, 200);
		$(btn).stop().animate({ "left": "0" }, time);
		$(fx + '.step02').animate({ "left": "-385px" }, time);

	});
	$(fx).queue("step01", function() {
		$(fx + '.step02').css({ "left": "-385px" });
		$(btn).stop().animate({ "left": "0" }, time).removeClass("on");
		$('.interactiveBar h3').animate({ "left": "0" }, 200);
		$(fx + '.step01').animate({ "left": "-244px" }, time);
		$(btn).find("span").show();
		$(btn).css("width", "34px");
		$(".shadow").hide();
	});
	$(fx).dequeue("step0" + inx);
}


function scrollWidth() {
	var defaultSize = 0;
	$(".xWidth li").each(function(i) {
		var bigSize = $(this).find("label").width();
		if (defaultSize < bigSize) {
			defaultSize = bigSize;
			$(".xWidth").css("width", parseInt(defaultSize + 80) + "px");
		}
	});
}

function treeWidth() {
	$(".stepTreeBox").css("width", "230px");
	var stepWidth = $(".stepTreeBox>ul").prop("scrollWidth");
	$(".stepTreeBox").css({ "width": parseInt(stepWidth) + "px" });
	$(".normalBox").mCustomScrollbar("update");
}

function legendEvent() {
	var body = $("body");
	body.on("click", ".lgTypeList li a", function() {
		var cls = $(this).attr("data-type");
		$("#typeArea").removeClass().addClass(cls);
		var lv = $(".popBox .lvSelect").val();
		var color = $(".colorck li>a.on").css("background-color");
		legendColor("#ccc", color, ".colorbar", lv);
	});
	body.on("click", ".btn_legendSetting", function() {
		var on = $(this).hasClass("on");
		if (!on) {
			$(".lgListBox").stop().animate({ "left": "220px" }, 200);
			$(this).addClass("on");
		} else {
			$(".lgListBox").stop().animate({ "left": "-550px" }, 200);
			$(this).removeClass("on");
		}
	});
	var settingList = ".lgListBox>li>a";
	body.on("click", settingList, function() {
		var on = $(this).hasClass("on");
		if (!on) {
			$(this).prev("ul").show();
			$(this).addClass("on");
		} else {
			$(this).prev("ul").hide();
			$(this).removeClass("on");
		}
	});
	var optionList = ".lgListBox>li>ul>li>a";
	body.on("click", optionList, function() {
		var html = $(this).html();
		$(this).parents("ul").eq(0).siblings("a").empty().html(html).removeClass("on");
		$(this).parents("ul").eq(0).hide();
	});
	body.on("click", ".btn_legend", function() {
		var legendBox = $(".legendBox");
		var ing = legendBox.attr("data-ing");
		legendBox.removeClass(ing);
		$(".btn_legendSetting").removeClass("on");
		$(".lgListBox").stop().animate({ "left": "-550px" }, 200);
		if (ing == "hide") {
			legendBox.attr("data-ing", "min");
			legendBox.addClass("min");
		} else if (ing == "min") {
			legendBox.attr("data-ing", "max");
			legendBox.addClass("max");
		} else if (ing == "max") {
			legendBox.attr("data-ing", "hide");
			legendBox.addClass("hide");
		}

	});
	body.on("click", ".btnService", function() {
		var ck = $(this).hasClass("on");
		if (!ck) {
			$(this).addClass("on");
			$(".serviceLayer").show();
		} else {
			$(this).removeClass("on");
			$(".serviceLayer").hide();
		}
	});

}

function sideEvent() {
	var body = $("body");
	body.on("click", ".dscList dt>a", function() {
		var ck = $(this).hasClass("on");
		if (!ck) {
			$(this).addClass("on");
			$(this).parents("dt").next("dd").show();
		} else {
			$(this).removeClass("on");
			$(this).parents("dt").next("dd").hide();
		}
	});
	body.on("click", ".dataSideBox .bar>a", function() {
		$(".dataSideBox").stop().animate({ "right": "-1500px" }, 200);
		$(".colorMapLegend").stop().animate({ "right": "130px" }, 200);
		$(".interactiveDataBoard").removeClass("on").stop().animate({ "right": "0" }, 200);
	});
	body.on("click", ".interactiveDataBoard", function() {
		var ck = $(this).hasClass("on");
		if (!ck) {
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({ "right": "50" }, 200);
			$(".colorMapLegend").stop().animate({ "right": "610px" }, 200);
			if (!full) {
				$(this).addClass("on").stop().animate({ "right": "480px" }, 200);
			} else {
				$(this).addClass("on").stop().animate({ "right": "670px" }, 200);
			}

		} else {
			$(".dataSideBox").stop().animate({ "right": "-1500px" }, 200);
			$(".colorMapLegend").stop().animate({ "right": "130px" }, 200);
			$(this).removeClass("on").stop().animate({ "right": "0" }, 200);
		}
	});
	/* body.on("click", ".dataSideBox .bar>a", function() {
		 $(".dataSideBox").stop().animate({ "right": "-1500px" }, 200);
		 $(".interactiveDataBoard").removeClass("on").stop().animate({ "right": "0" }, 200);
	 });
	 body.on("click", ".interactiveDataBoard", function() {
		 var ck = $(this).hasClass("on");
		 if (!ck) {
			 var full = $(".dataSideBox").hasClass("full");
			 $(".dataSideBox").stop().animate({ "right": "0" }, 200);
			 if (!full) {
				 $(this).addClass("on").stop().animate({ "right": "426px" }, 200);
			 } else {
				 $(this).addClass("on").stop().animate({ "right": "670px" }, 200);
			 }

		 } else {
			 $(".dataSideBox").stop().animate({ "right": "-1500px" }, 200);
			 $(this).removeClass("on").stop().animate({ "right": "0" }, 200);
		 }
	 });*/
	$("#dataSlider").slider({
		range: "min",
		min: 5,
		max: 10,
		value: 10,
		slide: function(event, ui) { //ui.value
			//$(".interactiveSelect").text(ui.value*0.1);
			$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value * 0.1);
		}
	});
	$(".dataSideBox, .interactiveDataBoard").css("opacity", $("#dataSlider").slider("value"));


}

function quickEvent() {
	var body = $("body");
	body.on("click", ".sqTabs a", function() {
		$(".sqTabs a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click", ".sqdel", function() {
		$(this).parents("li").eq(0).remove();
	});
	body.on("click", ".rightQuick.rq01", function() {
		var on = $(this).hasClass("on");
		$(".rightQuick").removeClass("on");
		$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
		$(".rqListBox>li>a").removeClass("on");
		$(".rqListBox").stop().animate({ "right": "-550px" }, 200);
		if (!on) {
			$(this).next(".rqListBox").stop().animate({ "right": "45px" }, 200);
			$(this).addClass("on");
		} else {
			$(this).next(".rqListBox").stop().animate({ "right": "-550px" }, 200);
			$(this).removeClass("on");
		}
	});
	body.on("click", ".rightQuick.rq02", function() {
		var on = $(this).hasClass("on");
		$(".rightQuick").removeClass("on");
		$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
		$(".rqListBox>li>a").removeClass("on");
		$(".rqListBox").stop().animate({ "right": "-550px" }, 200);
		if (!on) {
			$(this).next(".rqListBox").stop().animate({ "right": "45px" }, 200);
			$(this).addClass("on");
		} else {
			$(this).next(".rqListBox").stop().animate({ "right": "-550px" }, 200);
			$(this).removeClass("on");
		}
	});

	var settingList = ".rqListBox a";
	body.on("click", ".rqListBox>li>a", function() {
		var on = $(this).hasClass("on");
		if (!on) {
			$(".rqListBox>li>a").removeClass("on");
			$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
			$(this).next("ul").show();
			$(this).next("ol").show();
			$(this).addClass("on");
		} else {
			$(this).next("ul").hide();
			$(this).next("ol").hide();
			$(this).removeClass("on");
		}
	});
	body.on("mouseover", settingList, function() {
		$(this).addClass("over");
	});
	body.on("mouseout", settingList, function() {
		$(this).removeClass("over");
	});
	var optionList = ".rqListBox>li>ul>li>a";
	body.on("click", optionList, function() {
		var val = $(this).html();
		$(this).parents("ul").eq(0).prev("a").empty().html(val).removeClass("on");
		$(this).parents("ul").eq(0).hide();
	});

	body.on("click", ".sideQuick.sq02", function() {
		var on = $(this).hasClass("on");
		if (!on) {
			$(".sideQuick.sq02").stop().animate({ "left": "0" }, 200);
			$(".quickBox.step01").stop().animate({ "left": "0" }, 200);
			$(".interactiveBar h3").stop().animate({ "left": "220px" }, 200);
			$(".shadow").hide();
			$(this).find("span").show();
			/*$(this).addClass("on").css("width","34px");*/
		} else {
			stepCloseAnimate(1);
			$(this).find("span").show();
			/*$(this).removeClass("on").css("width","34px");*/
		}
	});

	body.on("click", ".themul > li", function() {
		var on = $(this).hasClass("on");
		if (!on) {
			$(".quickBox.step01").stop().animate({ "left": "-244px" }, 200);
			$(".quickBox.step02").stop().animate({ "left": "80" }, 200);
			$(".interactiveBar h3").stop().animate({ "left": "348px" }, 200);
			$(".nav-sidebar").stop().animate({ "left": "0px" }, 200);
			$(".shadow").hide();
			$(this).find("span").show();
			/*$(this).addClass("on").css("width","34px");*/
		} else {
			stepCloseAnimate(1);
			$(this).find("span").show();
			/*	&(this).removeClass("on").css("width","34px");*/
		}
	});


	body.on("click", "a.roundTextBox", function() {
		var ck = $(this).hasClass("on");
		if (!ck) {
			$(this).addClass("on");
			$(this).children("input").prop("checked", true);
			$(this).next(".joinDefault").show();
		} else {
			$(this).removeClass("on");
			$(this).children("input").prop("checked", false);
			$(this).next(".joinDefault").hide();
		}
	});

	body.on("click", ".sqList #stat_sel a", function() {
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if ($(this).hasClass("on")) {
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");

		if ($("#selectValue").val() == "leftValue") {
			$("#selectValue").val("rightValue");
		} else {
			$("#selectValue").val("leftValue");
		}

	});




	body.on("click", ".sqList #region_boundary a", function() {



		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if ($(this).hasClass("on")) {
			return;
		}

		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");

		if ($(this).attr('id') == "autoRegion") {
			$("#selectValue2").val("auto");
		} else if ($(this).attr('id') == "sido") {
			$("#selectValue2").val("1");
		} else if ($(this).attr('id') == "sigungu") {
			$("#selectValue2").val("2");
		} else if ($(this).attr('id') == "eupmyundong") {
			$("#selectValue2").val("3");
		}

		//		if($(this).text()=="자동"){
		//			$("#selectValue2").val("auto");
		//			
		//		}else if($(this).text()=="시도"){
		//			$("#selectValue2").val("1");
		//			
		//		}else if($(this).text()=="시군구"){
		//			$("#selectValue2").val("2");
		//			
		//		}else if($(this).text()=="읍면동"){
		//			$("#selectValue2").val("3");
		//			
		//		}

	});

	body.on("click", ".sqList #map_type a", function() {
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if ($(this).hasClass("on")) {
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");

		if ($("#dataMode").val() == "color") {
			$("#dataMode").val("bubble");
		} else {
			$("#dataMode").val("color");
		}

	});

	body.on("click", ".sqList #data_type a", function() {
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if ($(this).hasClass("on")) {
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");

		if ($("#dataMode2").val() == "dataOff") {
			$("#dataMode2").val("dataOn");
		} else {
			$("#dataMode2").val("dataOff");
		}

	});


	body.on("click", ".sideQuick.sq03", function() {

		var on = $(this).hasClass("on");
		if (!on) {
			$(this).next(".sqListBox").stop().animate({ "left": "0px" }, 200);
			$(this).addClass("on");
		} else {
			$(this).next(".sqListBox").stop().animate({ "left": "-550px" }, 200);
			$(this).removeClass("on");
		}
	});
	/*quick step*/
	body.on("click", ".stepClose", function() {
		stepCloseAnimate(parseInt($(this).index(".stepClose") + 1));
		$(".interactiveBar h3").stop().animate({ "left": "0" }, 200);
		$(".nav-sidebar").stop().animate({ "left": "-80px" }, 200);
	});
	body.on("click", ".stepClose2", function() {
		$(".sideQuick.sq03").click();
	});

	body.on("click", ".normalBox .statul > li", function() {
		$(this).parent("li").index();
		$(this).parents("ul").eq(0).attr("class");
		$(".normalBox .statul >li ").removeClass("on");

		$(this).parent("li").addClass("on");
		$(".totalResult").hide();
		$(".nav-sidebar").show();
		/*
		if(qm=="qmIcon01"){
		//$(".totalResult.tr0"+parseInt(inx+1)).show();
		}else if(qm=="qmIcon02"){
		$(".totalResult.tr0"+parseInt(inx+5)).show();
		}else if(qm=="qmIcon03"){
		$(".totalResult.tr0"+parseInt(inx+6)).show();
		}else if(qm=="qmIcon04"){
		$(".totalResult.tr0"+parseInt(inx+7)).show();
		}


		$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
		$(".quickBox.step02").stop().animate({"left":"280px"},200);
		$(".quickBox.step03").stop().animate({"left":"0px"},200);
		$(".quickBox.step04").stop().animate({"left":"0px"},200);
		*/
	});

	body.on("click", ".tb_close", function() {
		$(this).hide();
		$(this).parents(".sceneBox").eq(0).removeClass("on").hide().insertAfter(".sceneBox:last");
		$(".resizeIcon").hide();
		var sceneInx = $(".sceneBox.on").length;
		if (sceneInx == 1) {
			$(".sceneBox").stop().animate({ "width": "100%" }, 200);
			$(".tb_close, .interactiveView").hide();
			$(".interactiveDataBoard").show();
		} else if (sceneInx == 2) {
			$(".sceneBox").stop().animate({ "width": "50%" }, 200);
			$(".sceneBox").draggable("destroy").resizable("destroy").css({ "position": "static", "border": "0", "height": "100%" });
		}
		$(".sceneRela").css({ "border-left": "5px solid #000" });
		$(".sceneRela").eq(0).css({ "border-left": "0" });
		$(".interactiveView").each(function(i) {
			$(this).text("VIEW" + parseInt(i + 1));
		});
	});

	body.on("click", ".step-option label", function() {
		var cls = $(this).parents("ul").eq(0).attr("class");
		if (cls != "dbTypeCk") {
			var ck = $(this).hasClass("on");
			if (!ck) {
				$(this).addClass("on");
			} else {
				$(this).removeClass("on");
			}
		}
	});

	body.on("click", ".stepBox label", function() {
		var cls = $(this).parents("ul").eq(0).attr("class");
		if (cls != "dbTypeCk") {
			var ck = $(this).hasClass("on");
			if (!ck) {
				$(this).addClass("on");
			} else {
				$(this).removeClass("on");
			}
		}
	});
	body.on("click", "a.roundTextBox", function() {
		var ck = $(this).hasClass("on");
		if (!ck) {
			$(this).addClass("on");
			$(this).children("input").prop("checked", true);
			$(this).next(".joinDefault").show();
		} else {
			$(this).removeClass("on");
			$(this).children("input").prop("checked", false);
			$(this).next(".joinDefault").hide();
		}
	});
	body.on("click", ".dbTypeCk label", function(e) {
		var ck = $(this).hasClass("on");
		if (ck == false) {
			$(".dbTypeCk label").removeClass("on");
			$(this).addClass("on");
			$(this).prev("input").eq(0).prop("checked", true);
		} else {
			$(this).removeClass("on");
			$(this).prev("input").eq(0).prop("checked", false);
		}

	});

	body.on("click", ".tb_radio .fl", function() {
		$(".tb_radio").css("background", "url(../../include/images/bg_tbradio_on.png)");
	});
	body.on("click", ".tb_radio .fr", function() {
		$(".tb_radio").css("background", "url(../../include/images/bg_tbradio_off.png)");
	});
	body.on("click", ".tb_sizing", function() {
		var ck = $(this).hasClass("on");
		if (!ck) {
			$(".tb_sizing").addClass("on");
			$(".tb_sizing").children().attr("src", "../../include/images/ico_toolbars12.png");
			$("header").css({ "height": "0px", "width": "100%" });
			$(".util, .gnb, #header .searchArea").hide();
			$(".gnb h1").css({ "height": "0px" });
			$(".gnb h1 img").hide();
			$(".containerBox").css({ "height": "calc(100% - 0px)", "top": "0px" });
		} else {
			$(".tb_sizing").removeClass("on");
			$(".tb_sizing").children().attr("src", "../../include/images/ico_toolbars01.png");
			$("header").css({ "height": "104px", "width": "100%" });
			$(".util, .gnb,  #header .searchArea").show();
			$(".gnb h1").css({ "height": "50px" });
			$(".gnb h1 img").show();
			$(".containerBox").css({ "height": "calc(100% - 102px)", "top": "102px" });
		}
	});

}