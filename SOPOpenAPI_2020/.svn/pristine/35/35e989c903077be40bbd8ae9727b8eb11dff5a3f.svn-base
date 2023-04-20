package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfLifeDetailService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SggTypeOfLifeDetailMapper;

/**
 * @Class Name : SggTypeOfLifeDetailServiceImpl.java
 * @Description : SggTypeOfLifeDetailService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.31 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Service( "sggTypeOfLifeDetailService" )
@SuppressWarnings( "unchecked" )
public class SggTypeOfLifeDetailServiceImpl extends EgovAbstractServiceImpl
		implements SggTypeOfLifeDetailService
{
	@Resource( name = "sggTypeOfLifeDetailMapper" )
	private SggTypeOfLifeDetailMapper mapper;
	
	@SuppressWarnings("null")
	@Override
	public List< Map< String, Object > > selectSggTypeOfLifeDetail( Map< String, String > parameter ) throws AbsException
	{
		String corpTotalCount;
		String workerTotalCount;
		
		// 2017. 11. 09 [개발팀] 추가 수정 START
		String tempThemeCode = parameter.get( "theme_cd" );
		if(tempThemeCode.length() > 2) {
			tempThemeCode = tempThemeCode.substring(0, 2);
			parameter.put("theme_cd", tempThemeCode);
		}
		//테마별 카운트 조회
		corpTotalCount = mapper.selectCorpCount(parameter);
		parameter.put("corp_total", corpTotalCount);
		workerTotalCount = mapper.selectWorkerCount(parameter);
		parameter.put("worker_total", workerTotalCount);
		
		//사업체, 종사자 수 및 비율 조회
		
		
		return mapper.selectSggTypeOfLifeDetail(parameter);
	}

	@SuppressWarnings("unused")
	private void checkThemeCode(String themeCode) throws AbsException
	{
		Integer intThemeCode = Integer.valueOf( themeCode );
		if( !((intThemeCode == 10) 
				|| (intThemeCode == 20) 
				|| (intThemeCode == 40) 
				|| (intThemeCode == 50)) ) {
			throw new ThemeCodeInvalidValueException("허용된 테마코드를 입력하세요. 입력한 테마코드 : [ " + themeCode + " ]");
		}
	}
	
	@SuppressWarnings( "serial" )
	@ResponseStatus( value = HttpStatus.UNPROCESSABLE_ENTITY, reason = "허용된 테마코드를 입력하세요." )
	class ThemeCodeInvalidValueException extends AbsHttpException{

		public ThemeCodeInvalidValueException( String message )
		{
			super( message );
		}
		
	}
}
