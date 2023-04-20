package kostat.sop.ServiceAPI.api.dt.workRoadCodeInfo.mapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringEscapeUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

import kostat.sop.ServiceAPI.common.util.DateUtil;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.common.util.Success;

/**
 * 
 * @ClassName: WorkRoadCodeInfoDao
 * @Description：일자리 코드정보 조회
 * 
 * @author 곽제욱 
 * @date：2020.05.12
 * @version V1.0
 * 
 */
@Component
public class WorkRoadCodeInfoDao extends SqlSessionDaoSupport {

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	// 일자리 코드정보 조회 기능
	public Map searchWorkRoadCodeInfo(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("WorkRoadCodeInfo.getSearchWorkRoadCodeInfoCount", paramMap));
		resultMap.put("rows", getSqlSession().selectList("WorkRoadCodeInfo.getSearchWorkRoadCodeInfo", paramMap));
		return resultMap;
	}
	
}
