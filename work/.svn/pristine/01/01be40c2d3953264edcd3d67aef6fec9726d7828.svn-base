package kostat.lbdms.ServiceAPI.controller.model.resource;

import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;

import kostat.lbdms.ServiceAPI.common.web.rest.IConverter;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.DataStorageTypes;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import lombok.Data;

/**
 * <pre>
* 자원 데이터 상세 정보
 * </pre>
 *
 * @author 오범용
 * @since 2015. 10. 20. 오후 2:18:53
 * @version 1.0
 * @see
 * 
 *      <pre>
 *      ========== 개정이력( Modification Information ) ==========
 * 
 *      수정일 수정자 수정내용 ------------ ------------ -------------------------------
 *      2015.09.11. 오범용 최초생성
 * 
 */
@Data
public class ResourceDetail implements IConverter {
    /** 테이블 이름 */
    private String table_name;
    /** 데이터 수 */
    private String data_cnt;
    /** 데이터 이름 */
    private String data_name;
    /** 수집 관계 아이디 */
    private String relation_resource_id;
    /** 사용자 아이디 */
    private String user_id;
    /** 액션 타입 */
    private String action_type;
    /** 설명 */
    private String description;
    /** 자원 아이디 */
    private String resource_id;
    /** 데이터 생성 시간 */
    private String data_create_time;
    /** 최종 사용일 */
    private String last_used_time;
    /** 데이너 크기 */
    private String data_size;
    /** 데이타 저장 타입 */
    private String data_storage_type;
    /** 데이터베이스 이름 */
    private String db_name;
    /** 데이터 경로 */
    private String data_path;
    /** 새 카테고리 */
    private String category1;
    /** 새 카테고리 2 */
    private String category2;
    /** 새 카테고리 3 */
    private String category3;
    /** 새 카테고리 4 */
    private String category4;

    @Override
    public HashMap<String, Object> toAdderMap() throws SystemFailException {

	HashMap<String, Object> map = new HashMap<String, Object>();

	if (StringUtils.equalsIgnoreCase(this.getData_storage_type(), DataStorageTypes.HIVE)) {

	    map.put("DATABASE", this.getUser_id());
	    map.put("TABLE", this.getData_name());
	    map.put("DESCRIPTION", this.getDescription());
	    map.put("CATEGORY1", this.getCategory1());
	    map.put("CATEGORY2", this.getCategory2());
	    map.put("CATEGORY3", this.getCategory3());
	    map.put("CATEGORY4", this.getCategory4());

	} else if (StringUtils.equalsIgnoreCase(this.getData_storage_type(), DataStorageTypes.HDFS)) {

	    map.put("DATA_NAME", this.getData_name());
	    map.put("USER_ID", this.getUser_id());
	    map.put("DESCRIPTION", this.getDescription());
	    map.put("CATEGORY1", this.getCategory1());
	    map.put("CATEGORY2", this.getCategory2());
	    map.put("CATEGORY3", this.getCategory3());
	    map.put("CATEGORY4", this.getCategory4());

	} else {
	    throw new SystemFailException("리소스 수정 API가 존재하지 않습니다 저장종류 : " + this.getData_storage_type());
	}

	return map;
    }

    @Override
    public HashMap<String, Object> toModifierMap() throws SystemFailException {

	HashMap<String, Object> map = new HashMap<String, Object>();

	if (StringUtils.equalsIgnoreCase(this.getData_storage_type(), DataStorageTypes.HIVE)) {

	    map.put("DATABASE", this.getDb_name());
	    map.put("TABLE", this.getData_name());

	} else if (StringUtils.equalsIgnoreCase(this.getData_storage_type(), DataStorageTypes.HDFS)) {

	    map.put("DATA_NAME", this.getData_name());

	} else if (StringUtils.equalsIgnoreCase(this.getData_storage_type(), DataStorageTypes.PG)) {

	    map.put("SCHEMA", this.getDb_name());
	    map.put("TABLE", this.getData_name());

	}

	map.put("RESOURCE_ID", this.getResource_id());
	map.put("USER_ID", this.getUser_id());
	map.put("DESCRIPTION", this.getDescription());
	map.put("CATEGORY1", this.getCategory1());
	map.put("CATEGORY2", this.getCategory2());
	map.put("CATEGORY3", this.getCategory3());
	map.put("CATEGORY4", this.getCategory4());

	return map;
    }
}
