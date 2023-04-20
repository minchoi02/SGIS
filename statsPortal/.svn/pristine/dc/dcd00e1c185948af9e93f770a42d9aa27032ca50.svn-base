package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.SggTypeOfBusinessWorkerService;
import kostat.sop.ServiceAPI.controller.service.mapper.SggTypeOfBusinessWorkerMapper;

/**
 * @Class Name : SggTypeOfBusinessWorkerImpl.java
 * @Description : SggTypeOfBusinessWorkerImpl 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.28 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sggTypeOfBusinessWorkerService" )
public class SggTypeOfBusinessWorkerImpl extends EgovAbstractServiceImpl implements SggTypeOfBusinessWorkerService {

	@Resource( name = "sggTypeOfBusinessWorkerMapper" )
	private SggTypeOfBusinessWorkerMapper mapper;

	@Override
	public Map< String, Object > selectSggTypeOfBusinessWorker( Map< String, String > parameter ) throws AbsException
	{
		return mapper.selectSggTypeOfBusinessWorker( parameter );
	}

}
