package kostat.lbdms.ServiceAPI.controller.model.system;

import java.util.List;

import lombok.Data;
import net.sf.json.JSONArray;

/**
* <pre>
* 자원
* </pre>
*
* @author        오범용
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========
*
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      오범용                        최초생성
*
*/

@Data
public class ResourceVO {
	/**아이디번호*/
	private String id;
	/**로우번호*/
	private int row;
	/** 총 갯수 */
	private int total;
	/** 리소스 아이디 */
	private int resource_id;
	/** 리로스 아이디 문자열 */
	private String resource_ids;
	/** 신청번호 */
	private int usable_no;
	/** 게시물 번호 */
	private int inst_seq;
	/** 공유 여부 */
	private String inst_share_yn;
	/** 스키마 이름 */
	private String inst_schema_nm;
	/** 사용자 아이디 */
	private String user_id;
	/** 데이터 저장 타입 */
	private String data_storage_type;
	/** 데이터 경로 */
	private String data_path;
	/** 데이터 갯수 */
	private String data_cnt;
	/** 데이터 생성 시간 */
	private String data_create_time;
	/** 최종 사용일 */
	private String last_used_time;
	/** 카테고리 1 기관 */
	private String category1;
	/** 카테고리 2 테마 */
	private String category2;
	/** 카테고리 3 분류 */
	private String category3;
	/** 카테고리 4 rev */
	private String category4;
	/** 설명 */
	private String description;
	/** 수집 관계 아이디 */
	private String relation_resource_id;
	/** 데이터 이름 */
	private String data_nm;
	/** 데이터 이름 */
	private String data_name;
	/** 스키마 */
	private String schema;
	/** 액션 타입 */
	private String action_type;
	/** 데이터 크기 */
	private String data_size;
	/** 다운로드 신청 */
	private String download_apply;
	/** 사용 구분 */
	private String use_type;
	/** 승인여부 */
	private String grant_yn;
	/** 등록일 */
	private String reg_ts;
	/** 시작 */
	private int start;
	/** 디스플레이 */
	private int display;
	/** 정렬 */
	private String sort;
	/** 정렬 내림차 */
	private String order="desc";
	/** 공유 번호 */
	private int share_no;
	/** 사용자 이름 */
	private String user_nm;
	/** 사용자 구분 */
	private String user_div;
	/** 기관 */
	private String institute;
	/** 부서 */
	private String dept;
	/** 직책 */
	private String job_pos;
	/** 전화번호 */
	private String tel_no;
	/**  */
	private String auth;
	/** 승인자 */
	private String grant_user;
	/** 설명 */
	private String use_description;
	/** 위치 컬럼 설명 */
	private String pos_column_desc;
	/** 리소스 List */
	private List<ResourceVO> resources;
	/** JSONArray */
	private JSONArray array;

	private String before_data_path;
	private String x_column;
	private String y_column;
	private String legend_info;
	private String delete_status;
	private String delete_fail_log;
	private String geometry_type;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getResource_id() {
		return resource_id;
	}
	public void setResource_id(int resource_id) {
		this.resource_id = resource_id;
	}
	public String getResource_ids() {
		return resource_ids;
	}
	public void setResource_ids(String resource_ids) {
		this.resource_ids = resource_ids;
	}
	public int getUsable_no() {
		return usable_no;
	}
	public void setUsable_no(int usable_no) {
		this.usable_no = usable_no;
	}
	public int getInst_seq() {
		return inst_seq;
	}
	public void setInst_seq(int inst_seq) {
		this.inst_seq = inst_seq;
	}
	public String getInst_share_yn() {
		return inst_share_yn;
	}
	public void setInst_share_yn(String inst_share_yn) {
		this.inst_share_yn = inst_share_yn;
	}
	public String getInst_schema_nm() {
		return inst_schema_nm;
	}
	public void setInst_schema_nm(String inst_schema_nm) {
		this.inst_schema_nm = inst_schema_nm;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getData_storage_type() {
		return data_storage_type;
	}
	public void setData_storage_type(String data_storage_type) {
		this.data_storage_type = data_storage_type;
	}
	public String getData_path() {
		return data_path;
	}
	public void setData_path(String data_path) {
		this.data_path = data_path;
	}
	public String getData_cnt() {
		return data_cnt;
	}
	public void setData_cnt(String data_cnt) {
		this.data_cnt = data_cnt;
	}
	public String getData_create_time() {
		return data_create_time;
	}
	public void setData_create_time(String data_create_time) {
		this.data_create_time = data_create_time;
	}
	public String getLast_used_time() {
		return last_used_time;
	}
	public void setLast_used_time(String last_used_time) {
		this.last_used_time = last_used_time;
	}
	public String getCategory1() {
		return category1;
	}
	public void setCategory1(String category1) {
		this.category1 = category1;
	}
	public String getCategory2() {
		return category2;
	}
	public void setCategory2(String category2) {
		this.category2 = category2;
	}
	public String getCategory3() {
		return category3;
	}
	public void setCategory3(String category3) {
		this.category3 = category3;
	}
	public String getCategory4() {
		return category4;
	}
	public void setCategory4(String category4) {
		this.category4 = category4;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getRelation_resource_id() {
		return relation_resource_id;
	}
	public void setRelation_resource_id(String relation_resource_id) {
		this.relation_resource_id = relation_resource_id;
	}
	public String getData_nm() {
		return data_nm;
	}
	public void setData_nm(String data_nm) {
		this.data_nm = data_nm;
	}
	public String getData_name() {
		return data_name;
	}
	public void setData_name(String data_name) {
		this.data_name = data_name;
	}
	public String getSchema() {
		return schema;
	}
	public void setSchema(String schema) {
		this.schema = schema;
	}
	public String getAction_type() {
		return action_type;
	}
	public void setAction_type(String action_type) {
		this.action_type = action_type;
	}
	public String getData_size() {
		return data_size;
	}
	public void setData_size(String data_size) {
		this.data_size = data_size;
	}
	public String getDownload_apply() {
		return download_apply;
	}
	public void setDownload_apply(String download_apply) {
		this.download_apply = download_apply;
	}
	public String getUse_type() {
		return use_type;
	}
	public void setUse_type(String use_type) {
		this.use_type = use_type;
	}
	public String getGrant_yn() {
		return grant_yn;
	}
	public void setGrant_yn(String grant_yn) {
		this.grant_yn = grant_yn;
	}
	public String getReg_ts() {
		return reg_ts;
	}
	public void setReg_ts(String reg_ts) {
		this.reg_ts = reg_ts;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getDisplay() {
		return display;
	}
	public void setDisplay(int display) {
		this.display = display;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public int getShare_no() {
		return share_no;
	}
	public void setShare_no(int share_no) {
		this.share_no = share_no;
	}
	public String getUser_nm() {
		return user_nm;
	}
	public void setUser_nm(String user_nm) {
		this.user_nm = user_nm;
	}
	public String getUser_div() {
		return user_div;
	}
	public void setUser_div(String user_div) {
		this.user_div = user_div;
	}
	public String getInstitute() {
		return institute;
	}
	public void setInstitute(String institute) {
		this.institute = institute;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public String getJob_pos() {
		return job_pos;
	}
	public void setJob_pos(String job_pos) {
		this.job_pos = job_pos;
	}
	public String getTel_no() {
		return tel_no;
	}
	public void setTel_no(String tel_no) {
		this.tel_no = tel_no;
	}
	public String getAuth() {
		return auth;
	}
	public void setAuth(String auth) {
		this.auth = auth;
	}
	public String getGrant_user() {
		return grant_user;
	}
	public void setGrant_user(String grant_user) {
		this.grant_user = grant_user;
	}
	public String getUse_description() {
		return use_description;
	}
	public void setUse_description(String use_description) {
		this.use_description = use_description;
	}
	public String getPos_column_desc() {
		return pos_column_desc;
	}
	public void setPos_column_desc(String pos_column_desc) {
		this.pos_column_desc = pos_column_desc;
	}
	public List<ResourceVO> getResources() {
		return resources;
	}
	public void setResources(List<ResourceVO> resources) {
		this.resources = resources;
	}
	public JSONArray getArray() {
		return array;
	}
	public void setArray(JSONArray array) {
		this.array = array;
	}
	public String getBefore_data_path() {
		return before_data_path;
	}
	public void setBefore_data_path(String before_data_path) {
		this.before_data_path = before_data_path;
	}
	public String getX_column() {
		return x_column;
	}
	public void setX_column(String x_column) {
		this.x_column = x_column;
	}
	public String getY_column() {
		return y_column;
	}
	public void setY_column(String y_column) {
		this.y_column = y_column;
	}
	public String getLegend_info() {
		return legend_info;
	}
	public void setLegend_info(String legend_info) {
		this.legend_info = legend_info;
	}
	public String getDelete_status() {
		return delete_status;
	}
	public void setDelete_status(String delete_status) {
		this.delete_status = delete_status;
	}
	public String getDelete_fail_log() {
		return delete_fail_log;
	}
	public void setDelete_fail_log(String delete_fail_log) {
		this.delete_fail_log = delete_fail_log;
	}
	public String getGeometry_type() {
		return geometry_type;
	}
	public void setGeometry_type(String geometry_type) {
		this.geometry_type = geometry_type;
	}
	@Override
	public String toString() {
		return "ResourceVO [id=" + id + ", row=" + row + ", total=" + total + ", resource_id=" + resource_id
				+ ", resource_ids=" + resource_ids + ", usable_no=" + usable_no + ", inst_seq=" + inst_seq
				+ ", inst_share_yn=" + inst_share_yn + ", inst_schema_nm=" + inst_schema_nm + ", user_id=" + user_id
				+ ", data_storage_type=" + data_storage_type + ", data_path=" + data_path + ", data_cnt=" + data_cnt
				+ ", data_create_time=" + data_create_time + ", last_used_time=" + last_used_time + ", category1="
				+ category1 + ", category2=" + category2 + ", category3=" + category3 + ", category4=" + category4
				+ ", description=" + description + ", relation_resource_id=" + relation_resource_id + ", data_nm="
				+ data_nm + ", data_name=" + data_name + ", schema=" + schema + ", action_type=" + action_type
				+ ", data_size=" + data_size + ", download_apply=" + download_apply + ", use_type=" + use_type
				+ ", grant_yn=" + grant_yn + ", reg_ts=" + reg_ts + ", start=" + start + ", display=" + display
				+ ", sort=" + sort + ", order=" + order + ", share_no=" + share_no + ", user_nm=" + user_nm
				+ ", user_div=" + user_div + ", institute=" + institute + ", dept=" + dept + ", job_pos=" + job_pos
				+ ", tel_no=" + tel_no + ", auth=" + auth + ", grant_user=" + grant_user + ", use_description="
				+ use_description + ", pos_column_desc=" + pos_column_desc + ", resources=" + resources + ", array="
				+ array + ", before_data_path=" + before_data_path + ", x_column=" + x_column + ", y_column=" + y_column
				+ ", legend_info=" + legend_info + ", delete_status=" + delete_status + ", delete_fail_log="
				+ delete_fail_log + ", geometry_type=" + geometry_type + "]";
	}


}
