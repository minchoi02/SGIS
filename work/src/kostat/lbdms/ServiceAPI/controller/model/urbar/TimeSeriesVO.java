package kostat.lbdms.ServiceAPI.controller.model.urbar;

import java.awt.List;

public class TimeSeriesVO {


	private Integer projectKey;

	private String projectNm;

	private String urbarType;

	private String createDt;

	private List createYear;

	private String useYn;

	public Integer getProjectKey() {
		return projectKey;
	}

	public void setProjectKey(Integer projectKey) {
		this.projectKey = projectKey;
	}

	public String getProjectNm() {
		return projectNm;
	}

	public void setProjectNm(String projectNm) {
		this.projectNm = projectNm;
	}

	public String getUrbarType() {
		return urbarType;
	}

	public void setUrbarType(String urbarType) {
		this.urbarType = urbarType;
	}

	public String getCreateDt() {
		return createDt;
	}

	public void setCreateDt(String createDt) {
		this.createDt = createDt;
	}

	public List getCreateYear() {
		return createYear;
	}

	public void setCreateYear(List createYear) {
		this.createYear = createYear;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	@Override
	public String toString() {
		return "TimeSeriesVO [projectKey=" + projectKey + ", projectNm=" + projectNm + ", urbarType=" + urbarType
				+ ", createDt=" + createDt + ", createYear=" + createYear + ", useYn=" + useYn + "]";
	}



}
