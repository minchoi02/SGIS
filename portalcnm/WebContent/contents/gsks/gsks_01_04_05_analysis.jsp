<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<%
	String what_year = lData.getString("what_year");
	what_year = what_year + "%";
	String seriesData = "[";
	
	GeneralBroker broker = null;
	RecordModel rm = null;	
	
	try {
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_REQ_ANALYSIS");
		lData.setString("what_year", what_year);
		rm = broker.getList(lData);
		
		
		String sumCnt = "";
		int rowcnt = 0;
		
		String tempSosok[] = {"중앙행정기관","지방자치단체","공사/공단","학술기관","민간"};
		
		while(rm != null && rm.next()) {
			String tempSum = "[";
			String com = ",";
			String tempSeriesData = "";
			for(int i=1; i<13; i++) {
				if(i>9) {
					sumCnt = StringUtil.verify((String)rm.get("Sum"+i));
				} else {
					sumCnt = StringUtil.verify((String)rm.get("Sum0"+i));
				}
				
				if(i == 12) {
					tempSum += sumCnt + "]}";	
				} else {
					tempSum += sumCnt + com;	
				}
			}
			
			tempSeriesData = "{name:'"+tempSosok[rowcnt]+"',data:";
			
			if(rowcnt != 4) {
				seriesData += tempSeriesData + tempSum + com ;	
			} else {
				seriesData += tempSeriesData + tempSum + "]";	
			}
			rowcnt++;
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}
%>

<div style="clear:both; position:relative; overflow:auto; width:730px; height:auto; padding:7px; ">
	<!-- DsearchTable E -->
	<div id="chart"></div>
</div>

<script type="text/javascript">
$(document).ready(function(){
	drawChart("line");
});

function drawChart(iType) {
	var areaData = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
	
	Highcharts.setOptions({
	    lang: {
	    	numericSymbols: null,
	        thousandsSep: ','
	    }
	});
	
    $('#chart').highcharts({
    	credits:{ enabled:false },  //하이차트 로고 안보이게
    	
        chart: {
            type: iType
        },
        title: {
            text: "소속별 자료제공 현황",
            x: -20 //center
        },
        xAxis: {
            categories: areaData
        },
        yAxis: {
        	allowDecimals: false,  //y축 실수 X
            min: 0,
            title: {
                text: '제공건수(건)'
            }
        },
        tooltip: {
            shared: true,
            useHTML: true
        },
        series: <%=seriesData%>,
        legend: {
// 			layout: 'vertical',
			align: 'center',
           	verticalAlign: 'bottom',
           	borderWidth: 0
        }
    });
}

</script>