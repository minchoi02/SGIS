package kostat.sop.OpenAPI3.service.technicalbiz.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.OpenAPI3.service.technicalbiz.SidoWorkerInfoService;
import kostat.sop.OpenAPI3.service.technicalbiz.mapper.SidoWorkerInfoMapper;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


/**
 * @Class Name : SidoCompanyInfoServiceImpl.java
 * @Description : SidoCompanyInfoServiceImpl 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.07
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sidoWorkerInfoService" )
public class SidoWorkerInfoServiceImpl extends EgovAbstractServiceImpl
		implements SidoWorkerInfoService
{
	@Resource(name = "sidoWorkerInfoMapper")
	private SidoWorkerInfoMapper mapper;
	
	@Override
	public List< Map< String, Object > > selectSidoWorkerInfo( Map< String, String > parameter ) throws AbsException
	{
		List< Map< String, Object > > result = new ArrayList<Map<String,Object>>(); 
		List< Map< String, Object > > listTemp = null; //2017.03.24 String -> Object 
		Map< String, Object > mapTemp = null;
		
		//시도코드 조회
//		List< Map< String, String > > sidoCdList = mapper.selectSidoInfo(parameter);
		
		// 2016. 12. 05 j.h.Seok modify
		List< Map< String, String > > sidoCdList = mapper.selectSidoTotalInfo(parameter);
		
		for(int i=0; i<sidoCdList.size(); i++){
			mapTemp = new HashMap< String, Object >();
			
			String sidoCd = sidoCdList.get(i).get("sido_cd");
			String sidoNm = sidoCdList.get(i).get("sido_nm");
			String totalCnt = sidoCdList.get(i).get("techbiz_worker_total_cnt");
			
			Map tempParam = new HashMap();
			tempParam.put("sido_cd", sidoCd);
			
			listTemp = mapper.selectSidoWorkerInfo(tempParam);
			
			//2017.03.24 시도별 기술업종현황 비율정보 수정
			for (int k=0; k<listTemp.size(); k++) {
				int tmpCorpCnt = (Integer)listTemp.get(k).get("techbiz_worker_cnt");
				float tmpTotalCorpCnt = Float.parseFloat(totalCnt);
				float tmpCorpPer = (tmpCorpCnt / tmpTotalCorpCnt) * 100;
				listTemp.get(k).put("techbiz_worker_per", String.format("%.1f", tmpCorpPer));
			}
			
			mapTemp.put("sido_cd", sidoCd);
			mapTemp.put("sido_nm", sidoNm);
			mapTemp.put("techbiz_worker_total_cnt", totalCnt);
			mapTemp.put("techbiz_list", listTemp);
			
			result.add(mapTemp);
		}
		return 	result;
	}
}
