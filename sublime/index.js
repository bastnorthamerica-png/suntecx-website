
(function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-8KBEM5QFPN');
})();



(function onLoad() {
    function isMobileDevice() {
        const ua = navigator.userAgent;
        return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Mobile/i.test(ua);
    }

    let translations_val = {}
    function loadLanguage(lang) {
        fetch(`lang/${lang}.json`)
            .then(res => res.json())
            .then(translations => {
                translations_val = translations
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.dataset.i18n;
                    el.textContent = translations[key];
                });
                document.querySelectorAll('[data-placeholder]').forEach(el => {
                    el.placeholder = translations[el.dataset.placeholder];
                });
            });
    }

    let lang = "en" //window.navigator && (window.navigator.browserLanguage || window.navigator.language)  //中英文切换
    if (lang == "zh-CN" || lang == "zh-TW" || lang == "zh" || lang == 'zh-cn') {
        lang = "zh"
        $(".lang-zh").addClass("on")
    } else {
        lang = "en"
        $(".lang-en").addClass("on")
    }
    loadLanguage(lang)
    if (!isMobileDevice() && window.innerWidth > 1360) {
        //pc端引入iframe, 隐藏按钮和图片
        const iframe = document.createElement('iframe');
        iframe.id = 'iframe-import';
        iframe.src = "./customize.html?" + lang + "_back";
        let iframeWrap = document.getElementById("iframe-wrap");
        iframeWrap.appendChild(iframe);
        $(".s-c-a-sub-title").addClass("hide")
        $(".mb_show").addClass("hide")
        $("#iframe-wrap").removeClass("hide")
    }


    $(".lang-zh").on("click", function (e) {
        if ($(this).hasClass("on")) return;
        loadLanguage("zh")
        $(".lang-zh").addClass("on")
        $(".lang-en").removeClass("on")
        let iframe = document.getElementById("iframe-import");
        if (iframe) {
            iframe.src = "./customize.html?zh_back";
        }
    })
    $(".lang-en").on("click", () => {
        if ($(this).hasClass("on")) return;
        loadLanguage("en")
        $(".lang-en").addClass("on")
        $(".lang-zh").removeClass("on")
        let iframe = document.getElementById("iframe-import");
        if (iframe) {
            iframe.src = "./customize.html?en_back"
        }
    })


    $(".s-r-b-c-tab").on("click", function (e) {
        if ($(this).hasClass("on")) return;
        $(this).siblings().removeClass("on")
        $(this).addClass("on")
        let newSrc = $(this).find("img").attr('src')
        newSrc = newSrc && newSrc.replace("_thumb", "") || "";
        $(this).parent().siblings(".s-r-b-cont").find("img").attr("src", newSrc)
    })

    const onScroll = () => {
        const parent = $('.s-c-a-scroll-wrap');
        const child = parent.find('.s-c-a-scroll');
        // const item = child.find(".s-c-a-s-item");
        const bar_bg = $(".s-c-a-scroll-bar-bg");
        const bar = bar_bg.find(".s-c-a-scroll-bar-col");
        const barWidth = bar_bg.outerWidth() - bar.outerWidth();
        const maxScroll = child.outerWidth() - parent.outerWidth();
        const barTrans = Math.max(Math.round((barWidth / maxScroll) * parent.scrollLeft()), 0)
        // parent.animate({ scrollLeft: Math.max(parent.scrollLeft() - (item.outerWidth() + 40), 0) }, 300);
        bar.css("transform", `translateX(${barTrans}px)`)
    }
    function throttle(func, limit = 100) {
        let lastFunc;
        let lastRan;
        return function (...args) {
            if (!lastRan) {
                func.apply(this, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(this, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    }
    $(".s-c-a-scroll-wrap").on("scroll", throttle(onScroll, 200))

    $(".s-c-a-s-item").on("click", function () {
        const parent = $('.s-c-a-scroll-wrap');
        const child = parent.find('.s-c-a-scroll');
        const imgWidth = $(this).width();
        const imgOffset = $(this).position().left + parent.scrollLeft();
        let paddingLeft = Number(parseInt(child.css("padding-left")))
        let targetPosition = imgOffset + imgWidth / 2 - parent.width() / 2;
        targetPosition = Math.max(targetPosition, 0);
        parent.animate({ scrollLeft: targetPosition }, 300);
    })

    $(".s-c-a-scroll-box").on("mousedown touchstart", (e) => {
        this.isDragging = true;
        this.startX = (e.type === 'touchstart') ? e.originalEvent.touches.clientX : e.clientX;
        this.translalteX = parseInt($(".s-c-a-scroll-bar-col").css("transform").split(",")[4]) || 0;
    })

    $(".s-c-a-scroll-box").on("mousemove touchmove", throttle((e) => {
        if (this.isDragging) {
            let moveX = (e.type === 'touchmove') ? e.originalEvent.touches.clientX : e.clientX
            let current = Math.max(moveX - this.startX + this.translalteX, 0)
            const bar_bg = $(".s-c-a-scroll-bar-bg");
            const bar = bar_bg.find(".s-c-a-scroll-bar-col");
            const barWidth = bar_bg.outerWidth() - bar.outerWidth();
            current = Math.min(current, barWidth);
            const parent = $('.s-c-a-scroll-wrap');
            const child = parent.find('.s-c-a-scroll');
            const maxScroll = child.outerWidth() - parent.outerWidth();
            const barTrans = current ? Math.max((Math.round(maxScroll / barWidth) * current), 0) : 0;
            parent.animate({ scrollLeft: barTrans }, 200);

            bar.css("transform", `translateX(${current}px)`)
        }
    }, 200))

    $(".s-c-a-scroll-box").on("mouseup touchend mouseleave", (e) => {
        this.isDragging = false;
    })

    const imgs = [
        "./assets/s-c-img-1.webp",
        "./assets/s-c-img-2.webp",
        "./assets/s-c-img-03.webp",
        "./assets/s-c-img-4.webp",
        "./assets/s-c-img-5.webp",
        "./assets/s-c-img-06.webp",
        "./assets/s-c-img-07.webp",
        "./assets/s-c-img-8.webp",
        "./assets/s-c-img-09.webp",
        "./assets/s-c-img-10.webp",
    ]
    $(".s-c-img-icon").on("click", function (e) {
        // 先判断设备类型，如果是移动端，全屏展示信息；
        let ua = window.navigator?.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua)) {
            let key = $(this).attr("data-key");
            if (key) {
                $(".mask-img .mask-msg h5").text(translations_val["s_c_img_" + key + "_title"])
                $(".mask-img .mask-msg p").text(translations_val["s_c_img_" + key + "_desc"])
            }
            $(".mask-img").css("display", "flex");
            $("body").css("height", "100vh").css("overflow", "hidden")
        }
    })
    // const valid_idx = { 1: 1, 2: 2, 4: 3, 6: 4, 7: 4, 8: 5, 9: 1, }
    // $(".s-c-img-click").on("click", function (e) {
    //     let src = $(this).attr("src"), key = "";
    //     if (!src) {
    //         src = $(this).find(".img-box").attr("src");
    //         key = $(this).attr("data-key");
    //     }
    //     $(".mask-img .img").attr("src", src);
    //     if (key) {
    //         $(".mask-img .mask-msg h5").text(translations_val["s_c_img_" + key + "_title"])
    //         $(".mask-img .mask-msg p").text(translations_val["s_c_img_" + key + "_desc"])
    //     } else {
    //         $(".mask-img .mask-msg h5").text(" ")
    //         $(".mask-img .mask-msg p").text("")
    //     }
    //     $(".mask-img").css("display", "flex");
    //     $("body").css("height", "100vh").css("overflow", "hidden")
    // })
    // $(".mask-last").on("click", function () {
    //     let src = $(".mask-img .img").attr("src");
    //     let idx = imgs.findIndex((item) => item === src);
    //     if (idx == 0) idx = imgs.length - 1;
    //     else idx = idx - 1;
    //     if (valid_idx[idx]) {
    //         $(".mask-img .mask-msg h5").text(translations_val["s_c_img_" + valid_idx[idx] + "_title"])
    //         $(".mask-img .mask-msg p").text(translations_val["s_c_img_" + valid_idx[idx] + "_desc"])
    //     } else {
    //         $(".mask-img .mask-msg h5").text("")
    //         $(".mask-img .mask-msg p").text("")
    //     }
    //     $(".mask-img .img").attr("src", imgs[idx]);
    // })
    // $(".mask-next").on("click", function () {
    //     let src = $(".mask-img .img").attr("src");
    //     let idx = imgs.findIndex((item) => item === src);
    //     if (idx == imgs.length - 1) idx = 0;
    //     else idx = idx + 1;
    //     if (valid_idx[idx]) {
    //         $(".mask-img .mask-msg h5").text(translations_val["s_c_img_" + valid_idx[idx] + "_title"])
    //         $(".mask-img .mask-msg p").text(translations_val["s_c_img_" + valid_idx[idx] + "_desc"])
    //     } else {
    //         $(".mask-img .mask-msg h5").text("")
    //         $(".mask-img .mask-msg p").text("")
    //     }
    //     $(".mask-img .img").attr("src", imgs[idx]);
    // })

    $(".mask-img").on("click", function () {
        $(".mask-img").hide();
        $("body").css("height", "auto").css("overflow", "auto")
    })

    $(".s-c-a-sub-title").on("click", function () {
        let lang = $(".lang-en").hasClass("on") ? "en" : "zh"
        window.location.href = "./customize.html?" + lang;
    })
    $(".s-c-img-square").on("click", function () {
        let lang = $(".lang-en").hasClass("on") ? "en" : "zh"
        window.location.href = "./customize.html?" + lang;
    })
    const preloadImages = () => {
        const imgs = ["sublime_classic_2", "sublime_classic_3", "sublime_classic_4", "sublime_pro_2", "sublime_standard_2", "sublime_standard_3", "sublime_standard_4", "sublime_bedside_2", "sublime_bedside_3", "sublime_line_2"]
        for (var i = 0; i < 7; i++) {
            const child = document.createElement("img");
            child.src = `./assets/${imgs[i]}.webp`;
            child.onload = () => {

            }
        }
    };

    preloadImages(); //预加载

    // 表单
    $(".connect-img").on("click", function () {
        $(".mask-form").show();
        $("body").css("height", "100vh").css("overflow", "hidden")
    })
    $(".form-close").on("click", function () {
        $(".mask-form").hide();
        $("body").css("height", "auto").css("overflow", "auto")
    })

    let loading = false //正在提交表单
    const option = document.getElementById('block-form-options');
    var countryList = [{ "en": "Abkhazia", "nc": "AB" }, { "en": "Afghanistan", "nc": "AF" }, { "en": "Albania", "nc": "AL" }, { "en": "Algeria", "nc": "DZ" }, { "en": "Andorra", "nc": "AD" }, { "en": "Angola", "nc": "AO" },
    { "en": "Antigua and Barbuda", "nc": "AG" }, { "en": "Argentina", "nc": "AR" }, { "en": "Armenia", "nc": "AM" }, { "en": "Australia", "nc": "AU" }, { "en": "Austria", "nc": "AT" }, { "en": "Azerbaijan", "nc": "AZ" },
    { "en": "Bahamas", "nc": "BS" }, { "en": "Bahrain", "nc": "BH" }, { "en": "Bangladesh", "nc": "BD" }, { "en": "Barbados", "nc": "BB" }, { "en": "Belarus", "nc": "BY" }, { "en": "Belgium", "nc": "BE" },
    { "en": "Belize", "nc": "BZ" }, { "en": "Benin", "nc": "BJ" }, { "en": "Bhutan", "nc": "BT" }, { "en": "Bolivia", "nc": "BO" }, { "en": "Bosnia and Herzegovina", "nc": "BA" }, { "en": "Botswana", "nc": "BW" },
    { "en": "Brazil", "nc": "BR" }, { "en": "Brunei", "nc": "BN" }, { "en": "Bulgaria", "nc": "BG" }, { "en": "Burkina Faso", "nc": "BF" }, { "en": "Burundi", "nc": "BI" }, { "en": "Cambodia", "nc": "KH" },
    { "en": "Cameroon", "nc": "CM" }, { "en": "Canada", "nc": "CA" }, { "en": "Cabo Verde", "nc": "CV" }, { "en": "Central African Republic", "nc": "CF" }, { "en": "Chad", "nc": "TD" }, { "en": "Chile", "nc": "CL" },
    { "en": "China", "nc": "CN" }, { "en": "Colombia", "nc": "CO" }, { "en": "Comoros", "nc": "KM" }, { "en": "Congo (Brazzaville)", "nc": "CG" }, { "en": "Congo (Kinshasa)", "nc": "CD" }, { "en": "Cook Islands", "nc": "CK" },
    { "en": "Costa Rica", "nc": "CR" }, { "en": "Côte d'Ivoire", "nc": "CI" }, { "en": "Croatia", "nc": "HR" }, { "en": "Cuba", "nc": "CU" }, { "en": "Cyprus", "nc": "CY" }, { "en": "Czechia", "nc": "CZ" },
    { "en": "Denmark", "nc": "DK" }, { "en": "Djibouti", "nc": "DJ" }, { "en": "Dominica", "nc": "DM" }, { "en": "Dominican Republic", "nc": "DO" }, { "en": "Ecuador", "nc": "EC" }, { "en": "Egypt", "nc": "EG" },
    { "en": "El Salvador", "nc": "SV" }, { "en": "Equatorial Guinea", "nc": "GQ" }, { "en": "Eritrea", "nc": "ER" }, { "en": "Estonia", "nc": "EE" }, { "en": "Eswatini", "nc": "SZ" }, { "en": "Ethiopia", "nc": "ET" },
    { "en": "Fiji", "nc": "FJ" }, { "en": "Finland", "nc": "FI" }, { "en": "France", "nc": "FR" }, { "en": "Gabon", "nc": "GA" }, { "en": "Gambia", "nc": "GM" }, { "en": "Georgia", "nc": "GE" }, { "en": "Germany", "nc": "DE" },
    { "en": "Ghana", "nc": "GH" }, { "en": "Greece", "nc": "GR" }, { "en": "Grenada", "nc": "GD" }, { "en": "Guatemala", "nc": "GT" }, { "en": "Guinea", "nc": "GN" }, { "en": "Guinea-Bissau", "nc": "GW" },
    { "en": "Guyana", "nc": "GY" }, { "en": "Haiti", "nc": "HT" }, { "en": "Honduras", "nc": "HN" }, { "en": "Hungary", "nc": "HU" }, { "en": "Iceland", "nc": "IS" }, { "en": "India", "nc": "IN" }, { "en": "Indonesia", "nc": "ID" },
    { "en": "Iran", "nc": "IR" }, { "en": "Iraq", "nc": "IQ" }, { "en": "Ireland", "nc": "IE" }, { "en": "Israel", "nc": "IL" }, { "en": "Italy", "nc": "IT" }, { "en": "Jamaica", "nc": "JM" }, { "en": "Japan", "nc": "JP" },
    { "en": "Jordan", "nc": "JO" }, { "en": "Kazakhstan", "nc": "KZ" }, { "en": "Kenya", "nc": "KE" }, { "en": "Kiribati", "nc": "KI" }, { "en": "Kosovo", "nc": "XK" }, { "en": "Kuwait", "nc": "KW" },
    { "en": "Kyrgyzstan", "nc": "KG" }, { "en": "Laos", "nc": "LA" }, { "en": "Latvia", "nc": "LV" }, { "en": "Lebanon", "nc": "LB" }, { "en": "Lesotho", "nc": "LS" }, { "en": "Liberia", "nc": "LR" },
    { "en": "Libya", "nc": "LY" }, { "en": "Liechtenstein", "nc": "LI" }, { "en": "Lithuania", "nc": "LT" }, { "en": "Luxembourg", "nc": "LU" }, { "en": "Madagascar", "nc": "MG" }, { "en": "Malawi", "nc": "MW" },
    { "en": "Malaysia", "nc": "MY" }, { "en": "Maldives", "nc": "MV" }, { "en": "Mali", "nc": "ML" }, { "en": "Malta", "nc": "MT" }, { "en": "Marshall Islands", "nc": "MH" }, { "en": "Mauritania", "nc": "MR" },
    { "en": "Mauritius", "nc": "MU" }, { "en": "Mexico", "nc": "MX" }, { "en": "Micronesia", "nc": "FM" }, { "en": "Moldova", "nc": "MD" }, { "en": "Monaco", "nc": "MC" }, { "en": "Mongolia", "nc": "MN" },
    { "en": "Montenegro", "nc": "ME" }, { "en": "Morocco", "nc": "MA" }, { "en": "Mozambique", "nc": "MZ" }, { "en": "Myanmar", "nc": "MM" }, { "en": "Namibia", "nc": "NA" }, { "en": "Nauru", "nc": "NR" },
    { "en": "Nepal", "nc": "NP" }, { "en": "Netherlands", "nc": "NL" }, { "en": "New Zealand", "nc": "NZ" }, { "en": "Nicaragua", "nc": "NI" }, { "en": "Niger", "nc": "NE" }, { "en": "Nigeria", "nc": "NG" },
    { "en": "Niue", "nc": "NU" }, { "en": "North Korea", "nc": "KP" }, { "en": "Northern Cyprus", "nc": "NY" }, { "en": "North Macedonia", "nc": "MK" }, { "en": "Norway", "nc": "NO" }, { "en": "Oman", "nc": "OM" },
    { "en": "Pakistan", "nc": "PK" }, { "en": "Palau", "nc": "PW" }, { "en": "Palestine", "nc": "PS" }, { "en": "Panama", "nc": "PA" }, { "en": "Papua New Guinea", "nc": "PG" }, { "en": "Paraguay", "nc": "PY" },
    { "en": "Peru", "nc": "PE" }, { "en": "Philippines", "nc": "PH" }, { "en": "Poland", "nc": "PL" }, { "en": "Portugal", "nc": "PT" }, { "en": "Pridnestrovie", "nc": "PI" }, { "en": "Qatar", "nc": "QA" },
    { "en": "Romania", "nc": "RO" }, { "en": "Russia", "nc": "RU" }, { "en": "Rwanda", "nc": "RW" }, { "en": "Saint Christopher and Nevis", "nc": "KN" }, { "en": "Saint Lucia", "nc": "LC" },
    { "en": "Saint Vincent and the Grenadines", "nc": "VC" }, { "en": "Samoa", "nc": "WS" }, { "en": "San Marino", "nc": "SM" }, { "en": "São Tomé and Príncipe", "nc": "ST" }, { "en": "Saudi Arabia", "nc": "SA" },
    { "en": "Senegal", "nc": "SN" }, { "en": "Serbia", "nc": "RS" }, { "en": "Seychelles", "nc": "SC" }, { "en": "Sierra Leone", "nc": "SL" }, { "en": "Singapore", "nc": "SG" }, { "en": "Slovakia", "nc": "SK" },
    { "en": "Slovenia", "nc": "SI" }, { "en": "Solomon Islands", "nc": "SB" }, { "en": "Somalia", "nc": "SO" }, { "en": "Somaliland", "nc": "OA" }, { "en": "South Africa", "nc": "ZA" }, { "en": "South Korea", "nc": "KR" },
    { "en": "South Ossetia", "nc": "SU" }, { "en": "South Sudan", "nc": "SS" }, { "en": "Spain", "nc": "ES" }, { "en": "Sri Lanka", "nc": "LK" }, { "en": "Sudan", "nc": "SD" }, { "en": "Suriname", "nc": "SR" },
    { "en": "Sweden", "nc": "SE" }, { "en": "Switzerland", "nc": "CH" }, { "en": "Syria", "nc": "SY" }, { "en": "Taiwan, China", "nc": "TW" }, { "en": "Tajikistan", "nc": "TJ" }, { "en": "Tanzania", "nc": "TZ" },
    { "en": "Thailand", "nc": "TH" }, { "en": "Timor-Leste", "nc": "TL" }, { "en": "Togo", "nc": "TG" }, { "en": "Tonga", "nc": "TO" }, { "en": "Trinidad and Tobago", "nc": "TT" }, { "en": "Tunisia", "nc": "TN" },
    { "en": "Turkey", "nc": "TR" }, { "en": "Turkmenistan", "nc": "TM" }, { "en": "Tuvalu", "nc": "TV" }, { "en": "Uganda", "nc": "UG" }, { "en": "Ukraine", "nc": "UA" }, { "en": "United Arab Emirates", "nc": "AE" },
    { "en": "United Kingdom", "nc": "GB" }, { "en": "United States", "nc": "US" }, { "en": "Uruguay", "nc": "UY" }, { "en": "Uzbekistan", "nc": "UZ" }, { "en": "Vanuatu", "nc": "VU" }, { "en": "Vatican City", "nc": "VA" },
    { "en": "Venezuela", "nc": "VE" }, { "en": "Vietnam", "nc": "VN" }, { "en": "Western Sahara", "nc": "EH" }, { "en": "Yemen", "nc": "YE" }, { "en": "Zambia", "nc": "ZM" }, { "en": "Zimbabwe", "nc": "ZW" },
    { "en": "Akrotiri and Dhekelia", "nc": "AA" }, { "en": "Aland", "nc": "AX" }, { "en": "American Samoa", "nc": "AS" }, { "en": "Anguilla", "nc": "AI" }, { "en": "Aruba", "nc": "AW" }, { "en": "Bermuda", "nc": "BM" },
    { "en": "Cayman Islands", "nc": "KY" }, { "en": "Christmas Island", "nc": "CX" }, { "en": "Cocos (Keeling) Islands", "nc": "CC" }, { "en": "Curaçao", "nc": "CW" },
    { "en": "Falkland Islands (Islas Malvinas)", "nc": "FK" }, { "en": "Faroe Islands", "nc": "FO" }, { "en": "French Polynesia", "nc": "PF" }, { "en": "Gibraltar", "nc": "GI" }, { "en": "Greenland", "nc": "GL" },
    { "en": "Guam", "nc": "GU" }, { "en": "Guernsey", "nc": "GG" }, { "en": "Hong Kong, China", "nc": "HK" }, { "en": "Isle of Man", "nc": "IM" }, { "en": "Jersey", "nc": "JE" }, { "en": "Macau, China", "nc": "MO" },
    { "en": "Montserrat", "nc": "MS" }, { "en": "New Caledonia", "nc": "NC" }, { "en": "Norfolk Island", "nc": "NF" }, { "en": "Northern Mariana Islands", "nc": "MP" }, { "en": "Pitcairn Islands", "nc": "PN" },
    { "en": "Puerto Rico", "nc": "PR" }, { "en": "Saint Barthelemy", "nc": "BL" }, { "en": "Saint Helena, Ascension and Tristan da Cunha", "nc": "SH" }, { "en": "Saint Pierre and Miquelon", "nc": "PM" },
    { "en": "Saint Martin", "nc": "MF" }, { "en": "Sint Maarten", "nc": "SX" }, { "en": "Svalbard and Jan Mayen", "nc": "SJ" }, { "en": "Tokelau", "nc": "TK" }, { "en": "Turks and Caicos Islands", "nc": "TC" },
    { "en": "Virgin Islands, British", "nc": "VG" }, { "en": "Virgin Islands, United States", "nc": "VI" }, { "en": "Wallis and Futuna", "nc": "WF" }]



    $('#overseaForm').on('submit', function (event) {
        event.preventDefault(); // 阻止表单的默认提交行为  
        if (loading) return;
        loading = true;
        var name = $('#contactName').val();  //名字
        var company = $('#contactCompany').val();  //公司
        var area = $('#contactArea').val();  //面积
        var concat = $('#contactConcat').val();  //联系电话
        var email = $('#contactEmail').val();  //邮箱
        var content = $('#contactContent').val();  //内容
        var country = $('#contactCountry').attr("data-value");  //国家
        let type = $('.block-form-tabbar-item.on').text();
        let interested = ""
        $('.block-form-tabbar-option.on').each((index, item) => {
            if (interested) interested += ",";
            interested += $(item).text();
        });
        let nonce = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        if (!name || !concat || !email || !content || !country) {
            if (!name) $(".block-form-success").text("The name is a required field!")
            else if (!concat) $(".block-form-success").text("Contact Number is a required field!")
            else if (!email) $(".block-form-success").text("The email is a required field!")
            else if (!content) $(".block-form-success").text("The content is a required field!")
            else if (!country) $(".block-form-success").text("The country/Region is a required field!")
            $(".block-form-success").addClass("show")
            if (window.custom_timeout) clearTimeout(window.custom_timeout)
            window.custom_timeout = setTimeout(function () {
                $(".block-form-success").removeClass("show")
            }, 4000)
            loading = false;
            return;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            $(".block-form-success").text("Please confirm the format of the email address.")
            $(".block-form-success").addClass("show")
            if (window.custom_timeout) clearTimeout(window.custom_timeout)
            window.custom_timeout = setTimeout(function () {
                $(".block-form-success").removeClass("show")
            }, 4000)
            loading = false;
            return;
        }
        const visitSource = getVisitSourceData();
        let dataForNewCrm = {}
        dataForNewCrm['visit_category'] = visitSource.visit_category;
        dataForNewCrm['visit_source'] = visitSource.visit_source;
        dataForNewCrm['visit_medium'] = visitSource.visit_medium;
        if (ga_client_id) {
            dataForNewCrm["client_id"] = ga_client_id;
        } else {
            dataForNewCrm["client_id"] = "";
        }
        let req = {
            params: {
                name: name,
                company: company,
                area: area,
                concat: concat,
                content: content,
                biz_type: type,
                biz_intended: interested,
                country: country,
                email: email,
                form_source: "SUBLIME",
                ...dataForNewCrm
            },
            sys: {
                namespace: "Ls.Pub.Service.Consultation",
                method: "CreateOverseasConsultation",
                appkey: "lhoKALyASW8KPgCvgr2UVty49Yy9pagR",
                apptoken: "XSslY15qx7p4zqZ80GKFj6t66iHAVpuq",
                ts: Math.round(new Date().getTime() / 1000),
                version: "1.0",
                nonce: nonce
            }
        }
        $.ajax({
            url: window.location.origin + "/mweb/app",
            type: "POST",
            dataType: "json",
            contentType: false,
            data: JSON.stringify(req),
            processData: false,
            success: function (response) {
                // 请求成功时执行的函数  
                loading = false;
                if (response.code == 0) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'inquiry_success',
                        'form_location': window.location.href, // 自动抓取提交时的完整 URL
                        'form_type': 'popup' // 研发可以根据实际场景，在弹窗里写 'popup'，在联系页面写 'contact_page'
                    });
                    $(".block-form-success").text("Your submission has been successful. Our customer service will contact you as soon as possible!")
                    $(".block-form-success").addClass("show")
                    if (window.custom_timeout) clearTimeout(window.custom_timeout)
                    window.custom_timeout = setTimeout(function () {
                        $(".block-form-success").removeClass("show")
                    }, 4000)
                    $('#overseaForm')[0].reset();
                    $("#block-form-modal").removeClass("on");
                    window.location.href = "/other/Thank-you/";
                } else {
                    $(".block-form-success").text(response.message)
                    $(".block-form-success").addClass("show")
                    if (window.custom_timeout) clearTimeout(window.custom_timeout)
                    window.custom_timeout = setTimeout(function () {
                        $(".block-form-success").removeClass("show")
                    }, 4000)
                }

            },
            error: function (xhr, status, error) {
                loading = false;
                // 请求失败时执行的函数  
                $(".block-form-success").text('Error: ' + error)
                $(".block-form-success").addClass("show")
                if (window.custom_timeout) clearTimeout(window.custom_timeout)
                window.custom_timeout = setTimeout(function () {
                    $(".block-form-success").removeClass("show")
                }, 4000)
            }
        })
    });

    $('.block-form-tabbar-item').on("click", function () {
        $(this).addClass("on");
        $(this).siblings().removeClass("on");
        let idx = $(this).index();
        if (idx !== 3) {
            $(".design").css("display", "block")
            $(".join").css("display", "none")
        } else {
            $(".design").css("display", "none")
            $(".join").css("display", "block")
        }
    })
    $('.block-form-tabbar-option').on("click", function () {
        $(this).toggleClass("on");
    })
    $("#contactCountry").on("input", function () {
        let country = []
        let val = ($(this).val() || "").replace(/^\s+|\s+$/g, "");
        if (!val) {
            country = countryList
        } else {
            country = countryList.filter(item => (item.en).toLowerCase().indexOf(val.toLowerCase()) > -1)
        }
        option.innerHTML = "";
        if (country.length > 0) {
            country.forEach((item, i) => {
                const op = document.createElement('div');
                op.className = "block-form-option"
                op.innerHTML = item.en; // 选项内容
                op.setAttribute('data-value', item.nc); // 选项值
                option.appendChild(op);
            })
        } else {
            const op = document.createElement('div');
            op.className = "block-form-empty"
            op.innerHTML = "no data"; // 选项内容
            option.appendChild(op)
        }

        $("#block-form-options").addClass("show")

        $(".block-form-option").on("click", function () {
            let v = $(this).text();
            $("#contactCountry").val(v)
            $("#contactCountry").attr("data-value", v)
            $("#block-form-options").removeClass("show")
        })

    })
    $("#contactCountry").on("blur", function () {
        setTimeout(function () {
            $("#block-form-options").removeClass("show")
            $("#contactCountry").val($("#contactCountry").attr("data-value"))
        }, 500)
    })
    $("#contactCountry").on("focus", function () {
        $("#block-form-options").addClass("show")
    })

    countryList.forEach((item, i) => {
        const op = document.createElement('div');
        op.className = "block-form-option"
        op.innerHTML = item.en; // 选项内容
        // op.setAttribute('data-value', item.nc); // 选项值
        option.appendChild(op);
    })
    $(".block-form-option").on("click", function () {
        let v = $(this).text();
        $("#contactCountry").val(v)
        $("#contactCountry").attr("data-value", v)
        $("#block-form-options").removeClass("show")
    })






    window.addEventListener('message', (event) => {
        if (event.data === 'screen') {
            let lang = $(".lang-en").hasClass("on") ? "en" : "zh"
            // window.location.href = "./customize.html?" + lang;
            window.open("./customize.html?" + lang)
        }
    });

})()