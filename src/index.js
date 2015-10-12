var styleloader = {
    loadStyles(styles) {
        'use strict';

        if (!document) {
            return;
        }
    
        var rules = [];

        Object.keys(styles).forEach(key => {
            let style = styles[key];
            // if the style is a string, add it and move on
            if (typeof style === 'string') {
                let tmp;
                tmp = key + ' ' +  '{' + style + '}';

                if (key === '@font-face') {
                    rules.unshift(tmp);
                } else {
                    rules.push(tmp);
                }
            }

            // if the style is big, ie an object, loop.
            if (typeof style === 'object'){
                Object.keys(style).forEach(k => {
                    let tmp2 = key + ' ' +  '{' + k + ':' + style[k] + '}';
                    rules.push(tmp2)
                })
            }
        });

        let style1 = window.style1 = document.styleSheets[document.styleSheets.length - 1];
        rules.forEach((rule, idx)=> {
            style1.insertRule(rule, (idx));
        });
    }
};

module.exports = styleloader;

