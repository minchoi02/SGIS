package kostat.sop.ServiceAPI.api.dt.gallerymanage.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: UPLOADData
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:08:22    
 * @version V1.0      
 *     
 */
@Component
public class GalleryManageDao extends SqlSessionDaoSupport {
	
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	
	public Map searchGallery(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("GalleryManage.searchGalleryCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("GalleryManage.searchGallery",paramMap));
		return resultMap;
	}
	
	public Success exclncGallery(Map paramMap) {
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if(paramMap.get("EXCELLENT_CASE_SLCTN_YN") != null && paramMap.get("EXCELLENT_CASE_SLCTN_YN").equals("Y")) {
			paramMap.put("EXCELLENT_CASE_SLCTN_YN", "N");
		} else if(paramMap.get("EXCELLENT_CASE_SLCTN_YN") != null && paramMap.get("EXCELLENT_CASE_SLCTN_YN").equals("N")) {
			paramMap.put("EXCELLENT_CASE_SLCTN_YN", "Y");
		}
		if((int)getSqlSession().update("GalleryManage.exclncGallery", paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public Success dispYnGallery(Map paramMap) {
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int)getSqlSession().update("GalleryManage.dispYnGallery", paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
//	public Map getGallery(String DATA_ID) {
//		Map resultMap = new HashMap();
//		Map galleyMap = (Map) getSqlSession().selectOne("GalleryManage.getGallery", DATA_ID); //갤러리 상세조회
//		resultMap.put("galleyMap", galleyMap);
////			resultMap.put("file", getSqlSession().selectOne("GalleryManage.getGalleryImg", DATA_ID)); //갤러리 이미지 조회
//		Map getGalleryPoll = (Map) getSqlSession().selectOne("GalleryManage.getGalleryPoll", DATA_ID); //갤러리 상세조회
//		resultMap.put("getGalleryPoll", getGalleryPoll);
//		
//		
//		return resultMap;
//	}
	
	public Map getGallery(Map paramMap) {
		Map resultMap = new HashMap();
		
		Map galleyMap = (Map) getSqlSession().selectOne("GalleryManage.getGallery",paramMap);
		
		resultMap.put("galleryMap", galleyMap);
		resultMap.put("galleyImgMap", getSqlSession().selectList("GalleryManage.selectGalleryImg",paramMap));
		resultMap.put("galleyPollList", getSqlSession().selectList("GalleryManage.getGalleryPoll",paramMap));
		resultMap.put("galleyReplyList", getSqlSession().selectList("GalleryManage.selectGalleryReplyList",paramMap));
		
		return resultMap;
	}
	
	public Map getGalleryImgIconList(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("galleyImgIconList", getSqlSession().selectList("GalleryManage.selectGalleryImgIcon",paramMap));
		return resultMap;
	}
}
