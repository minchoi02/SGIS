package kostat.sop.ServiceAPI.api.dt.communitymanage.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: CommunityManageDao
 * @Description： 
 *
 * @author kwangheum   
 * @date：2015年11月23日    
 * @version V1.0      
 *     
 */
@Component
public class CommunityManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchCommunityMapList(Map paramMap) {	
		this.hasDate(paramMap);
		Map resultMap = new HashMap();
		resultMap.put("total", (int) getSqlSession().selectOne("CommunityManage.selectCmmntyCount",paramMap));
		List<HashMap<String,Object>> rows = getSqlSession().selectList("CommunityManage.selectCmmntyList",paramMap);
		Iterator<HashMap<String,Object>> iter = rows.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			HashMap<String,Object> param = new HashMap<String,Object>();
			param.put("cmmnty_map_id", data.get("CMMNTY_MAP_ID"));
			param.put("bnd_year", paramMap.get("bnd_year"));
			List<HashMap<String,Object>> add_region_list = getSqlSession().selectList("CommunityManage.selectCmmntyMapAddRegion",param);
			data.put("ADD_REGION_LIST",add_region_list);
		}
		resultMap.put("rows", rows);
		return resultMap;
	}
	public Map searchCommunityMapPoiList(Map paramMap) {	
		this.hasDate(paramMap);
		Map resultMap = new HashMap();
		resultMap.put("total", (int) getSqlSession().selectOne("CommunityManage.selectCmmntyPoiCount",paramMap));
		List<HashMap<String,Object>> rows = getSqlSession().selectList("CommunityManage.selectCmmntyPoiList",paramMap);
		List<HashMap<String,Object>> fileList = getSqlSession().selectList("CommunityManage.selectPoiAtchImageListForCommunity", rows);
		Iterator<HashMap<String,Object>> summaryIter = rows.iterator();
		while(summaryIter.hasNext()){
			HashMap<String,Object> summary = summaryIter.next();
			Iterator<HashMap<String,Object>> fileIter = fileList.iterator();
			List<HashMap<String,Object>> putFileList = new ArrayList<HashMap<String,Object>>();
			while(fileIter.hasNext()){
				HashMap<String,Object> file = fileIter.next();
				if(summary.get("CMMNTY_POI_ID").equals(file.get("CMMNTY_POI_ID"))){
					putFileList.add(file);
				}
			}
			summary.put("FILE_LIST", putFileList);
			fileList.removeAll(putFileList);
		}
		resultMap.put("rows", rows);
		return resultMap;
	}
	public Map getCommunityMapStatList(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("statList", getSqlSession().selectList("CommunityManage.selectMapList",paramMap));
		return resultMap;
	}
	public Map getCommunityMapReplyList(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("replyList", getSqlSession().selectList("CommunityManage.selectPoiReplyList",paramMap));
		return resultMap;
	}
	public Success updateCommunityMap(Map paramMap) {	
		boolean updateHotOrderFlag = false;
		if(!StringUtils.isEmpty(paramMap.get("HOT_ORDER"))) {
			updateHotOrderFlag = true;
		}
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if(this.validateDate(paramMap)){
			if((int) getSqlSession().update("CommunityManage.updateCommunityMap",paramMap) > 0){
				if(paramMap.get("CMMNTY_MAP_LOCK_YN").equals("Y") || updateHotOrderFlag) getSqlSession().delete("CommunityManage.deleteCommunityHotOrder", paramMap);
				if(!(paramMap.get("CMMNTY_MAP_LOCK_YN").equals("Y")) && updateHotOrderFlag)	{
					getSqlSession().insert("CommunityManage.insertCommunityHotOrder",paramMap); // hot_order값이 넘어올 때 update (hot_cmmnty_map)
				}
				
				success.setSuccess(true);
				success.setMsg(Prompt.UPDATESUCCESS);
			}
		}
		return success;
	}
	public Success updateCommunityMapPoiDel(Map paramMap) {	
		Success success = new Success(false,Prompt.UPDATEFAIL);
		getSqlSession().delete("CommunityManage.deletePoiSttemnt",paramMap);//신고 목록 삭제
		getSqlSession().delete("CommunityManage.deletePoiImags",paramMap);//이미지 삭제
		getSqlSession().delete("CommunityManage.deletePoiReplys",paramMap);//댓글 삭제
		if((int) getSqlSession().delete("CommunityManage.deleteCommunityMapPoi",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	private boolean validateDate(String str){
		String regex = "\\d{4}-\\d{2}-\\d{2}";
		return str.matches(regex);
	}
	private boolean validateDate(Map paramMap){
		boolean result = true;
		boolean hasStartDate = false;
		boolean hasEndDate = false;
		String errorMessage = " 날짜의 형식이 잘못되었습니다";
		if(paramMap.get("STARTDATE")!=null){
			if(!this.validateDate(paramMap.get("STARTDATE").toString())){
				result = false;
				throw new ApiException("시작"+errorMessage);
			} else {
				hasStartDate = true;
			}
		}
		if(paramMap.get("ENDDATE")!=null){
			if(!this.validateDate(paramMap.get("ENDDATE").toString())){
				result = false;
				throw new ApiException("종료"+errorMessage);
			} else {
				hasEndDate = true;
			}
		}
		if(result&&hasStartDate&&hasEndDate){
			String STARTDATE = paramMap.get("STARTDATE").toString().replaceAll("-", "");
			String ENDDATE = paramMap.get("ENDDATE").toString().replaceAll("-", "");
			if(Integer.parseInt(STARTDATE)>Integer.parseInt(ENDDATE)){
				result = false;
				throw new ApiException("시작날짜가 종료날짜보다 클 수 없습니다");
			}
			paramMap.put("STARTDATE", STARTDATE);
			paramMap.put("ENDDATE", ENDDATE);
		}
		return result;
	}
	private void hasDate(Map paramMap){
		if(paramMap.get("STARTDATE")!=null||paramMap.get("ENDDATE")!=null){
			this.validateDate(paramMap);
		}
	}
}
