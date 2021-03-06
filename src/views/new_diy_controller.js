import { Toast } from "vant";
import U_article from "components/new_diy/article";
import U_backup from "components/new_diy/backup";
import U_blank from "components/new_diy/blank";
import U_button from "components/new_diy/button";
import U_community from "components/new_diy/community";
import U_coupons from "components/new_diy/coupons";
import U_cube from "components/new_diy/cube";
import U_form from "components/new_diy/form";
import U_goods from "components/new_diy/goods";
import U_goodsgroup from "components/new_diy/goodsgroup";
import U_goodsnearby from "components/new_diy/goodsnearby";
import U_goodsrush from "components/new_diy/goodsrush";
import U_headline from "components/new_diy/headline";
import U_line from "components/new_diy/line";
import U_livestreaming from "components/new_diy/livestreaming";
import U_location from "components/new_diy/location";
import U_lottery from "components/new_diy/lottery";
import U_maps from "components/new_diy/maps";
import U_memberasset from "components/new_diy/memberasset";
import U_membermarket from "components/new_diy/membermarket";
import U_membermerchant from "components/new_diy/membermerchant";
import U_memberorder from "components/new_diy/memberorder";
import U_memberrights from "components/new_diy/memberrights";
import U_membertool from "components/new_diy/membertool";
import U_membertop from "components/new_diy/membertop";
import U_notice from "components/new_diy/notice";
import U_richtext from "components/new_diy/richtext";
import U_search from "components/new_diy/search";
import U_shopfor from "components/new_diy/shopfor";
import U_shortvideo from "components/new_diy/shortvideo";
import U_signin from "components/new_diy/signin";
import U_simplegraph from "components/new_diy/simplegraph";
import U_slideshow from "components/new_diy/slideshow";
import U_stores from "components/new_diy/stores";
import U_suspendbutton from "components/new_diy/suspendbutton";
import U_tabcontrol from "components/new_diy/tabcontrol";
import U_title from "components/new_diy/title";
import U_video from "components/new_diy/video";
import top_navigation from "components/new_diy/top_navigation";
import U_foot from "components/new_diy/foot";
import U_stargroup from "components/new_diy/stargroup";

const documentElement = document.documentElement;
const body = document.body;
window.page_idAdvertisings = []; // ??????????????????????????????
window.page_idFull_screens = [];

export default {
  data() {
    return {
      page_id: "",
      clientWidth: "375",
      page_name: "",
      isInHome: 0,
      id: "M-" + new Date().getTime(),
      fullShow: false,
      popShow: false,
      advertising: {},
      full_screen: {},
      top_info: {},
      bottom_info: "",
      components: [],

      showPage: true,
      isBottom: false,
      btnFlag: false,
      isMounted: false,

      current_page: 1,
      total_page: 0,
      isLoadMore: true,
      lastIndex: "",
      wwwwwwwww:'9999999999999'
      // "gh_id": "gh_cdb1a2dfcd17",
      // "minApp_link": "/pages/index/index.html",
    };
  },
  mounted() {
    window.diyHomeScrollTop = 0;
    this.isInHome = 1;
    console.log('getTemp',getTemp);
    this.getTemp();

    // mounted ????????????????????????
    this.isMounted = true;
  },
  created() {
    console.log('HUIDAOYUANWEI');
    
  },
  activated() {

    if (this.fun.getPhoneEnv() == 3) {
      this.clientWidth = 375;
    } else {
      this.clientWidth = document.body.clientWidth;
    }

    if (window.page_id != this.fun.getKey("page_id") || window.isInHome) {
      if (!this.isMounted) {
        // mounted ???????????????????????????
        this.fun.setWXTitle("");
        this.isInHome = 1;
        this.getTemp();
      }
    } else {
      let title = window.localStorage.getItem("diypage_title");
      this.fun.setWXTitle(title);
      if (window.location.href.indexOf("#/newDiy?") > -1) {
        setTimeout(() => {
          window.scrollTo(0, window.diyHomeScrollTop);
        }, 200);
      }
    }

    if (this.isMounted) {
      // ??????????????????????????????????????????
      this.isMounted = false;
    }
    this.page_id = this.fun.getKey("page_id");
    window.page_id = this.fun.getKey("page_id");
    window.isInDiy = 1; // ??????????????????????????????
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  beforeRouteLeave(to, from, next) {
    window.diyHomeScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  methods: {
    // ?????????????????????
    getImg(url, callback) {
      let img = new Image();
      img.src = url;
      //???????????????????????????????????????????????????
      if (img.complete) {
        /* callback(img.width, img.height); */
        callback(Number(img.height) / Number(img.width));
      } else {
        //???????????????????????????
        img.onload = function() {
          /* callback(img.width, img.height); */
          callback(Number(img.height) / Number(img.width));
        };

        img.onerror = function() {
          console.log("??????????????????");
        };
      }
    },
    initAdvertising() {
      let that = this;
      this.getImg(this.advertising.image, function(scale) {
        // ????????????????????????????????????
        let script = document.createElement("script");
        script.type = "text/wxtag-template";
        script.text = `<div style="width: ${that.clientWidth * 0.65}px;height: ${(that.clientWidth * 0.65) * scale}px;"></div>`;
        that.advertising.html = `<wx-open-launch-weapp username="${that.advertising.s_id}" path="${that.advertising.s_url}">${script.outerHTML}</wx-open-launch-weapp>`;
        that.$forceUpdate();
      });
    },
    //??????????????????
    getTemp() {
      // console.log('??????????????????');
      this.showPage = false;
      $http
        .get("home-page.index", { page_id: this.fun.getKey("page_id") }, "loading")
        .then(
          response => {
            if (!response) return;

            if (response.data.item) {
              this.showPage = true;
              if (response.data.item.page) {
                this.total_page = response.data.item.page.total_page;
                this.current_page = response.data.item.page.current_page;
                this.lastIndex = response.data.item.page.count - 1;
              }
              let needLocations = ["U_location", "U_stores", "U_goodsnearby", "U_community"];
              this.components = response.data.item.datas;
              if (this.components && this.components.length > 0) {
                this.components.map((item) => {
                  if (needLocations.includes(item.component_key)) {
                    this.isLocation = true;
                  }
                });
              }

              // if (this.isLocation) {
              // ???????????????????????????
              //   this.getLocation();
              // }

              if (response.data.item.page_info) {

                //????????????
                this.advertising = response.data.item.page_info.advertising_id;
                if (this.advertising.id && this.advertising.datas) {
                  this.advertising.datas = JSON.parse(this.advertising.datas);
                }

                // ????????????
                this.full_screen = response.data.item.page_info.full_screen_id;
              }

              if (response.data.item.top && response.data.item.top.id) {
                this.top_info = JSON.parse(response.data.item.top.page_info);
              }

              // ??????????????????????????????
              if (response.data.item.foot_type == -1) {
                // ?????????
                this.bottom_info = "";
              } else if (response.data.item.foot_type == 1) {
                // ????????????
                if (!response.data.item.menus) {
                  // ??????????????????
                  this.bottom_info = {
                    defaultData: true
                  };
                } else {
                  // ???????????????????????????
                  this.bottom_info = JSON.parse(response.data.item.menus.page_info);
                }
              } else if (response.data.item.foot_type == 2) {
                // ??????????????????????????????
                if (response.data.item.foot instanceof Array) {
                  this.bottom_info = {};
                } else {
                  this.bottom_info = JSON.parse(response.data.item.foot.page_info);
                }
              }
              console.log('bottom_infobottom_infobottom_info',this.bottom_info);
              if (this.full_screen && this.full_screen.id && this.full_screen.show_rule === 1) {
                if (!window.page_idFull_screens.includes(this.page_id)) {
                  window.page_idFull_screens.push(this.page_id);
                  this.fullShow = true;
                  this.countDown(this.full_screen.show_time);
                }
              }

              if (this.advertising && this.advertising.id && this.advertising.show_rule === 1) {
                if (!window.page_idAdvertisings.includes(this.page_id)) {
                  window.page_idAdvertisings.push(this.page_id);
                  this.popShow = true;
                  this.$nextTick(() => {
                    this.initAdvertising();
                  });
                }
              }

              if (response.data.item.page_info) {
                this.getShareData(response.data.item.page_info);
              }
              window.isInHome = 0;
              this.isInHome = 0;

              this.$store.commit("setWatchDiypage", response.data.item.pageinfo.params.allowauth);

              // ???????????????????????????
              this.page_name = response.data.item.page_info && response.data.item.page_info.page_title ? response.data.item.page_info.page_title : response.data.mailInfo.name;

              this.fun.setWXTitle(this.page_name);
              // ??????????????????????????????????????????????????????????????????????????????
              window.localStorage.setItem("diypage_title", this.page_name);
              if (window.location.href.indexOf("#/newDiy?") > -1) {
                setTimeout(() => {
                  window.scrollTo(0, window.diyHomeScrollTop);
                }, 200);
              }

            } else {
              window.isInHome = 1;
              console.log(response.msg);
            }
          },
          response => {
            console.log(response);
          }
        );
    },
    getMoreDecorate() {
      this.isLoadMore = false; // ??????????????????????????????
      if (this.current_page < this.total_page) {
        this.current_page = this.current_page + 1;
        $http.get("plugin.decorate.frotend.decorate-api.get-page", {
          decorate_page: this.current_page,
          decorate_id: this.page_id
        }, "..").then((response) => {
          if (response.result == 1) {
            this.isLoadMore = true;
            this.components = this.components.concat(response.data.datas);
          } else {
            this.isLoadMore = false;
            this.current_page = this.current_page - 1;
          }
        });
      } else {
        console.log("????????????");
      }
    },
    //??????????????????????????????
    getScrollTop() {
      var scrollTop = 0;
      if (documentElement && documentElement.scrollTop) {
        scrollTop = documentElement.scrollTop;
      } else if (body) {
        scrollTop = body.scrollTop;
      }
      return scrollTop;
    },
    //?????????????????????????????????
    getClientHeight() {
      var clientHeight = 0;
      if (body.clientHeight && documentElement.clientHeight) {
        clientHeight = Math.min(
          body.clientHeight,
          documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          body.clientHeight,
          documentElement.clientHeight
        );
      }
      return clientHeight;
    },
    //???????????????????????????
    getScrollHeight() {
      return Math.max(body.scrollHeight, documentElement.scrollHeight);
    },
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 60) {
        this.btnFlag = true;
      } else {
        this.btnFlag = false;
      }

      //??????????????????
      if (Number(this.getScrollTop() + this.getClientHeight() + 5) >= this.getScrollHeight()) {
        if (this.isLoadMore) {
          this.getMoreDecorate();
        }
        //??????????????????
        this.isBottom = true;
      } else {
        this.isBottom = false;
      }
    },
    getLocation() {
      var that = this;
      var myLocation = this.$store.state.o2oLocation;

      if (!myLocation.point) {
        var mapObj = new AMap.Map("iCenter");
        mapObj.plugin("AMap.Geolocation", function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // ????????????????????????????????????:true
            timeout: 10000, // ??????10???????????????????????????????????????
            maximumAge: 0, // ??????????????????0??????????????????0
            convert: true, // ??????????????????????????????????????????????????????????????????true
            showButton: true, // ??????????????????????????????true
            buttonPosition: "LB", // ????????????????????????????????????'LB'????????????
            buttonOffset: new AMap.Pixel(10, 20), // ????????????????????????????????????????????????????????????Pixel(10, 20)
            showMarker: true, // ???????????????????????????????????????????????????????????????true
            showCircle: true, // ????????????????????????????????????????????????????????????true
            panToLocation: true, // ?????????????????????????????????????????????????????????????????????true
            zoomToAccuracy: true // ????????????????????????????????????????????????????????????????????????????????????????????????false
          });
          mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete); // ??????????????????
          AMap.event.addListener(geolocation, "error", onError); // ????????????????????????
        });

        function onComplete(obj) {
          console.log("objjjjj", obj);
          // var res =
          //   "????????????" +
          //   obj.position +
          //   "\n???????????????" +
          //   obj.accuracy +
          //   "???\n????????????????????????" +
          //   obj.location_type +
          //   "\n???????????????" +
          //   obj.info +
          //   "\n?????????" +
          //   obj.formattedAddress +
          //   "\n???????????????" +
          //   JSON.stringify(obj.addressComponent, null, 4);
          //alert(JSON.stringify(obj.addressComponent, null, 4));
          var position = obj.position.toString().split(",");
          that.point = {
            lat: position[1],
            lng: position[0]
          };
          that.address = obj.formattedAddress;
          that.title = obj.formattedAddress;
          that.city = !that.fun.isTextEmpty(obj.addressComponent.city)
            ? obj.addressComponent.city
            : obj.addressComponent.province;

          var pos = {
            address: obj.formattedAddress,
            city: that.city,
            title: obj.formattedAddress,
            point: that.point
          };
          console.log("test pos", pos);
          that.$store.commit("updateLocation", pos);
          that.$store.commit("setLocation", pos);
        }

        function onError(obj) {
          Toast("????????????,?????????????????????");
        }
      }
    },
    //????????????????????????
    getShareData(data) {
      this.shareInfo = data;
      this.initShare(); //?????????????????????
    },

    //?????????????????????
    initShare() {
      // let page_id = this.fun.isTextEmpty(this.fun.getKey("page_id"))? this.$route.params.page_id: this.fun.getKey("page_id");
      // console.log("page_id=====", page_id);
      let that = this;
      let _url = document.location.href;
      let json = {
        url: _url,
        mid: this.fun.getKeyByMid(),
        page_id: this.fun.getKey("page_id")
      };
      $http.post("member.member.wxJsSdkConfig", json).then(
        function(response) {
          if (response.result == 1) {
            //console.log("????????????wxJsSdkConfig",response.data);
            if (response.data.config) {
              that.share(response.data);
            }
          }
        },
        function(response) {
          console.log("??????", response);
        }
      );
    },

    //??????????????????
    share(data) {
      let that = this;
      data.config.openTagList = ["wx-open-launch-weapp"];
      wx.config(data.config);
      wx.ready(function() {

        //that.shareInfo.page_title????????????????????????     data.shop.share.title????????????
        let _title = that.shareInfo.page_title ? that.shareInfo.page_title : data.shop.share.title;
        let _imgUrl = that.shareInfo.page_icon ? that.shareInfo.page_icon : data.shop.share.icon;
        let _desc = that.shareInfo.page_description ? that.shareInfo.page_description : data.shop.share.desc;
        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);

        wx.showOptionMenu();

        wx.onMenuShareTimeline({
          title: _title, // ????????????
          link: _link, // ????????????
          imgUrl: _imgUrl, // ????????????
          success: function() {
            Toast("????????????");
          },
          cancel: function() {
            Toast("????????????");
          }
        });

        wx.onMenuShareAppMessage({
          title: _title, // ????????????
          desc: _desc, // ????????????
          link: _link, // ????????????
          imgUrl: _imgUrl, // ????????????
          type: "link", // ????????????,music???video???link??????????????????link
          dataUrl: "", // ??????type???music???video??????????????????????????????????????????
          success: function() {
            Toast("????????????");
          },
          cancel: function() {
            Toast("????????????");
          }
        });
      });
    },

    turnFullTo() {
      if (this.full_screen.h_url) {
        if (this.full_screen.h_url !== window.location.href) {
          window.location.href = this.full_screen.h_url;
        }
      }
    },
    turnTo() {
      if (this.advertising.h_url) {
        if (this.advertising.h_url === window.location.href) {
          this.popShow = false;
        } else {
          window.location.href = this.advertising.h_url;
        }
      }
    },
    close() {
      this.fullShow = false;
    },
    closePop() {
      this.popShow = false;
    },
    countDown(num) {
      this.full_screen.show_time = num;
      --num;
      setTimeout(() => {
        if (num <= 0) {
          this.fullShow = false;
          // this.$route.meta.foot = false;
          // this.$emit("changeFoot", this.$route.meta.foot);
        } else {
          this.countDown(num);
        }
      }, 1000);
    }
  },
  components: {
    U_article,
    U_backup,
    U_blank,
    U_button,
    U_community,
    U_coupons,
    U_cube,
    U_form,
    U_goods,
    U_goodsgroup,
    U_goodsnearby,
    U_goodsrush,
    U_headline,
    U_line,
    U_livestreaming,
    U_location,
    U_lottery,
    U_maps,
    U_memberasset,
    U_membermarket,
    U_membermerchant,
    U_memberorder,
    U_memberrights,
    U_membertool,
    U_membertop,
    U_notice,
    U_richtext,
    U_search,
    U_shopfor,
    U_shortvideo,
    U_signin,
    U_simplegraph,
    U_slideshow,
    U_stores,
    U_suspendbutton,
    U_tabcontrol,
    U_title,
    U_video,
    top_navigation,
    U_foot,
    U_stargroup
  }
};
