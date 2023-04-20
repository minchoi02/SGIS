package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import kostat.lbdms.ServiceAPI.controller.service.BndDmcService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.BndDmcMapper;


@Service("bndDmcService")
public class BndDmcServiceImpl implements BndDmcService {

	private static final Logger LOGGER = LoggerFactory.getLogger(BndDmcServiceImpl.class);

	@Resource(name="bndDmcMapper")
	private BndDmcMapper bndDmcMapper;

	@Override
	public List selectBndInfoList(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return bndDmcMapper.selectBndInfoList(mapParameter);
	}

	@Override
	public void createBndInfo(Map mapParameter) throws SQLException {
		bndDmcMapper.createBndInfo(mapParameter);
	}


	@Override
	public Map selectBndInfoDetail(Map mapParameter) throws SQLException {

		return bndDmcMapper.selectBndInfoDetail(mapParameter);
	}

    @Override
    public void deleteBnd(Map mapParameter) throws SQLException {
        bndDmcMapper.deleteBnd(mapParameter);

    }






}
