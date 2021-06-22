import Messages from "./Messages";   //消息
import Follow from "./Follow.vue";   //关注 
import Fans from "./Fans.vue";   //粉丝
import { Toast,  } from "vant";
import CreateGroupChat from "./CreateGroupChat";
export default {
    name: "news",
    data() {
        return {
            showPopover: false,
            actions: [
              { text: '创建群聊', icon: 'chat-o' },
            ],
            // 粉丝列表
            list: this.$store.state.FansList,
            listNum: '',
            active: 1, //
            // uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid,
            uid: JSON.parse(localStorage.getItem("uid")),
            show: false, //创建群聊 功能
            CreateAGroupChat: false, //三个以上为true

            Allocation: false, //全选中
            PoonsTheButton: false, //全选中按钮


            use: "",
            pw: "",
            appkData: {},
            time1: "", //当前时间
            time2: "",//七日前
            // 原数组
            dataSnew: [],
            // 新数据结构
            NewArray: {},
            huihuarenlist: [],
            huihuarenliststrdata: [],

        };
    },
    beforeDestroy() {
        console.log('NEWS销毁前');
    },

    destroyed() {
        console.log('NEWS销毁后');
    },
    activated() {
        // 获取基本信息
        this.getMemberData();
        //滚至顶部
        window.scrollTo(0, 0);
        // 非信息界面进来第一次获取
        this.listNum = `共` + this.$store.state.FansList.length + `个粉丝`;

    },
    created() {
        // 建群成功
        window.CreateAGroupSuccess = this.CreateAGroupSuccess;
    },
    components: {
        Follow,//关注
        Messages,//信息
        CreateGroupChat,
        Follow,//关注,
        Fans//粉丝
    },
    //利用计算属性
    computed: {
        // 监控粉丝列表
        GetAListOfFans() {
            return this.$store.state.FansList;
        },

    },
    watch: {

        // 监控粉丝列表
        GetAListOfFans(val, cal) {
            console.log("粉丝列表有变化", val, cal);
            this.list = val;
            this.listNum = `共` + val.length + `个粉丝`;
        },
        // 全选中按钮
        PoonsTheButton: function () {
            if (this.PoonsTheButton == true) {
                this.list.map(function (value, index, array) {
                    return (value.checked = true);
                });
            }
            if (this.PoonsTheButton == false) {
                this.list.map(function (value, index, array) {
                    return (value.checked = false);
                });
                // this.PoonsTheButton = false;
            }
        },

        list: {
            //监听的对象
            deep: true, //深度监听设置为 true
            handler: function (newV, oldV) {
                console.log("watch中：", newV);
                /**
                 * @Author: 飞
                 * @Date: 2021-06-15 16:54:41
                 * @Describe: 创建群聊usename
                 */
                var CreateAGroupChatLibraryusename = newV.filter(function (item, index, ary) {
                    if (item.checked) {
                        return item
                    }
                })
                var CreateAGroupChatLibraryusename_data = []
                for (let index = 0; index < CreateAGroupChatLibraryusename.length; index++) {
                    CreateAGroupChatLibraryusename_data.push({ 'username': CreateAGroupChatLibraryusename[index].username })
                }

                // 获得的选中群信息   存起来
                this.$store.commit('CreateAGroupChatLibraryusename', CreateAGroupChatLibraryusename_data)



                /**
                 * @Author: 飞
                 * @Date: 2021-06-15 16:43:06
                 * @Describe: 
                 */
                // 计数  看看够不够欧创建群聊
                var num = 0;
                newV.forEach((item, index, array) => {
                    console.log("item", item.checked);
                    if (item.checked == true) {
                        num = num + 1;
                    }
                    //执行代码
                });
                console.log("num", num);
                if (num >= 3) {
                    this.CreateAGroupChat = true;
                }
                if (num < 3) {
                    this.CreateAGroupChat = false;
                }
                if (num == this.list.length) {
                    this.Allocation = true;
                } else {
                    this.Allocation = false;
                }
            }
        },
    },
    destroyed() {
        console.log("×××××××××××××××××××××××××××××××××××××××××××××");
    },
    mounted() {


    },
    methods: {

        //创建群成功 
        CreateAGroupSuccess() {
            Toast('建群成功')
            this.show = false
        },
        //创建群聊全选非全选
        getMsgFormSon(data) {
            console.log("data", data);
            this.PoonsTheButton = data;
        },


        //创建群聊开关(点击选项时触发)
        onSelect() {
            this.show = true;
        },
        // 注册

        // 获取基本信息
        getMemberData() {
            var that = this
            $http
                .post("member.member.member-data", { v: 2 }, " ")
                .then(
                    response => {
                        if (response.result === 1) {

                        } else {
                            require("@/assets/css/member/02.scss");
                        }
                    },
                    response => {
                        console.log(response.msg);
                        require("@/assets/css/member/02.scss");
                    }
                )
                .catch(err => {
                    console.error(err);
                    require("@/assets/css/member/02.scss");
                });
        },

    }
};
