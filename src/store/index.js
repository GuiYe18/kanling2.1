/**
 * Created by zhong on 16/10/15.
 */
import { Dialog } from "vant";
import category from "./category";
import ticket from "./ticket";
import memberstate from "./member_model";
import sort_goods from "./sort_goods";
import service from "./service";
import langService from "./service";

export default {
    modules: {
        category,
        sort_goods,
        memberstate,
        ticket,
        service,
        langService
    },
    state: {
        shopLanguage: {},
        pop: {},
        // true
        integral: "",
        // 会员装修数据
        member_temp: {},
        // 装修数据
        temp: { item: { janst: "" } },
        foot: false,
        message: "提示",
        cou: 50,
        view: true,
        name: "",
        level: "",
        icon: "",
        sex: 0,
        vip: false,
        islogin: false,
        // 订单列表点击mt-tab-item
        selected_status: false,
        // 订单列表订单状态
        status: 0,
        // 当前发货地址
        currentAddress: {
            dispatch_type_id: 1,
            address: "",
            mobile: "",
            realname: ""
        },
        // 详情页面用到的订单
        detail_order: "",
        // 从服务器请求的地址字符串
        address_info: "",
        // 账户余额
        balance: 0,
        isShow: 0,
        // 服务器请求的全国省份，市，辖区数据
        city: [],
        district: [],
        province: [],
        mailInfo: {}, // 商城信息
        cservice: "", // 客服
        // 插件列表
        plugins: [],
        loginStatus: 0,
        trainCity: [], // 火车对应的城市
        airCity: [], // 飞机对应城市

        shop_id: "",
        mailLanguage: {}, // 自定义语言
        location: {},
        referer: "",

        // 区域id
        zoneId: "",
        o2oLocation: {},

        // zone开关
        zoneShow: 0,

        blockchainLang: {},
        is_Inviter: 0,
        isloadding: false,
        isSwitchCity: false,
        selfCarryApply: [],
        applyModel: {}, //门店/酒店申请
        passwordValidation: 0,
        adApply: false,
        adDevice: false,
        liveRoomID: null, //直播间进入商品详情页购买下单使用
        _isShowReturnLiveBtn: false, //是否显示返回直播按钮
        isWatchDiypage: 1, //会员等级浏览装修页权限
        caseLibrary: null, //案例库

        newDiyData: {},

        NumberOfMessages: 1,//消息数
        // AListOfSessions:[], // 会话列表
        // // foot接收到的会话列表
        // AListOfSessions: [],

        addNewinformation: [],


        /**
         * @Author: 飞
         * @Date: 2021-06-07 13:20:11
         * @Describe: 
         */
        // 单聊会话
        NewArray: {},
        /**
         * @Author: 飞
         * @Date: 2021-06-07 13:20:02
         * @Describe: 
         */
        // 好友列表
        FriendsList: {},
        /**
         * @Author: 飞
         * @Date: 2021-06-07 13:20:06
         * @Describe: 
         */
        //存信息列表个数 
        SaveInformationList: {},
        /**
         * @Author: 飞
         * @Date: 2021-06-07 16:39:23
         * @Describe: 
         */
        // 我关注的ID头像
        IDtopurl: {},
        /**
         * @Author: 飞
         * @Date: 2021-06-08 15:52:08
         * @Describe: 
         */
        //粉丝列表
        FansList: {},
        /**
         * @Author: 飞
         * @Date: 2021-06-09 00:03:31
         * @Describe: 
         */
        // 总未读数
        Unread: {},
        // 信息id
        msg_idArry: {},
        adcode: 0,
        // 标字母组合
        Lettercombination: [],
        /**
         * @Author: 飞
         * @Date: 2021-06-15 16:28:59
         * @Describe:占位字母 
         */
        Placement: '',
        /**
         * @Author: 飞
         * @Date: 2021-06-15 16:51:37
         * @Describe:创建群聊数据 
         */
        CreateAGroupChatLibrary: [],
        /**
         * @Author: 飞
         * @Date: 2021-06-16 14:04:42
         * @Describe: 群列表
         */
        GroupThatTotalList: [],
        /**
         * @Author: 飞
         * @Date: 2021-06-16 18:11:26
         * @Describe:群聊会话 
         */
        Group_Chat: {},
        /**
         * @Author: 飞
         * @Date: 2021-06-16 18:27:28
         * @Describe:群聊ID号 
         */
        GroupchatIDNumber: {},
        /**
         * @Author: 飞
         * @Date: 2021-06-18 18:00:51
         * @Describe: 
         */
        Homogeneous: '',
    },
    getters: {
        // // 获取新消息  和记录
        // getaddNewinformation(state) {
        //     return state.addNewinformation
        // }const getters = {
    },
    mutations: {
        /**
         * @Author: 飞
         * @Date: 2021-06-18 18:00:17
         * @Describe:首页存高度 
         */
        Homogeneous(state, heightdata) {
            console.log('高度', heightdata);

            state.Homogeneous = heightdata
        },
        /**
         * @Author: 飞
         * @Date: 2021-06-16 10:35:22
         * @Describe: 存数据 总的方法  调用即可
         */
        SaveData(state, data) {
            if (data.SaveDataValue != null) {
                state[data.SaveDataitem] = data.SaveDataValue
            }
        },
        // 被动  有消息 就存
        NewArray(state, data) {
            // state.NewArray.push(NewArray)
            console.log('state.SaveInformationList', data, state.SaveInformationList);

            var NewArray = data.NewArray
            var msg_idArry = state.msg_idArry
            // 判断数据结构里面是否有此人
            if (!state.SaveInformationList.hasOwnProperty(NewArray.from_id)) {
                // 没有就存起来
                state.SaveInformationList[NewArray.from_id] = NewArray.from_id

                // 添加新结构给我发的信息
                NewArray.informationTypesOf = 'L'


                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:24:41
                 * @Describe: 单聊添加未读数
                 */
                NewArray.SessionNotRead = 1
                NewArray.topurl = state.IDtopurl[NewArray.from_id]
                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 15:48:14
                 * @Describe: 单聊会话
                 */
                var dataitem = state.NewArray
                dataitem[NewArray.from_id] = []
                dataitem[NewArray.from_id].push(NewArray)
                state.NewArray = Object.assign({}, dataitem)


                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 15:48:53
                 * @Describe: 消息个数库
                 */
                msg_idArry[NewArray.from_id] = 0
                msg_idArry[NewArray.from_id] = msg_idArry[NewArray.from_id] + 1
                state.msg_idArry = Object.assign({}, msg_idArry)



            } else {
                // 有此人 增加类型  添加 
                // 信息数库
                msg_idArry[NewArray.from_id] = msg_idArry[NewArray.from_id] + 1
                state.msg_idArry = Object.assign({}, msg_idArry)
                console.log('信息个数库', state.msg_idArry);

                // 单聊左
                NewArray.informationTypesOf = 'L'

                // 单聊单人未读+1
                NewArray.SessionNotRead = msg_idArry[NewArray.from_id]

                // 单聊头像
                NewArray.topurl = state.IDtopurl[NewArray.from_id]


                // 单人会话添加新会话
                var dataitem = state.NewArray
                dataitem[NewArray.from_id].push(NewArray)
                state.NewArray = Object.assign({}, dataitem)

                // // // 存会话id


            }
            console.log('接收', NewArray);
            localStorage.setItem("VuexDate", JSON.stringify(state));


        },
        /**
         * @Author: 飞
         * @Date: 2021-06-09 00:07:35
         * @Describe:单群聊进入已读 
         */
        Unread(state, Unread) {
            if (Unread.toString().length == 8) {
                // 群信息

                var GroupThatTotalList = state.GroupThatTotalList
                Object.keys(GroupThatTotalList).forEach((key) => {
                    if (GroupThatTotalList[key].gid == Unread) {
                        GroupThatTotalList[key].SessionNotRead = 0
                    }
                })
                state.GroupThatTotalList = Object.assign({}, GroupThatTotalList)
                window.xin();

            } else {
                // 单聊信息
                state.NewArray[Unread][state.NewArray[Unread].lastIndex].SessionNotRead = 0
                window.xin();
            }
            /**
             * @Author: 飞
             * @Date: 2021-06-17 14:06:39
             * @Describe: 更新总聊天数
             */
            // Object.assign({}, dataitem)
        },


        // Object.assign({}, state.msgList);
        // 主动  发单聊消息
        ActiveMessage(state, ActiveMessage) {
            console.log('主动发信息', ActiveMessage);
            // 判断数据结构里面是否有此人
            if (!state.SaveInformationList.hasOwnProperty(ActiveMessage.from_id)) {
                // 没有就存起来
                state.SaveInformationList[ActiveMessage.from_id] = ActiveMessage.from_id

                // 添加新结构给我发的信息
                ActiveMessage.informationTypesOf = 'R'//会话类型  L左  R右
                // 自己的头像
                ActiveMessage.topurl = state.IDtopurl[ActiveMessage.from_id]
                // 以imid为键  本身为值
                // NewArray.from_id=NewArray
                // state.NewArray[ActiveMessage.from_id].push(ActiveMessage)

                var dataitem = state.NewArray
                dataitem[ActiveMessage.from_id] = []
                dataitem[ActiveMessage.from_id].push(ActiveMessage)
                state.NewArray = Object.assign({}, dataitem)
                console.log('主动发消息', ActiveMessage);

            } else {
                // 有此人 增加类型  添加 
                ActiveMessage.informationTypesOf = 'R'
                var id = ActiveMessage.from_id

                console.log('主动发消息', ActiveMessage);

                ActiveMessage.topurl = state.IDtopurl[id]
                var dataitem = state.NewArray
                dataitem[ActiveMessage.from_id].push(ActiveMessage)
                state.NewArray = Object.assign({}, dataitem)

            }




            console.log('发送', ActiveMessage);
            console.log('总数据', state.NewArray);
            // state.NewArray.push(ActiveMessage)
            localStorage.setItem("VuexDate", JSON.stringify(state));

        },

        /**
         * @Author: 飞
         * @Date: 2021-06-16 18:34:08
         * @Describe:被动接收群聊消息 
         */
        GroupChatNewInformation(state, msg) {
            console.log('被动接收群聊消息', state.GroupchatIDNumber);
            var NewArray = msg.NewArray.content

            var msg_idArry = state.msg_idArry
            var GroupThatTotalList = state.GroupThatTotalList
            // 判断数据结构里面是否有此人
            if (!state.GroupchatIDNumber.hasOwnProperty(NewArray.target_id)) {
                // 没有就存起来
                state.GroupchatIDNumber[NewArray.target_id] = NewArray.target_id

                // 添加新结构给我发的信息
                NewArray.informationTypesOf = 'L'


                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:24:41
                 * @Describe: 群列表上添加未读数
                 */
                Object.keys(GroupThatTotalList).forEach((key) => {
                    if (GroupThatTotalList[key].gid == NewArray.target_id) {
                        GroupThatTotalList[key].SessionNotRead = 1
                    }
                })
                state.GroupThatTotalList = Object.assign({}, GroupThatTotalList)


                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:38:35
                 * @Describe: 接受到的信息存个头像
                 */
                NewArray.topurl = state.IDtopurl[NewArray.target_id]

                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 15:47:59
                 * @Describe: 群会话
                 */
                var dataitem = state.Group_Chat
                dataitem[NewArray.target_id] = []
                dataitem[NewArray.target_id].push(NewArray)
                state.Group_Chat = Object.assign({}, dataitem)

                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:21:33
                 * @Describe: 所有消息条数存msg_idArry
                 */
                msg_idArry[NewArray.target_id] = 0
                msg_idArry[NewArray.target_id] = msg_idArry[NewArray.target_id] + 1
                state.msg_idArry = Object.assign({}, msg_idArry)



            } else {
                // 有此人 增加类型  添加 
                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:21:33
                 * @Describe: 所有消息条数存msg_idArry
                 */
                console.log('msg_idArry', msg_idArry, msg_idArry[NewArray.target_id]);
                msg_idArry[NewArray.target_id] = msg_idArry[NewArray.target_id] + 1
                state.msg_idArry = Object.assign({}, msg_idArry)
                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:41:41
                 * @Describe: 接收到的消息左侧  标记
                 */
                NewArray.informationTypesOf = 'L'

                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:24:41
                 * @Describe: 群列表上添加未读数
                 */
                Object.keys(GroupThatTotalList).forEach((key) => {
                    if (GroupThatTotalList[key].gid == NewArray.target_id) {
                        GroupThatTotalList[key].SessionNotRead = msg_idArry[NewArray.target_id]
                    }
                })

                state.GroupThatTotalList = Object.assign({}, GroupThatTotalList)


                /**
                 * @Author: 飞
                 * @Date: 2021-06-17 11:38:35
                 * @Describe: 接受到的信息存个头像
                 */
                NewArray.topurl = state.IDtopurl[NewArray.target_id]

                /**
                 * @Author: 飞
                 * @Date: 2021-06-16 18:11:26
                 * @Describe:群聊会话 
                 */
                var dataitem = state.Group_Chat
                dataitem[NewArray.target_id].push(NewArray)
                state.Group_Chat = Object.assign({}, dataitem)


            }
            // 收完信息存VuexDate
            localStorage.setItem("VuexDate", JSON.stringify(state));
        },
        /**
         * @Author: 飞
         * @Date: 2021-06-16 18:01:24
         * @Describe: 发群聊消息
         */
        GroupChatMessage(state, GroupChatMessage) {
            console.log('主动发群聊信息', state.GroupchatIDNumber);
            // 判断数据结构里面是否有此群号
            if (!state.GroupchatIDNumber.hasOwnProperty(GroupChatMessage.target_id)) {
                // 没有就存起来
                state.GroupchatIDNumber[GroupChatMessage.target_id] = GroupChatMessage.target_id
                // 添加新结构给我发的信息
                GroupChatMessage.informationTypesOf = 'R'//会话类型  L左  R右
                // 添加自己发的会话
                var dataitem = state.Group_Chat
                dataitem[GroupChatMessage.target_id] = []
                dataitem[GroupChatMessage.target_id].push(GroupChatMessage)
                state.Group_Chat = Object.assign({}, dataitem)
                console.log('首次发群信息', state.Group_Chat);

            } else {
                // 有此人 增加类型  添加 
                GroupChatMessage.informationTypesOf = 'R'
                var id = GroupChatMessage.target_id

                console.log('二次发群信息', state.Group_Chat);
                GroupChatMessage.topurl = state.IDtopurl[id]
                var dataitem = state.Group_Chat
                dataitem[GroupChatMessage.target_id].push(GroupChatMessage)
                state.Group_Chat = Object.assign({}, dataitem)

            }
            // 发完信息存VuexDate
            localStorage.setItem("VuexDate", JSON.stringify(state));
        },




        // 好友列表
        FriendsList(state, FriendsList) {

            state.FriendsList = FriendsList
            console.log('好友列表', state.FriendsList);

            // var attention = {}
            state.FriendsList.map(function (item, index, ary) {

                if (item.username != '') {
                    state.IDtopurl[item.username] = item.topurl
                }

            })

            // 我关注的 id 头像 topurl
            // state.IDtopurl = attention
            console.log('state.IDtopurl', state.IDtopurl);
            // state.IDtopurl = IDtopurl
        },
        // 粉丝列表
        FansList(state, FansList) {

            state.FansList = FansList
            // 标给便利出来
            var titleFens = state.FansList.map(function (item, index, ary) {
                return item.letter
            })
            var Lettercombination = [];
            for (var i = 0; i < titleFens.length; i++) {
                if (Lettercombination.indexOf(titleFens[i]) == -1) {
                    Lettercombination.push(titleFens[i])
                }
            }
            state.Lettercombination = Lettercombination
            // var ABC = { "abcd": 0 }  //暂存字母

            state.FansList.map(function (item, index, ary) {
                // 获取头像
                if (item.username != '') {
                    state.IDtopurl[item.username] = item.photo_wx
                }

                /**
                 * @Author: 飞
                 * @Date: 2021-06-15 16:34:23
                 * @Describe: 如果存在   就存起来
                 */
                // console.log('ABC', state.Placement);
                if (state.Placement == item.letter) {
                    return item.letter = ''
                } else {
                    state.Placement = item.letter
                }
            })









            console.log('粉丝列表', state.FansList, Lettercombination,);


        },






        /**
         * @Author: 飞
         * @Date: 2021-06-15 16:50:49
         * @Describe:创建群聊usename
         */
        CreateAGroupChatLibraryusename(state, CreateAGroupChatLibraryusename) {
            state.CreateAGroupChatLibraryusename = CreateAGroupChatLibraryusename
        },
        /**
         * @Author: 飞
         * @Date: 2021-06-15 17:56:17
         * @Describe:群聊总列表 (后期添加未读数)
         */
        GroupThatTotalList(state, GroupThatTotalList) {

            Object.keys(GroupThatTotalList).forEach((key) => {
                if (state.msg_idArry.hasOwnProperty(GroupThatTotalList[key].gid)) {
                    GroupThatTotalList[key].SessionNotRead = state.msg_idArry[GroupThatTotalList[key].gid]
                }
            })


            state.GroupThatTotalList = Object.assign({}, GroupThatTotalList)


            console.log('群聊总列表', state.GroupThatTotalList);

        },


        // adcode
        adcode(state, adcode) {
            state.adcode = adcode;

        },
        // 存储自定义语言包
        setShopLanguage(state, lang) {
            state.shopLanguage = lang;
        },
        // 存储自定义语言包
        setBlockchainLang(state, lang) {
            state.blockchainLang = lang;
        },
        setLocation(state, o2oLocation) {
            state.o2oLocation = o2oLocation;
        },
        setWatchDiypage(state, data) {
            console.info('=====setWatchDiypage======', data);
            state.isWatchDiypage = data != undefined ? data : 1;
        },

        setSwitchCity(state, show) {
            state.isSwitchCity = show;
        },
        // 存储shop_id
        setShopId(state, shop_id) {
            state.shop_id = shop_id;
        },
        setLoginStatus(state, info) {
            state.loginStatus = info;
        },
        tempIndex(state, info) {
            state.temp = info;
        },
        membertempIndex(state, info) {
            state.member_temp = info;
        },
        setNewDiyData(state, info) {
            state.newDiyData = info;
        },
        setCservice(state, n) {
            state.cservice = n;
        },
        toIsShow(state, n) {
            state.isShow = n;
        },
        alerts(state, msg) {
            Dialog.alert({ message: msg });

        },
        views(state) {
            state.view = !state.view;
        },
        MESSAGE(state, value) {
            state.message = value || state.message;
        },
        member(state, obj) {
            state.name = obj.name;
            state.level = obj.level;
            state.icon = obj.icon;
        },
        login(state, log) {
            state.islogin = log.login;
        },
        updateBanlace(state, balance) {
            // console.log('账户余额')
            // console.log(balance.balance)
            state.balance = balance.balance;
        },
        updateLocation(state, location) {
            // console.log('账户余额')
            // console.info('=====updateLocation======', location)
            state.location = location;
        },

        setReferer(state, referer) {
            state.referer = referer;
        },
        setStatus(state, value) {
            state.status = value.status;
        },
        setCurrentAddress(state, address) {
            state.currentAddress.dispatch_type_id = address.dispatch_type_id;
            state.currentAddress.address = address.address;
            state.currentAddress.mobile = address.mobile;
            state.currentAddress.realname = address.realname;
        },
        savePop(state, pop) {
            state.pop = pop;
        },
        saveAddresssInfo(state, address) {
            // console.log(address)
            state.address_info = address.value;
            state.city = address.city;
            state.district = address.district;
            state.province = address.province;
        },
        setMailInfo(state, mailInfo) {
            // console.log("setMailInfo=", mailInfo)
            state.mailInfo = mailInfo;
        },
        // 设置插件列表
        setPlugins(state, plugins) {
            state.plugins = plugins;
        },
        // 存储火车票对应城市
        setTrainCity(state, trainCity) {
            state.trainCity = trainCity;
        },
        // 存储飞机票对应城市
        setAirCity(state, airCity) {
            state.airCity = airCity;
        },

        // 存储自定义语言包
        setMailLanguage(state, mailLanguage) {
            state.mailLanguage = mailLanguage;
        },

        // 存储区域id
        setZoneId(state, zoneId) {
            state.zoneId = zoneId;
        },

        // 存储区域开关
        setZoneShow(state, zoneShow) {
            state.zoneShow = zoneShow;
        },

        setDefaultMoreData(state, data) {
            state.temp.default.goods.data = state.temp.default.goods.data.concat(
                data
            );
        },
        // 旧装修
        setMoreData(state, data) {
            if (state.temp.item.data[data.index].temp == 'showgoods' || state.temp.item.data[data.index].temp == 'showflashsale') {
                state.temp.item.data[data.index].data = state.temp.item.data[data.index].data.concat(data.data);
            }
        },
        setLoadMore(state, data) {
            state.temp.item.data[data.index].isLoadMore = data.isLoadMore;
        },
        // 附近商品
        setNearData(state, data) {
            state.temp.item.data[data.index].get_info = data.data;
        },
        setNearMoreData(state, data) {
            state.temp.item.data[data.index].get_info.data = state.temp.item.data[
                data.index
            ].get_info.data.concat(data.data);
        },
        setNearLoadMore(state, data) {
            state.temp.item.data[data.index].isLoadMore = data.isLoadMore;
        },
        setmemberNearMoreData(state, data) {
            state.member_temp.data[data.index].get_info.data = state.member_temp.data[
                data.index
            ].get_info.data.concat(data.data);
        },
        setmemberNearLoadMore(state, data) {
            state.member_temp.data[data.index].isLoadMore = data.isLoadMore;
        },
        setNearMemberData(state, data) {
            state.member_temp.data[data.index].get_info = data.data;
        },
        // 设置是否第一次进入邀请页面
        setInviter(state, is_Inviter) {
            state.is_Inviter = is_Inviter;
        },
        setSelfCarryApply(state, data) {
            state.selfCarryApply = data;
        },
        setApplyModel(state, data) {
            state.applyModel = data;
        },
        setPasswordValidation(state, data) {
            state.passwordValidation = data;
        },
        setAdApply(state, data) {
            state.adApply = data;
        },
        setLiveRoomID(state, data) {
            state.liveRoomID = data;
        },
        setReturnLiveBtn(state, data) {
            state._isShowReturnLiveBtn = data;
        },
        setAdDevice(state, data) {
            state.adDevice = data;
        },
        // 案例库
        setCaseLibrary(state, datas) {
            state.caseLibrary = datas;
        },
    }
};