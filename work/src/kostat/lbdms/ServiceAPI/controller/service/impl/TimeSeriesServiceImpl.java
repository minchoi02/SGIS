package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import kostat.lbdms.ServiceAPI.controller.service.TimeSeriesService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.TimeSeriesMapper;

@Service("timeSeriesService")
public class TimeSeriesServiceImpl implements TimeSeriesService{

	private static final Logger LOGGER = LoggerFactory.getLogger(TimeSeriesServiceImpl.class);

	@Resource(name="timeSeriesMapper")
	private TimeSeriesMapper timeSeriesMapper;

	@Override
	public List selectTsInfoList(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return timeSeriesMapper.selectTsInfoList(mapParameter);
	}

	@Override
	public void createTmInfo(Map mapParameter) throws SQLException {
		timeSeriesMapper.createTmInfo(mapParameter);
	}

    @Override
    public Map selectTsInfoDetail(Map mapParameter) throws SQLException {
        // TODO Auto-generated method stub
        return timeSeriesMapper.selectTsInfoDetail(mapParameter);
    }

    @Override
    public void deleteTs(Map mapParameter) throws SQLException {
       timeSeriesMapper.deleteTs(mapParameter);

    }

    @Override
    public List selectResult(Map mapParameter) throws SQLException {
        // TODO Auto-generated method stub
        return timeSeriesMapper.selectResult(mapParameter);
    }





}
