﻿function main() {
    JIE.isDebug = true;
    var cookie = FGO.cookie;
    //var user_language = cookie.load_language();
    var language_manager = FGO.language_manager;
    language_manager.set_language(cookie.load_language());

    var info_manager = FGO.info_manager;
    var minimize_manager = FGO.minimize_manager;
    minimize_manager.set_quest_manager(info_manager);
    var item2quest = info_manager.get_item2quest_list();

    //var body = document.body;
    var body = document.querySelector("#content");
    var content = NewObj("div", "main_content");

    var dialog_panel = FGO.component.factory('Dialog');
    dialog_panel.hide();
    dialog_panel.render(body);
    function show_info_dialog(item_name) {
        var list = item2quest[item_name];
        dialog_panel.set_content({ item_name: item_name, list: list });
        dialog_panel.show();
        dialog_panel.refresh();
    }

    var processing_dialog = new FGO.panel.Processing_dialog_panel();
    processing_dialog.hide();
    processing_dialog.render(body);

    var header_panel = new FGO.panel.Header_panel();
    header_panel.onChange.subscribe(function (type, args) {
        cookie.save_language(args[0]);
        location.reload();
    });
    header_panel.render(body);

    //var ad = NewObj('div', 'ad');
    //var adsbygoogle;
    //(adsbygoogle = window.adsbygoogle || []).push({
    //    google_ad_client: "ca-pub-1430170730231634",
    //    enable_page_level_ads: true
    //});

    var user_panel = new FGO.panel.User_input_panel();
    user_panel.render(content);
    user_panel.onInfoClick.subscribe(function (type, args) {
        show_info_dialog(language_manager.get_JP_word(args[0]));
    });
    user_panel.onOtherChange.subscribe(function (type, args) {
        info_manager.set_event(args[0]);
        item2quest = info_manager.get_specify_item2quest_list({ event: true, get_CP: false });
    });
    user_panel.onCalculate.subscribe(function (type, args) {
        var user_setting = user_panel.get_result();

        var item, has_target = false;
        var index, length;
        var JP_item_list = {}, event_status = {};
        for (item in user_setting.item_list) {
            if (user_setting.item_list[item]) {
                if (!has_target) {
                    has_target = true;
                }
                JP_item_list[language_manager.get_JP_word(item)] = user_setting.item_list[item];
            }
        }


        //if (has_target) {
        //    processing_dialog.show();



        //    //get all can used quest
        //    var can_used_quest = [];
        //    var schedule_list = info_manager.get_schedule_list();
        //    var user_schedule_JP = language_manager.get_JP_word(user_setting.other_setting.schedule);
        //    for (index = 0, length = schedule_list.length; index < length; index += 1) {
        //        if (schedule_list[index] !== user_schedule_JP) {
        //            can_used_quest.push(schedule_list[index]);
        //        }
        //        else {
        //            can_used_quest.push(schedule_list[index]);
        //            break;
        //        }
        //    }


        //    var best_result = null;
        //    for (item in user_setting.other_setting.event) {
        //        event_status[language_manager.get_JP_word(item)] = user_setting.other_setting.event[item];
        //    }
            
        //    //event combo
        //    var event_combo_list = [];

        //    if (!event_status["曜日クエスト"] && !event_status["フリークエスト"]) {
        //        event_combo_list.push({
        //            "曜日クエスト": 0,
        //            "フリークエスト": 0
        //        });
        //    }
        //    else {
        //        if (event_status["曜日クエスト"]) {
        //            event_combo_list.push({
        //                "曜日クエスト": 1,
        //                "フリークエスト": 0
        //            });
        //        }
        //        if (event_status["フリークエスト"]) {
        //            event_combo_list.push({
        //                "曜日クエスト": 0,
        //                "フリークエスト": 1
        //            });
        //        }
        //        if (event_status["曜日クエスト"] && event_status["フリークエスト"]) {
        //            event_combo_list.push({
        //                "曜日クエスト": 1,
        //                "フリークエスト": 1
        //            });
        //        }
        //    }

        //    var step_obj_list = [];
        //    for (var i = 0, i_max = event_combo_list.length; i < i_max; i += 1) {
        //        for (var j = 0, j_max = can_used_quest.length; j < j_max; j += 1) {
        //            step_obj_list.push({
        //                event_status: event_combo_list[i],
        //                schedule: schedule_list[j]
        //            });
        //        }
        //    }


        //    index = 0; length = step_obj_list.length;
        //    next();
        //    function next() {
        //        processing_dialog.set_schedule("(" + index + "/" + length + ")");
        //        info_manager.set_target_item_list(JP_item_list);
        //        info_manager.set_schedule(step_obj_list[index].schedule);
        //        minimize_manager.set_event_status(step_obj_list[index].event_status);
        //        minimize_manager.set_target_item_list(JP_item_list);
        //        minimize_manager.get_result(function (result) {
        //            if (!best_result || best_result.AP > result.AP) {
        //                best_result = result;
        //            }
        //            index += 1;
        //            if (index < length) {
        //                next();
        //            }
        //            else {
        //                finish(best_result);
        //            }
        //        });
        //    }
        //}
        
        //function finish(result) {
        //    var item_list = {}, item;
        //    for (item in result.item_list) {
        //        item_list[language_manager.get_word(item)] = result.item_list[item];
        //    }
        //    var times_list = {}, type1, type2, type1_word, type2_word;
        //    for (type1 in result.times_list) {
        //        type1_word = language_manager.get_word(type1);
        //        times_list[type1_word] = {};
        //        for (type2 in result.times_list[type1]) {
        //            times_list[type1_word][language_manager.get_word(type2)] = result.times_list[type1][type2];
        //        }
        //    }

        //    var data = { AP: result.AP, times_list: times_list, item_list: item_list };

        //    result_panel.set_target_item_list(JP_item_list);
        //    result_panel.set_value(data);
        //    result_panel.show();
        //    result_panel.refresh();
        //    _scrollTo("result_panel");
        //    processing_dialog.hide();
        //}

        if (has_target) {
            processing_dialog.show();


            info_manager.set_target_item_list(JP_item_list);
            info_manager.set_schedule(language_manager.get_JP_word(user_setting.other_setting.schedule));

            
            for (item in user_setting.other_setting.event) {
                event_status[language_manager.get_JP_word(item)] = user_setting.other_setting.event[item];
            }

            minimize_manager.set_event_status(event_status);
            minimize_manager.set_target_item_list(JP_item_list);
            minimize_manager.get_result(function (result) {
                var item_list = {}, item;
                for (item in result.item_list) {
                    item_list[language_manager.get_word(item)] = result.item_list[item];
                }
                var times_list = {}, type1, type2, type1_word, type2_word;
                for (type1 in result.times_list) {
                    type1_word = language_manager.get_word(type1);
                    times_list[type1_word] = {};
                    for (type2 in result.times_list[type1]) {
                        times_list[type1_word][language_manager.get_word(type2)] = result.times_list[type1][type2];
                    }
                }

                var data = { AP: result.AP, times_list: times_list, item_list: item_list };

                result_panel.set_target_item_list(JP_item_list);
                result_panel.set_value(data);
                result_panel.show();
                result_panel.refresh();
                _scrollTo("result_panel");
                processing_dialog.hide();
            });
        }
    });
    user_panel.onSave.subscribe(function () {
        var result = user_panel.get_result();
        cookie.save_user_setting(result);
    });
    user_panel.onLoad.subscribe(function () {
        var result = cookie.load_user_setting();
        user_panel.set_user_setting(result);
    });
    user_panel.onReset.subscribe(function () {
        _scrollTo("user_input_panel");
    });

    var result_panel = new FGO.panel.Result_panel();
    result_panel.onInfoClick.subscribe(function (type, args) {
        show_info_dialog(language_manager.get_JP_word(args[0]));
    });
    result_panel.hide();
    result_panel.render(content);

    var top = NewObj("div", "top", "Top");
    top.onclick = function () {
        _scrollTo("header_panel");
    };
    content.appendChild(top);

    body.appendChild(content);
    user_panel.refresh();

    var footer = document.querySelector("#footer");
    footer.style.display = "";
    

    function _scrollTo(id) {

        var _id = document.getElementById(id);

        window.scrollTo(0, _id.offsetTop);

    }
};

window.onload = function () {
    main();
};