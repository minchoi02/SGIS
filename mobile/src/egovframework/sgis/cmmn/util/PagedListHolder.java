package egovframework.sgis.cmmn.util;

import java.util.ArrayList;
import java.util.List;

public class PagedListHolder  {

	private static final long serialVersionUID = 5696265119386047232L;

	private static final int DEFAULT_PAGE = 1;

	public static final int DEFAULT_PAGE_SIZE = 10;

	public static final int DEFAULT_MAX_LINKED_PAGES = 10;

	private List<?> source;

	private int total;

	private int pageSize = DEFAULT_PAGE_SIZE;

	private int page = DEFAULT_PAGE;

	private String sort;

	private String sortOrder;

	private int maxLinkedPages = DEFAULT_MAX_LINKED_PAGES;

	private String keywords;

	private List<?> keywordList;

	private String fieldType;

	private List<?> fieldTypeList;

	private String searClassCode;

	private String stateType;			// For Seminar Search

	private String dateFrom;
	private String dateTo;

	private String bcCode;


	public List<?> getFieldTypeList() {
		return fieldTypeList;
	}

	public void setFieldTypeList(List<?> fieldTypeList) {
		this.fieldTypeList = fieldTypeList;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public static int getDefaultPage() {
		return DEFAULT_PAGE;
	}

	public static int getDefaultPageSize() {
		return DEFAULT_PAGE_SIZE;
	}

	public static int getDefaultMaxLinkedPages() {
		return DEFAULT_MAX_LINKED_PAGES;
	}

	public String getBcCode() {
		return bcCode;
	}

	public void setBcCode(String bcCode) {
		this.bcCode = bcCode;
	}

	public String getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	public String getDateTo() {
		return dateTo;
	}

	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}

	public String getSearClassCode() {
		return searClassCode;
	}

	public void setSearClassCode(String searClassCode) {
		this.searClassCode = searClassCode;
	}

	public PagedListHolder() {
		this(new ArrayList<Object>(0), 0);
	}

	public PagedListHolder(List<?> source, int total) {
		setSource(source);
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public void setSource(List<?> source) {
		this.source = source;
	}

	public List<?> getSource() {
		return source;
	}

	public void setTotal(int total) {
		this.total = total;		
	}

	public int getTotal() {
		return total;
	}

	public void setPageSize(int pageSize) {
		if (pageSize > 100) {
			this.pageSize = DEFAULT_PAGE_SIZE;			
		}
		else this.pageSize = pageSize;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPage(int page) {
		if(page < 1) {
			this.page = 1;
		}
		else {
			this.page = page;
		}
	}

	public int getPage() {
		if (this.page >= getPageCount()) {
			this.page = getPageCount();
		}
		return this.page;
	}

	public void setMaxLinkedPages(int maxLinkedPages) {
		this.maxLinkedPages = maxLinkedPages;
	}

	public int getMaxLinkedPages() {
		return maxLinkedPages;
	}

	public int getPageCount() {
		float nrOfPages = (float) getNrOfElements() / getPageSize();
		return (int) ((nrOfPages > (int) nrOfPages || nrOfPages == 0.0) ? nrOfPages + 1 : nrOfPages);
	}

	public boolean isFirstPage() {
		return getPage() == 1;
	}

	public boolean isLastPage() {
		return getPage() == getPageCount();
	}

	public void previousPage() {
		if (!isFirstPage()) {
			this.page--;
		}
	}

	public void nextPage() {
		if (!isLastPage()) {
			this.page++;
		}
	}

	public int getNrOfElements() {
		return total;
	}

	public int getFirstElementOnPage() {
		return (getPageSize() * (getPage() - 1));
	}

	public int getLastElementOnPage() {
		int endIndex = getPageSize() * (getPage());
		int size = getNrOfElements();
		return (endIndex > size ? size : endIndex);
	}

	public List<?> getPageList() {
		return getSource().subList(getFirstElementOnPage(), getLastElementOnPage());
	}

	public int getFirstLinkedPage() {
		return Math.max(0, getPage() - (getMaxLinkedPages() / 2));
	}

	public int getLastLinkedPage() {
		return Math.min(getFirstLinkedPage() + getMaxLinkedPages() - 1, getPageCount() - 1);
	}

	public int getFirstElementOnList(){
		return getTotal() - getFirstElementOnPage();
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}	

	public List<?> getKeywordList() {
		return keywordList;
	}

	public void setKeywordList(List<?> keywordList) {
		this.keywordList = keywordList;
	}

	public String getLeftLikeKeywords() {
		return "%" + keywords;
	}

	public String getRightLikeKeywords() {
		return keywords + "%";
	}

	public String getLikeKeywords() {
		return "%" + keywords + "%";
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public String getStateType() {
		return stateType;
	}

	public void setStateType(String stateType) {
		this.stateType = stateType;
	}
}

