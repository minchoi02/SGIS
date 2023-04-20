package kostat.sop.ServiceAPI.api.excel.mapper;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: ExcelDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月19日 上午9:15:21    
 * @version V1.0      
 *    
 */
@Component
public class ExcelDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public List<Map> getSearchWord(Map paramMap){	
		List resultList = getSqlSession().selectList("Excel.getSearchWord",paramMap);
		int totalCount= (int) getSqlSession().selectOne("RELStat.getSumWordCNT",paramMap);
		for(int i=0;i<resultList.size();i++){
			Map result = (Map) resultList.get(i);
			float CNT=Float.parseFloat(result.get("CNT").toString());
			float percent=(CNT/totalCount)*100;
			result.put("PERCENT", String.format("%.2f", percent)+"%");
		}
		return resultList;
	}
	public List<Map> getSearchArea(Map paramMap){	
		List resultList = getSqlSession().selectList("Excel.getSearchArea",paramMap);
		int totalCount= (int) getSqlSession().selectOne("RELStat.getSumAreaCNT",paramMap);
		for(int i=0;i<resultList.size();i++){
			Map result = (Map) resultList.get(i);
			float CNT=Float.parseFloat(result.get("CNT").toString());
			float percent=(CNT/totalCount)*100;
			result.put("PERCENT", String.format("%.2f", percent)+"%");
		}
		return resultList;
	}
	public List<Map> getSRVStatDetail(Map paramMap){
		List resultList=getSqlSession().selectList("Excel.getSRVStatDetail",paramMap);
		int totalCount=0;
		for (Object object : resultList) {
			Map result = (Map) object;
			totalCount+=Integer.parseInt(result.get("CALL_CNT").toString());
		}
		for (Object object : resultList) {
			Map result = (Map) object;
			float CALL_CNT=Float.parseFloat(result.get("CALL_CNT").toString());
			float percent=(CALL_CNT/totalCount)*100;
			result.put("PERCENT",String.format("%.2f", percent)+"%");
		}
		return resultList;
	}

}
