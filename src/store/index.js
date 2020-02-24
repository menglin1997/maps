/*
 * @Desc: ---   ----
 * @Date: 2019-06-20 11:48:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-17 09:28:13
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import router from './../router'
import {
  qryDeviceInfo,
  randomFreeBoxInfo,
  qryBoxInfo,
  againChoice
} from '@/api/mine'

Vue.use(Vuex)

const state = {
  boxsdesc: [],
  onebox: [],
  selectbox: [],
  typeoboxs: [],
  boxtypenumber: null,
  // useropenid: 'oohxq1rLakf1un5_-0tURK9ndqQM',
  useropenid: null,
  userInfo: null,
  // ime: '2019042716535246',
  ime: null,
  orderinfo: null,
  Member: null,
  password: {
    phone: null,
    pass: null
  },
  IsDepositTel: false,
  IsDeposit: 'N',
  Deposit: 0,
  BoxCode: '',
  twofree: false, // 前俩小时是否免费
  price: null // 结算订单使用的价格
}
const mutations = {
  // 设置某个设备的所有信息
  SET_BOXS_TYPE(state, boxsdesc) {
    state.boxsdesc = boxsdesc
  },
  // 设置准备下单的箱子
  SET_ONE_BOX(state, boxinfo) {
    state.onebox = boxinfo
  },
  // 刚进入时随机到的箱子
  SET_SELECT_BOX(state, selectbox) {
    state.selectbox = selectbox
  },
  // 设置某个类型所有箱子
  SET_TYPE_BOXS(state, typeoboxs) {
    state.typeoboxs = typeoboxs
  },
  // 设置用户OPENID
  SET_USER_OPENID(state, useropenid) {
    state.useropenid = useropenid
  },
  // 设置用户信息
  SET_USER_userInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_USER_IME(state, ime) {
    state.ime = ime
  },
  SET_ORDER_INFO(state, order) {
    state.orderinfo = order
  },
  // 是否为管理员
  SET_MEMBER_INFO(state, Member) {
    state.Member = Member
  },
  SET_MEMBER_PASSWORD(state, password) {
    state.password = password
  },
  // 设置是否支持存手机
  SET_MEMBER_ISDEPOSITEL(state, IsDepositTel) {
    state.IsDepositTel = IsDepositTel
  },
  // 是否需要押金
  SET_MEMBER_ISDEPOSIT(state, IsDeposit) {
    state.IsDeposit = IsDeposit
  },
  // 押金价格
  SET_MEMBER_DEPOSIT(state, Deposit) {
    state.Deposit = Deposit
  },
  // 箱子编号
  SET_BOX_CODE(state, BoxCode) {
    state.BoxCode = BoxCode
  },
  SET_BOXTYPE_NUMBER(state, number) {
    state.boxtypenumber = number
  },
  SET_TWO_FREE(state, isfress) {
    state.twofree = !!isfress
  },
  SET_ORDER_PRICE(state, price) {
    state.price = price
  }
}
const actions = {
  // 获取当前设备设备信息
  setboxtype({ commit }, ime) {
    qryDeviceInfo({
      identity: ime
    }).then(res => {
      commit('SET_BOXS_TYPE', res)
    })
  },
  setonebox({ commit }, onebox) {
    commit('SET_ONE_BOX', onebox)
  },
  // 重新选择箱子
  EdutSeleBox({ commit }, boxsinfo) {
    againChoice({
      oldBoxId: boxsinfo.onebox.BoxId,
      newBoxId: boxsinfo.selectbox.BoxId,
      openId: boxsinfo.openId
    }).then(res => {
      commit('SET_ONE_BOX', boxsinfo.selectbox)
    })
  },
  // 随机获取一个箱子
  getfreexob({ commit }, boxitem) {
    commit('SET_SELECT_BOX', boxitem)
    randomFreeBoxInfo({
      identity: boxitem.ime,
      typeNo: boxitem.Type || '1',
      openId: boxitem.openId,
      isMember: boxitem.isMember === 'Y' ? 'Y' : 'N'
    }).then(res => {
      console.log(res)
      if (res) {
        commit('SET_ONE_BOX', res)
      } else {
        router.back()
      }
    })
  },
  // 获取某一类型的所有箱子
  gettypeboxs({ commit }, onebox) {
    qryBoxInfo({
      dId: onebox.DId,
      pageIndex: 1,
      pageSize: 999,
      typeNo: onebox.TypeNo,
      isMember: onebox.Member === 'Y' ? 'Y' : 'N'
    }).then(res => {
      commit('SET_TYPE_BOXS', res.LsList)
    })
  },
  // 设置用户OPENID
  setuseropenid({ commit }, useropenid) {
    commit('SET_USER_OPENID', useropenid)
  },
  // 设置用户信息
  setuserInfo({ commit }, userInfo) {
    commit('SET_USER_userInfo', userInfo)
  },
  // 设置设备号
  setIME({ commit }, IME) {
    commit('SET_USER_IME', IME)
  },
  // 设置订单
  setorderinfo({ commit }, order) {
    console.log(order)
    commit('SET_ORDER_INFO', order)
  },
  // 设置是否为管理员
  setMember({ commit }, Member) {
    commit('SET_MEMBER_INFO', Member)
  },
  // 设备支持手机设置密码
  setpassword({ commit }, password) {
    commit('SET_MEMBER_PASSWORD', password)
  },
  // 设备支持手机设置密码
  IsDepositTel({ commit }, IsDepositTel) {
    commit('SET_MEMBER_ISDEPOSITEL', IsDepositTel)
  },
  // 设备是否需要押金
  IsDeposit({ commit }, IsDeposit) {
    commit('SET_MEMBER_ISDEPOSIT', IsDeposit)
  },
  // 设置押金价格
  Deposit({ commit }, Deposit) {
    commit('SET_MEMBER_DEPOSIT', Deposit)
  },
  setBoxCode({ commit }, BoxCode) {
    commit('SET_BOX_CODE', BoxCode)
  },
  setboxtypenumber({ commit }, number) {
    commit('SET_BOXTYPE_NUMBER', number)
  },
  // 前两小时是否免费
  TwoIsFree({ commit }, isfree) {
    commit('SET_TWO_FREE', isfree)
  },
  /**
   * desc 结算订单显示的价格
   * author wxw
   * time 2019年10月17日 09:25:11 星期四
   */
  setorderprice({ commit }, price) {
    commit('SET_ORDER_PRICE', price)
  }
}
const getters = {
  boxsdesc: state => state.boxsdesc,
  onebox: state => state.onebox,
  selectbox: state => state.selectbox,
  typeoboxs: state => state.typeoboxs,
  useropenid: state => state.useropenid,
  userInfo: state => state.userInfo,
  ime: state => state.ime,
  orderinfo: state => state.orderinfo,
  Member: state => state.Member,
  phone: state => state.phone,
  password: state => state.password,
  IsDepositTel: state => state.IsDepositTel,
  IsDeposit: state => state.IsDeposit,
  Deposit: state => state.Deposit,
  BoxCode: state => state.BoxCode,
  boxtypenumber: state => state.boxtypenumber,
  twofree: state => state.twofree,
  price: state => state.price
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
