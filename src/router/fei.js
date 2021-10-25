/*
 * @Author: 飞
 * @Date: 2021-07-20 11:48:06
 * @LastEditTime: 2021-10-22 17:04:45
 * @FilePath: \you-shop1\src\router\fei.js
 * @Describe: 
 */

// vue异步组件实现懒加载
// 方法如下：component：resolve=>(require(['需要加载的路由的地址'])，resolve)


// 捐助中心
const DonationCenter = r => require(["../views/DonationCenter/DonationCenter.vue"], r);
// 捐助中心 明细
const Detail = r => require(["../views/DonationCenter/Detail.vue"], r);
// 聚合支付
const AggregatePayment = r => require(["../views/AggregatePayment/AggregatePayment.vue"], r);

// 支付码地区选择
const PaymentArea = r => require(["../views/A_version_1.1/PaymentArea/PaymentArea.vue"], r);

// // 联动支付收银台
const Pay_ld = r => require(["../views/A_version_1.1/Pay_ld/Pay_Id.vue"], r);

// 捐赠中心 捐赠发票   
const DonationInvoice = r => require(['../views/A_version_1.1/DonationInvoice/DonationInvoice.vue'], r);
// 捐赠中心 捐赠发票历史
const InvoiceHistory = r => require(['../views/A_version_1.1/DonationInvoice/InvoiceHistory.vue'], r);
// 捐赠中心 捐赠抬头管理
const LuckyManagement = r => require(['../views/A_version_1.1/DonationInvoice/LuckyManagement.vue'], r);
// 捐赠中心 发票预览
const InvoicePreview = r => require(['../views/A_version_1.1/DonationInvoice/InvoicePreview.vue'], r);
// 捐赠中心 发票新赠抬头
const Added = r => require(['../views/A_version_1.1/DonationInvoice/Added.vue'], r);



// 捐书----Start
// 捐书主页
const DonateBook = r => require(['../views/A_version_1.1/DonateBook/DonateBook.vue'], r);
// 捐书工程item 详细
const DonateItem = r => require(['../views/A_version_1.1/DonateBook/DonateItem.vue'], r);
// 捐书预约信息
const ReservationInformation = r => require(['../views/A_version_1.1/DonateBook/ReservationInformation.vue'], r);
// 捐书赞助列表
const SponsoredList = r => require(['../views/A_version_1.1/DonateBook/SponsoredList.vue'], r);



// 捐书----end

// 会员中心-推荐商户列表----Start
const RecommendedMerchantList = r => require(['../views/A_version_1.1/MemberCenter/RecommendedMerchantList.vue'], r);

// 会员中心-推荐商户列表----end


const Messagerecord_s = r => require(['../views/A_version_1.1/Messagerecord.vue'], r);

// 新捐物----Start
const NewDonation = r => require(['../views/A_version_1.1/NewDonation/NewDonation.vue'], r);
const NewDonationCenter = r => require(['../views/A_version_1.1/NewDonation/NewDonationCenter.vue'], r);
// 排行榜
const Leaderboard = r => require(['../views/A_version_1.1/NewDonation/Leaderboard.vue'], r);
// 一键捐赠
const OneClickDonation = r => require(['../views/A_version_1.1/NewDonation/OneClickDonation.vue'], r);
// 个人中心
const NewPersonalCenter = r => require(['../views/A_version_1.1/NewDonation/NewPersonalCenter.vue'], r);
// 新捐赠订单
const NewDonationOrder = r => require(['../views/A_version_1.1/NewDonation/NewDonationOrder.vue'], r);
// 新捐赠订单 详细
const NewDonationOrderDetails = r => require(['../views/A_version_1.1/NewDonation/NewDonationOrderDetails.vue'], r);
// 新捐赠订单 明细
const NewDetail = r => require(['../views/A_version_1.1/NewDonation/NewDetail.vue'], r);
// 新捐赠订单 预约发货
const NewShipByAppointment = r => require(['../views/A_version_1.1/NewDonation/NewShipByAppointment.vue'], r);
// 新捐赠订单 预约详情
const NewBookingInfo = r => require(['../views/A_version_1.1/NewDonation/NewBookingInfo.vue'], r);
// 新捐赠订单 我的捐物
const IHaveGiven = r => require(['../views/A_version_1.1/NewDonation/IHaveGiven.vue'], r);




// 新捐物----end



// 个人中心----Start
/**
 * @Author: 飞
 * @Date: 2021-09-17 16:34:37
 * @Describe: 行业申请
 */
// const Industry = r => require(['../views/A_version_1.1/industry/industry.vue'], r);

const Industry = () => import(/* webpackChunkName:"Industry" */"../views/A_version_1.1/industry/Industry.vue")
// const Industry = r => require(['../views/A_version_1.1/industry/industry.vue'], r);
const IndustryHomePage = () => import(/* webpackChunkName:"IndustryRepresentativesHomePage" */"../views/A_version_1.1/industry/IndustryHomePage.vue")
// 行业代表详情
const Industrydetails = () => import(/* webpackChunkName:"Industrydetails" */"../views/A_version_1.1/industry/Industrydetails.vue")
const LCE = () => import(/* webpackChunkName:"LCE" */"../views/A_version_1.1/industry/LCE.vue")
// 授权牌管理列表
const ArrangeTableList = () => import(/* webpackChunkName:"ArrangeTableList" */"../views/A_version_1.1/industry/ArrangeTableList.vue")
// 授权牌管理列表
const AddBrand = () => import(/* webpackChunkName:"AddBrand" */"../views/A_version_1.1/industry/AddBrand.vue")

/**
 * @Author: 飞
 * @Date: 2021-10-18 18:01:59
 * @Describe: 推广余额
 */
 const ToPromoteTheBalance = () => import(/* webpackChunkName:"ToPromoteTheBalance" */"../components/new_diy/ToPromoteTheBalance.vue")
 const ToPromoteTheBalance_TurnAdd = () => import(/* webpackChunkName:"ToPromoteTheBalance_TurnAdd" */"../components/new_diy/ToPromoteTheBalance_TurnAdd.vue")
//  推广明细
 const ToPromoteTheDetail = () => import(/* webpackChunkName:"ToPromoteTheDetail" */"../views/A_version_1.1/ToPromoteTheBalance/ToPromoteTheDetail.vue")

// 个人中心----end 


// 汇元支付
// const HuiYuan = ()=>import(/* webpackChunkName:"HuiYuan" */"../views/A_version_1.1/HuiYuan/HuiYuan.vue")
const HuiYuan = r => require(['../views/A_version_1.1/HuiYuan/HuiYuan.vue'], r);
const HuiYuanPay = r => require(['../views/A_version_1.1/HuiYuan/pay.vue'], r);
/**
 * @Author: 飞
 * @Date: 2021-10-15 13:55:01
 * @Describe: 
 */
// 捐领平台
const DonateLedPlatform = () => import(/* webpackChunkName:"DonateLedPlatform" */"../views/A_version_1.1/DonateLedPlatform/DonateLedPlatform.vue")
/**
 * @Author: 飞
 * @Date: 2021-10-21 17:34:49
 * @Describe: 运营中心
 */
 const OperationsCenter = () => import(/* webpackChunkName:"DonateLedPlatform" */"../views/A_version_1.1/OperationsCenter/OperationsCenter.vue")
 const DetailEarnings = () => import(/* webpackChunkName:"DetailEarnings" */"../views/A_version_1.1/OperationsCenter/DetailEarnings.vue")

export default [
    // 推广明细
    { path: "/OperationsCenter", component: OperationsCenter, name: "OperationsCenter", meta: { title: "运营中心", foot: true } },
    // 推广明细
    { path: "/DetailEarnings", component: DetailEarnings, name: "DetailEarnings", meta: { title: "运营中心", foot: true } },


    // 推广明细
    { path: "/member/ToPromoteTheDetail", component: ToPromoteTheDetail, name: "ToPromoteTheDetail", meta: { title: "推广明细", foot: true } },

    //推广余额
    { path: "/member/ToPromoteTheBalance", component: ToPromoteTheBalance, name: "ToPromoteTheBalance", meta: { title: "推广余额", foot: true } },
    //推广余额转赠
    { path: "/member/ToPromoteTheBalance_TurnAdd", component: ToPromoteTheBalance_TurnAdd, name: "ToPromoteTheBalance_TurnAdd", meta: { title: "推广余额转赠", foot: true } },
    //捐领平台
    { path: "/DonateLedPlatform", component: DonateLedPlatform, name: "DonateLedPlatform", meta: { title: "中民慈善终端网络平台", foot: true } },

    //聚合支付
    { path: "/HuiYuan", component: HuiYuan, name: "HuiYuan", meta: { title: "商户入住", foot: true } },
    //聚合支付
    { path: "/HuiYuanPay", component: HuiYuanPay, name: "HuiYuanPay", meta: { title: "自助收银", foot: true } },


    { path: "/member/IndustryHomePage", component: IndustryHomePage, name: "IndustryHomePage", meta: { title: "行业代表", foot: true } },
    { path: "/member/Industrydetails", component: Industrydetails, name: "Industrydetails", meta: { title: "行业代表详情", foot: true } },
    { path: "/member/LCE", component: LCE, name: "LCE", meta: { title: "工作证证书", foot: true } },
    { path: "/member/ArrangeTableList", component: ArrangeTableList, name: "ArrangeTableList", meta: { title: "", foot: true } },
    { path: "/member/AddBrand", component: AddBrand, name: "AddBrand", meta: { title: "", foot: true } },
    

    // 行业
    {
        path: '/member/Industry',
        component: Industry,
        name: 'Industry',
        meta: {
            // title: '行业代表申请',
            foot: true
        },
    },




    // 新捐物----Start
    {
        path: '/NewDonation',
        component: NewDonation,
        name: 'NewDonation',
        meta: {
            title: '捐赠中心',
            foot: true
        },

    },
    {
        path: '/NewDonationCenter',
        component: NewDonationCenter,
        name: 'NewDonationCenter',
        meta: {
            title: '捐赠中心',
            foot: true
        },
    },
    // 排行榜
    {
        path: '/Leaderboard',
        component: Leaderboard,
        name: 'Leaderboard',
        meta: {
            title: '排行榜',
            foot: true
        },
    },
    // 一键捐赠
    {
        path: '/OneClickDonation',
        component: OneClickDonation,
        name: 'OneClickDonation',
        meta: {
            title: '一键捐赠',
            foot: true
        },
    },
    // 新个人中心
    {
        path: '/NewPersonalCenter',
        component: NewPersonalCenter,
        name: 'NewPersonalCenter',
        meta: {
            title: '个人中心',
            foot: true,
            notKeepAlive: true
        },
    },
    // 我的捐赠订单 
    {
        path: '/NewDonationOrder',
        component: NewDonationOrder,
        name: 'NewDonationOrder',
        meta: {
            title: '捐赠订单',
            foot: true
        },

    },
    // 我的捐赠订单 详细
    {
        path: '/NewDonationOrderDetails',
        component: NewDonationOrderDetails,
        name: 'NewDonationOrderDetails',
        meta: {
            title: '订单详情',
            foot: true
        },
    },
    // 我的捐赠订单 明细
    {
        path: '/NewDetail',
        component: NewDetail,
        name: 'NewDetail',
        meta: {
            title: '捐赠明细',
            foot: true
        },
    },
    // 我的捐赠订单 预约发货
    {
        path: '/NewShipByAppointment',
        component: NewShipByAppointment,
        name: 'NewShipByAppointment',
        meta: {
            title: '预约发货',
            foot: true
        },
    },
    // 我的捐赠订单 预约详情
    {
        path: '/NewBookingInfo',
        component: NewBookingInfo,
        name: 'NewBookingInfo',
        meta: {
            title: '预约详情',
            foot: true
        },
    },
    // 我的捐赠订单 我的捐物
    {
        path: '/IHaveGiven',
        component: IHaveGiven,
        name: 'IHaveGiven',
        meta: {
            title: '我的捐物',
            foot: true
        },
    },




    // 新捐物----end

    {
        path: '/Messagerecord_s',
        component: Messagerecord_s,
        name: 'Messagerecord_s',
        meta: {
            title: '消息上传',
            foot: true
        },
    },

    // 会员中心-推荐商户列表----Start
    {
        path: '/RecommendedMerchantList',
        component: RecommendedMerchantList,
        name: 'RecommendedMerchantList',
        meta: {
            title: '推荐商户列表',
            foot: true
        },
    },

    // 会员中心-推荐商户列表----end




    // 捐书----Start
    // 捐书主页
    {
        path: '/DonateBook',
        component: DonateBook,
        name: 'DonateBook',
        meta: {
            title: '光华公益书海工程',
            foot: true
        }
    },
    // 捐书工程item 详细
    {
        path: '/DonateItem',
        component: DonateItem,
        name: 'DonateItem',
        meta: {
            foot: true
        }
    },
    // 捐书预约信息
    {
        path: '/ReservationInformation',
        component: ReservationInformation,
        name: 'ReservationInformation',
        meta: {
            title: '捐书预约信息',
            foot: true
        }
    },
    // 捐书赞助列表
    {
        path: '/SponsoredList',
        component: SponsoredList,
        name: 'SponsoredList',
        meta: {
            title: '赞助列表',
            foot: true
        }
    },
    // 捐书----end

    // 捐赠中心  发票新增抬头  
    {
        path: '/Added',
        component: Added,
        name: 'Added',
        meta: {
            title: '新增抬头',
            foot: true
        }
    },
    // 捐赠中心  发票预览  
    {
        path: '/InvoicePreview',
        component: InvoicePreview,
        name: 'InvoicePreview',
        meta: {
            title: '发票预览',
            foot: true
        }
    },
    // 捐赠中心  捐赠抬头管理  
    {
        path: '/LuckyManagement',
        component: LuckyManagement,
        name: 'LuckyManagement',
        meta: {
            title: '抬头管理',
            foot: true
        }
    },
    // 捐赠中心  捐赠发票历史  
    {
        path: '/InvoiceHistory',
        component: InvoiceHistory,
        name: 'InvoiceHistory',
        meta: {
            title: '发票历史',
            foot: true
        }
    },
    // 捐赠中心  捐赠发票  
    {
        path: '/donationInvoice',
        component: DonationInvoice,
        name: 'DonationInvoice',
        meta: {
            title: '捐赠发票',
            foot: true
        }
    },
    //支付码地区选择
    {
        path: "/Pay_ld",
        component: Pay_ld,
        name: "Pay_ld",
        meta: { title: "收银台", foot: true }
    },
    //支付码地区选择
    { path: "/PaymentArea", component: PaymentArea, name: "PaymentArea", meta: { title: "支付码地区选择", foot: true } },
    //捐助中心
    { path: "/DonationCenter", component: DonationCenter, name: "DonationCenter", meta: { title: "捐助中心", foot: true } },
    //捐助中心
    { path: "/Detail", component: Detail, name: "Detail", meta: { title: "捐助明细", foot: true } },
    //聚合支付
    { path: "/AggregatePayment", component: AggregatePayment, name: "AggregatePayment", meta: { title: "商户入住", foot: true } },

];

