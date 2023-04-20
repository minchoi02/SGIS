package kostat.sop.ServiceAPI.api.mb.member.mapper;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: MemberManageDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月28日 下午3:17:59    
 * @version V1.0      
 *    
 */
@Component
public class MemberDao extends SqlSessionDaoSupport {
	HttpServletRequest request;
	
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}	
	public Map searchMember(Map paramMap, String ip) {
		Map resultMap =  new HashMap();
		resultMap.put("rows", getSqlSession().selectList("Member.searchMember",paramMap));
		resultMap.put("total", (int)getSqlSession().selectOne("Member.searchMemberCount",paramMap));
		addAccessHist(getHistMap(paramMap, "-", "열람", "회원목록", ip));
		return resultMap;
	}
	public Map getMemberCNT() {
		Map paramMap = new HashMap();
		Map resultMap = new HashMap();
		int totalCNT = (int)getSqlSession().selectOne("Member.getMemberCNT",paramMap);
		paramMap.put("MEMBER_GRADE", "GM");
		int gmCNT = (int)getSqlSession().selectOne("Member.getMemberCNT",paramMap);
		paramMap.put("MEMBER_GRADE", "PM");
		int pmCNT = (int)getSqlSession().selectOne("Member.getMemberCNT",paramMap);
		paramMap.put("MEMBER_GRADE", "MM");
		int mmCNT = (int)getSqlSession().selectOne("Member.getMemberCNT",paramMap);
		paramMap.put("LOGIN_LIMIT_YN", "Y"); //Y제한 N 미제한
		int limitCNT = (int)getSqlSession().selectOne("Member.getMemberCNT",paramMap);
		//int pmCNT = totalCNT - gmCNT;
		resultMap.put("totalCNT", totalCNT);
		resultMap.put("gmCNT", gmCNT);
		resultMap.put("pmCNT", pmCNT);
		resultMap.put("mmCNT", mmCNT);
		resultMap.put("limitCNT", limitCNT);
		return resultMap;
	}
	public Success deleteMember(Map paramMap,String ip) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		String [] MEMBER_ID_LIST = paramMap.get("MEMBER_ID_LIST").toString().split(",");
		if(getSqlSession().delete("Member.deleteMember",MEMBER_ID_LIST) > 0){
			for (String string : MEMBER_ID_LIST) {
				addAccessHist(getHistMap(paramMap, string, "삭제", "회원삭제",ip));
			}
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public Map getMemberInfo(Map paramMap,String ip){
		addAccessHist(getHistMap(paramMap, paramMap.get("MEMBER_ID").toString(), "열람", "상세정보",ip));
		Map memberInfoMap = (Map) getSqlSession().selectOne("Member.getMemberInfo",paramMap.get("MEMBER_ID").toString());
		try {
			String CP_NO = (String) memberInfoMap.get("CP_NO");
			String EMAIL = (String) memberInfoMap.get("EMAIL");
			/*String BIRTH = (String) memberInfoMap.get("BIRTH");
			if(BIRTH != null ){
				memberInfoMap.remove("BIRTH");
				memberInfoMap.put("BIRTH", SecureDB.decryptAria256(BIRTH));
			} */
			if(CP_NO != null ){
				memberInfoMap.remove("CP_NO");
				memberInfoMap.put("CP_NO", SecureDB.decryptAria256(CP_NO));		
			} 
			if(EMAIL != null ){
				memberInfoMap.remove("EMAIL");
				memberInfoMap.put("EMAIL", SecureDB.decryptAria256(EMAIL));
			} 
		} catch (NullPointerException e) {
			throw new ApiException("파라미터 값이 없습니다.");
		} catch (Exception e) {
			throw new ApiException("DECRYPT ERROR.");
		}
		return memberInfoMap;
	}
	public Success updateMemberInfo(Map paramMap, String ip) {
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("Member.updateMemberInfo",paramMap) >0){
			String ACCESS_HIST_DET = "";
			if(paramMap.get("MEMBER_GRADE") != null) ACCESS_HIST_DET+="회원등급,";
			if(paramMap.get("LOGIN_LIMIT_YN") != null) ACCESS_HIST_DET+="회원상태,";
			if(paramMap.get("PW_FAIL_CNT") != null) ACCESS_HIST_DET+="비밀번호 실패횟수,";
			addAccessHist(getHistMap(paramMap, paramMap.get("MEMBER_ID").toString(), "수정", ACCESS_HIST_DET.substring(0,ACCESS_HIST_DET.lastIndexOf(",")),ip));
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	private void addAccessHist(Map histMap){
		getSqlSession().insert("Member.addAccessHist",histMap);
	}
	private Map getHistMap(Map paramMap,String MEMBER_ID,String ACCESS_HIST_DIV,String ACCESS_HIST_DET, String ip){
		Map histMap = new HashMap();
//		String accessIp = request.getRemoteAddr();
		histMap.put("MANAGER_ID", paramMap.get("MANAGER_ID").toString());
		histMap.put("MEMBER_ID", MEMBER_ID);
		histMap.put("ACCESS_HIST_DIV", ACCESS_HIST_DIV);
		histMap.put("ACCESS_HIST_DET", ACCESS_HIST_DET);
		histMap.put("ACCESS_IP", ip);
		return histMap;
	}
	
}
