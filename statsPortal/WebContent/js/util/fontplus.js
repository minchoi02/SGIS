(function (W, $) {
	'use strict';
	
	W.$fontplus = W.$fontplus || {};
	
	$fontplus = {
		fontzoom : 0
	};
	
	$(document).ready(function() {
		
		if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad|)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
			var browserName = "IE";
			
			if (/Chrome/.test(navigator.userAgent)) {
				browserName = "Chrome";
			}
		}
		
		if( $("#fontplusbtn").length > 0 ){
			console.log('=================1');
			var btnhtml = '';
			btnhtml += '<div style="width:100%;height:30px;">';
			btnhtml += '	<div style="float: right;">';
			btnhtml += '		<span style="font-family: \'Nanum Square Bold\'; font-size:20px; color:#222; display: inline-block; vertical-align: middle; line-height: 30px;">글자크기</span>&nbsp;';
			//mng_s 20210616 이진호, 웹 접근성 오류 수정 / alt 추가
			btnhtml += '		<img id="fontminus" src="/img/statsPotal/ico_mius.png" style="cursor:pointer; outline:none;" alt="축소">';
			btnhtml += '		<img id="fontzero" src="/img/statsPotal/ico_zero.png" style="cursor:pointer; outline:none;" alt="복구"> ';
			btnhtml += '		<img id="fontplus" src="/img/statsPotal/ico_plus.png" style="cursor:pointer; outline:none; alt="확대"> ';
			//mng_e 20210616 이진호
			btnhtml += '	</div>';
			btnhtml += '</div>';
			
			$("#fontplusbtn").html( btnhtml );
		} else {
			console.log('=================2');
			var btnhtml = '';
			btnhtml += '<div id="fontplusbtn">';
			btnhtml += '<div style="width:100%;height:30px;">';
			btnhtml += '	<div style="float: right;">';
			btnhtml += '		<span style="font-family: \'Nanum Square Bold\'; font-size:20px; color:#222; display: inline-block; vertical-align: middle; line-height: 30px;">글자크기</span>&nbsp;';
			//mng_s 20210616 이진호, 웹 접근성 오류 수정 / alt 추가
			btnhtml += '		<img id="fontminus" src="/img/statsPotal/ico_mius.png" style="cursor:pointer; outline:none;height:30px;width:31px;margin-top:0px;" alt="축소">';
			btnhtml += '		<img id="fontzero" src="/img/statsPotal/ico_zero.png" style="cursor:pointer; outline:none;height:30px;width:31px;margin-top:0px;" alt="복구"> ';
			btnhtml += '		<img id="fontplus" src="/img/statsPotal/ico_plus.png" style="cursor:pointer; outline:none;height:30px;width:31px;margin-top:0px;" alt="확대"> ';
			//mng_e 20210616 이진호
			btnhtml += '	</div>';
			btnhtml += '</div>';
			btnhtml += '</div>';
			
			console.log("????????????????");
			$(".contentsWrap h1").eq(0).append( btnhtml );
			
			$fontplus.item = $(".contents h2:not('.Type_4'), table th, table td, .contents h2 a, .contents li, " +
					".contents span:not('#fontplusbtn span'), figcaption, .mapSiteContents li a").not('.mapSiteTitle span');
		}
		
		$("#fontplus").click(function(){
			if( $fontplus.fontzoom < 9 ){	//9번 클릭 가능
				$fontplus.fontzoom ++;
				
				console.log('plus >>' , $fontplus.fontzoom );
				
				$.each( $fontplus.item, function( idx, item ){
					var fontsize = $( item ).css('fontSize');
					fontsize = ( fontsize ? Number( fontsize.replace('px', '') )+2 : '16' );
					$( item ).css('fontSize', fontsize+'px');
					
					if( $fontplus.box && $fontplus.fontzoom > 0 ){
						$fontplus.box.css('overflow-y', 'scroll');
					}
					
					var lineheight = $( item ).css('line-height');
					lineheight = ( lineheight ? Number( lineheight.replace('px', '') )+2 : '24' );
					$( item ).css('line-height', lineheight+'px');
				});
			}
		});
		
		$("#fontzero").click(function(){
			console.log('zero >>' , $fontplus.fontzoom );
			
			$.each( $fontplus.item, function( idx, item ){
				var fontsize = $( item ).css('fontSize');
				fontsize = ( fontsize ? Number( fontsize.replace('px', '') ) : '14' );
				fontsize =  Math.abs( fontsize -( 2 * ( $fontplus.fontzoom ) ) );
				console.log('fontsize', fontsize);
				console.log('$fontplus.fontzoom', $fontplus.fontzoom);
				
				
				$( item ).css('fontSize', fontsize+'px');
				
				if( $fontplus.box ){
					$fontplus.box.css('overflow-y', '');
				}
				
				var lineheight = $( item ).css('line-height');
				lineheight = ( lineheight ? Number( lineheight.replace('px', '') ) : '22' );
				lineheight = Math.abs( lineheight - ( 2 * ( $fontplus.fontzoom ) ) );
				$( item ).css('line-height', lineheight+'px');
			});
			
			$fontplus.fontzoom = 0;
		});
		
		$("#fontminus").click(function(){
			
			console.log('minus >>' , $fontplus.fontzoom );
			
			if( $fontplus.fontzoom > -2 ){
				$fontplus.fontzoom = ( $fontplus.fontzoom == 0 ? -1 : $fontplus.fontzoom-1 );
				
				$.each( $fontplus.item, function( idx, item ){
					var fontsize = $( item ).css('fontSize');
					fontsize = ( fontsize ? Number( fontsize.replace('px', '') )-2 : '12' );
					$( item ).css('fontSize', fontsize+'px');
					
					if( $fontplus.box && $fontplus.fontzoom < 1 ){
						$fontplus.box.css('overflow-y', '');
					}
					
					var lineheight = $( item ).css('line-height');
					lineheight = ( lineheight ? Number( lineheight.replace('px', '') )-2 : '20' );
					$( item ).css('line-height', lineheight+'px');
				});
			}
		});
		
//		$("#fontplus").click(function(){
//			if( $fontplus.item ){
//				var zoom = $fontplus.item.css('zoom');
//				zoom = Math.floor( Number( ( zoom == 'normal' || zoom == 1 ) ? '100' : ( browserName === 'Chrome' ? 
//						Number(zoom.replace('%',''))*100 : Number(zoom.replace('%','')) ) ) );
//				
//				console.log('zoom', zoom);
//				if( zoom <= 190 ){
//					if( $fontplus.box && zoom >= 100 ){
//						$fontplus.box.css('overflow-y', 'scroll');
//					}
//					
//					$fontplus.item.css('zoom', (zoom+10)+'%' );
//				}
//			}
//		});
//		
//		$("#fontzero").click(function(){
//			if( $fontplus.item ){
//				
//				if( $fontplus.box ){
//					$fontplus.box.css('overflow-y', '');
//				}
//				$fontplus.item.css('zoom', '100%' );
//			}
//		});
//		
//		$("#fontminus").click(function(){
//			if( $fontplus.item ){
//				var zoom = $fontplus.item.css('zoom');
//				zoom = Math.floor( Number( ( zoom == 'normal' || zoom == 1 ) ? '100' : ( browserName === 'Chrome' ? 
//						Number(zoom.replace('%',''))*100 : Number(zoom.replace('%','')) ) ) );
//				
//				console.log('zoom', zoom);
//				if( zoom >= 80 ){
//					if( $fontplus.box && zoom == 110 ){
//						$fontplus.box.css('overflow-y', '');
//					}
//					$fontplus.item.css('zoom', (zoom-10)+'%' );
//				}
//			}
//		});
		
	});
	
})(window, jQuery);
