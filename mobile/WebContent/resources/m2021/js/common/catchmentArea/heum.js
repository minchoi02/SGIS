(function(W, D) {
	function getPadString(data, str, digits){
		var nstr = "";
		if (data.length < digits) {
			for (var i = 0; i < digits - data.length; i++) {
				nstr += str;
			}
		}
		return nstr;
	}
	$.heum = $.heum||{};
	$.heum = $.extend($.heum,{
		/**
		 * @description lpad
		 * @date 2021. 10. 26.
		 * @author 나광흠
		 * @return
		 */
		lpad: function(data, str, digits) {
			data = data.toString();
			return getPadString(data, str, digits) + data;
		},
		/**
		 * @description rpad
		 * @date 2021. 10. 26.
		 * @author 나광흠
		 * @return
		 */
		rpad: function(data, str, digits) {
			data = data.toString();
			return data + getPadString(data, str, digits);
		},
		/**
		 * @description universally unique identifier
		 * @date 2021. 10. 26.
		 * @author 나광흠
		 * @return
		 */
		uuid : function() {
			var d = new Date().getTime();
			var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
				var r = (d + Math.random()*16)%16 | 0;
				d = Math.floor(d/16);
				return (c=='x' ? r : (r&0x3|0x8)).toString(16);
			});
			return uuid;
		},
		/**
		 * @description 파라미터 추출
		 * @date 2021. 10. 26.
		 * @author 나광흠
		 * @return
		 */
		getAllParameter: function(val) {
			var query_string = {};
			var query = window.location.search.substring(1);
			if (val != undefined) { //주소창 url이 아닐경우
				query = val;
			}
			query = query.replace("params=", "");
			if(query){
				var vars = query.split('&');
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split('=');
					if (typeof query_string[pair[0]] === 'undefined') {
						query_string[pair[0]] = pair[1];
					} else if (typeof query_string[pair[0]] === 'string') {
						var arr = [query_string[pair[0]], pair[1]];
						query_string[pair[0]] = arr;
					} else {
						query_string[pair[0]].push(pair[1]);
					}
				}
			}
			return query_string;
		},
		/**
		 * @description 문자가 있는지 여부
		 * @date 2021. 10. 26.
		 * @author 나광흠
		 * @return
		 */
		hasData : function(data){
			if(data===undefined||data===null||data===""){
				return false;
			}else{
				if($.isPlainObject(data)){
					return !$.isEmptyObject(data);
				}else if($.isArray(data)){
					return data.length>0;
				}else{
					return true;
				}
			}
		},
		/**
		 * @description 문자가 있는지 여부
		 * @date 2021. 10. 26.
		 * @author 나광흠
		 * @return
		 */
		setThousandSeparator: function(data,separator){
			var result=null;
			if($.heum.hasData(data)){
				var split = data.toString().split(".");
				result = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator?separator:",");
				if(split.length>1){
					result+="."+split[1];
				}
			}
			return result;
		},
		/**
		 * @description text .으로 나눠서 object화 
		 * @date 2021. 10. 26.
		 * @author 나광흠
		 * @return
		 */
		createObject: function(key,value){
			var s = key.split(".");
			if(s.length==1){
				window[s[0]] = value;
			}else{
				window[s[0]] = window[s[0]]||{};
				var e = window[s[0]];
				for(var i=1;i<s.length;i++){
					if(i==s.length-1){
						e[s[i]] = value;
					}else{
						e[s[i]] = e[s[i]]||{};
						e = e[s[i]];
					}
				}
			}
		}
	});
}(window, document));
