/**
 * gallery API 
 * history : 네이버시스템(주), 1.0, 2016/08/29  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 */

(function(W,D){
	W.$galleryApi = W.$galleryApi || {};
	
	$galleryApi.request = {
	};
	
	
	(function() {
		$class("sop.portal.getImgIconList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status,res){
				if(res.errCd =="0"){
					var result = res.result;
					
					$collectionModify.selectIconList = result;

					$collectionModify.targetIconArray = $collectionModify.selectIconList[$collectionModify.selectImgIdx];
					$collectionModify.selectShowImage($collectionModify.selectImgIdx);

				}
			},
			onFail : function(status){
				
			}
		});
	}());
	
	(function() {	
		$class("sop.portal.modifyUpdateDataSave.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status,res){
				/*collectionGallery.selectGalleryList();*/
				$collectionModify.that.selectGalleryList();
				$collectionModify.that.selectGalleryAllCountList(); //2017.03.24 조회수 수정
				$(".rightClose").trigger("click");
			},
			onFail : function(status){
				
			}
		});
		
	}());
	
	
	(function(){
		$class("sop.portal.collectionBookMarkList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				switch(parseInt(res.errCd)){
					case 0 : 
						/*
						 * 	hist_id : "5uIHoEqMGo20160902145104676MHwtnIGCzL"
							hist_nm : "사업체수"
							hist_type : "BMARK"
							map_type : "IMAP"
							member_id : "choijy"
							reg_ts : "2016-09-02 14:42:07.4976"
						 * */
						
						/*
						 * <tr>
								<td><img src="/img/pic/pic_testmap02.jpg" width="30"
										height="20" /></td>
								<td class="al"><a href="javascript:void(0)" class="gwon02"
										onclick="galleryItemAdd('경기도-65세 남자인구')">경기도-65세 남자인구</a></td>
								<td>2016.08.12</td>
							</tr>
								
						 * */
						$("#bookMarkList >tbody> tr").html('');
						var resList = res.result.resultList;
						for(var i = 0 ; i < resList.length; i++ ){
							var object = resList[i];
							var html = "<tr>";
							/*html +='<td><img src="/img/pic/pic_testmap02.jpg" width="30" height="20" /></td>';*/
							html +='<td><img src="/upload/gallery/galleryView/'+$.trim(object.hist_id)+'.png" onerror="/img/pic/pic_testmap02.jpg" width="30" height="20" /></td>';
							html +='<td class="al"><a href="javascript:void(0)" class="gwon02" onclick="$collectionModify.galleryItemAdd(\''+object.hist_nm+'\',\''+object.hist_id+'\')">'+object.hist_nm+'</a></td>'
							html +='<td>'+object.reg_ts.substring(0,4)+'.'+object.reg_ts.substring(5,7)+'.'+object.reg_ts.substring(8,10)+'</td>';
							html +='</tr>';
							$("#bookMarkList > tbody").append(html);
						}
						
						
						break;
					case -401 : 
						break;
					case -100 : 
						break;
					default : 
						break;
				}
			},
			onFail : function(status,option){
				
			}
		})
	}());
	
}(window, document));

function galleryView( dataId, viewPlus ){
	var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	sopPortalGalleryViewObj.addParam( "data_id", dataId );
	if( viewPlus ){
		sopPortalGalleryViewObj.addParam( "viewPlus", true );
	}
	sopPortalGalleryViewObj.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/gallery/galleryView.json"
	});
}
