package egovframework.sgis.map.service.mapper.kairos;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.map.command.CommonCommand;
import egovframework.sgis.map.command.CommunityPoiCommand;
import egovframework.sgis.map.model.CommunityPoiVO;

@Mapper("communityPoiMapper")
public interface CommunityPoiMapper {
	int selectCmmntyPoiCount(CommonCommand command);
	List<CommunityPoiVO> selectCmmntyPoiList(CommonCommand command);
	CommunityPoiVO selectCmmntyPoi(CommonCommand command);
	int insertPoiPoint(CommunityPoiCommand command);
	int insertPoi(CommunityPoiCommand command);
	int insertPoiImage(HashMap<String,Object> image);
	
	int updatePoi( CommunityPoiCommand command );
	int updatePoiPoint( CommunityPoiVO communityPoiVO );
	int deletePoiImage( HashMap<String,Object> image );
	
	List<EgovMap> selectPoiAtchImageListForCommunity(@Param("cmmnty_map_id")String cmmnty_map_id);
	int deletePoiList(CommonCommand commonCommand);//20200901 박은식 의견등록 삭제(로그인이 필요한 리스트)
}
