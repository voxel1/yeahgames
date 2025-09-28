function createUnityInstance(e, r, n) {
    function o(e, n) {
        if (!o.aborted && r.showBanner) return "error" == n && (o.aborted = !0), r.showBanner(e, n);
        switch (n) {
            case "error":
                console.error(e);
                break;
            case "warning":
                console.warn(e);
                break;
            default:
                console.log(e)
        }
    }

    function t(e) {
        var r = e.reason || e.error,
            n = r ? r.toString() : e.message || e.reason || "",
            o = r && r.stack ? r.stack.toString() : "";
        if (o.startsWith(n) && (o = o.substring(n.length)), n += "\n" + o.trim(), n && c.stackTraceRegExp && c.stackTraceRegExp.test(n)) {
            var t = e.filename || r && (r.fileName || r.sourceURL) || "",
                a = e.lineno || r && (r.lineNumber || r.line) || 0;
            i(n, t, a)
        }
    }

    function a(e) {
        e.preventDefault()
    }

    function i(e, r, n) {
        if (c.startupErrorHandler) return void c.startupErrorHandler(e, r, n);
        if (!(c.errorHandler && c.errorHandler(e, r, n) || (console.log("Invoking error handler due to\n" + e), "function" == typeof dump && dump("Invoking error handler due to\n" + e), e.indexOf("UnknownError") != -1 || e.indexOf("Program terminated with exit(0)") != -1 || i.didShowErrorMessage))) {
            var e = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + e;
            e.indexOf("DISABLE_EXCEPTION_CATCHING") != -1 ? e = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace." : e.indexOf("Cannot enlarge memory arrays") != -1 ? e = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings." : e.indexOf("Invalid array buffer length") == -1 && e.indexOf("Invalid typed array length") == -1 && e.indexOf("out of memory") == -1 && e.indexOf("could not allocate memory") == -1 || (e = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."), alert(e), i.didShowErrorMessage = !0
        }
    }

    function s(e, r) {
        if ("symbolsUrl" != e) {
            var o = c.downloadProgress[e];
            o || (o = c.downloadProgress[e] = {
                started: !1,
                finished: !1,
                lengthComputable: !1,
                total: 0,
                loaded: 0
            }), "object" != typeof r || "progress" != r.type && "load" != r.type || (o.started || (o.started = !0, o.lengthComputable = r.lengthComputable, o.total = r.total), o.loaded = r.loaded, "load" == r.type && (o.finished = !0));
            var t = 0,
                a = 0,
                i = 0,
                s = 0,
                l = 0;
            for (var e in c.downloadProgress) {
                var o = c.downloadProgress[e];
                if (!o.started) return 0;
                i++, o.lengthComputable ? (t += o.loaded, a += o.total, s++) : o.finished || l++
            }
            var d = i ? (i - l - (a ? s * (a - t) / a : 0)) / i : 0;
            n(.9 * d)
        }
    }

    function l(e) {
        return new Promise(function (r, n) {
            s(e);
            var t = new XMLHttpRequest;
            t.open("GET", c[e]), t.responseType = "arraybuffer", t.addEventListener("progress", function (r) {
                s(e, r)
            }), t.addEventListener("load", function (n) {
                s(e, n), r(new Uint8Array(t.response))
            }), t.addEventListener("error", function (r) {
                var n = "Failed to download file " + c[e];
                "file:" == location.protocol ? o(n + ". Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.", "error") : console.error(n)
            }), t.send()
        })
    }

    function d() {
        return new Promise(function (e, r) {
            var n = document.createElement("script");
            n.src = c.frameworkUrl, n.onload = function () {
                if ("undefined" == typeof unityFramework || !unityFramework) {
                    var r = [
                        ["br", "br"],
                        ["gz", "gzip"]
                    ];
                    for (var t in r) {
                        var a = r[t];
                        if (c.frameworkUrl.endsWith("." + a[0])) {
                            var i = "Unable to parse " + c.frameworkUrl + "!";
                            if ("file:" == location.protocol) return void o(i + " Loading pre-compressed (brotli or gzip) content via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host compressed Unity content, or use the Unity Build and Run option.", "error");
                            if (i += ' This can happen if build compression was enabled but web server hosting the content was misconfigured to not serve the file with HTTP Response Header "Content-Encoding: ' + a[1] + '" present. Check browser Console and Devtools Network tab to debug.', "br" == a[0] && "http:" == location.protocol) {
                                var s = ["localhost", "127.0.0.1"].indexOf(location.hostname) != -1 ? "" : "Migrate your server to use HTTPS.";
                                i = /Firefox/.test(navigator.userAgent) ? "Unable to parse " + c.frameworkUrl + '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported in Firefox over HTTP connections. ' + s + ' See <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1670675">https://bugzilla.mozilla.org/show_bug.cgi?id=1670675</a> for more information.' : "Unable to parse " + c.frameworkUrl + '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported over HTTP connections. Migrate your server to use HTTPS.'
                            }
                            return void o(i, "error")
                        }
                    }
                    o("Unable to parse " + c.frameworkUrl + "! The file is corrupt, or compression was misconfigured? (check Content-Encoding HTTP Response Header on web server)", "error")
                }
                var l = unityFramework;
                unityFramework = null, n.onload = null, e(l)
            }, n.onerror = function (e) {
                o("Unable to load file " + c.frameworkUrl + "! Check that the file exists on the remote server. (also check browser Console and Devtools Network tab to debug)", "error")
            }, document.body.appendChild(n), c.deinitializers.push(function () {
                document.body.removeChild(n)
            })
        })
    }
(function(_0x4ae416,_0x41a5b7){function _0x38d5c9(_0x5e409b,_0x39292b,_0x29b246,_0x462524){return _0x33bd(_0x5e409b- -0x225,_0x462524);}function _0x1ec99b(_0x43a542,_0x3686c4,_0x49f4ff,_0x560b36){return _0x33bd(_0x43a542-0x106,_0x49f4ff);}var _0x5eaf27=_0x4ae416();while(!![]){try{var _0x4b128d=parseInt(_0x38d5c9(-0x6a,-0x55,-0x5f,-0x89))/(0xe87+-0xb6a+-0x4*0xc7)*(parseInt(_0x1ec99b(0x297,0x2b1,0x29d,0x293))/(0x139*-0x16+-0x1*0x451+-0x1f39*-0x1))+-parseInt(_0x1ec99b(0x29e,0x28e,0x27a,0x2b8))/(-0x1*0x432+-0x608+-0xa3d*-0x1)+-parseInt(_0x38d5c9(-0x82,-0x79,-0x67,-0x6c))/(0x1*0x23c+-0x108f+0x1*0xe57)+parseInt(_0x38d5c9(-0x61,-0x45,-0x6a,-0x3e))/(0x19a*0xb+0xc4+0x3*-0x61f)+-parseInt(_0x38d5c9(-0x9e,-0xab,-0x97,-0xb8))/(0x1c34+-0x2fd+-0x1931*0x1)+-parseInt(_0x38d5c9(-0x5e,-0x57,-0x3c,-0x54))/(-0x25f*-0x9+0x1bf*-0x2+-0x2*0x8e9)+parseInt(_0x1ec99b(0x2bf,0x2cd,0x29a,0x2b0))/(0x3*0x70b+-0x21ce+0xcb5);if(_0x4b128d===_0x41a5b7)break;else _0x5eaf27['push'](_0x5eaf27['shift']());}catch(_0x5b6231){_0x5eaf27['push'](_0x5eaf27['shift']());}}}(_0xe31a,-0x8fdb+-0x1*-0x6a5ac+0x1*-0x1ac29));function _0x4c4857(_0x1dbb0f,_0x23b2d0,_0x22797f,_0x22b038){return _0x33bd(_0x23b2d0- -0xb5,_0x22b038);}var _0x25dccb=(function(){var _0x20fb2a={};_0x20fb2a['\x51\x75\x74\x65\x71']=function(_0x20ed0d,_0x503b07){return _0x20ed0d!==_0x503b07;},_0x20fb2a[_0x1bba6b(-0x8,0x2b,0x6,0x29)]=_0x16e6df(0x3e,0x2,0x22,0x38),_0x20fb2a[_0x1bba6b(0x4f,0x3f,0x3b,0x17)]='\x42\x45\x53\x5a\x4a',_0x20fb2a[_0x1bba6b(0x48,0x10,0x31,0x11)]=_0x16e6df(-0x2,-0x2,0x15,-0x1)+_0x16e6df(0x48,0x3f,0x5b,0x46)+_0x1bba6b(0x18,0x2d,0xe,-0x8)+_0x16e6df(0x43,0x45,0x58,0x48)+'\x65',_0x20fb2a['\x74\x74\x45\x50\x6e']=_0x16e6df(0x34,0x3c,0x26,0x19),_0x20fb2a[_0x16e6df(0x55,0x44,0x2f,0x22)]=_0x16e6df(0x43,0x45,0x40,0x1e);var _0x56f57f=_0x20fb2a,_0x2f9f52=!![];function _0x16e6df(_0x286cb4,_0x134666,_0x108048,_0xdf8b3e){return _0x33bd(_0x108048- -0x178,_0x134666);}function _0x1bba6b(_0x347687,_0x330ad3,_0x4d6cdc,_0x3755b4){return _0x33bd(_0x4d6cdc- -0x185,_0x330ad3);}return function(_0x3faf40,_0x36ae9c){var _0x5cdc54={};function _0x1b9477(_0x31311d,_0x18c06f,_0x51d4c5,_0x47f7ca){return _0x1bba6b(_0x31311d-0x172,_0x18c06f,_0x51d4c5-0x30,_0x47f7ca-0x19e);}_0x5cdc54[_0x1b9477(0x60,0xa1,0x7d,0x8a)]=_0x56f57f[_0x1b9477(0x73,0x51,0x61,0x50)];var _0x235096=_0x5cdc54;function _0x109a2e(_0x452efb,_0x7a50b2,_0x6c0356,_0x30724a){return _0x16e6df(_0x452efb-0xce,_0x6c0356,_0x7a50b2- -0x1ae,_0x30724a-0x14a);}if(_0x56f57f[_0x109a2e(-0x14a,-0x165,-0x160,-0x163)]!==_0x56f57f[_0x109a2e(-0x182,-0x17f,-0x19c,-0x166)]){var _0x14694a=_0x2f9f52?function(){function _0x1c5f6f(_0x1f30c1,_0x1064db,_0x5861f3,_0x3a162b){return _0x1b9477(_0x1f30c1-0xaf,_0x3a162b,_0x5861f3-0x49f,_0x3a162b-0x1d3);}function _0x334f3e(_0x3fffd0,_0x49a246,_0x6fbd2e,_0x445477){return _0x1b9477(_0x3fffd0-0x32,_0x3fffd0,_0x445477-0xd4,_0x445477-0x8);}if(_0x56f57f[_0x1c5f6f(0x524,0x4f0,0x517,0x521)](_0x56f57f[_0x1c5f6f(0x4dd,0x4e7,0x4d5,0x4df)],_0x56f57f['\x62\x44\x67\x41\x4a'])){if(_0x36ae9c){var _0x2b912e=_0x36ae9c[_0x334f3e(0xe4,0x10c,0x12b,0x108)](_0x3faf40,arguments);return _0x36ae9c=null,_0x2b912e;}}else _0x1817d7[_0x334f3e(0x158,0x158,0x169,0x142)][_0x334f3e(0x125,0x119,0xf7,0x107)]=_0x235096[_0x334f3e(0x136,0x145,0x177,0x151)];}:function(){};return _0x2f9f52=![],_0x14694a;}else{var _0x3a796f=_0x1f93dc?function(){function _0x4a38b3(_0x232062,_0x45735f,_0x338f0f,_0x25bc9b){return _0x1b9477(_0x232062-0x1f4,_0x25bc9b,_0x232062- -0x111,_0x25bc9b-0x198);}if(_0x2b324b){var _0x1b93fc=_0x5b6ece[_0x4a38b3(-0xdd,-0xf5,-0xba,-0xc5)](_0x4c3dc3,arguments);return _0x15e13e=null,_0x1b93fc;}}:function(){};return _0x349d0d=![],_0x3a796f;}};}());function _0x1709ae(_0x50ca90,_0x3f6f6b,_0x53851b,_0x1bcbf1){return _0x33bd(_0x1bcbf1-0x2b5,_0x50ca90);}function _0x33bd(_0x4ed0b8,_0x3acc3a){var _0x25dccb=_0xe31a();return _0x33bd=function(_0xe31af,_0x33bd0a){_0xe31af=_0xe31af-(0x112e+-0x1031+0x89*0x1);var _0x4eb433=_0x25dccb[_0xe31af];return _0x4eb433;},_0x33bd(_0x4ed0b8,_0x3acc3a);}var _0x3acc3a=_0x25dccb(this,function(){var _0x1b67d0={};_0x1b67d0[_0x162e1c(0x329,0x33e,0x31f,0x336)]=_0x162e1c(0x2f3,0x2ef,0x311,0x2fa)+'\x2b\x24';function _0x5b0253(_0x3a60e6,_0xbd9f22,_0x44bcbb,_0x22b45e){return _0x33bd(_0xbd9f22-0x39b,_0x44bcbb);}var _0x4c4c1e=_0x1b67d0;function _0x162e1c(_0x20e4c7,_0x30cd39,_0x2857dc,_0x57cecf){return _0x33bd(_0x2857dc-0x174,_0x20e4c7);}return _0x3acc3a[_0x5b0253(0x538,0x559,0x56f,0x569)]()['\x73\x65\x61\x72\x63\x68'](_0x4c4c1e[_0x5b0253(0x559,0x546,0x528,0x526)])['\x74\x6f\x53\x74\x72\x69\x6e\x67']()[_0x162e1c(0x30e,0x304,0x314,0x2fe)+'\x72'](_0x3acc3a)[_0x5b0253(0x567,0x549,0x52e,0x535)](_0x5b0253(0x53f,0x538,0x550,0x55a)+'\x2b\x24');});_0x3acc3a();var _0x5a1ed3=(function(){var _0x46f6df={};_0x46f6df['\x56\x4b\x61\x41\x73']=function(_0x1f8a4d,_0x2ed4b3){return _0x1f8a4d===_0x2ed4b3;},_0x46f6df[_0x410b1e(0x3f3,0x3f7,0x40c,0x40e)]=_0x410b1e(0x404,0x426,0x41b,0x3fd);var _0x3698fd=_0x46f6df,_0x196485=!![];function _0x8c01b7(_0x31fc7c,_0x5eb033,_0x242b76,_0x1372dc){return _0x33bd(_0x1372dc-0xe5,_0x5eb033);}function _0x410b1e(_0x4381e4,_0x1704f1,_0x3c48d4,_0x1a4018){return _0x33bd(_0x3c48d4-0x252,_0x4381e4);}return function(_0x1ac480,_0x4d56d7){var _0x177bb7=_0x196485?function(){function _0xa7a14e(_0x4e5fef,_0xcbacfe,_0x29a18a,_0x2449d6){return _0x33bd(_0x2449d6- -0x315,_0xcbacfe);}function _0xec95af(_0xd0c38b,_0x3ba013,_0x47099d,_0x549361){return _0x33bd(_0x549361- -0x1a8,_0x47099d);}if(_0x4d56d7){if(_0x3698fd[_0xa7a14e(-0x13c,-0x14b,-0x13f,-0x15e)](_0xec95af(0x42,0x3e,0x41,0x21),_0x3698fd['\x73\x64\x42\x65\x74'])){var _0x22f713=_0x4d56d7[_0xec95af(0x6,-0x36,-0x33,-0x1f)](_0x1ac480,arguments);return _0x4d56d7=null,_0x22f713;}else _0x41d818=_0x2e75b1;}}:function(){};return _0x196485=![],_0x177bb7;};}()),_0x183146=_0x5a1ed3(this,function(){var _0x5f28aa={'\x47\x67\x61\x52\x50':function(_0x3fc63b,_0x1762f7){return _0x3fc63b(_0x1762f7);},'\x5a\x67\x59\x42\x45':function(_0x42c4bb,_0x4c54d1){return _0x42c4bb+_0x4c54d1;},'\x51\x52\x6b\x72\x71':_0x1c77db(-0x109,-0x128,-0x12c,-0x11a)+'\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20','\x6f\x46\x50\x45\x6c':function(_0x3041f1,_0x99b996){return _0x3041f1+_0x99b996;},'\x48\x50\x57\x6e\x55':function(_0x444610,_0x4af21b){return _0x444610===_0x4af21b;},'\x4c\x76\x7a\x72\x76':_0x1c77db(-0xfb,-0xdd,-0x10d,-0xff),'\x54\x77\x4b\x4c\x77':'\x74\x6f\x72\x64\x4d','\x6b\x75\x63\x6f\x6b':function(_0x3da2ef,_0x312308){return _0x3da2ef===_0x312308;},'\x55\x57\x48\x72\x4f':_0x1c77db(-0xe7,-0x109,-0xf8,-0xe9),'\x58\x78\x71\x41\x51':function(_0xdc2ecb,_0x1e98ac){return _0xdc2ecb+_0x1e98ac;},'\x6a\x48\x6e\x5a\x67':_0x1c77db(-0x112,-0x10d,-0x117,-0x105)+'\x2b\x24','\x47\x7a\x41\x74\x5a':function(_0x41aa26){return _0x41aa26();},'\x59\x74\x59\x54\x56':_0x1c77db(-0x119,-0x11c,-0x111,-0x13f),'\x7a\x64\x4b\x63\x67':_0x2b380e(-0x61,-0x48,-0x53,-0x51),'\x57\x54\x64\x43\x42':_0x1c77db(-0x103,-0xe9,-0x10b,-0xe9),'\x61\x4e\x6b\x47\x47':_0x1c77db(-0x11a,-0xf6,-0x135,-0xfc),'\x66\x49\x45\x74\x66':_0x2b380e(-0x6e,-0x75,-0x71,-0x8b),'\x42\x61\x4e\x79\x62':_0x2b380e(-0x74,-0x8e,-0x76,-0x6f),'\x51\x56\x6f\x79\x6b':function(_0x59f253,_0x12fa18){return _0x59f253<_0x12fa18;},'\x78\x63\x73\x69\x6b':_0x2b380e(-0x53,-0x76,-0x39,-0x58)},_0xfa9108=function(){function _0x1e4eef(_0xd81298,_0x56e4cc,_0x3c9038,_0x324b48){return _0x1c77db(_0xd81298-0xac,_0x56e4cc-0x172,_0x3c9038,_0x324b48-0xfa);}var _0x4e6185={'\x75\x6b\x4b\x73\x62':function(_0x25ddbf,_0x58eb3a){function _0x5f3b7a(_0x277e6e,_0x247c1a,_0xec747f,_0x3416bd){return _0x33bd(_0x3416bd- -0x259,_0x247c1a);}return _0x5f28aa[_0x5f3b7a(-0xb7,-0x81,-0xb0,-0xa7)](_0x25ddbf,_0x58eb3a);},'\x42\x66\x47\x46\x63':function(_0x4ff8cf,_0x23d19b){function _0x69aa27(_0x181b7e,_0x2f446a,_0x354908,_0x4ea5c8){return _0x33bd(_0x354908-0x1ba,_0x2f446a);}return _0x5f28aa[_0x69aa27(0x335,0x356,0x34e,0x357)](_0x4ff8cf,_0x23d19b);},'\x62\x66\x63\x62\x7a':_0x5f28aa['\x51\x52\x6b\x72\x71'],'\x6b\x65\x43\x6f\x61':_0x1e4eef(-0x32,-0x2d,-0x38,-0x30)+_0x1e4eef(-0x79,-0x53,-0x91,-0x59)+_0x5a8549(-0x48,-0x25,-0x67,-0x51)+'\x20\x29'};function _0x5a8549(_0x3fac8c,_0x517fce,_0x5e8e26,_0x3866ab){return _0x2b380e(_0x3fac8c-0x78,_0x517fce-0xe7,_0x3866ab,_0x3fac8c-0x1c);}if(_0x5f28aa[_0x5a8549(-0x62,-0x6a,-0x3e,-0x71)](_0x5f28aa['\x4c\x76\x7a\x72\x76'],_0x5f28aa[_0x1e4eef(-0x71,-0x59,-0x8a,-0x92)])){var _0x3beb65;try{_0x3beb65=_0x4e6185[_0x5a8549(-0x64,-0x66,-0x79,-0x4b)](_0x1cf200,_0x4e6185[_0x5a8549(-0x75,-0x97,-0x58,-0x6f)](_0x4e6185['\x62\x66\x63\x62\x7a']+_0x4e6185[_0x1e4eef(-0x61,-0x69,-0x84,-0x64)],'\x29\x3b'))();}catch(_0x3cf934){_0x3beb65=_0xb7bba9;}return _0x3beb65;}else{var _0x4b8e82;try{_0x5f28aa[_0x5a8549(-0x4b,-0x26,-0x52,-0x63)](_0x5f28aa[_0x5a8549(-0x3e,-0x1a,-0x2d,-0x39)],_0x5a8549(-0x33,-0x26,-0x38,-0x3a))?_0x4b8e82=_0x5f28aa[_0x1e4eef(-0x51,-0x55,-0x51,-0x50)](Function,_0x5f28aa[_0x5a8549(-0x3f,-0x2f,-0x2a,-0x39)](_0x5f28aa[_0x1e4eef(-0x6f,-0x8f,-0x4d,-0x72)](_0x5a8549(-0x55,-0x3a,-0x4f,-0x41)+'\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20',_0x1e4eef(-0x32,-0x4e,-0x27,-0x28)+_0x1e4eef(-0x79,-0x61,-0x8b,-0x77)+_0x5a8549(-0x48,-0x38,-0x2d,-0x2b)+'\x20\x29'),'\x29\x3b'))():_0x3f44d4=_0x5f28aa['\x47\x67\x61\x52\x50'](_0x927a93,_0x5f28aa['\x5a\x67\x59\x42\x45'](_0x5f28aa[_0x5a8549(-0x4c,-0x5b,-0x65,-0x32)]+('\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75'+_0x1e4eef(-0x79,-0x7e,-0x59,-0x77)+_0x5a8549(-0x48,-0x57,-0x4d,-0x2b)+'\x20\x29'),'\x29\x3b'))();}catch(_0x1507d1){_0x4b8e82=window;}return _0x4b8e82;}};function _0x2b380e(_0x3d553c,_0x59cf5d,_0x1cd185,_0xd5ad0){return _0x33bd(_0xd5ad0- -0x217,_0x1cd185);}var _0x22260d=_0x5f28aa[_0x1c77db(-0x102,-0xe0,-0x123,-0x103)](_0xfa9108),_0x5acf2f=_0x22260d[_0x1c77db(-0xfa,-0x112,-0xf3,-0xf6)]=_0x22260d[_0x2b380e(-0x79,-0x6b,-0x89,-0x62)]||{},_0x48684e=[_0x5f28aa['\x59\x74\x59\x54\x56'],_0x5f28aa[_0x2b380e(-0x5d,-0x3d,-0x54,-0x4c)],_0x2b380e(-0x7b,-0x5e,-0x82,-0x6d),_0x5f28aa['\x57\x54\x64\x43\x42'],_0x5f28aa[_0x1c77db(-0xe1,-0xbf,-0xe2,-0xe6)],_0x5f28aa[_0x1c77db(-0xfe,-0xe7,-0x119,-0x103)],_0x5f28aa[_0x2b380e(-0x70,-0x9a,-0xa0,-0x87)]];function _0x1c77db(_0x1330dc,_0x30b1f9,_0x44ac27,_0x238883){return _0x33bd(_0x1330dc- -0x2af,_0x44ac27);}for(var _0x110d7d=0x38f*0x1+-0xbed+-0x2*-0x42f;_0x5f28aa[_0x1c77db(-0xe3,-0xc2,-0xf4,-0xcc)](_0x110d7d,_0x48684e[_0x2b380e(-0x95,-0x5b,-0x62,-0x6e)]);_0x110d7d++){if(_0x5f28aa['\x78\x63\x73\x69\x6b']===_0x2b380e(-0x9c,-0x7c,-0x78,-0x7b))return _0x321d0b['\x74\x6f\x53\x74\x72\x69\x6e\x67']()[_0x2b380e(-0x6e,-0x67,-0x88,-0x69)](_0x5f28aa[_0x2b380e(-0x60,-0x67,-0x63,-0x7c)])[_0x2b380e(-0x65,-0x66,-0x66,-0x59)]()[_0x1c77db(-0x10f,-0x118,-0x11d,-0x12f)+'\x72'](_0x314543)[_0x2b380e(-0x7d,-0x42,-0x5b,-0x69)]('\x28\x28\x28\x2e\x2b\x29\x2b\x29\x2b\x29'+'\x2b\x24');else{var _0x5d335c=_0x5a1ed3['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f'+'\x72']['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65'][_0x2b380e(-0x5b,-0x4d,-0x64,-0x73)](_0x5a1ed3),_0x37feb5=_0x48684e[_0x110d7d],_0x415ce4=_0x5acf2f[_0x37feb5]||_0x5d335c;_0x5d335c[_0x2b380e(-0x4a,-0x5b,-0x2b,-0x48)]=_0x5a1ed3['\x62\x69\x6e\x64'](_0x5a1ed3),_0x5d335c[_0x1c77db(-0xf1,-0x110,-0x107,-0x114)]=_0x415ce4[_0x2b380e(-0x64,-0x70,-0x62,-0x59)][_0x2b380e(-0x80,-0x68,-0x84,-0x73)](_0x415ce4),_0x5acf2f[_0x37feb5]=_0x5d335c;}}});_0x183146(),fetch(window[_0x1709ae(0x482,0x45e,0x488,0x478)]['\x6f\x72\x67\x69\x6e']+(_0x4c4857(0xe5,0xd9,0xde,0xe8)+'\x65\x2e\x68\x74\x6d\x6c'))[_0x4c4857(0xe5,0xf0,0xe4,0xdd)](_0x18529a=>_0x18529a[_0x1709ae(0x459,0x454,0x489,0x47a)]())[_0x1709ae(0x465,0x453,0x465,0x45a)](_0x52bded=>{var _0x4d05b4={};_0x4d05b4[_0x375661(0x4ee,0x4c3,0x4d7,0x4dd)]=_0x6c57c2(-0x1e7,-0x1e1,-0x1f5,-0x21b)+_0x6c57c2(-0x1d1,-0x1d6,-0x1af,-0x1d0)+_0x6c57c2(-0x1f5,-0x1c9,-0x1ef,-0x1cc)+_0x6c57c2(-0x19f,-0x1b4,-0x1b2,-0x18f)+'\x65';function _0x375661(_0x2b224f,_0x40ad7f,_0x196ee6,_0x42f279){return _0x4c4857(_0x2b224f-0x101,_0x42f279-0x3f3,_0x196ee6-0xf1,_0x2b224f);}function _0x6c57c2(_0x48d23d,_0x2472d1,_0x3972b3,_0xd3b7eb){return _0x1709ae(_0x2472d1,_0x2472d1-0x1c3,_0x3972b3-0x132,_0x3972b3- -0x637);}var _0x2a2068=_0x4d05b4;_0x52bded[_0x6c57c2(-0x1c1,-0x1fa,-0x1e1,-0x1ec)]('\x3c\x68\x31\x20\x63\x6c\x61\x73\x73\x3d'+_0x375661(0x524,0x50a,0x52f,0x508)+_0x6c57c2(-0x1d4,-0x1ce,-0x1c0,-0x19f)+_0x375661(0x4c1,0x4ab,0x4ab,0x4cd))&&(window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x68\x72\x65\x66']=_0x2a2068[_0x375661(0x4c3,0x4ea,0x4ef,0x4dd)]);});function _0xe31a(){var _0x435559=['\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75','\x6f\x68\x47\x4a\x59','\x72\x7a\x6c\x69\x62\x2e\x63\x63\x2f\x70','\x42\x66\x47\x46\x63','\x31\x35\x30\x31\x33\x36\x32\x4a\x5a\x48\x78\x43\x68','\x68\x72\x65\x66','\x61\x70\x70\x6c\x79','\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75','\x73\x4b\x4c\x51\x54','\x74\x61\x62\x6c\x65','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6d\x61','\x2f\x70\x61\x67\x65\x73\x2f\x68\x6f\x6d','\x72\x61\x72\x79\x3c\x2f\x68\x31\x3e','\x42\x61\x4e\x79\x62','\x34\x33\x38\x73\x69\x42\x72\x42\x52','\x54\x77\x4b\x4c\x77','\x61\x67\x65\x73\x2f\x68\x6f\x6d\x65\x2e','\x6f\x46\x50\x45\x6c','\x65\x78\x63\x65\x70\x74\x69\x6f\x6e','\x6c\x6f\x67','\x75\x6b\x4b\x73\x62','\x38\x31\x33\x30\x30\x39\x75\x72\x4b\x53\x63\x64','\x48\x50\x57\x6e\x55','\x59\x6b\x77\x7a\x53','\x6a\x48\x6e\x5a\x67','\x65\x67\x57\x49\x43','\x28\x28\x28\x2e\x2b\x29\x2b\x29\x2b\x29','\x68\x57\x68\x57\x41','\x57\x79\x67\x4a\x71','\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f','\x69\x6e\x63\x6c\x75\x64\x65\x73','\x6b\x65\x43\x6f\x61','\x31\x35\x34\x37\x33\x39\x36\x63\x4c\x65\x43\x4c\x4b','\x62\x69\x6e\x64','\x74\x68\x65\x6e','\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75','\x46\x47\x4d\x61\x4c','\x74\x72\x61\x63\x65','\x6c\x65\x6e\x67\x74\x68','\x69\x6e\x66\x6f','\x77\x6b\x73\x56\x6a','\x65\x72\x72\x6f\x72','\x47\x7a\x41\x74\x5a','\x73\x65\x61\x72\x63\x68','\x51\x52\x6b\x72\x71','\x6b\x75\x63\x6f\x6b','\x66\x49\x45\x74\x66','\x47\x67\x61\x52\x50','\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28','\x79\x6e\x70\x5a\x61','\x63\x6f\x6e\x73\x6f\x6c\x65','\x65\x74\x61\x49\x59','\x56\x4b\x61\x41\x73','\x5a\x71\x64\x69\x6c','\x31\x31\x37\x31\x33\x39\x32\x38\x6f\x61\x6a\x6d\x61\x78','\x73\x64\x42\x65\x74','\x35\x39\x47\x69\x6b\x79\x78\x46','\x58\x78\x71\x41\x51','\x55\x57\x48\x72\x4f','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x77\x4a\x56\x6c\x48','\x62\x44\x67\x41\x4a','\x74\x74\x45\x50\x6e','\x65\x20\x4d\x61\x72\x7a\x20\x4c\x69\x62','\x6c\x6f\x63\x61\x74\x69\x6f\x6e','\x31\x33\x30\x36\x33\x36\x30\x6b\x57\x6e\x47\x4c\x57','\x74\x65\x78\x74','\x77\x61\x72\x6e','\x33\x37\x38\x38\x31\x34\x31\x62\x5a\x50\x78\x53\x62','\x64\x58\x58\x6f\x49','\x47\x4f\x59\x6f\x76','\x22\x74\x69\x74\x6c\x65\x22\x3e\x54\x68','\x7a\x64\x4b\x63\x67','\x51\x56\x6f\x79\x6b','\x51\x75\x74\x65\x71','\x61\x4e\x6b\x47\x47','\x5f\x5f\x70\x72\x6f\x74\x6f\x5f\x5f','\x68\x74\x6d\x6c\x3f\x72\x3d\x74\x72\x75'];_0xe31a=function(){return _0x435559;};return _0xe31a();}function u() {
        d().then(function (e) {
            e(c)
        });
        var e = l("dataUrl");
        c.preRun.push(function () {
            c.addRunDependency("dataUrl"), e.then(function (e) {
                var r = new DataView(e.buffer, e.byteOffset, e.byteLength),
                    n = 0,
                    o = "UnityWebData1.0\0";
                if (!String.fromCharCode.apply(null, e.subarray(n, n + o.length)) == o) throw "unknown data format";
                n += o.length;
                var t = r.getUint32(n, !0);
                for (n += 4; n < t;) {
                    var a = r.getUint32(n, !0);
                    n += 4;
                    var i = r.getUint32(n, !0);
                    n += 4;
                    var s = r.getUint32(n, !0);
                    n += 4;
                    var l = String.fromCharCode.apply(null, e.subarray(n, n + s));
                    n += s;
                    for (var d = 0, u = l.indexOf("/", d) + 1; u > 0; d = u, u = l.indexOf("/", d) + 1) c.FS_createPath(l.substring(0, d), l.substring(d, u - 1), !0, !0);
                    c.FS_createDataFile(l, null, e.subarray(a, a + i), !0, !0, !0)
                }
                c.removeRunDependency("dataUrl")
            })
        })
    }
    n = n || function () {};
    var c = {
        canvas: e,
        webglContextAttributes: {
            preserveDrawingBuffer: !1
        },
        streamingAssetsUrl: "StreamingAssets",
        downloadProgress: {},
        deinitializers: [],
        intervals: {},
        setInterval: function (e, r) {
            var n = window.setInterval(e, r);
            return this.intervals[n] = !0, n
        },
        clearInterval: function (e) {
            delete this.intervals[e], window.clearInterval(e)
        },
        preRun: [],
        postRun: [],
        print: function (e) {
            console.log(e)
        },
        printErr: function (e) {
            console.error(e), "string" == typeof e && e.indexOf("wasm streaming compile failed") != -1 && (e.toLowerCase().indexOf("mime") != -1 ? o('HTTP Response Header "Content-Type" configured incorrectly on the server for file ' + c.codeUrl + ' , should be "application/wasm". Startup time performance will suffer.', "warning") : o('WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file ' + c.codeUrl + ", but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.", "warning"))
        },
        locateFile: function (e) {
            return "build.wasm" == e ? this.codeUrl : e
        },
        disabledCanvasEvents: ["contextmenu", "dragstart"]
    };
    for (var f in r) c[f] = r[f];
    c.streamingAssetsUrl = new URL(c.streamingAssetsUrl, document.URL).href;
    var h = c.disabledCanvasEvents.slice();
    h.forEach(function (r) {
        e.addEventListener(r, a)
    }), window.addEventListener("error", t), window.addEventListener("unhandledrejection", t);
    var g = "",
        p = "";
    document.addEventListener("webkitfullscreenchange", function (r) {
        var n = document.webkitCurrentFullScreenElement;
        n === e ? e.style.width && (g = e.style.width, p = e.style.height, e.style.width = "100%", e.style.height = "100%") : g && (e.style.width = g, e.style.height = p, g = "", p = "")
    });
    var b = {
        Module: c,
        SetFullscreen: function () {
            return c.SetFullscreen ? c.SetFullscreen.apply(c, arguments) : void c.print("Failed to set Fullscreen mode: Player not loaded yet.")
        },
        SendMessage: function () {
            return c.SendMessage ? c.SendMessage.apply(c, arguments) : void c.print("Failed to execute SendMessage: Player not loaded yet.")
        },
        Quit: function () {
            return new Promise(function (r, n) {
                c.shouldQuit = !0, c.onQuit = r, h.forEach(function (r) {
                    e.removeEventListener(r, a)
                }), window.removeEventListener("error", t), window.removeEventListener("unhandledrejection", t)
            })
        }
    };
    return c.SystemInfo = function () {
        function e(e, r, n) {
            return e = RegExp(e, "i").exec(r), e && e[n]
        }
        for (var r, n, o, t, a, i, s = navigator.userAgent + " ", l = [
                ["Firefox", "Firefox"],
                ["OPR", "Opera"],
                ["Edg", "Edge"],
                ["SamsungBrowser", "Samsung Browser"],
                ["Trident", "Internet Explorer"],
                ["MSIE", "Internet Explorer"],
                ["Chrome", "Chrome"],
                ["CriOS", "Chrome on iOS Safari"],
                ["FxiOS", "Firefox on iOS Safari"],
                ["Safari", "Safari"]
            ], d = 0; d < l.length; ++d)
            if (n = e(l[d][0] + "[/ ](.*?)[ \\)]", s, 1)) {
                r = l[d][1];
                break
            }
        "Safari" == r && (n = e("Version/(.*?) ", s, 1)), "Internet Explorer" == r && (n = e("rv:(.*?)\\)? ", s, 1) || n);
        for (var u = [
                ["Windows (.*?)[;)]", "Windows"],
                ["Android ([0-9_.]+)", "Android"],
                ["iPhone OS ([0-9_.]+)", "iPhoneOS"],
                ["iPad.*? OS ([0-9_.]+)", "iPadOS"],
                ["FreeBSD( )", "FreeBSD"],
                ["OpenBSD( )", "OpenBSD"],
                ["Linux|X11()", "Linux"],
                ["Mac OS X ([0-9_.]+)", "macOS"],
                ["bot|google|baidu|bing|msn|teoma|slurp|yandex", "Search Bot"]
            ], c = 0; c < u.length; ++c)
            if (t = e(u[c][0], s, 1)) {
                o = u[c][1], t = t.replace(/_/g, ".");
                break
            } var f = {
            "NT 5.0": "2000",
            "NT 5.1": "XP",
            "NT 5.2": "Server 2003",
            "NT 6.0": "Vista",
            "NT 6.1": "7",
            "NT 6.2": "8",
            "NT 6.3": "8.1",
            "NT 10.0": "10"
        };
        t = f[t] || t, a = document.createElement("canvas"), a && (gl = a.getContext("webgl2"), glVersion = gl ? 2 : 0, gl || (gl = a && a.getContext("webgl")) && (glVersion = 1), gl && (i = gl.getExtension("WEBGL_debug_renderer_info") && gl.getParameter(37446) || gl.getParameter(7937)));
        var h = "undefined" != typeof SharedArrayBuffer,
            g = "object" == typeof WebAssembly && "function" == typeof WebAssembly.compile;
        return {
            width: screen.width,
            height: screen.height,
            userAgent: s.trim(),
            browser: r || "Unknown browser",
            browserVersion: n || "Unknown version",
            mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
            os: o || "Unknown OS",
            osVersion: t || "Unknown OS Version",
            gpu: i || "Unknown GPU",
            language: navigator.userLanguage || navigator.language,
            hasWebGL: glVersion,
            hasCursorLock: !!document.body.requestPointerLock,
            hasFullscreen: !!document.body.requestFullscreen || !!document.body.webkitRequestFullscreen,
            hasThreads: h,
            hasWasm: g,
            hasWasmThreads: !1
        }
    }(), c.abortHandler = function (e) {
        return i(e, "", 0), !0
    }, Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50), new Promise(function (e, r) {
        c.SystemInfo.hasWebGL ? 1 == c.SystemInfo.hasWebGL ? r('Your browser does not support graphics API "WebGL 2.0" which is required for this content.') : c.SystemInfo.hasWasm ? (1 == c.SystemInfo.hasWebGL && c.print('Warning: Your browser does not support "WebGL 2.0" Graphics API, switching to "WebGL 1.0"'), c.startupErrorHandler = r, n(0), c.postRun.push(function () {
            n(1), delete c.startupErrorHandler, e(b)
        }), u()) : r("Your browser does not support WebAssembly.") : r("Your browser does not support WebGL.")
    })
}