import { Function } from 'core-js';
import { functions } from 'lodash';
import './jmessage-sdk-web.2.6.0.min'
window.JIM = new window.JMessage({
    debug: true
});


//获取签名  (并登录)
console.log('加载im-------------------------------------------------------');




window.JIM.getSignature = function getSignature() {
    // var that = this
    axios({ method: "post", url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/qianming" })
        .then(response => {
            window.JIM.init({
                appkey: response.data.data.appkey,
                random_str: response.data.data.random_str,
                timestamp: response.data.data.timestamp,
                signature: response.data.data.signature,
                flag: 0
            })
                .onSuccess(function (data) {
                    //data.code 返回码
                    //data.message 描述
                    console.log("请求成功回调", data);
                    // 登录
                    Login()
                })
                .onFail(function (data) {
                    // 同上
                    console.log("请求失败回调 ", data);
                });
        })
        .catch(error => {
            console.log(error);
        });

}
// 获取账户密码 登录
function Login() {
    // console.log('localStorage.getItem("setPlugins")', localStorage.getItem("setPlugins"));
    axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/api/v1/savejg",
        data: {
            uid: JSON.parse(localStorage.getItem("setPlugins")).memberinfo.uid,
        }
    })
        .then(response => {
            if (response.data.data == 310) {
                console.log(response.data.data)
            }
            if (response.data.result == 1) {
                window.JIM.useData = response.data.data
                var use = response.data.data.username
                var pw = response.data.data.password
                window.JIM.photo_wx = response.data.data.photo_wx
                window.JIM.login({
                    username: use,
                    password: pw
                })
                    .onSuccess(function (data) {


                        console.log("登录成功", data.username); //News
                        // 获取用户名
                        window.JGusername = data.username
                        window.JIM.MonitorInformation() //监听消息
                        window.JIM.OfflineMessageSynchronizationMonitoring() //离线信息同步监听
                        // window.JIM.UpdateGroupInformation()//更新群信息
                        /**
                         * @Author: 飞
                         * @Date: 2021-06-16 14:56:58
                         * @Describe: 业务事件监听
                         */
                        window.JIM.BusinessTimeMonitoring()
                        // window.JIM.GetFriendsList()//获取好友列表
                        SendAListOfFriends()//获取好友列表
                        FansList()//获取粉丝列表

                        // window.JIM.GetAListOfSessions()//获取会话列表

                        window.JIM.SingleChatMessageUnread()//单聊未读消息列表
                        // 群
                        // 获取群列表
                        // window.JIM.GetAGroupList()

                    })
                    .onFail(function (data) {
                        console.log("登录失败", data);
                        //同上
                    });
            }
            if (response.data.result == 0) {
                console.log("登录失败", response.data);
            }
        })
        .catch(error => {
            console.log(error)
        });
}

// 获取会话列表
window.JIM.GetAListOfSessions = function GetAListOfSessions() {

    JIM.getConversation().onSuccess(function (data) {
        console.log('获取会话列表', data.conversations);

        // GetAListOfSessions_vue(data.conversations)

        //data.code 返回码
        //data.message 描述
        //data.conversations[] 会话列表，属性如下示例
        //data.conversations[0].extras 附加字段
        //data.conversations[0].unread_msg_count 消息未读数
        //data.conversations[0].name  会话名称
        //data.conversations[0].appkey  appkey(单聊)
        //data.conversations[0].username  用户名(单聊)
        //data.conversations[0].nickname  用户昵称(单聊)
        //data.conversations[0].avatar  头像 media_id 
        //data.conversations[0].mtime 会话最后的消息时间戳
        //data.conversations[0].gid 群 id(群聊)
        //data.conversations[0].type  会话类型(3 代表单聊会话类型，4 代表群聊会话类型)
    }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
    });

    // // 获取总的聊天信息
    // let hh = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
    // let mm = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
    // let ss = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();

    // var date1 = new Date(),
    //     time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate() + " " + hh + ":" + mm + ":" + ss; //time1表示当前时间
    // var date2 = new Date(date1);
    // date2.setDate(date1.getDate() + (-7));
    // var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + " " + hh + ":" + mm + ":" + ss;
    // time1; //当日时间
    // time2; //七日前

    // axios
    //     .get("https://tpkl.minpinyouxuan.com/api/v1/getusermess", {
    //         params: { count: "100", beginTime: time2, endTime: time1, username: window.JGusername }
    //     })
    //     .then(function (response) {
    //         console.log("获取会话列表", response.data.data.body.messages);
    //         // window.localStorage.setItem('AListOfSessions',response.data.data.body.messages)
    //         // this.$store.commit('saveCurrDbSource', this.$store.state.NumberOfMessages + 1)

    //     })
    //     .catch(function (error) {
    //         console.log("error", error);
    //     });
}



// 监听最新消息  
window.JIM.MonitorInformation = function MonitorInformation() {

    JIM.onMsgReceive(function (data) {
        // console.log('新消息', data.messages[0].content);
        // 将会话列表存在本地
        // window.localStorage.setItem('NewNews', JSON.stringify(data.messages[0].content));
        // content_text = data.messages[0].content
        if (data.messages[0].msg_type == 3) {
            latestNews(data.messages[0])
            console.log('单聊新信息', data.messages[0]);
        }
        if (data.messages[0].msg_type == 4) {
            GroupChatNewInformation(data.messages[0])
            // console.log('群聊新信息', data.messages[0]);
        }
        // window.localStorage.setItem('getNewNews', JSON.stringify(data.messages[0].content));

        // data.messages[]
        // data.messages[].ctime_ms
        // data.messages[].msg_type 会话类型
        // data.messages[].msg_id
        // data.messages[].from_appey 单聊有效
        // data.messages[].from_username 单聊有效
        // data.messages[].from_gid 群聊有效
        // data.messages[].need_receipt
        // data.messages[].content
        // data.messages[].custom_notification.enabled
        // data.messages[].custom_notification.title
        // data.messages[].custom_notification.alert
        // data.messages[].custom_notification.at_prefix
    });
}

// 离线消息同步监听
window.JIM.OfflineMessageSynchronizationMonitoring = function OfflineMessageSynchronizationMonitoring() {
    JIM.onSyncConversation(function (data) {
        console.log('离线消息同步监听离线消息同步监听离线消息同步监听', data);
        OfflineMessage(data)

        // data[]
        // data[].msg_type 会话类型
        // data[].from_appey 单聊有效
        // data[].from_username 单聊有效
        // data[].from_gid 群聊有效
        // data[].unread_msg_count 消息未读数
        // 消息已读回执状态，针对自己发的消息
        // data[].receipt_msgs[]
        // data[].receipt_msgs[].msg_id
        // data[].receipt_msgs[].unread_count
        // data[].receipt_msgs[].mtime
        // 消息列表
        // data[].msgs[]
        // data[].msgs[].msg_id
        // data[].msgs[].content
        // data[].msgs[].msg_type
        // data[].msgs[].ctime_ms
        // data[].msgs[].need_receipt
        // data[].msgs[].custom_notification.enabled
        // data[].msgs[].custom_notification.title
        // data[].msgs[].custom_notification.alert
        // data[].msgs[].custom_notification.at_prefix
    });
}

// 发送单聊消息
window.JIM.SendASingleChatMessage = function SendASingleChatMessage(target_username, content) {

    console.log('target_username',);
    console.log('content', content);

    JIM.sendSingleMsg({
        'target_username': target_username,
        // 'target_nickname': target_nickname,
        'content': content,
        // 'appkey': appkey,
        // 'extras': extras
    }).onSuccess(function (data, msg) {
        console.log('发送单聊消息成功', data, msg);
        //data.code 返回码
        //data.message 描述
        //data.msg_id 发送成功后的消息 id
        //data.ctime_ms 消息生成时间,毫秒
        //data.appkey 用户所属 appkey
        //data.target_username 用户名
        //msg.content 发送成功消息体,见下面消息体详情
    }).onFail(function (data) {
        console.log('发送单聊消息失败', data);
        //data.code 返回码
        //data.message 描述
    })
}

// 获取好友列表
window.JIM.GetFriendsList = function GetFriendsList() {

    JIM.getFriendList().onSuccess(function (data) {
        console.log('好友列表', data);
        // SendAListOfFriends(data)

        // JIM.declineFriend({
        //     'target_name': 'C2021060554409_1428',
        //     'why': '111',
        // }).onSuccess(function (data) {
        //     //data.code 返回码
        //     //data.message 描述
        // }).onFail(function (data) {
        //     // 同上
        // });

        //data.code 返回码
        //data.message 描述
        //data.friend_list[] 好友列表，示例如下
        //data.friend_list[0].username
        //data.friend_list[0].appkey
        //data.friend_list[0].nickname
        //data.friend_list[0].avatar 头像
        //data.friend_list[0].memo_nam 好友备注
        //data.friend_list[0].memo_others 其他备注
        //data.friend_list[0].birthday 生日，默认空
        //data.friend_list[0].gender 性别 0 未知， 1 男 ，2 女
        //data.friend_list[0].signature 用户签名
        //data.friend_list[0].region 用户所属地区
        //data.friend_list[0].address 用户地址
        //data.friend_list[0].mtime 用户信息最后修改时间
    }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
    });
}

// 单聊消息未读
window.JIM.SingleChatMessageUnread = function SingleChatMessageUnread(usernameIMID) {
    // 单聊，未读数，调用则成功，无回调函数
    var count = JIM.getUnreadMsgCnt({
        'username': usernameIMID
    });
    return count

    // console.log('单聊消息未读',count);
    // JIM.getUnreadMsgCnt({
    //     // 'msg_id': '11706218084'
    // }).onSuccess(function (data) {
    //     console.log('单聊消息未读', data);
    //     //data.code 返回码
    //     //data.message 描述
    //     // 未读用户列表
    //     //data.msg_unread_list.unread_list[].appkey
    //     //data.msg_unread_list.unread_list[].username
    //     //data.msg_unread_list.read_list[].nickname
    //     // 已读用户列表
    //     //data.msg_unread_list.read_list[].appkey
    //     //data.msg_unread_list.read_list[].username
    //     //data.msg_unread_list.read_list[].nickname
    // }).onFail(function (data) {
    //     //data.code 返回码
    //     //data.message 描述
    // });

}

// 重置会话未读数
window.JIM.SingleChatMessageHasBeenReadBack = function SingleChatMessageHasBeenReadBack(usernameIMID) {
    console.log('++++++++++++++++++++++++++++++++');

    // // 重置单聊会话，调用则成功，无回调函数
    // JIM.resetUnreadCount({
    //     'username': usernameIMID
    // });

    // console.log('usernameIMID,msg_ids', usernameIMID, msg_ids);
    // // JIM.onMsgReceiptChange(function(data) {
    // //     console.log('息已读数变更事件实时监听',data);
    // //     // data.type
    // //     // data.gid
    // //     // data.appkey
    // //     // data.username
    // //     // data.receipt_msgs[].msg_id
    // //     // data.receipt_msgs[].unread_count
    // // });

    // JIM.addSingleReceiptReport({
    //     'username': usernameIMID,
    //     'msg_ids': msg_ids
    // }).onSuccess(function (data, msg_ids) {
    //     console.log('接收方收到需要消息回执的消', data, msg_ids);
    //     // data.code 返回码
    //     // data.appkey 目标 appkey
    //     // data.username 目标 username
    //     // msg_ids 消息数组
    // }).onFail(function (data, msg_ids) {
    //     console.log('接收方收到需要消息回执的消', data, msg_ids);
    // })
}
// 创建群聊
window.JIM.CreateAGroupChat = function CreateAGroupChat(groupName, dataUSENAME) {

    JIM.createGroup({
        'group_name': groupName,
    }).onSuccess(function (data) {
        console.log('创建群聊', data);
        window.JIM.GroupAdditive(data.gid, dataUSENAME)
        //data.code 返回码
        //data.message 描述
        //data.gid 群组id
        //data.group_name 群名
        //data.group_descriptin 群描述
    }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
    });
}

// 给群添加人
window.JIM.GroupAdditive = function GroupAdditive(params, dataUSENAME) {
    JIM.addGroupMembers({
        'gid': params,
        'member_usernames': dataUSENAME
    }).onSuccess(function (data) {
        console.log('给群添加人1', data);
        window.JIM.GetAGroupList()
        // 创建群成功
        CreateAGroupSuccess()
        // 创建成功之后调用成功后的函数弹窗
        //data.code 返回码
        //data.message 描述
    }).onFail(function (data) {
        console.log('给群添加人2', data);
        alert('有用户未注册')
        //同上

    });
}

/**
 * @Author: 飞
 * @Date: 2021-06-15 17:37:56
 * @Describe: 获取群列表
 */
window.JIM.GetAGroupList = function GetAGroupList() {
    JIM.getGroups().onSuccess(function (data) {
        console.log('获取群列表', data);
        /**
         * @Author: 飞
         * @Date: 2021-06-15 17:57:57
         * @Describe: 调用获取群列表   存vuex
         */
        GroupThatTotalList(data.group_list)
        //data.code 返回码
        //data.message 描述
        //data.group_list[] 群组列表，如下示例
        //data.group_list[0].gid 群id
        //data.group_list[0].name 群名
        //data.group_list[0].desc 群描述
        //data.group_list[0].appkey 群所属appkey
        //data.group_list[0].ctime 群创建时间
        //data.group_list[0].mtime 最近一次群信息修改时间
        //data.group_list[0].avatar 群头像
        //data.group_list[0].group_type 公开群:2,私有群:0或者1
    }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
    });
}
/**
 * @Author: 飞
 * @Date: 2021-06-15 23:52:54
 * @Describe: 发送群聊文本
 */
window.JIM.SendGroupChatText = function SendGroupChatText(target_group_gid, content) {
    // 发送消息
    JIM.sendGroupMsg({
        'target_gid': target_group_gid,
        'content': content,
    }).onSuccess(function (data, msg) {
        console.log('发送群聊文本成功', data, msg);

        //data.code 返回码
        //data.message 描述
        //data.msg_id 发送成功后的消息id
        //data.ctime_ms 消息生成时间,毫秒
        //data.target_gid 群 id
        //data.unread_count 消息需要已读回执的时候,默认未读数
        //msg.content 发送成功消息体
    }).onFail(function (data) {
        //同发送单聊文本
    });
}

/**
 * @Author: 飞
 * @Date: 2021-06-16 14:53:16
 * @Describe: 业务事件监听
 */
window.JIM.BusinessTimeMonitoring = function BusinessTimeMonitoring(params) {
    JIM.onEventNotification(function (data) {
        console.log('业务事件监听', data);
        // **********************被动加群通知事件**********************
        // **********************添加群组成员事件示例：event_type = 10   **********************
        if (data.event_type == 10) {
            // PassivePlusGroupNotificationEvent(data)
            /**
             * @Author: 飞
             * @Date: 2021-06-16 16:16:35
             * @Describe: 重新获取群列表
             */
            window.JIM.GetAGroupList()
        }
        //data.event_id 事件 id
        //data.event_type 事件类型
        //data.ctime_ms 事件生成时间
        //data.extra =0同时登录，=1用户被禁用，=2用户被删除
    })
}
/**
 * @Author: 飞
 * @Date: 2021-06-21 18:33:16
 * @Describe:更新群信息 
 */
window.JIM.UpdateGroupInformation = function UpdateGroupInformation(gid, avatar) {
    // var formData = new FormData();

    // formData.append("token", 1)


    JIM.updateGroupInfo({
        'gid': '71089530',
        'group_name': '11111111111111111111',
        'avatar': formData,
    }).onSuccess(function (data) {
        console.log('更新群信息onSuccess', data);

        //data.code 返回码
        //data.message 描述
    }).onFail(function (data) {
        console.log('更新群信息onFail', data);
        // 同上
    });
    console.log('formData', formData);

}


//
// function FansList() {

// }


// import Messages from "./Messages";
// import CreateGroupChat from "./CreateGroupChat";
// export default {
//     name: "news",
//     data() {
//         return {
//             // 好友列表
//             list: [],
//             active: 1, //
//             uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
//             show: false, //创建群聊 功能
//             CreateAGroupChat: false, //三个以上为true
//             Allocation: false, //全选中
//             PoonsTheButton: false, //全选中按钮


//             use: "",
//             pw: "",
//             appkData: {}
//         };
//     },
//     activated() {
//         window.scrollTo(0, 0); //滚至顶部
//         this.qianming(); //获取签名
//         // this.init_tongxin();//初始化

//         // this.getMemberData();

//         // var that = this;
//         // window.JIM.getConversation()
//         //     .onSuccess(function (data) {
//         //         console.log("会话列表", that.list);
//         //         that.list = data.conversations
//         //         console.log('that.list', that.list);

//         //     })
//         //     .onFail(function (data) {

//         //     });
//     },
//     components: {
//         Messages,
//         CreateGroupChat
//     },
//     watch: {
//         PoonsTheButton: function () {
//             if (this.PoonsTheButton == true) {
//                 this.list.map(function (value, index, array) {
//                     return (value.checked = true);
//                 });
//             }
//             if (this.PoonsTheButton == false) {
//                 this.list.map(function (value, index, array) {
//                     return (value.checked = false);
//                 });
//                 // this.PoonsTheButton = false;
//             }
//         },
//         list: {
//             //监听的对象
//             deep: true, //深度监听设置为 true
//             handler: function (newV, oldV) {
//                 console.log("watch中：", newV);
//                 var num = 0;
//                 newV.forEach((item, index, array) => {
//                     console.log("item", item.checked);
//                     if (item.checked == true) {
//                         num = num + 1;
//                     }
//                     //执行代码
//                 });
//                 console.log("num", num);
//                 if (num >= 3) {
//                     this.CreateAGroupChat = true;
//                 }
//                 if (num < 3) {
//                     this.CreateAGroupChat = false;
//                 }
//                 if (num == this.list.length) {
//                     this.Allocation = true;
//                 } else {
//                     this.Allocation = false;
//                 }
//             }
//         },
//         appkData: function (N, O) {
//             console.log("ssssssssssssss");
//             this.init_tongxin();
//         }
//     },
//     methods: {
//         getMsgFormSon(data) {
//             console.log("data", data);
//             this.PoonsTheButton = data;
//         },
//         //
//         openChat() {
//             this.show = true;
//         },
//         // 注册

//         logon() { },
//         // 获取基本信息
//         getMemberData() {
//             $http
//                 .post("member.member.member-data", { v: 2 }, " ")
//                 .then(
//                     response => {
//                         if (response.result === 1) {
//                             console.log("基本信息请求成功");
//                         } else {
//                             require("@/assets/css/member/02.scss");
//                         }
//                     },
//                     response => {
//                         console.log(response.msg);
//                         require("@/assets/css/member/02.scss");
//                     }
//                 )
//                 .catch(err => {
//                     console.error(err);
//                     require("@/assets/css/member/02.scss");
//                 });
//         },
//         qianming() {
//             var that = this;
//             axios({ method: "post", url: "https://tpkl.minpinyouxuan.com/index.php/api/v1/qianming" })
//                 .then(response => {
//                     that.appkData = response.data.data;
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//         },
//         //初始化
//         init_tongxin() {
//             var pwsdata = {};

//             window.JIM = new window.JMessage({
//                 debug: true
//             });
//             window.JIM.init({
//                 appkey: this.appkData.appkey,
//                 random_str: this.appkData.random_str,
//                 timestamp: this.appkData.timestamp,
//                 signature: this.appkData.signature,
//                 flag: 0
//             })
//                 .onSuccess(function (data) {
//                     //data.code 返回码
//                     //data.message 描述
//                     console.log("请求成功回调", data);
//                     // 登录
//                 })
//                 .onFail(function (data) {
//                     // 同上
//                     console.log("请求失败回调 ", data);
//                 });
//         },
//         //登录
//         logIn() {
//             var that = this;
//             window.JIM.login({
//                 username: '1234',
//                 password: '1234'
//             })
//                 .onSuccess(function (data) {
//                     console.log("登录成功", data); //News
//                     console.log("that", that);

//                     window.localStorage.setItem("usename_JG", that.use);
//                     window.localStorage.setItem("password_JG", that.pw);

//                     //   this.$router.push({ name: "ComMit", params: {}, query: { i: this.$route.query.i, type: this.$route.query.type, mid: this.$route.query.mid } });
//                     that.$router.push({ name: "news", params: {}, query: { i: that.$route.query.i, type: that.$route.query.type, mid: that.$route.query.mid } });
//                 })
//                 .onFail(function (data) {
//                     console.log("登录失败", data);
//                     //同上
//                 });
//         }
//     }
// };
