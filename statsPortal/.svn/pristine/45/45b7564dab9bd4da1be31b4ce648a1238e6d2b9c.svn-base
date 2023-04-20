package kostat.sop.ServiceAPI.api.statsMe.map;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.StatsMeService;

/**
 * 1. 기능 : My통계로 > 통계자료 조회  <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김남민 1.0, 2019.08.08	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김남민
 * @version 1.0
 * @see
 * <p/>
 */
public class GetStatsDataOne extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetStatsDataOne.class);
	
	//My통계로 관련 서비스
	@Resource(name="statsMeService")
	private StatsMeService statsMeService;
	
	@Override
	public String getApiId() {
		return "115009";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		stat_data_id
	}

	enum OptionParam{
		map_ty,
		area_bndry_se,
		sido_cd,
		sgg_cd,
		emdong_cd
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		Map<String,Object> mapParameter = getParameterMap(req);
		
		//리턴 변수 선언
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		//파라미터 변수 선언
		String stat_data_id = StringUtil.isNullToString(mapParameter.get("stat_data_id")); //통계자료코드
		
		//통계자료관리 조회
		Map<String, Object> data = session.selectOne("statsMeMap.selectOneSrvDtCtlgDataList", mapParameter);
		
		//5건 미만 포함 여부 체크
		String berow_5_remove_yn = "Y"; // 기본값 : 5 미만 표시 안함.
		if(data != null) {
			berow_5_remove_yn = StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(data).get("berow_5_remove_yn"));
		}
		mapParameter.put("berow_5_remove_yn", berow_5_remove_yn);
		
		//데이터마트 조회
		List<Map<String, Object>> list = session.selectList("statsMeMap.selectListSrvDtCtlgDtwrh", mapParameter);
		resultData.put("list", list);
		
		//리턴
		resultData.put("params", mapParameter);
		return resultData;
	}
}