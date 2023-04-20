/** Modified Version (http://ohi.pat.im)
 * Modifier : Pat-Al <pat@pat.im> (https://pat.im/910)
 * Last Update : 2019/08/12
**/
/** Original Version (copy - http://ohi.pat.im/org)
 * Author : Ho-Seok Ee <hsee@korea.ac.kr>
 * Release: 2006/07/18
 * Update : 2011/01/22
 Copyright (C) Ho-Seok Ee <hsee@korea.ac.kr>. All rights reserved.
  The license can be found at http://www.gnu.org/licenses/gpl.txt.
**/
var default_En_type = 'QWERTY';
var default_Ko_type = '2-KSX5002';
var default_ohi_KBD_type = 'QWERTY';
var default_ohi_KE = 'Ko';
var En_type;
var Ko_type;
var ohi_KBD_type;
var ohi_KE;

function option() {
	var enable_double_final_ext;
	var force_normal_typing;
	var only_NFD_hangeul_encoding;
	var enable_old_hangeul_input;
	var phonemic_writing;
	var phonemic_writing_in_single_phoneme;
	var phonemic_writing_in_halfwidth_letter;
	var phonemic_writing_initial_ieung_ellipsis;
	var phonemic_writing_adding_space_every_syllable_end;
	var phonemic_writing_directly;
	var abbreviation;
	var convenience_combination;
	var sunalae;
	var show_layout;
	var turn_off_OHI;
	var square_layout;
}
function initialize_options() {
	var default_enable_double_final_ext = 0;
	var default_enable_sign_ext = 1;
	var default_force_normal_typing = 0;
	var default_only_NFD_hangeul_encoding = 0;
	var default_enable_old_hangeul_input = 0;
	var default_enable_Sin3_diphthong_key = 1;
	var default_enable_adding_cheos_with_shift_key = 1;
	var default_phonemic_writing = 0;
	var default_phonemic_writing_in_single_phoneme = 1;
	var default_phonemic_writing_in_halfwidth_letter = 0;
	var default_phonemic_writing_initial_ieung_ellipsis = 1;
	var default_phonemic_writing_adding_space_every_syllable_end = 0;
	var default_phonemic_writing_directly = 0;
	var default_phonemic_writing_NFD_ggeut_to_cheos = 1;
	var default_abbreviation = 0;
	var default_convenience_combination = 0;
	var default_sunalae = 0;
	var default_square_layout = 0;

	if(typeof En_type != 'undefined') default_En_type = En_type; else En_type = default_En_type;
	if(typeof Ko_type != 'undefined') default_Ko_type = Ko_type; else Ko_type = default_Ko_type;
	if(typeof ohi_KBD_type != 'undefined') default_ohi_KBD_type = ohi_KBD_type; else ohi_KBD_type = default_ohi_KBD_type;
	if(typeof ohi_KE != 'undefined') default_ohi_KE = ohi_KE; else ohi_KE = default_ohi_KE;
	if(typeof enable_sign_ext != 'undefined') default_enable_sign_ext = enable_sign_ext;
	if(typeof force_normal_typing != 'undefined') default_force_normal_typing = force_normal_typing;
	if(typeof phonemic_writing != 'undefined') default_phonemic_writing = phonemic_writing;
	if(typeof phonemic_writing_in_single_phoneme != 'undefined') default_phonemic_writing_in_single_phoneme = phonemic_writing_in_single_phoneme;
	if(typeof phonemic_writing_in_halfwidth_letter != 'undefined') default_phonemic_writing_in_halfwidth_letter = phonemic_writing_in_halfwidth_letter;
	if(typeof phonemic_writing_initial_ieung_ellipsis != 'undefined') default_phonemic_writing_initial_ieung_ellipsis = phonemic_writing_initial_ieung_ellipsis;
	if(typeof phonemic_writing_adding_space_every_syllable_end != 'undefined') default_phonemic_writing_adding_space_every_syllable_end = phonemic_writing_adding_space_every_syllable_end;
	if(typeof phonemic_writing_directly != 'undefined') default_phonemic_writing_directly = phonemic_writing_directly;
	if(typeof square_layout != 'undefined') default_square_layout = square_layout;

	option=new option();
	option.enable_double_final_ext = default_enable_double_final_ext;
	option.enable_sign_ext = default_enable_sign_ext;
	option.force_normal_typing = default_force_normal_typing;
	option.only_NFD_hangeul_encoding = default_only_NFD_hangeul_encoding;
	option.enable_old_hangeul_input = default_enable_old_hangeul_input;
	option.enable_Sin3_diphthong_key = default_enable_Sin3_diphthong_key;
	option.enable_Sin3_adding_cheos_with_shift_key = default_enable_adding_cheos_with_shift_key;
	option.phonemic_writing = default_phonemic_writing;
	option.phonemic_writing_in_single_phoneme = default_phonemic_writing_in_single_phoneme;
	option.phonemic_writing_in_halfwidth_letter = default_phonemic_writing_in_halfwidth_letter;
	option.phonemic_writing_initial_ieung_ellipsis = default_phonemic_writing_initial_ieung_ellipsis;
	option.phonemic_writing_adding_space_every_syllable_end = default_phonemic_writing_adding_space_every_syllable_end;
	option.phonemic_writing_directly = default_phonemic_writing_directly;
	option.phonemic_writing_NFD_ggeut_to_cheos = default_phonemic_writing_NFD_ggeut_to_cheos;
	option.abbreviation = default_abbreviation;
	option.convenience_combination = default_convenience_combination;
	option.sunalae = default_sunalae;

	option.turn_off_OHI = 0;
	option.show_layout = 1;
	option.square_layout = default_square_layout;
}

initialize_options();

var ohiQ = [0,0,0,0,0,0,0,0,0];
var ohiRQ = [0,0,0,0,0,0,0,0,0];
var prev_ohiQ = [];
var prev_ohiRQ = [];
var backup_ohiQ = [];
var backup_ohiRQ = [];
var backspacing_state = 0;
var prev_cursor_position = -1;
var abbreviation_processing_state = 0;
var ohiTimeout = 0;
var bangjeom_input_state = 0
var phoneme_input_state = 0
var ohiHangeul3_HanExtKey = 0;
var shift_lock = 0;
var shift_click = 0;
var shiftlock_click = 0;
var browser = '', browser_ver = 0, nu = navigator.userAgent;
var dkey, ukey;
var pressed_keys = [];

function NFD_stack() {
	var phoneme = [];
	var phoneme_R = [];
	var combined_phoneme = [];
}
function initialize_NFD_stack() {
	NFD_stack.phoneme = [];
	NFD_stack.phoneme_R = [];
	NFD_stack.combined_phoneme = [];
}
initialize_NFD_stack();

var ohi_cheos, ohi_ga, ohi_ggeut, ohi_hotbadchim;
var unicode_NFD_hangeul_phoneme = [], unicode_cheos = [], unicode_ga = [], unicode_ggeut=[];
var unicode_modern_hangeul_phoneme= [], unicode_modern_cheos = [], unicode_modern_ga = [], unicode_modern_ggeut = [];
var compatibility_hangeul_phoneme = [], compatibility_cheos = [], compatibility_ga = [], compatibility_ggeut = [];
var halfwidth_cheos = [], halfwidth_ga = [], halfwidth_ggeut= [];
var current_layout=[];

function browser_detect() {
	var trident=navigator.userAgent.match(/Trident\/(\d\.\d)/i);
	var trident_ver = trident===undefined || !trident ? 0 : parseFloat(trident[1]);
	if(nu.indexOf('MSIE')>=0 || trident_ver>=7) {
		browser = "MSIE";
		if(trident_ver<7) browser_ver = parseFloat(nu.substring(nu.indexOf("MSIE ")+5));
		else if(trident_ver==7) browser_ver=11;
	}
	else if(nu.indexOf('Firefox')>=0) {
		browser = "Firefox";
		browser_ver = parseFloat(nu.substring(nu.indexOf('Firefox/')+8));
	}
	else if(nu.indexOf('Chrome')>=0) {
		browser = "Chrome";
		browser_ver = parseFloat(nu.substring(nu.indexOf('Chrome/')+7));
	}
}
function ohiBackspace(f) {
	if(document.selection && browser=='MSIE' && browser_ver<9) {
		var s=document.selection.createRange();
		s.moveStart('character', -f.value.length);
		var pos = s.text.length;
		if(f.setSelectionRange) {
			f.setSelectionRange(pos-1,pos);
			f.text='';
		}
		else if(f.createTextRange) {
			var range = f.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos-length);
			range.select();
			range.text = '';

			var scrollTop = f.scrollTop, scrollLeft = f.scrollLeft, selectionStart = f.selectionStart;
			var endText = f.value.substr(f.selectionEnd,f.value.length);
			f.value = f.value.substr(0,selectionStart)+String.fromCharCode(c);
			var scrollHeight = f.scrollHeight, scrollWidth = f.scrollWidth;
			f.value += endText;
			if(c==13 && browser=='MSIE' && browser_ver==11 && !endText.length) {
			// IE 11에서 뒤에 아무 문자 없을 때 줄을 바꾸면 한글 조합이 안 됨
				f.value += String.fromCharCode(32);
			}
			f.scrollTop = (scrollTop > scrollHeight-f.clientHeight) ? scrollTop : scrollHeight-f.clientHeight;
			f.scrollLeft = (scrollLeft > scrollWidth-f.clientWidth) ? scrollLeft : scrollWidth-f.clientWidth;
			f.setSelectionRange(m || c<32 ? selectionStart:selectionStart+1, selectionStart+1);
		}
	}
	else {
		var bs_start = f.selectionStart;
		var bs_end = f.selectionEnd;
		if(!bs_end) return;
		if(bs_start == bs_end) {
			if(!NFD_stack.phoneme.length && prev_cursor_position<0) {
				var i=0, ggeut=0, bangjeom=0;
				do {
					var code = f.value.substr(bs_start-i-1,1).charCodeAt(0);
					if(!i && unicode_NFD_hangeul_sidedot.indexOf(code)>=0) {bangjeom=1; continue;}
					if(bangjeom) {
						if(i==1 && code==0x1160) continue;
						if(i==2) {
							if(code==0x115F) continue;
							else --i;
						}
						break;
					}
					if(!i && unicode_ggeut.indexOf(code)>=0) {ggeut=1; continue;}
					if(i-ggeut==0 && (code==0x1160 || unicode_ga.indexOf(code)>=0)) continue;
					if(i-ggeut==0 && (code==0x1160 || unicode_ga.indexOf(code)>=0)) continue;
					if(i-ggeut==1 && (code==0x115F || unicode_cheos.indexOf(code)>=0)) continue;
					break;
				} while(bs_start-(++i));
			}
			bs_start -= i?i:1;
		}
		f.value = f.value.substr(0,bs_start)+f.value.substr(bs_end);
		f.selectionStart = f.selectionEnd = bs_start;
	}
	ohiInsert(f,0,0);
}
function ohiHangeul_backspace(f,e) {
	var i,j;
	var KE=ohi_KE;

	if(e.preventDefault) e.preventDefault();
	if(ohiQ[1] || ohiQ[4] || ohiQ[0]&&ohiQ[3]) {
		if( $("#vkey").data("johab") ){
			for(i=8; !ohiQ[i];) i--;
			backspacing_state=1;
			ohiInsert(f,ohiQ[i]=0,ohiQ);
			backspacing_state=0;
			ohiRQ[i]=0;
			return false;
		}
	}
	if(KE=='Ko' && NFD_stack.phoneme.length) {
		if(!ohiHangeul3_HanExtKey) {
			ohiBackspace(f);
			if(browser=="MSIE" && browser_ver<9 ) { // IE ~8
				i=NFD_stack.combined_phoneme.length-1; while(i--) ohiBackspace(f);
			}
			var temp_NFD_stack_phoneme = NFD_stack.phoneme.slice();
			var temp_NFD_stack_phoneme_R = NFD_stack.phoneme_R.slice();
			initialize_NFD_stack();
			for(j=0, i=temp_NFD_stack_phoneme.length-1; i>=1; --i)
				if(unicode_NFD_hangeul_filler.indexOf(temp_NFD_stack_phoneme[i])>=0) ++j;
			if(j!=temp_NFD_stack_phoneme.length-1) {
				for(i=temp_NFD_stack_phoneme.length-1; i>=1; --i) {
					NFD_hangeul_input(f,0,(temp_NFD_stack_phoneme_R[i] ? -1:1)*temp_NFD_stack_phoneme[i]);
					NFD_stack.phoneme_R[i-1] = temp_NFD_stack_phoneme_R[i];
				}
			}
		}
		if(!is_old_hangeul_input() && !option.only_NFD_hangeul_encoding) {
			for(i=0;i<NFD_stack.combined_phoneme.length;++i) {
				if(unicode_modern_hangeul_phoneme.indexOf(NFD_stack.combined_phoneme[i])<0 && unicode_NFD_hangeul_filler.indexOf(NFD_stack.combined_phoneme[i])<0) break;
			}
			if(i==NFD_stack.combined_phoneme.length) {
				ohiBackspace(f);
				if(browser=="MSIE" && browser_ver<9 ) {
					i=NFD_stack.combined_phoneme.length-1;
					while(i--) ohiBackspace(f);
				}
				initialize_NFD_stack();
				ohiQ = backup_ohiQ.slice();
				ohiRQ = backup_ohiRQ.slice();
				for(i=9;i>=0;--i) {
					if(ohiQ[i]) {
						ohiQ[i]=0;
						ohiRQ[i]=0;
						break;
					}
				}
				ohiInsert(f,0,ohiQ);
			}
		}
		return false;
	}
	return true;
}
function ohiDoubleJamo(a,c,d) {
	var i, j=[
		[ [1,7,18,21,24],1,7,18,21,24 ], // Cho
		[ [39,44,49],[31,32,51],[35,36,51],51 ], // Jung
		[ [1,4,9,18,21],[1,21],[24,30],[1,17,18,21,28,29,30],[0,21],21 ] // Jong
	];
	a=j[a];
	for(i=a[0].length; c!=a[0][i-1]; i--) if(!i) return i;
	for(a=a[i], i=a.length||1; 1; i--) if(!i || d==a || d==a[i-1]) return i;
}
function ohiInsert(f,m,q) {
	var a,b,c=q,d=m?1:0,g=0,h=0,i=0,j=0,k=0,u=0;

	if(!q) {
		ohiQ = ohiRQ = prev_ohiQ = prev_ohiRQ = [0,0,0,0,0,0,0,0,0];
		return true;
	}
	if(q.length!=9) ohiQ = ohiRQ = [0,0,0,0,0,0,0,0,0];
	else {
		for(a=0;a<9;++a) {
			if(q[a]>0) ++h;
			if(unicode_NFD_hangeul_phoneme.indexOf(ohiQ[a])>=0) ++u;
		}
		if(!u) {
			var m=m||'0,0,0,0,0,0,0,0,0', i=q[0]+q[1]+q[2], j=q[3]+q[4]+q[5], k=q[6]+q[7]+q[8];
			c=i&&j?0xac00+(i-(i<3?1:i<5?2:i<10?4:i<20?11:12))*588+(j-31)*28+k-(k<8?0:k<19?1:k<25?2:3):0x3130+(i||j||k);
		}
		else if(!NFD_stack.phoneme.length && !is_old_hangeul_input()) {
			backup_ohiQ = ohiQ.slice();	
			backup_ohiRQ = ohiRQ.slice();
			if(h>1) ohiBackspace(f);
			for(a=0;a<3;++a) {
				c=backup_ohiQ[a*3]+backup_ohiQ[a*3+1]+backup_ohiQ[a*3+2];
				if(!c) continue;
				if(c<158) c+=!a?127:a==1?35:0;
				c=convert_into_unicode_hangeul_phoneme(c);
				if(c) NFD_hangeul_input(f,0,c);
			}
			return;
		}
	}

	if(!bangjeom_input_state && unicode_NFD_hangeul_sidedot.indexOf(c)>=0) {
		if(ohiQ[0]+ohiQ[3]+ohiQ[6]+NFD_stack.phoneme.length) {
			complete_hangeul_syllable(f);
		}
		else {
			ohiInsert(f,0,0x115F);
			ohiInsert(f,0,0x1160);
		}
		bangjeom_input_state = 1;
		ohiInsert(f,0,c);
		bangjeom_input_state = 0;
		return;
	}
	if((is_phonemic_writing_input() || option.only_NFD_hangeul_encoding && !is_old_hangeul_input()) && !phoneme_input_state && !backspacing_state) {
		if(is_phonemic_writing_input() && option.phonemic_writing_directly && !option.only_NFD_hangeul_encoding && i+j+k) {
			if(option.phonemic_writing_in_halfwidth_letter && !is_old_hangeul_input()) c=convert_into_halfwidth_hangeul_letter(c);
			else c=convert_into_compatibility_hangeul_letter(c);
			ohiInsert(f,0,c);
			return;
		} else {
			for(a=0;a<9;++a) if(prev_ohiQ[a]>0) ++g;
			if(g>0 && h<2 || d) {
				phoneme_input_state=1;
				ohiQ = prev_ohiQ.slice();
				if(ohiQ[0]+ohiQ[3]+ohiQ[6])	{
					if(Ko_type.substr(0,2)=='2-' && h&&i&&j)
						for(a=8;a>=0;--a)	if(ohiQ[a]) {	ohiQ[a]=0; break;	}
					complete_hangeul_syllable(f);
					if(is_phonemic_writing_input() && option.phonemic_writing_adding_space_every_syllable_end && h && i+j+k) ohiInsert(f,0,32);
				}
				ohiQ=[h&&i?i:0,0,0,h&&j?j:0,0,0,h&&k?k:0,0,0];
				phoneme_input_state=0;
			}
		}
	}
	if(is_moachigi_input() && NFD_stack.phoneme.length && unicode_NFD_hangeul_code.indexOf(c)<0) complete_hangeul_syllable(f);
	if(document.selection && browser=="MSIE" && browser_ver<10 ) { // IE ~9
		var s=document.selection.createRange(), t=s.text;
		if(t && document.selection.clear) document.selection.clear();
		s.text=(m=='0,0,0,0,0,0,0,0,0'||c&&t.length>1?'':t.substr(0,t.length))+String.fromCharCode(c);
		if(!c || !m || s.moveStart('character',-1)) s.select();
	}
	else if(f.selectionEnd+1) {
		if(m!='0,0,0,0,0,0,0,0,0' && f.selectionEnd-f.selectionStart==1) f.selectionStart++;
		var e=document.createEvent('KeyboardEvent');
		if(e.initKeyEvent && !(browser=="Firefox" && browser_ver>=12 ) && browser!="Chrome") { // Gecko
			e.initKeyEvent('keypress',0,0,null,0,0,0,0,127,c);
			if(c && f.dispatchEvent(e) && m) f.selectionStart--;
		} else { // Firefox 12~, Chrome
			var scrollTop = f.scrollTop, scrollLeft = f.scrollLeft, selectionStart = f.selectionStart;
			var endText = f.value.substr(f.selectionEnd,f.value.length);
			f.value = f.value.substr(0,selectionStart)+String.fromCharCode(c);
			var scrollHeight = f.scrollHeight, scrollWidth = f.scrollWidth;
			f.value += endText;
			if(c==13 && browser=='MSIE' && browser_ver==11 && !endText.length) f.value += String.fromCharCode(32); // IE 11에서 뒤에 아무 문자 없을 때 줄을 바꾸면 한글 조합이 안 됨
			f.scrollTop = (scrollTop > scrollHeight-f.clientHeight) ? scrollTop : scrollHeight-f.clientHeight;
			f.scrollLeft = (scrollLeft > scrollWidth-f.clientWidth) ? scrollLeft : scrollWidth-f.clientWidth;
			f.setSelectionRange(m || c<32 ? selectionStart:selectionStart+1, selectionStart+1);
		}
	}

	prev_ohiQ = ohiQ.slice();
	prev_ohiRQ = ohiRQ.slice();
}
function ohiSelection(f,length) {
	if(document.selection && browser=="MSIE" && browser_ver<9) { // IE ~8
	}
	else if(f.selectionEnd+1) {
		var e=document.createEvent('KeyboardEvent');
		if(e.initKeyEvent && !(browser=="Firefox" && browser_ver>=12 ) && browser!="Chrome") f.selectionStart-=length; // Gecko
		else f.selectionStart=f.selectionEnd-length; // Firefox 12~, Chrome
	}
}
function change_syllable_from_NFC_to_NFD(f) {
	var _ohiQ = ohiQ.slice(), _ohiRQ = ohiRQ.slice();
	ohiBackspace(f);

	i=ohi_cheos.indexOf(_ohiQ[0]+_ohiQ[1]+_ohiQ[2]+127);
	if(i>=0 && _ohiQ[0]+_ohiQ[1]+_ohiQ[2]) ohiInsert(f,0,unicode_cheos[i]);
	else ohiInsert(f,0,0x115F);

	i=ohi_ga.indexOf(_ohiQ[3]+_ohiQ[4]+_ohiQ[5]+35);
	if(i>=0 && _ohiQ[3]+_ohiQ[4]+_ohiQ[5]) ohiInsert(f,0,unicode_ga[i]);
	else ohiInsert(f,0,0x1160);

	i=ohi_ggeut.indexOf(_ohiQ[6]+_ohiQ[7]+_ohiQ[8]);
	if(i>=0 && _ohiQ[6]+_ohiQ[7]+_ohiQ[8]) ohiInsert(f,0,unicode_ggeut[i]);
}
function change_syllable_from_NFD_to_NFC(f) {
	var i,j;

	if(unicode_modern_cheos.indexOf(NFD_stack.combined_phoneme[1])>=0 && unicode_modern_ga.indexOf(NFD_stack.combined_phoneme[0])>=0
	 || unicode_modern_cheos.indexOf(NFD_stack.combined_phoneme[2])>=0 && unicode_modern_ga.indexOf(NFD_stack.combined_phoneme[1])>=0 && unicode_modern_ggeut.indexOf(NFD_stack.combined_phoneme[0])>=0) {
		i=NFD_stack.combined_phoneme.length;
		for(j=0;j<i;++j) ohiBackspace(f);
		ohiQ = [NFD_stack.combined_phoneme[i-1]-0x1100+11+(NFD_stack.combined_phoneme[i-1]>0x1108 ? 1:0),0,0,
			NFD_stack.combined_phoneme[i-2]-0x1161+31,0,0,
			i==3 ? (NFD_stack.combined_phoneme[0]-0x11A8+1+(NFD_stack.combined_phoneme[0]>0x11AE ? 1:0)+(NFD_stack.combined_phoneme[0]>0x11B8 ? 1:0)+(NFD_stack.combined_phoneme[0]>0x11BD ? 1:0)):0,0,0
		];
		ohiInsert(f,0,ohiQ);
		if(typeof f.selectionEnd != 'undefined') f.selectionStart = f.selectionEnd;
		return;
	}

	if(!is_old_hangeul_input() && NFD_stack.combined_phoneme.length==2 && (unicode_NFD_hangeul_filler.indexOf(NFD_stack.combined_phoneme[1])>=0 ^ unicode_NFD_hangeul_filler.indexOf(NFD_stack.combined_phoneme[0])>=0)) {
		var NFD_to_compatibility_phoneme_list = [
			0x119E, 0x318D,	// 아래아(ㆍ)
			0x11A1, 0x318E	// 아래애(ㆎ)
		];

		i = NFD_to_compatibility_phoneme_list.indexOf(unicode_NFD_hangeul_filler.indexOf(NFD_stack.combined_phoneme[1])>=0 ? NFD_stack.combined_phoneme[0] : NFD_stack.combined_phoneme[1]);
		if(i>=0) {
			for(j=0;j<NFD_stack.combined_phoneme.length;++j) ohiBackspace(f);
			ohiInsert(f,0,NFD_to_compatibility_phoneme_list[i+1]);
		}
	}
}
function combine_unicode_NFD_hangeul_phoneme(c1,c2) {
	var i;
	var combination_table;
	var combined_phoneme;
	if( !( typeof current_layout.moachigi_hangeul_combination_table != 'undefined' && typeof current_layout.hangeul_combination_table == 'undefined' )) {
		combination_table=hangeul_combination_table_default;
		if(is_old_hangeul_input()) combination_table=hangeul_combination_table_full;

		if(!option.enable_old_hangeul_input && typeof current_layout.hangeul_combination_table != 'undefined' && typeof current_layout.hangeul_combination_table.length != 'undefined' && current_layout.hangeul_combination_table.length)
			combination_table = current_layout.hangeul_combination_table;

		if(option.convenience_combination && typeof current_layout.hangeul_convenience_combination_table != 'undefined' && !is_old_hangeul_input())
			combination_table = combination_table.concat(current_layout.hangeul_convenience_combination_table);

		if(current_layout.type_name.substr(-2)=='-y' && typeof current_layout.combination_table != 'undefined')
			combination_table = current_layout.combination_table;
		else if(option.enable_old_hangeul_input) {
			if(typeof current_layout.old_hangeul_layout_type_name != 'undefined' && typeof find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).combination_table != 'undefined')
				combination_table = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).combination_table;
		}
		var combined_phoneme=0x10000*c1+c2;
		for(i=0; i<combination_table.length; ++i) {
			if(combined_phoneme==combination_table[i][0]) {
				combined_phoneme=combination_table[i][1];
				break;
			}
		}
		if(i==combination_table.length) return 0;
		return combined_phoneme;
	}
}
function complete_hangeul_syllable(f) {
	if(typeof f == 'undefined' || !f) f = document.getElementById($keyTarget);
	var c,i,j,k;

	if(NFD_stack.phoneme.length) {
		for(j=0, i=NFD_stack.phoneme.length-1; i>=0; --i) 
			if(unicode_NFD_hangeul_filler.indexOf(NFD_stack.phoneme[i])>=0) ++j;
		if(j==NFD_stack.phoneme.length)
			for(i=0;i<NFD_stack.combined_phoneme.length;++i) ohiBackspace(f);
	}

	if(ohiQ[0]+ohiQ[3]+ohiQ[6] || NFD_stack.phoneme.length) ohiSelection(f,0);

	else if(!option.only_NFD_hangeul_encoding && NFD_stack.phoneme.length) change_syllable_from_NFD_to_NFC(f);
	else if(option.only_NFD_hangeul_encoding && !is_old_hangeul_input() && ohiQ[0]+ohiQ[3]+ohiQ[6]) change_syllable_from_NFC_to_NFD(f);

	ohiInsert(f,0,0);
	initialize_NFD_stack();
	if(!abbreviation_processing_state) prev_cursor_position = -1;
}
function convert_into_ohi_hangeul_phoneme(c) {
	if(unicode_modern_cheos.indexOf(c)>=0) c=ohi_cheos[unicode_modern_cheos.indexOf(c)];
	else if(unicode_modern_ga.indexOf(c)>=0) c=ohi_ga[unicode_modern_ga.indexOf(c)];
	else if(unicode_modern_ggeut.indexOf(c)>=0) c=ohi_ggeut[unicode_modern_ggeut.indexOf(c)];
	else if(compatibility_ga.indexOf(c)>=0) c=ohi_ga[compatibility_ga.indexOf(c)];

	return c;
}
function convert_into_unicode_hangeul_phoneme(c) {
	if(ohi_cheos.indexOf(c)>=0) c=unicode_cheos[ohi_cheos.indexOf(c)];
	else if(ohi_ga.indexOf(c)>=0) c=unicode_ga[ohi_ga.indexOf(c)];
	else if(ohi_ggeut.indexOf(c)>=0) c=unicode_ggeut[ohi_ggeut.indexOf(c)];
	return c;
}
function convert_into_compatibility_hangeul_letter(c) {
	c=convert_into_unicode_hangeul_phoneme(c);

	old_hangeul_cheos = [0x1140,0x114C,0x1159];
	old_hangeul_ga = [0x119E];
	old_hangeul_ggeut = [0x11EB,0x11F0,0x11F9];
	compatibility_yeshangeul_dah = [0x317F,0x3181,0x3186]; // ㅿ,ㆁ,ㆆ
	compatibility_yeshangeul_hol = [0x318D]; // ㆍ

	if(unicode_modern_cheos.indexOf(c)>=0) c=compatibility_cheos[unicode_modern_cheos.indexOf(c)];
	else if(unicode_modern_ga.indexOf(c)>=0) c=compatibility_ga[unicode_modern_ga.indexOf(c)];
	else if(unicode_modern_ggeut.indexOf(c)>=0) c=compatibility_ggeut[unicode_modern_ggeut.indexOf(c)];
	else if(old_hangeul_cheos.indexOf(c)>=0)	c=compatibility_yeshangeul_dah[old_hangeul_cheos.indexOf(c)];
	else if(old_hangeul_ga.indexOf(c)>=0) c=compatibility_yeshangeul_hol[old_hangeul_ga.indexOf(c)];
	else if(old_hangeul_ggeut.indexOf(c)>=0) c=compatibility_yeshangeul_dah[old_hangeul_ggeut.indexOf(c)];

	return c;
}
function convert_into_halfwidth_hangeul_letter(c) {
	c=convert_into_unicode_hangeul_phoneme(c);

	if(unicode_modern_cheos.indexOf(c)>=0) c=halfwidth_cheos[unicode_modern_cheos.indexOf(c)];
	else if(unicode_modern_ga.indexOf(c)>=0) c=halfwidth_ga[unicode_modern_ga.indexOf(c)];
	else if(unicode_modern_ggeut.indexOf(c)>=0) c=halfwidth_ggeut[unicode_modern_ggeut.indexOf(c)];
	else if(compatibility_cheos.indexOf(c)>=0) c=halfwidth_cheos[compatibility_cheos.indexOf(c)];
	else if(compatibility_ga.indexOf(c)>=0) c=halfwidth_ga[compatibility_ga.indexOf(c)];
	else if(compatibility_ggeut.indexOf(c)>=0) c=halfwidth_ggeut[compatibility_ggeut.indexOf(c)];

	return c;
}
function ohiRoman(f,e,key) {
	var c=key;
	if(En_type!='QWERTY') c=current_layout.layout[key-33];
	ohiInsert(f,0,c);
}
function ohiHangeul2(f,e,key) { // 2-Beolsik
	if((Ko_type.indexOf('KSX5002')>=0 || Ko_type=='2-KPS9256') && (key<65 || (key-1)%32>25)) {
		complete_hangeul_syllable(f);
		ohiInsert(f,0,key);
		return;
	}

	var c;
	var layout_info = current_layout;
	if(is_old_hangeul_input() && typeof current_layout.old_hangeul_layout_type_name != 'undefined')	layout_info = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name);
	var layout = layout_info.layout;

	if(typeof layout != 'undefined') {
		c = convert_into_ohi_hangeul_phoneme(layout[key-33]);

		if(!c || c==0x1B) { // 글쇠값이 0 또는 escape이면 조합 끊기
			complete_hangeul_syllable(f);
			return;
		}
		
		if( !$("#vkey").data("johab") ){
			complete_hangeul_syllable(f);
			$("#vkey").data("johab", true);
		}

		if(c==layout[key-33]) {
			ohiInsert(f,0,c);
			return;
		}

		if(ohi_cheos.indexOf(c)>=0) c-=127;
		else if(ohi_ga.indexOf(c)>=0) c-=35;
		else if(ohi_ggeut.indexOf(c)>=0) c-=127;
	}
	else {
		if(Ko_type=='2-KSX5002')
			c=[17,48,26,23,7,9,30,39,33,35,
 			   31,51,49,44,32,36,18,1,4,21,
 			   37,29,24,28,43,27][key%32-1]; // a~z
		if(Ko_type=='2-KPS9256')
			c=[24,48,26,23,7,4,21,39,35,31,
			   51,49,33,43,32,36,18,9,1,30,
			   44,29,17,28,37,27][key%32-1];

		if(key>64 && key<91) {
			c += c==32||c==36?2:c==18||c==7||c==24||c==1||c==21?1:0;
		}
	}

	if(c<31) { // Jaum
		if((!ohiQ[7] || !(ohiQ[0]=-1)) && ohiQ[3]) ohiQ[7]=ohiDoubleJamo(2,ohiQ[6],c);
		if(!ohiQ[3] || ohiQ[0]<0 || ohiQ[0] && (!ohiQ[6] || !ohiQ[7]) && (ohiQ[6] || c==8 || c==19 || c==25))
			ohiInsert(f,(ohiQ=ohiQ[1]||ohiQ[3]||!ohiDoubleJamo(0,ohiQ[0],c)?ohiQ:0),ohiQ=[c,ohiQ?0:1,0,0,0,0,0,0,0]);
		else if(!ohiQ[0] && ohiQ[3]) {
			complete_hangeul_syllable(f);
			ohiInsert(f,0,ohiQ=[c,0,0,0,0,0,0,0,0]);
		}
		else if(!ohiQ[0] && (ohiQ[0]=c) || (ohiQ[6]=ohiQ[6]||c)) ohiInsert(f,0,ohiQ);
		if(ohiQ[7]) ohiQ[7]=c;
	}
	else {
		if(option.sunalae || Ko_type.substr(0,5)=='2-sun') {
			if(ohiQ[3]==c && !ohiQ[1] && !ohiQ[6] && (ohiQ[0]==1 || ohiQ[0]==7 || ohiQ[0]==18 || ohiQ[0]==21 || ohiQ[0]==24)) {
				ohiQ[1]=1;
				ohiInsert(f,0,ohiQ);
				return;
			}
		}
		if(option.sunalae || Ko_type=='2-KPS9256' || Ko_type.substr(0,5)=='2-sun' || Ko_type=='2-Gaon26KM') {
			if((ohiQ[3]==37 || ohiQ[3]==33) && c==51 && !ohiQ[6]) {
				ohiQ[4]=1;
				ohiInsert(f,0,ohiQ);
				return;
			}
		}
		if((!ohiQ[4] || ohiQ[6] || !(ohiQ[3]=-1)) && !ohiQ[6]) ohiQ[4]=ohiDoubleJamo(1,ohiQ[3],c);
		if((ohiQ[0] && ohiQ[3]>0 && ohiQ[6]) && (ohiQ[7] || !(ohiQ[7]=ohiQ[6]) || !(ohiQ[6]=0))) {
			ohiInsert(f,0,[ohiQ[0],ohiQ[1],0,ohiQ[3],ohiQ[4],0,ohiQ[6],0,0]);
			ohiInsert(f,ohiQ,ohiQ=[ohiQ[7],0,0,c,0,0,0,0,0]);
		}
		else if((!ohiQ[0] || ohiQ[3]) && (!ohiQ[4] || ohiQ[6]) || ohiQ[3]<0) ohiInsert(f,ohiQ,ohiQ=[0,0,0,c,0,0,0,0,0]);
		else if(ohiQ[3]=ohiQ[3]||c) ohiInsert(f,0,ohiQ);
	}
}
function NFD_hangeul_input(f,key,c) {
	if(c==0x1160 && NFD_stack.phoneme[0]==0x1160) return;
	if(unicode_NFD_hangeul_sidedot.indexOf(c)>=0) {
		ohiInsert(f,0,c);
		return;
	}
	ohiSelection(f,0);
	var diphthong=0;

	if(c<0) {
		c=-c;
		diphthong=1;
	}
	var type_name='';
	if(typeof current_layout.type_name != 'undefined') type_name = current_layout.type_name;
	else if(is_old_hangeul_input() && typeof current_layout.old_hangeul_layout_type_name != 'undefined') type_name = current_layout.old_hangeul_layout_type_name;

	if(!is_old_hangeul_input() && !option.only_NFD_hangeul_encoding) c = convert_into_unicode_hangeul_phoneme(c);

	if(NFD_stack.phoneme[0]!=0x1160 && NFD_stack.combined_phoneme[0]==0x1160 && unicode_cheos.indexOf(NFD_stack.combined_phoneme[1])>=0 && (unicode_NFD_hangeul_phoneme.indexOf(c)>=0 || c==0x1160)) {
		ohiBackspace(f);
		NFD_stack.combined_phoneme.splice(0,1);
	}

	if(c==0x1160) {
		if(unicode_ga.indexOf(NFD_stack.phoneme[0])>=0 || NFD_stack.phoneme[0]==0x1160) {
			complete_hangeul_syllable(f);
			if(is_phonemic_writing_input() && option.phonemic_writing_adding_space_every_syllable_end) ohiInsert(f,0,32);
		}
		if(!NFD_stack.phoneme.length) {
			NFD_stack.combined_phoneme.unshift(0x115F);
			ohiInsert(f,0,0x115F); // 첫소리 채움			
		}
		if(NFD_stack.combined_phoneme[0]!=0x1160) {
			NFD_stack.phoneme.unshift(c);
			NFD_stack.phoneme_R.unshift(0);
			NFD_stack.combined_phoneme.unshift(0x1160);
			ohiInsert(f,0,0x1160);
		}

		ohiSelection(f,NFD_stack.combined_phoneme.length);
		return;
	}

	var combination_table=hangeul_combination_table_full;
	if(typeof current_layout.hangeul_combination_table != 'undefined') combination_table=current_layout.hangeul_combination_table;

	var combined_phoneme=combine_unicode_NFD_hangeul_phoneme(NFD_stack.combined_phoneme[0],c);

	if(!combined_phoneme&&unicode_cheos.indexOf(c)>=0 || unicode_NFD_hangeul_code.indexOf(c)<0) {
		if(unicode_cheos.indexOf(NFD_stack.phoneme[0])>=0 && NFD_stack.combined_phoneme.indexOf(0x1160)<0) {
			ohiInsert(f,0,0x1160);
			NFD_stack.combined_phoneme.unshift(0x1160);
		}
		i = unicode_NFD_hangeul_code.indexOf(c)>=0 && NFD_stack.phoneme.length ? 1 : 0;
		complete_hangeul_syllable(f);
		if(i && is_phonemic_writing_input() && option.phonemic_writing_adding_space_every_syllable_end) ohiInsert(f,0,32);
	}

	if(!combined_phoneme && unicode_ga.indexOf(c)>=0 && unicode_cheos.indexOf(NFD_stack.phoneme[0])<0) {
		i = unicode_NFD_hangeul_code.indexOf(c)>=0 && NFD_stack.phoneme.length ? 1 : 0;
		complete_hangeul_syllable(f);
		if(i && option.phonemic_writing_adding_space_every_syllable_end && is_phonemic_writing_input()) ohiInsert(f,0,32);
		ohiInsert(f,0,0x115F);
		NFD_stack.combined_phoneme = [];
		NFD_stack.combined_phoneme.unshift(0x115F);
	}
	else if(!combined_phoneme && unicode_ggeut.indexOf(c)>=0) {
		if(!is_old_hangeul_input() && !option.only_NFD_hangeul_encoding && NFD_stack.combined_phoneme.length==2 && unicode_ga.indexOf(NFD_stack.combined_phoneme[0])>=0 && unicode_cheos.indexOf(NFD_stack.combined_phoneme[1])<0) {
			complete_hangeul_syllable(f);
			ohiInsert(f,0,ohiQ=[convert_into_ohi_hangeul_phoneme(c),0,0,0,0,0,0,0,0]);
			return;
		}
		
		if(unicode_cheos.indexOf(NFD_stack.phoneme[0])>=0 && NFD_stack.combined_phoneme.indexOf(0x1160)<0) {
			ohiInsert(f,0,0x1160);
			NFD_stack.combined_phoneme.unshift(0x1160);
		}
		else if(unicode_cheos.indexOf(NFD_stack.phoneme[0])<0 && unicode_ga.indexOf(NFD_stack.phoneme[0])<0 && NFD_stack.combined_phoneme.indexOf(0x115F)<0 && NFD_stack.combined_phoneme.indexOf(0x1160)<0) {
			i = unicode_NFD_hangeul_code.indexOf(c)>=0 && NFD_stack.phoneme.length ? 1 : 0;
			complete_hangeul_syllable(f);
			if(i && is_phonemic_writing_input() && option.phonemic_writing_adding_space_every_syllable_end) ohiInsert(f,0,32);
			ohiInsert(f,0,0x115F);
			ohiInsert(f,0,0x1160);
			NFD_stack.combined_phoneme.unshift(0x1160,0x115F);
		}
	}

	NFD_stack.phoneme.unshift(c);
	NFD_stack.phoneme_R.unshift(diphthong);

	if(combined_phoneme) {
		NFD_stack.combined_phoneme[0] = combined_phoneme;
		ohiBackspace(f);
		ohiInsert(f,0,combined_phoneme);
	}
	else {
		if(unicode_ggeut.indexOf(c)>=0 && unicode_ggeut.indexOf(NFD_stack.combined_phoneme[0])>=0) {
			complete_hangeul_syllable(f);
			ohiInsert(f,0,0x115F);
			ohiInsert(f,0,0x1160);
			NFD_stack.combined_phoneme.unshift(0x1160,0x115F);
		}
		NFD_stack.combined_phoneme.unshift(c);
		ohiInsert(f,0,c);
	}

	if(unicode_cheos.indexOf(c)>=0) {
		ohiInsert(f,0,0x1160);
		NFD_stack.combined_phoneme.unshift(0x1160);
	}

	if(NFD_stack.combined_phoneme.length && unicode_NFD_hangeul_phoneme.indexOf(c)>=0) {
		ohiSelection(f,NFD_stack.combined_phoneme.length);
	}
}
function is_moachigi_input() {
	if(current_layout.type_name.substr(0,3)!='3m-') return false;
	if(option.force_normal_typing) return false;
	return true;
}
function is_old_hangeul_input() {
	if(current_layout.type_name && current_layout.type_name.substr(-2)=='-y') return true;
	if(option.enable_old_hangeul_input && typeof current_layout.old_hangeul_layout_type_name != 'undefined')	return true;
	return false;
}
function is_phonemic_writing_input() {
	if(option.phonemic_writing) return true;
	return false;
}
function push_to_key_table(u,d,t) {
	u.push(
		[t[93],t[0],t[31],t[2],t[3],t[4],t[61],t[5],t[9],t[7],t[8],t[62],t[10],''],
		['',t[48],t[54],t[36],t[49],t[51],t[56],t[52],t[40],t[46],t[47],t[90],t[92],t[91]],
		['',t[32],t[50],t[35],t[37],t[38],t[39],t[41],t[42],t[43],t[25],t[1],''],
		['',t[57],t[55],t[34],t[53],t[33],t[45],t[44],t[27],t[29],t[30],'']);
	d.push(
		[t[63],t[16],t[17],t[18],t[19],t[20],t[21],t[22],t[23],t[24],t[15],t[12],t[28],''],
		['',t[80],t[86],t[68],t[81],t[83],t[88],t[84],t[72],t[78],t[79],t[58],t[60],t[59]],
		['',t[64],t[82],t[67],t[69],t[70],t[71],t[73],t[74],t[75],t[26],t[6],''],
		['',t[89],t[87],t[66],t[85],t[65],t[77],t[76],t[11],t[13],t[14]],'');
}
function push_layout_to_key_table(u,d,b) {
	var c,bas=[];
	for(var i=0;i<94;++i) {
		c=String.fromCharCode(b[i]);
		if(b[i]<0) c=0;
		bas.push(c);
	}
	push_to_key_table(u,d,bas);
}
function show_keyboard_layout(type) {
	$("body").append('<div id="vkey"><div id="keyboardLayout"></div></div>');
	
	var rows = document.getElementById('keyboardLayout');
	if(!rows) return false;

	var opts, opt;
	var inner_html='';
	shift_click=0;
	var KE = ohi_KE;

	if(!option.show_layout) return; //1

	var layout=[], ue=[], de=[], uh=[], dh=[], l=[];
	layout = find_layout_info('En', En_type).layout;
	
	for(i=0;i<layout.length;++i){
		l[i]=String.fromCharCode(layout[i]);
	}
	
	push_to_key_table(ue,de,l);

	ue[0][13] = '←';	//Back space
	ue[1][0] = 'Tab';
	ue[2][0] = ue[3][0] = ue[3][11] = 'Shift';
	de[2][0] = 'Lock';
	de[3][0] = de[3][11] = ' ';
	ue[2][12] = 'Enter';
	
	for(i=0;i<ue.length;++i)
		for(j=0;j<ue[i].length;++j)
			if(typeof de[i][j] != 'undefined' && ue[i][j].toLowerCase()==de[i][j].toLowerCase()){
				de[i][j]='　';
			}
	
	if(KE=='Ko') {
		if(typeof current_layout != 'undefined' && typeof current_layout.layout != 'undefined') { // 옛한글 배열
			layout=current_layout.layout;
			if(option.enable_old_hangeul_input && typeof current_layout.old_hangeul_layout_type_name != 'undefined'){
				layout = find_layout_info(KE, current_layout.old_hangeul_layout_type_name).layout;
			}
			push_layout_to_key_table(uh, dh, layout);
		}
	}

	ue.push(['Space','한/영','clear']);
	de[4] = ['','',''];	
	
	inner_html += '<div style="width:100%;text-align:right;height:20px;"><button id="vkeyesc">X</button></div>';
	inner_html += '<div id="keyboardLayoutTable">';
	for(i=0;i<5;++i){
		inner_html += '<div id="row'+i+'" class="row"></div>';
	}
	inner_html += '</div>';

	rows.innerHTML = inner_html;

	char_converting_table_original_code = [0x1B, 0x1160];
	char_converting_table_target_string = ['🄴', '🄵'];
 
	for(i=0, k=-1; ue[i]; i++) {
		var row = document.getElementById('row'+i);
		for(j=0; ue[i][j]; j++) {
			var tdclass = 'e1';
			var tdid = 'key'+(++k);
			var charCode;
			if(dh[i] && dh[i][j]) {
				charCode = dh[i][j].charCodeAt(0);
				if(charCode>128){
					dh[i][j] = String.fromCharCode(convert_into_compatibility_hangeul_letter(charCode));
				}
				if(charCode>0x3130){
					tdclass = (type.substr(0,1)=='2' || type.substr(-7)=='2-KSX5002' || type=='2-KPS9256' || j>5 && !(i<2&&j>10 || i==3&&j==10&&type.substr(0,5)!='Sin3-')) ? 'h1':'h3';
				}
				if(charCode>0x314E){
					tdclass = 'h2';
				}
				if(unicode_modern_cheos.indexOf(charCode)>=0) tdclass = 'h1';
				else if(Ko_type.substr(1,2)=='t-' && charCode>=0x314F && charCode<0x3164) tdclass = 'h2 gin-hol';
				else if(unicode_modern_ga.indexOf(charCode)>=0) tdclass = 'h2';
				else if(unicode_modern_ggeut.indexOf(charCode)>=0) tdclass = 'h3';
				else if(compatibility_hangeul_phoneme.indexOf(dh[i][j].charCodeAt(0))<0 && unicode_NFD_hangeul_phoneme.indexOf(charCode)>=0)
					dh[i][j] = (unicode_ga.indexOf(charCode)>=0 ? String.fromCharCode(0x115F) : '') + (unicode_ggeut.indexOf(charCode)>=0 ? String.fromCharCode(0x115F)+String.fromCharCode(0x1160) : '') + dh[i][j];

				if(char_converting_table_original_code.indexOf(charCode)>=0) dh[i][j] = char_converting_table_target_string[char_converting_table_original_code.indexOf(charCode)];

				if(tdclass.substr(0,1)!='h')
					if(unicode_modern_ggeut.indexOf(uh[i][j].charCodeAt(0))>=0) tdclass = 'h3';
			}

			charCode = ue[i][j].charCodeAt(0);
			if(KE=='En' && ue[i][j].length==1)
				if(charCode>64 && charCode<91 || charCode>96 && charCode<123) tdclass = 'e2';
			if(unicode_NFD_hangeul_phoneme.indexOf(charCode)>=0) {
				charCode = ue[i][j].charCodeAt(0);
				ue[i][j] = String.fromCharCode(convert_into_compatibility_hangeul_letter(charCode));
			}
			var col = appendChild(row,'div',tdclass,tdid,'','36px','0 0 0 0');
			col.style.margin = '2px';
			
			col.onclick = function(e){
				e=e||window.event;
				tableKey_clicked(e, this.id.substr(3), dkey[this.id.substr(3)], ukey[this.id.substr(3)]);
			};
			col.tabindex = 0;
			
			if(k==0) col.style.width = '36px'; // ` 글쇠
			if(k==13) { // backspace
				col.style.letterSpacing = '-2px';
				col.style.width = '33px';
			}
			if(k==12 || k==26) col.style.width = '32px'; // =, ] 글쇠
			if(k==14) col.style.width = '36px'; // tab
			if(k==27) col.style.width = '33px'; // \ 글쇠
			if(k==28) col.style.width = '36px'; // shift lock
			if(k==40) col.style.width = '71px'; // Enter
			if(k==41) col.style.width = '36px'; // 왼쪽 shift
			if(k==52) col.style.width = '113px'; // 오른쪽 shift
			if(ue[i][j]=='Back' || ue[i][j]=='Tab' || ue[i][j]=='Enter' || ue[i][j]=='Shift') col.style.textAlign = 'center';

			if(i==4) {
				if(ue[i][j]=='Space') col.style.width = '481px';
				else col.style.width = '41px', col.className = 'e3 special';
			}
			
			var up = appendChild(col,'div','up','up'+k);
			appendChild(up,'div','ue','ue'+k,ue[i][j]);
			if(uh[i]) {
				if(uh[i][j]) {
					charCode = uh[i][j].charCodeAt(0);
					if(unicode_NFD_hangeul_phoneme.indexOf(charCode)>=0) charCode=convert_into_compatibility_hangeul_letter(charCode);
					uh[i][j] = String.fromCharCode(charCode);
					if(char_converting_table_original_code.indexOf(charCode)>=0) uh[i][j] = char_converting_table_target_string[char_converting_table_original_code.indexOf(charCode)];
					if(compatibility_hangeul_phoneme.indexOf(uh[i][j].charCodeAt(0))<0) uh[i][j] = (unicode_ga.indexOf(charCode)>=0 ? String.fromCharCode(0x115F) : '') + (unicode_ggeut.indexOf(charCode)>=0 ? String.fromCharCode(0x115F)+String.fromCharCode(0x1160) : '') + uh[i][j];
					if(uh[i][j]==dh[i][j] && uh[i][j]!=de[i][j]) uh[i][j]=' '; // 한글 배열에서 윗글과 아랫글 자리의 문자가 같을 때 윗글 자리를 나타내지 않음
				}
				if(uh[i][j]==ue[i][j] || uh[i][j]=='&'&&ue[i][j]=='&amp;' || uh[i][j]=='<'&&ue[i][j]=='&lt;' || uh[i][j]=='>'&&ue[i][j]=='&gt;') uh[i][j]=' ';
				appendChild(up,'div','uh','uh'+k,uh[i][j]);
			}
			if(de[i][j]) {
				var down = appendChild(col,'div','down','down'+k);
				charCode = de[i][j].charCodeAt(0);
				if(unicode_NFD_hangeul_phoneme.indexOf(charCode)>=0) de[i][j] = String.fromCharCode(convert_into_compatibility_hangeul_letter(charCode));
				appendChild(down,'div','de','de'+k,de[i][j]);
				if(dh[i] && (!dh[i][j] || dh[i][j]==de[i][j])) dh[i][j]=' ';
				if(dh[i] && dh[i][j]) appendChild(down,'div','dh','dh'+k,dh[i][j]);
			}
		}
	}
	if(shiftlock_click) {
		var shiftlock = document.getElementById('key28');
		shiftlock.style.backgroundColor = '#ebc9c9';
	}
	document.getElementById('vkeyesc').onclick = function(e){
		$("#vkey").css("display", "none").removeClass("on").hide();
		$(".inputTxt").hide();
		$(".keyimg").prop("src", "/js/plugins/keyboard/img/key_off.png");
	};
}
function ohiStart() {
	var i;
	var input=document.getElementById($keyTarget);
	var inputs=document.getElementsByTagName("INPUT");
	
	complete_hangeul_syllable(this);

	if(option.turn_off_OHI) {
		if(input) input.style.imeMode = 'active';
		if(inputs) {
			for(i=0;i<inputs.length;++i) {
				if(inputs[i].className=='text') inputs[i].style.imeMode = 'active';
			}
		}
		return;
	}

	if(typeof current_layout=='undefined' || !current_layout || typeof current_layout.KE=='undefined' || !current_layout.KE) {
		ohiChange(default_ohi_KE, default_ohi_KE=='En' ? default_En_type : default_Ko_type);
	}

	ohi_KE = current_layout.KE;

	if(document.body) {
		var onmousedown = function(e) {
			complete_hangeul_syllable(this);
			prev_cursor_position = -1;
		};
		
		if(input) {
			input.style.imeMode = 'disabled';
			input.onmousedown = onmousedown;
		}

		if(inputs) {
			for(i=0;i<inputs.length;++i) {
				if(inputs[i].className=='text') {
					inputs[i].style.imeMode = 'disabled';
					inputs[i].onmousedown = onmousedown;
				}
			}
		}
	}
	else ohiTimeout = setTimeout("ohiStart()",100);
}
function find_layout_info(KE, type_name) {
	if(typeof type_name == 'undefined' || !type_name) return false;
	var i,j;
	var a=[keyboard_layouts];
	if(typeof test_layouts != 'undefined') a.push(test_layouts);
	for(i=0;i<a.length;++i)
		for(j=0;j<a[i].length;++j)
			if(KE==a[i][j].KE && typeof a[i][j].type_name != 'undefined' && type_name.toLowerCase()==a[i][j].type_name.toLowerCase())
				return a[i][j];
	return false;
}
function ohiChange(KE, type_name) {
	var f=document.getElementById($keyTarget);
	searchKeyword_focus();
	
	if(NFD_stack.phoneme.length && f) complete_hangeul_syllable(f);
	
	var prev_layout = typeof current_layout != 'undefined' ? current_layout : null;
	
	if(KE.toLowerCase()=='en') KE='En';
	else if(KE.toLowerCase()=='ko' || KE.toLowerCase()=='k2' || KE.toLowerCase()=='k3') KE='Ko';

	ohi_KE = ohi_KE.replace(/(En|Ko)/, KE.substr(0,2));

	var layout = find_layout_info(KE, type_name);
	if(layout) {
		current_layout = layout;
		if(KE=='En') En_type = current_layout.type_name;
		else Ko_type = current_layout.type_name;
	}

	if(layout != prev_layout) {
		ohiStart();
		show_keyboard_layout(KE=='En' ? En_type : Ko_type);
	}
}
function ohiChange_KE(type) {	// 한·영 상태 바꾸기
	var KE = ohi_KE;

	if(type === undefined || !type) {
		if(KE=='En') ohiChange('Ko',Ko_type);
		else if(KE=='Ko') ohiChange('En',En_type);
	}
	else if(type=='En') ohiChange('En',En_type);
	else if(type=='Ko') ohiChange('Ko',Ko_type);
}
function searchKeyword_focus() {
	var f=document.getElementById($keyTarget);
	if(f) f.focus();
}
function tableKey_press(key) {
	var shift1 = document.getElementById('key41');
	var shift2 = document.getElementById('key52');

	if(!option.show_layout || !shift1) return;

	shift1.className = shift1.className.substr(0,2);
	shift2.className = shift2.className.substr(0,2);
	var layout_name = current_layout.type_name;

	if(key==188) key=44;
	if(key==190) key=46;
	if(key==222) key=39;
	if(key==219) key=91;
	if(key==221) key=93;
	if(key==220) key=92;
	if(key==173) key=45;
	if(key==191) key=47;
	if(key==192) key=96;
	
	if(key==16 || current_layout.type_name=='4t-1985'&&shift_lock) {
		shift1.className += ' pressed';
		shift2.className += ' pressed';
	}

	var key_td;
	for(j=0;j<dkey.length;++j) {
		if(j==41 || j==52) continue;
		key_td = document.getElementById('key'+j);
		key_td.className = key_td.className.replace(/ clicked| pressed/,'');
		if(key==dkey[j] || key==ukey[j] || (layout_name.substr(0,3)=='3m-' && !option.force_normal_typing && (pressed_keys.indexOf(dkey[j])>=0 || pressed_keys.indexOf(ukey[j])>=0))) {
			key_td.className += ' pressed';
		}
		if(key==ukey[j] && key!=dkey[j]) {
			shift1.className += ' pressed';
			shift2.className += ' pressed';
		}
	}
}

function tableKey_clicked(e, key_num, dk, uk){
	searchKeyword_focus();
	var key, f = document.getElementById($keyTarget);
	var n=f.nodeName||f.tagName;
	if(!f || n!='INPUT') return false;

	KE=ohi_KE.substr(0,2);

	var shiftlock = document.getElementById('key28');
	var shift1 = document.getElementById('key41');
	var shift2 = document.getElementById('key52');

	if(dk==20) {	// 배열표에서 Shift Lock이 눌렸을 때
		if(!shiftlock_click) {
			shiftlock.style.backgroundColor = '#ebc9c9';
			shiftlock_click = 1;
		}
		else {
			shiftlock.style.backgroundColor = '';
			shiftlock_click = 0;
		}
	}
	if(dk==16 && !shift_click) { // 배열표에서 윗글쇠가 눌렸을 때
		shift_click = 1;
		shift1.style.backgroundColor = '#ebc9c9';
		shift2.style.backgroundColor = '#ebc9c9';
		return;
	}
	if((dk==32 || dk==9) && !shift_click) {	// 사이띄개(32), Tab(9)
		complete_hangeul_syllable(f);
		ohiInsert(f,0,dk);
		return;
	}
	if(dk==8 && !shift_click) {	// Backspace
		if(option.abbreviation && prev_cursor_position>=0) {
			ohiHangeul_moa_backspace(f,e);
			return false;
		}
		if(!ohiHangeul_backspace(f,e)) return;
		ohiBackspace(f);
		searchKeyword_focus();
		return;
	}
	if(dk==13){
		$("#"+$keySubmit).click();
		closeKeyboard();
	}
	if(dk==-13) { // 한·영 상태 바꾸기 단추
		ohiChange_KE();
		searchKeyword_focus();
	}
	if(dk==-12) { //초기화
		$("#"+$keyTarget).val("");
		ohiQ = ohiRQ = prev_ohiQ = prev_ohiRQ = [0,0,0,0,0,0,0,0,0];
		searchKeyword_focus();
	}
	key = (shift_click+shiftlock_click)%2 ? uk : dk;
	if(ohi_KE.substr(0,2)=='En' && key>32 && key<127) ohiRoman(f,0,key);
	if(ohi_KE.substr(0,2)!='En' && key>32 && key<127) {
		if(document.selection && document.selection.createRange().text.length!=1) ohiInsert(f,0,0);
		if(KE=='Ko') {
			if(current_layout.type_name.substr(0,2)=='2-') ohiHangeul2(f,e,key);
		}
	}
	for(var j=0;j<dkey.length;++j) {
		var key_td =document.getElementById('key'+j);
		if( key_td && key_td.className ){
			key_td.className = key_td.className.replace(/ clicked| pressed/g,'');
		}
	}
	if(dk!=16 && dk!=20) document.getElementById('key'+key_num).className += ' clicked';

	shift_click = 0;
	shift1.style.backgroundColor = '';
	shift2.style.backgroundColor = '';
}
function ohi_code_tables() {
	var i;

	ohi_cheos = [/*ㄱ*/128,/*ㄲ*/129,/*ㄴ*/131,/*ㄷ*/134,/*ㄸ*/135,/*ㄹ*/136,/*ㅁ*/144,/*ㅂ*/145,/*ㅃ*/146,/*ㅅ*/148,/*ㅆ*/149,/*ㅇ*/150,/*ㅈ*/151,/*ㅉ*/152,/*ㅊ*/153,/*ㅋ*/154,/*ㅌ*/155,/*ㅍ*/156,/*ㅎ*/157];
	ohi_ga = [/*ㅏ*/66,/*ㅐ*/67,/*ㅑ*/68,/*ㅒ*/69,/*ㅓ*/70,/*ㅔ*/71,/*ㅕ*/72,/*ㅖ*/73,/*ㅗ*/74,/*ㅘ*/75,/*ㅙ*/76,/*ㅚ*/77,/*ㅛ*/78,/*ㅜ*/79,/*ㅝ*/80,/*ㅞ*/81,/*ㅟ*/82,/*ㅠ*/83,/*ㅡ*/84,/*ㅢ*/85,/*ㅣ*/86];
	ohi_ggeut = [/*ㄱ*/1,/*ㄲ*/2,/*ㄳ*/3,/*ㄴ*/4,/*ㄵ*/5,/*ㄶ*/6,/*ㄷ*/7,/*ㄹ*/9,/*ㄺ*/10,/*ㄻ*/11,/*ㄼ*/12,/*ㄽ*/13,/*ㄾ*/14,/*ㄿ*/15,/*ㅀ*/16,
	/*ㅁ*/17,/*ㅂ*/18,/*ㅄ*/20,/*ㅅ*/21,/*ㅆ*/22,/*ㅇ*/23,/*ㅈ*/24,/*ㅊ*/26,/*ㅋ*/27,/*ㅌ*/28,/*ㅍ*/29,/*ㅎ*/30];

	ohi_hangeul_phoneme = ohi_cheos.concat(ohi_ga,ohi_ggeut);
	ohi_hotbadchim = [/*ㄱ*/1,/*ㄴ*/4,/*ㄷ*/7,/*ㄹ*/9,/*ㅁ*/17,/*ㅂ*/18,/*ㅅ*/21,/*ㅇ*/23,/*ㅈ*/24,/*ㅊ*/26,/*ㅋ*/27,/*ㅌ*/28,/*ㅍ*/29,/*ㅎ*/30];
	unicode_modern_hotbatchim = [/*ㄱ*/0x11A8,/*ㄴ*/0x11AB,/*ㄷ*/0x11AE,/*ㄹ*/0x11AF,/*ㅁ*/0x11B7,/*ㅂ*/0x11B8,/*ㅅ*/0x11BA,/*ㅇ*/0x11BC,/*ㅈ*/0x11BD,/*ㅊ*/0x11BE,/*ㅋ*/0x11BF,/*ㅌ*/0x11C0,/*ㅍ*/0x11C1,/*ㅎ*/0x11C2];

	compatibility_cheos = [0x3131,0x3132,0x3134,0x3137,0x3138,0x3139,0x3141,0x3142,0x3143,0x3145,0x3146,0x3147,0x3148,0x3149,0x314A,0x314B,0x314C,0x314D,0x314E,
	 0x317F, 0x3181, 0x3186];
	i=0x314F;	while(i<=0x3163) compatibility_ga.push(i++); compatibility_ga.push(0x318D);
	compatibility_ggeut = [0x3131,0x3132,0x3133,0x3134,0x3135,0x3136,0x3137,0x3139,0x313A,0x313B,0x313C,0x313D,0x313E,0x313F,0x3140,0x3141,0x3142,0x3144,0x3145,0x3146,0x3147,0x3148,0x314A,0x314B,0x314C,0x314D,0x314E,
	 0x317F,0x3181,0x3186];
	compatibility_hangeul_phoneme = compatibility_cheos.concat(compatibility_ga, compatibility_ggeut);

	halfwidth_cheos = [0xFFA1,0xFFA2,0xFFA4,0xFFA7,0xFFA8,0xFFA9,0xFFB1,0xFFB2,0xFFB3,0xFFB5,0xFFB6,0xFFB7,0xFFB8,0xFFB9,0xFFBA,0xFFBB,0xFFBC,0xFFBD,0xFFBE];
	for(i=0;i<4;++i) for(j=0;j<(i==3?3:6);++j) halfwidth_ga.push(0xFFC2+i*8+j);
	halfwidth_ggeut = [0xFFA1,0xFFA2,0xFFA3,0xFFA4,0xFFA5,0xFFA6,0xFFA7,0xFFA9,0xFFAA,0xFFAB,0xFFAC,0xFFAD,0xFFAE,0xFFAF,0xFFB0,
	 0xFFB1,0xFFB2,0xFFB4,0xFFB5,0xFFB6,0xFFB7,0xFFB8,0xFFBA,0xFFBB,0xFFBC,0xFFBD,0xFFBE];
	halfwidth_hangeul_phoneme = halfwidth_cheos.concat(halfwidth_ga, halfwidth_ggeut);

	i=0x1100;	while(i<=0x115E) unicode_cheos.push(i++);
	i=0xA960;	while(i<=0xA97C) unicode_cheos.push(i++);
	i=0x1161;	while(i<=0x11A7) unicode_ga.push(i++);
	i=0xD7B0;	while(i<=0xD7C6) unicode_ga.push(i++);
	i=0x11A8;	while(i<=0x11FF) unicode_ggeut.push(i++);
	i=0xD7CB;	while(i<=0xD7FB) unicode_ggeut.push(i++);

	unicode_ggeut_to_cheos = [0x1100,0x1101,0,0x1102,0,0,0x1103,0x1105,0,0,0,0,0,0,0,0x1106,0x1107,0,0x1109,0x110A,0x110B,0x110C,0x110E,0x110F,0x1110,0x1111,0x1112,
	 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x111D,0,0,0,0x112B,0,0,0,0,0x1140,0,0,0,0,0x114C,0,0,0,0x1157,0,0,0,0,0x1159,0,0,0,0,0,0, // ~ 0x11F9
	 0,0,0x1104,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x1108,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x110D,0,0]; // 0xD7CB ~ 0xD7FB
	unicode_cheos_to_ggeut = [0x11A8,0x11A9,0x11AB,0x11AE,0xD7CD,0x11AF,0x11B7,0x11B8,0xD7E6,0x11BA,0x11BB,0x11BC,0x11BD,0xD7F9,0x11BE,0x11BF,0x11C0,0x11C1,0x11C2,
	 0,0,0,0,0,0,0,0,0xD7DD,0,0x11E2,0,0,0,0,0,0,0,0,0,0,0,0,0,0x11E6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x11EB,0,0,0,0,0,0,0,0,0,0,0,0x11F0,0,0,0,0,0,0,0,0,0,0,0,0,0x11F9];

	unicode_NFD_hangeul_phoneme = unicode_cheos.concat(unicode_ga, unicode_ggeut);
	unicode_NFD_hangeul_filler = [0x115F,0x1160];
	unicode_NFD_hangeul_code = unicode_NFD_hangeul_phoneme.concat(unicode_NFD_hangeul_filler);
	unicode_NFD_hangeul_sidedot = [0x302E,0x302F];

	i=0x1100;	while(i<=0x1112) unicode_modern_cheos.push(i++);
	i=0x1161;	while(i<=0x1175) unicode_modern_ga.push(i++);
	i=0x11A8;	while(i<=0x11C2) unicode_modern_ggeut.push(i++);
	unicode_modern_hangeul_phoneme = unicode_modern_cheos.concat(unicode_modern_ga, unicode_modern_ggeut); 

	unicode_non_combined_phoneme_cheos = [0x1100,0x1102,0x1103,0x1105,0x1106,0x1107,0x1109,0x110B,0x110C,0x110E,0x110F,0x1110,0x1111,0x1112];
	unicode_non_combined_phoneme_ga = [0x1161,0x1162,0x1164,0x1165,0x1166,0x1168,0x1169,0x1172,0x1173,0x1175,0x119E];
	unicode_non_combined_phoneme_ggeut = [0x11A8,0x11AB,0x11AE,0x11AF,0x11B7,0x11B8,0x11BA,0x11BC,0x11BD,0x11BE,0x11BF,0x11C0,0x11C1,0x11C2];
	unicode_non_combined_phoneme = unicode_non_combined_phoneme_cheos.concat(unicode_non_combined_phoneme_ga, unicode_non_combined_phoneme_ggeut);

	dkey = [96,49,50,51,52,53,54,55,56,57,48,45,61,8,
	9,113,119,101,114,116,121,117,105,111,112,91,93,92,
	20,97,115,100,102,103,104,106,107,108,59,39,13,
	16,122,120,99,118,98,110,109,44,46,47,16,32,-13,-12];

	ukey = [126,33,64,35,36,37,94,38,42,40,41,95,43,8,
	9,81,87,69,82,84,89,85,73,79,80,123,125,124,
	20,65,83,68,70,71,72,74,75,76,58,34,13,
	16,90,88,67,86,66,78,77,60,62,63,16,32,-13,-12];
	shift_table = [ 0x31,0x27,0x33,0x34,0x35,0x37,0x22,0x39,0x30,0x38,0x3D,0x3C,0x5F,0x3E,0x3F,0x29,0x21,0x40,0x23,0x24,0x25,0x5E,0x26,0x2A,0x28,0x3B,0x3A,0x2C,0x2B,
		0x2E,0x2F,0x32,0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6A,0x6B,0x6C,0x6D,0x6E,0x6F,0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77,0x78,0x79,0x7A,0x7B,0x7C,
		0x7D,0x36,0x2D,0x7E,0x41,0x42,0x43,0x44,0x45,0x46,0x47,0x48,0x49,0x4A,0x4B,0x4C,0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57,0x58,0x59,0x5A,0x5B,0x5C,0x5D,0x60
	];
}

ohi_code_tables();
browser_detect();
ohiStart();

function openKeyboard( target, searchBtn ){
	if( target ){
		$('#'+target ).focus();
		
		var pos = $('#'+target ).offset();
		
		$("#vkey").css("top", pos.top+40);
		
		var left = pos.left;
		
		if( left > 700 ){
			left = left-400;
		} else {
			left = left;
		}
		
		$("#vkey").css("left", left);
		
		if( $("#vkey").hasClass("on") && target === $keyTarget ){
			closeKeyboard();
		} else {
			$("#vkey").css("display", "").addClass("on").show();
			$("#"+$keyTarget).closest("div").find(".keyimg").prop("src", "/js/plugins/keyboard/img/key_off.png").removeClass("on");
			$("#"+target).closest("div").find(".keyimg").prop("src", "/js/plugins/keyboard/img/key_on.png").addClass("on");
			
			if( $keyTarget == 'searchKeyword' && target != 'searchKeyword' ){
				$(".searchArea .inputTxt").hide();
			}
		}
		
		if( target != $keyTarget ){
			$("#vkey").data("johab", false);
		}
		
		$keyTarget = target;
		$keySubmit = searchBtn;
	}
}

function closeKeyboard(){
	$("#vkey").css("display", "none").removeClass("on").hide();
	$(".inputTxt").hide();
	$("#"+$keyTarget).closest("div").find(".keyimg").prop("src", "/js/plugins/keyboard/img/key_off.png");
}

function appendChild(parentNode,nodeName,className,idName,innerHTML,width,padding) {
	var childNode = document.createElement(nodeName);
	if(className) childNode.className = className;
	if(idName) childNode.id = idName;
	if(innerHTML) childNode.innerHTML = innerHTML;
	if(width) childNode.style.width = width;
	if(width) childNode.style.height = width;
	
	childNode.style.fontWeight = "bold";
	
	if(padding) childNode.style.padding = padding;
	parentNode.appendChild(childNode);
	return childNode;
}