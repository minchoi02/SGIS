package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SidoIndexOrderMapper.java
 * @Description : SidoIndexOrderMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.29 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "sidoIndexOrderMapper" )
public class SidoIndexOrderMapper extends EgovAbstractMapper
{
	private static final String [] KEYS = {
			"percentage"
			, "corporation"
			, "rate_change"
			, "worker"
			, "worker_percentage"
			, "worker_rate_change"
	};
	
	private static final String [] EATRY_SELECT_ID = {
			"percentageSidoIndexOrderEatery"
			, "corporationSidoIndexOrderEatery"
			, "rateChangeSidoIndexOrderEatery"
			, "workerSidoIndexOrderEatery"
			, "workerPecentageSidoIndexOrderEatery"
			, "workerRateChangeSidoIndexOrderEatery"			
	};      
	
	private static final String [] WRSALE_SELECT_ID = {
			"percentageSidoIndexOrderWrsale"
			, "corporationSidoIndexOrderWrsale"
			, "rateChangeSidoIndexOrderWrsale"
			, "workerSidoIndexOrderWrsale"
			, "workerPecentageSidoIndexOrderWrsale"
			, "workerRateChangeSidoIndexOrderWrsale"
	};
	
	private static final String [] SERVICE_SELECT_ID = {
			"percentageSidoIndexOrderService"
			, "corporationSidoIndexOrderService"
			, "rateChangeSidoIndexOrderService"
			, "workerSidoIndexOrderService"
			, "workerPecentageSidoIndexOrderService"
			, "workerRateChangeSidoIndexOrderService"
	};
	
	private static final String [] LODGE_SELECT_ID = {
			"percentageSidoIndexOrderLodge"
			, "corporationSidoIndexOrderLodge"
			, "rateChangeSidoIndexOrderLodge"
			, "workerSidoIndexOrderLodge"
			, "workerPecentageSidoIndexOrderLodge"
			, "workerRateChangeSidoIndexOrderLodge"
	};
	
	/**
	 * 음식점 시도 지표 순위
	 * @param parameter
	 * @return
	 */
	public Map< String, Object > selectEaterySidoIndexOrder( Map< String, String > parameter )
	{
		return selectListSidoIndexOrder( KEYS, EATRY_SELECT_ID, parameter );
	}
	
	/**
	 * 도소매 시도 지표 순위
	 * @param parameter
	 * @return
	 */
	public Map< String, Object > selectWrsaleSidoIndexOrder( Map< String, String > parameter )
	{
		return selectListSidoIndexOrder( KEYS, WRSALE_SELECT_ID, parameter ); 
	}
	
	/**
	 * 서비스 시도 지표 순위
	 * @param parameter
	 * @return
	 */
	public Map< String, Object > selectServiceSidoIndexOrder( Map< String, String > parameter )
	{
		return selectListSidoIndexOrder( KEYS, SERVICE_SELECT_ID, parameter );
	}
	
	/**
	 * 숙박 시도 지표 순위
	 * @param parameter
	 * @return
	 */
	public Map< String, Object > selectLodgeSidoIndexOrder( Map< String, String > parameter )
	{
		return selectListSidoIndexOrder( KEYS, LODGE_SELECT_ID, parameter );
	}
	
	private Map< String, Object > selectListSidoIndexOrder( String [] keys, String [] arrSelectId, Map< String, String > parameter )
	{
		Map< String, Object > result = new HashMap< String, Object >();
		List< Map< String, Object > > liTemp = null;
		
		int idx, len;
		
		for( idx = 0, len = keys.length; idx < len; idx++ )
		{
			liTemp = selectList( arrSelectId[idx],  parameter );
			result.put( keys[idx], liTemp );
		}

		return result;
	}
}
