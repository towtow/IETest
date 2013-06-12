var $ = function (id) {
    return document.getElementById(id);
};

var l = function (m) {
    console && console.log(m);
};

var model = function () {
    var model = [], i;
    for (i = 0; i < 100; i++) {
        model.push(i);
    }
    return model;
};
var ELT_HEIGHT = 20;
var foo = function (model) {
    var wrapper = $('wrapper');
    var ignore = false;

    function redraw() {
        if (ignore) return;
        var template = [], i, s = wrapper.scrollTop, xx = wrapper.scrollTop / wrapper.scrollHeight * model.length;
        l(xx);
        var offset = isFinite(xx) ? Math.floor(xx) : 0;
        template.push('<div id="topPush"></div>');
        template.push('<ul>');
        var numVis = wrapper.clientHeight / ELT_HEIGHT;
        for (i = offset; i < offset + numVis && i < model.length; i++) {
            template.push('<li style="height:20px;">');
            template.push('' + model[i]);
            template.push('</li>');
        }
        template.push('</ul>');
        template.push('<div id="bottomPush"></div>');
        wrapper.innerHTML = template.join('');
        $('topPush').style.height = ELT_HEIGHT * offset + 'px';
        $('bottomPush').style.height = ELT_HEIGHT * (model.length - offset - numVis) + 'px';
        ignore = true;
        try {
            wrapper.scrollTop = s;
        } finally {
            setTimeout(function () {
                ignore = false;
            }, 0);
        }
    }

    wrapper.onscroll = function (e) {
        redraw();
    };
    redraw();
//    wrapper.scrollTop = model.length * 10;
};

document.onload = foo(model());
