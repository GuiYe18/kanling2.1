<!--
 * @Author: 飞
 * @Date: 2021-06-23 13:53:51
 * @LastEditTime: 2021-09-28 13:28:50
 * @FilePath: \you-shop1\src\views\kick\ListOfMyDonations.vue
 * @Describe: 
-->
<template>
  <section class="content">
    <c-title :hide="false" text="我的捐赠"></c-title>
    <!-- 
     /**
      * @Author: 飞
      * @Date: 2021-06-23 14:15:19
      * @Describe: 商品数量
      */        
     -->
    <section id="release-goods">
      <div class="release-a">
        <van-icon class="iconfont icon-block" style="transform: translateY(2px)" color="#f15353" size="1.5rem"></van-icon>
      </div>
      <span>商品数量：{{ count }}</span>

      <!-- <div class="release-b" @click="routeTake()">
        <span>发布商品</span>
      </div> -->
    </section>
    <!-- 
     /**
      * @Author: 飞
      * @Date: 2021-06-23 14:15:33
      * @Describe: 捐赠列表
      */        
     -->
    <section id="goods-list">
      <div class="goods-list" v-for="(item, index) in commodity_data" :key="index">
        <div class="goods-a">
          <img style="width: 100%; height: 100%" :src="`https://kl.minpinyouxuan.com/static/upload/` + item.thumb" />
        </div>
        <ul class="goods-b">
          <li class="name">
            <div class="van-multi-ellipsis--l2" style="display: -webkit-inline-box; width: 80%">
              {{ item.title | escapeTitle }}
            </div>
            <p v-if="type === 'store' && goods_audit != 1" :class="item.status === 0 ? 'red' : 'gray'" @click.stop="changeGoodsStatus(item, index)">
              <span>点击</span>{{ item.status === 0 ? "上架" : "下架" }}
            </p>
            <p v-if="type !== 'store' && goods_audit != 1" :class="item.status === 1 ? 'red' : 'gray'" @click.stop="changeGoodsStatus(item, index)">{{ item.status === 1 ? "上架" : "下架" }}</p>
          </li>

          <li class="status" v-if="type === 'store'" :class="item.status === 1 ? 'red' : 'gray'">状态：{{ item.status === 1 ? "上架" : "下架" }}</li>
          <li class="price">
            <span>{{ $i18n.t("money") }}</span
            >{{ item.price }}
          </li>
          <li class="info">
            <font>库存：{{ item.stock }}</font>
            <font>销量：{{ item.virtual_sales ? item.virtual_sales + item.real_sales : item.real_sales }}</font>

            <!-- 编辑删除 -->
            <div class="more">
              <ul>
                <li @click="editJumpEvent(index)">
                  <span>编辑</span>
                </li>
                <li @click="commodityDelete(index)">
                  <span>删除</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      commodity_data: [], //捐赠商品列表
      count: "", //商品个数
      page: "" //第几页
    };
  },
  activated() {
    //   获取捐赠列表
    this.GetAListOfDonations();
  },
  methods: {
    /**
     * @Author: 飞
     * @Date: 2021-06-23 17:22:32
     * @Describe: 上下架
     */
    changeGoodsStatus() {},
    /**
     * @Author: 飞
     * @Date: 2021-06-23 15:33:06
     * @Describe: 商品编辑
     */
    editJumpEvent(index) {
      /**
       * @Author: 飞
       * @Date: 2021-06-24 16:27:43
       * @Describe: 功能正在开发中
       */
      // Toast("功能正在开发中");
      this.$router.push(
        this.fun.getUrl(
          "EditProduct",
          {},
          {
            id: this.commodity_data[index].id, //把商品的id 传给编辑（发布）
            page: this.page //第几页
          }
        )
      );
    },
    /**
     * @Author: 飞
     * @Date: 2021-06-23 15:33:18
     * @Describe: 商品删除
     */
    commodityDelete(index) {
      console.log("商品删除", index);
      this.$dialog
        .confirm({
          title: "提示",
          message: "此操作将永久删除该商品, 是否继续?"
        })
        .then(() => {
          var that = this;
          var urls = "";
          var json = {};

          urls = "plugin.supplier.frontend.goods.del-goods";
          json = {
            goods_id: that.commodity_data[index].id
          };

          $http.post(urls, json, "加载中...").then(function (response) {
            console.log("显示", response);
            if (response.result === 1) {
              that.$notify({
                background: "#f0f9eb",
                message: "商品删除成功",
                color: "#67c23a"
              });
              // 删除最后一个
              that.commodity_data.splice(index, 1);
              // 捐赠个数减少
              that.count = Number(that.count) - 1;
            } else {
              // that.$message.error(response.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
          this.$notify({
            background: "#edf2fc",
            message: "已取消删除",
            color: "#909399"
          });
        });
    },

    /**
     * @Author: 飞
     * @Date: 2021-06-23 14:56:13
     * @Describe:获取捐赠列表
     */
    GetAListOfDonations() {
      var that = this;
      axios({
        method: "post",
        url: "https://tpkl.minpinyouxuan.com/index.php/api/v2/goods_list",
        data: {
          page: that.page,
          uid: that.$route.query.uid
        }
      })
        .then(response => {
          if (response.data.result == 1) {
            console.log("response", response);
            that.count = response.data.data.count;
            that.commodity_data = response.data.data.lists;
          }
          if (response.data.result == 0) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  /**
   * @Author: 飞
   * @Date: 2021-06-23 14:02:13
   * @Describe: 捐赠商品个数
   */
  padding-top: 40px;
  /**
   * @Author: 飞
   * @Date: 2021-06-23 14:38:28
   * @Describe: 捐赠列表
   */
  #goods-list {
    .goods-list {
      background-color: #fff;
      padding: 0.625rem 0;
      display: flex;
      border-bottom: solid 0.0625rem #ebebeb;

      .goods-a {
        width: 6rem;
        height: 6rem;
        background-color: #ccc;
        margin-left: 0.625rem;
      }

      .goods-b {
        margin: 0 0.875rem;
        width: 16.0625rem;
        text-align: left;
        line-height: 1.25rem;

        .status {
          font-size: 10px;
        }

        .red {
          color: #f15353;
        }

        .gray {
          color: #8c8c8c;
        }

        .name {
          height: 2.5rem;
          font-size: 14px;

          p {
            float: right;
            padding: 0.1rem 0.4rem;
            color: #fff;
            font-size: 12px;
            border-radius: 0.5rem;
          }

          .red {
            background: #f15353;
            border: 1px solid #f15353;
          }

          .gray {
            background: #8c8c8c;
            border: 1px solid #8c8c8c;
          }
        }

        .price {
          color: #f15353;
          font-size: 16px;

          span {
            font-size: 12px;
          }
        }

        .info {
          position: relative;
          color: #8c8c8c;
          font-size: 12px;

          font {
            margin-right: 1.25rem;
          }

          .icon-more {
            position: absolute;
            right: 0;
            z-index: 2;
          }

          .more {
            border-radius: 0.25rem;
            color: #f0f0f0;
            width: 5.5rem;
            position: absolute;
            right: 0;
            top: -6px;

            ul {
              display: flex;
              justify-content: center;

              li {
                flex: 1;
                text-align: center;
                width: 37px;
                height: 24px;
                line-height: 24px;
                background: #f15353;
                border-radius: 9px;
              }
              li:nth-child(2) {
                background: #8b8c8d;
                margin-left: 6px;
              }
            }
          }
        }
      }
    }

    .goods-list:last-child {
      border: none;
    }
  }
  #release-goods {
    background-color: #fff;
    display: flex;
    font-size: 16px;
    position: relative;
    height: 3rem;
    line-height: 3rem;
    border-bottom: solid 0.0625rem #ebebeb;

    .release-a {
      width: 3rem;
      height: 3rem;
    }

    // .release-b {
    //   position: absolute;
    //   right: 0.875rem;
    //   top: 0.6875rem;
    //   font-size: 14px;
    //   background-color: #f15353;
    //   height: 1.625rem;
    //   line-height: 1.625rem;
    //   padding: 0 0.625rem;
    //   display: block;
    //   border-radius: 0.8125rem;
    //   color: #fff;
    // }
  }
}
</style>