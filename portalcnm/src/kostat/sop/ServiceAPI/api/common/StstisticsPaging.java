package kostat.sop.ServiceAPI.api.common;

public class StstisticsPaging {
	

	/** 게시 글 수 **/
	private int pageRows = 10; 	
	
	/** 페이징 네비에 표시될 갯수 **/
	private int pageSize = 5; 
	
	/** 첫 번째 페이지 번호 **/
	private int firstPageNo;  
	
	/** 페이지 번호 **/
	private int pageNo; 
	
	/** 시작 페이지 (페이징 네비 기준) **/
	private int startPageNo; 
	
	/** 끝 페이지 (페이징 네비 기준) **/
	private int endPageNo; 
	
	/** 디비 조회 시작 페이지 **/
	public int startRows; 
	
	/** 디비 조회 페이지 **/
	public int endRows; 
	
	/** 이전 페이지 번호 **/
	private int prevPageNo; 
	
	/** 다음 페이지 번호 **/
	private int nextPageNo; 
	
	/** 이전 페이지 번호 **/
	private int prevPageBlockNo; 
	
	/** 다음 페이지 번호 **/
	private int nextPageBlockNo; 
	
	/** 마지막 페이지 번호 **/
	private int totalPageNo; 
	
	/** 게시 글 전체 수 **/
	private int totalCount;  
	
	public int getPrevPageBlockNo() {
		return prevPageBlockNo;
	}

	public void setPrevPageBlockNo(int prevPageBlockNo) {
		this.prevPageBlockNo = prevPageBlockNo;
	}

	public int getNextPageBlockNo() {
		return nextPageBlockNo;
	}

	public void setNextPageBlockNo(int nextPageBlockNo) {
		this.nextPageBlockNo = nextPageBlockNo;
	}

	public int getPageRows() {
		return pageRows;
	}

	public void setPageRows(int pageRows) {
		this.pageRows = pageRows;
	}

	public int getStartRows() {
		return startRows;
	}

	public void setStartRows(int startRows) {
		this.startRows = startRows;
	}

	public int getEndRows() {
		return endRows;
	}

	public void setEndRows(int endRows) {
		this.endRows = endRows;
	}
	
	/**
	 * @return the pageSize
	 */
	public int getPageSize() {
		return pageSize;
	}
	
	/**
	 * @param pageRows
	 *            the pageRows to set
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * @return the firstPageNo
	 */
	public int getFirstPageNo() {
		return firstPageNo;
	}

	/**
	 * @param firstPageNo
	 *            the firstPageNo to set
	 */
	public void setFirstPageNo(int firstPageNo) {
		this.firstPageNo = firstPageNo;
	}

	/**
	 * @return the prevPageNo
	 */
	public int getPrevPageNo() {
		return prevPageNo;
	}

	/**
	 * @param prevPageNo
	 *            the prevPageNo to set
	 */
	public void setPrevPageNo(int prevPageNo) {
		this.prevPageNo = prevPageNo;
	}

	/**
	 * @return the startPageNo
	 */
	public int getStartPageNo() {
		return startPageNo;
	}

	/**
	 * @param startPageNo
	 *            the startPageNo to set
	 */
	public void setStartPageNo(int startPageNo) {
		this.startPageNo = startPageNo;
	}

	/**
	 * @return the pageNo
	 */
	public int getPageNo() {
		return pageNo;
	}

	/**
	 * @param pageNo
	 *            the pageNo to set
	 */
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	/**
	 * @return the endPageNo
	 */
	public int getEndPageNo() {
		return endPageNo;
	}

	/**
	 * @param endPageNo
	 *            the endPageNo to set
	 */
	public void setEndPageNo(int endPageNo) {
		this.endPageNo = endPageNo;
	}

	/**
	 * @return the nextPageNo
	 */
	public int getNextPageNo() {
		return nextPageNo;
	}

	/**
	 * @param nextPageNo
	 *            the nextPageNo to set
	 */
	public void setNextPageNo(int nextPageNo) {
		this.nextPageNo = nextPageNo;
	}

	/**
	 * @return the totalPageNo
	 */
	public int getTotalPageNo() {
		return totalPageNo;
	}

	/**
	 * @param totalPageNo
	 *            the totalPageNo to set
	 */
	public void setTotalPageNo(int totalPageNo) {
		this.totalPageNo = totalPageNo;
	}

	/**
	 * @return the totalCount
	 */
	public int getTotalCount() {
		return totalCount;
	}

	/**
	 * @param totalCount
	 *            the totalCount to set
	 */
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
		this.operationPaging();
	}

	/**
	 *  페이징 연산
	 */
	private void operationPaging() {
		
		if (this.totalCount == 0) 	return; 			/** 개시글 카운트가 0인경우 **/
		if (this.pageNo == 0) 		this.setPageNo(1); 	/** 현재 페이지가 0인경우 **/
		if (this.pageRows == 0) 	this.setPageRows(10); /** 개시글 조회 갯수가 0 인경우 **/

		int totalPage =  (this.totalCount - 1) / this.pageRows + 1;	/** 마지막 페이지 **/  
		
		/** 현재 페이지 유효성 체크 **/  
		if (this.pageNo > totalPage) this.setPageNo(totalPage); 
		if (this.pageNo < 0 || this.pageNo > totalPage) this.pageNo = 1;  

		/** DB 조회 시작 ROW , 마지막 ROW **/
		int startRow = (this.pageNo - 1) * this.pageRows + 1;
		int endRow = startRow + this.pageRows - 1;
		
		/** 시작 페이지 , 끝 페이지 (페이징 네비 기준)**/
		int startPage = (this.pageNo - 1) / this.pageSize * this.pageSize + 1; 
		int endPage = startPage + this.pageSize - 1; 
		if (endPage > totalPage)  endPage = totalPage;
		
		this.setStartPageNo(startPage); /** 시작 페이지 (페이징 네비 기준)**/
		this.setEndPageNo(endPage); 	/** 끝 페이지 (페이징 네비 기준)**/
		this.setStartRows(startRow);
		this.setEndRows(endRow);
		
		this.setPrevPageNo(this.pageNo == 1 ? 1 : (this.pageNo - 1) < 1 ? 1 : (this.pageNo - 1)); // 이전 페이지 번호
		this.setNextPageNo(this.pageNo == totalPage ? totalPage : (pageNo + 1) > totalPage ? totalPage : (pageNo + 1) ); // 이전 페이지 번호
		
		this.setPrevPageBlockNo(this.startPageNo != 1 ? this.startPageNo - this.pageSize : 1);
		this.setNextPageBlockNo(endPage != totalPage ? endPage + 1: totalPage );
		
		this.setTotalPageNo(totalPage); // 마지막 페이지 번호
		
	}

}
