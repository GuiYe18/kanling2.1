<template>
  <div id="balance_recharge">
    <c-title :hide="false" text="推广余额转赠"></c-title>
    <div style="height: 50px"></div>
    <!-- 优化 -->
    <div class="content">
      <ul class="transfer_info">
        <li class="info_a">
          <span>当前推广余额</span>
          <span>{{ credit1 }}</span>
        </li>
        
        <!-- <li class="info_b">
          <span>转让人UID：</span>
          <input type="text" v-model.lazy="transfer_id" placeholder="请输入转让人UID" />
        </li> -->

        <li class="info_b">
          <span>被转让人手机号：</span>
          <input type="text" v-model.lazy="mobile" placeholder="请输入被转让人手机号" />
        </li>

      </ul>
      <div class="transfer_sum">
        <span>转赠金额</span>
        <div class="sum">
          <input type="text" v-model="info_form.transfer_point" placeholder="0.00" />
        </div>
      </div>
      <ul class="personal_info" v-if="memberInfo.nickname != ''">
        <li>
          <span>昵称：</span>
          <span>{{ memberInfo.nickname }}</span>
        </li>
        <li>
          <span>姓名：</span>
          <span>{{ memberInfo.realname }}</span>
        </li>
      </ul>
      <button type="button" class="btn custom_color" @click="confirm">确认转账</button>
      <p class="notes">
        注：转赠推广余额不能小于0, 且为整数。<br />
          推广余额不可变成现金
        <!-- 转让手续费比率为{{ rate * 100 }}%，<br />
        您实际转账到数为：{{ info_form.transfer_point - info_form.transfer_point * rate }} -->
      </p>
    </div>
  </div>
</template>
<script>
import cTitle from "components/title";
import { Toast } from "vant";
export default {
  data() {
    return {
      credit1: "0.00",

      toi: this.fun.getKeyByI(),
      balance: 0,
      info_form: {
        transfer_id: "",
        transfer_point: ""
      },
      transfer_id: "",
      integral: window.localStorage.integral,
      rate: 0, // 积分比率
      mobile: "", //被转让人手机号
      memberInfo: {
        nickname: "",
        realname: ""
      }
    };
  },
  watch: {
    transfer_id: function (N, O) {
      if (N == "") {
        this.memberInfo.nickname = "";
      } else {
        var that = this;
        $http
          .get(
            "member.member.memberInfo",
            {
              i: this.fun.getKeyByI(),
              type: this.fun.getTyep(),
              uid: this.transfer_id
            },
            "获取用户中"
          )
          .then(
            function (response) {
              if (response.result === 1) {
                that.$nextTick(() => {
                  that.memberInfo.nickname = response.data.nickname;
                  that.memberInfo.realname = response.data.realname;
                });
              }
            },
            function (response) {
              console.log(response);
            }
          );
      }
    }
  },
  methods: {
    //   初始化数据
    initData() {
      this.credit1 = "0.00";
      this.info_form.transfer_point = "";
    },

    getIntegral() {
      var that = this;
      $http
        .post("member.member.member-data", { v: 3 }, " ")
        .then(response => {
          if (response.result === 1) {
            that.credit1 = response.data.member.tgmoney;
          }
        })
        .catch(err => {
          console.error(err);
          require("@/assets/css/member/02.scss");
        });
    },
    // 确认转账
    confirm() {
      var that = this;
      if (parseFloat(this.info_form.transfer_point) > parseFloat(this.credit1)) {
        that.$dialog.alert({ message: "转让积分不可大于您的积分" });
        return;
      }
    //   if (this.transfer_id == undefined || this.transfer_id <= 0 || this.transfer_id.length == 0) {
    //     that.$dialog.alert({ message: "转让UID不可为空" });
    //     return;
    //   }
      if (this.info_form.transfer_point == undefined || this.info_form.transfer_point <= 0 || this.info_form.length == 0) {
        that.$dialog.alert({ message: "转赠金额可低于0元" });
        return;
      }
      if (this.mobile == 0) {
        that.$dialog.alert({ message: "转让人手机号不能为空" });
        return;
      }

      var that = this;
      const url = "https://tpkl.minpinyouxuan.com/index.php/api/v3/turnmoney";
      axios({
        method: "POST",
        url,
        data: {
          uid: JSON.parse(localStorage.getItem("tempIndex")).memberinfo.uid, //uid
          mobile: this.mobile, //手机号
          tgmoney: this.info_form.transfer_point //金额
        }
      }).then(async res => {
        console.log("少时诵诗书所所所所所所所所", res.data);
        if (res.data.result === 1) {
          that.$dialog.alert({ message: "转赠成功" }).then(() => {
            that.$router.go(-1);
          });
        } else {
          Toast(res.data.msg);
        }
      });

      return;
      $http
        .get(
          "finance.point-transfer.index",
          {
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep(),
            recipient: this.transfer_id,
            transfer_point: this.info_form.transfer_point
          },
          " "
        )
        .then(
          function (response) {
            if (response.result == 1) {
              that.$dialog.alert({ message: response.msg }).then(() => {
                that.$router.go(-1);
              });
            } else {
              that.$dialog.alert({ message: response.msg });
            }
          },
          function (response) {
            // error callback
          }
        );
    }
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.initData(); // 初始化数据
    this.getIntegral(); // 获取当前推广余额
    this.fun.setWXTitle("推广余额转赠");
  },

  components: { cTitle }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge {
  .content {
    .transfer_info {
      background: #fff;
      padding-left: 0.875rem;
      font-size: 16px;

      .info_a,
      .info_b {
        line-height: 2.875rem;
        border-bottom: solid 0.0625rem #ebebeb;
        display: flex;
        justify-content: flex-start;

        span:first-child {
          width: 8.875rem;
          display: block;
          text-align: left;
        }

        input {
          border: none;
          width: 15.625rem;
        }
      }
    }

    .transfer_sum {
      background: #fff;
      padding: 0.625rem 0.875rem;

      span {
        display: block;
        font-size: 16px;
        line-height: 2.5rem;
        text-align: left;
      }

      .sum {
        text-align: left;
        font-size: 24px;

        input {
          margin-left: 0.375rem;
          line-height: 3.75rem;
          width: 90%;
          font-size: 36px;
          border: none;
        }
      }
    }
    .personal_info {
      margin-top: 0.625rem;
      background: #fff;
      padding-left: 0.875rem;

      li {
        line-height: 2.875rem;
        display: flex;
        font-size: 16px;
        border-bottom: solid 0.0625rem #ebebeb;
        text-align: left;

        span:first-child {
          display: block;
          width: 6.875rem;
        }
      }

      li:last-child {
        border: none;
      }
    }

    .btn {
      width: 21.5625rem;
      margin: 1.25rem auto;
      height: 2.875rem;
      border-radius: 0.25rem;
      font-size: 16px;
      color: #fff;
      background: #f15353;
      border: none;
    }

    .notes {
      color: #8c8c8c;
      line-height: 1.125rem;
    }
  }

  .my_wrapper {
    background: #fff;
    overflow: hidden;
    display: flex;
    padding: 0 0.875rem;
    line-height: 2.875rem;

    span {
      width: 80px;
      text-align: left;
      font-size: 16px;

      /* line-height: 1; */
    }

    .my-value {
      flex: 2;
      text-align: left;

      span {
        color: #f15353;
      }
    }
  }

  #wrapper {
    margin-top: 0.625rem;
  }
}
</style>
