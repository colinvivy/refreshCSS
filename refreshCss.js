/**
 * refreshCss.js
 *
 * @author alextang<colinvivy#gmail.com>
 * @date
 * @link   http://icolin.org/
 */

var rcss = {
    refreshCss: null ,

    ui: {
        wrap: 'position:fixed;right:10px;top:200px;padding:5px 10px;border:1px solid #999;border-radius:3px;line-height:30px;',
        btn: 'padding:2px 5px;margin:5px 0;line-height:25px;border:1px solid #999;cursor:pointer;border-radius:5px;background:#ddd;text-align:center;'
    },

    createEl: function () {
        var strHtml = '';
        strHtml += '<div>自动刷新：';
        strHtml += '<input type="radio" id="refreshAutoTrue" name="isAuto" value="1" checked="checked"> 开启';
        strHtml += '<input type="radio" id="refreshAutoFalse" name="isAuto" value="0"> 关闭';
        strHtml += '</div>';
        strHtml += '<div id="btnRefreshCss">点击刷新CSS</div>';
        var el = document.createElement('div');
        el.innerHTML = strHtml ;
        el.style.cssText = this.ui.wrap ;
        
        document.body.appendChild(el) ;
        var elBtn = document.getElementById('btnRefreshCss');
        elBtn.style.cssText = this.ui.btn ;

        this.refreshCss = el ;
    },

    rdm: function () {
        return ((+new Date())+ '').substr(-4) ;  
    },

    timer: null,

    refresh: function () {
        if (this.config.auto === 0) {
            clearInterval(this.timer);
        }
        var css = document.getElementsByTagName('link');
        for (var i = 0, k; k = css[i]; i++) {
            if (k.type == 'text/css') {
                if (k.href.indexOf('?') + 1) {
                    if (k.href.indexOf('?alexTS=') + 1) {
                        k.href = k.href.replace(/\?alexTS=\d+/, '?alexTS=' + this.rdm());
                    } else {
                        k.href = k.href.replace('?', '?alexTS=' + this.rdm() + '&');
                    }
                } else {
                    k.href = k.href + '?alexTS=' + this.rdm();
                }
            }
        }
    },

    config: {
        auto: 1
    },

    init: function () {
        var _self = this; 
        if(!this.refreshCss){
            this.createEl();
        }

        var elBtnRefreshCss = document.getElementById('btnRefreshCss');
        var elRefreshAutoTrue = document.getElementById('refreshAutoTrue');
        var elRefreshAutoFalse = document.getElementById('refreshAutoFalse');
        
        elBtnRefreshCss.onclick = function () {
            _self.config.auto = 0 ;
            _self.refresh();
        }

        elRefreshAutoTrue.onclick = function () {
            elBtnRefreshCss.style.display = 'none';
            _self.config.auto = 1 ;
            _self.timer = setInterval(function () {
                _self.refresh();
            }, 1000);
        }
        elRefreshAutoFalse.onclick = function () {
            _self.config.auto = 0 ;
            elBtnRefreshCss.style.display = 'block';
        }

        if (this.config.auto === 1) {
            this.timer = setInterval(function () {
                _self.refresh();
            }, 1000);
            elBtnRefreshCss.style.display = 'none';
        }
    }
}
