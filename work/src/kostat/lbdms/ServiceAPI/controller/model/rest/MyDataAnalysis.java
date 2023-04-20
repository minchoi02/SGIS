package kostat.lbdms.ServiceAPI.controller.model.rest;

import lombok.Data;
import net.sf.json.JSONObject;

@Data
public class MyDataAnalysis {
    private String userid;
    private String userdiv;
    private String jsonStr;

    /** 선택탭 */
    private String selstep;
    /** 데이터명 */
    private String data_name;
    /** 리턴 받은 테이블 스키마 명 */
    private String data_table_schema;
    /** resource_id */
    private String resource_id;
    /** resource 소유자 */
    private String resource_user_id;
    /** 분석단위 */
    private String admType;
    /** 시도 */
    private String sido;
    /** 시군구 */
    private String sgg;
    /** 읍면동 */
    private String dong;
    /** 산출방식 */
    private String rm;
    /** 산출방식 필드 */
    private String sumfield;
    /** 위치 컬럼 설명 */
    private String pos_column_desc;

    /** 결과 저장테이블 이름 */
    private String result_table_name;
    /** 결과 저장테이블 설명 */
    private String result_table_desc;
    /** 분석적용필드 */
    private String anlyApplField;
    /** 나의지도 맵시퀀스 */
    private String map_seq;
    /** 배치여부 */
    private String batch_yn;

    private String pos_method;
    private String pos_columns;
    private String lable_columns;
    private String action_type;
    private String action_type_nm;
    private String ori_action_type;

    private String lable_nm;
    private String gid;

    private String adm_cd;
    private String adm_nm;
    private String data;

    /** 결과테이블 중심 x좌표 */
    private String center_x;
    /** 결과테이블 중심 y좌표 */
    private String center_y;

    /** 순위 */
    private int rank;
    /** 분석값 */
    private double fact;
    /** 비율 */
    private double rate;
    /** 코드 */
    private String code;
    /** 코드명칭 */
    private String code_nm;
    /** 데이터보드 조회대상 테이블 */
    private String result_data_table_name;
    /** 조건리스트 JSONArray 문자열 */
    private String condition;

    JSONObject object;
    private int checkCnt;
}
