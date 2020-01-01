// views/detail/detail.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    windowHeight: app.globalData.windowHeight,
    navbarHeight: app.globalData.customNavBarHeight,

    keyBoardHeight: 0, // 键盘的高度
    loadProgress: 0, // 进度条进度值

    SCROLLTOP: 80, // 标题距离多远时浮动

    isTitleHidden: true, // 是否显示标题  false 渲染，true 不渲染
    isCommentLoad: true, // 是否可以继续加载评论条数
    isBottomBarHidden: false, //是否显示隐藏底部操作栏
    isCommentBarHidden: true, // 是否显示评论栏
    isEmoPanel: true, // 是否显示表情面板

    tCommentBarInstance: null
  },
  onLoad() {

    this.loadProgress();

    this.data.tCommentBarInstance = this.selectComponent("#t-commentbar");

  },
  // 顶部滚动条 的显示与隐藏
  loadProgress() {

    this.setData({
      loadProgress: this.data.loadProgress + 3
    });

    if (this.data.loadProgress >= 100) {
      // 回复默认值
      this.setData({
        loadProgress: 0
      });

    }else {
      // 利用计时器 做 计时
      setTimeout(() => {
        // 递归回调
        this.loadProgress();

      },100);
    }

  },
  // 滚动一定值后 显示/隐藏 title
  bodyScroll(e) {

    let flage = !(e.detail.scrollTop > this.data.SCROLLTOP);

    if (flage !== this.data.isHidden) {

      this.setData({

        isHidden: !this.data.isHidden

      });
    }

  },
  // 滚动到底部继续加载评论列表
  bindScrollToLower(e) {

    console.log("继续加载评论....");

  },

  // 点击了屏幕其他位置  还原状态
  handlerClickPage(e) {

    console.log("clickPage...");

    this.setData({
      isBottomBarHidden: false,
      isCommentBarHidden: true,
      isEmoPanel: true
    });

    // 还原 tCommentBar 数据状态
    this.data.tCommentBarInstance.initParamsMethod();

  },

  // t-bottombar 点击了输入框 隐藏当前，显示 t-commentbar
  dispalyCommentbar() {

    this.setData({
      isBottomBarHidden: !this.data.isBottomBarHidden,
      isCommentBarHidden: !this.data.isCommentBarHidden
    });

    // 让 t-commentbar 获取焦点 弹起键盘
    this.data.tCommentBarInstance.getSetInputFocus();

  },
  // 显示 t-bottombar 隐藏 t-commentbar
  dispalyBottombar() {

    this.setData({
      isCommentBarHidden: true,
      isBottomBarHidden: false
    });

  },
  // 隐藏表情面板
  hiddenEmojiPanel() {

    //隐藏键盘面板
    this.setData({

      isEmoPanel: !this.data.isEmoPanel // 隐藏表情面板

    });

  },
  // 唤醒表情面板
  dispalyEmojiPanel(e) {

    //1.获取键盘的高度
    if (!this.data.keyBoardHeight) {
      this.data.keyBoardHeight = e.detail.keyBoardHeight;
    }

    //2.拉起表情面板，隐藏键盘面板
    this.setData({
      panelHeight: this.data.keyBoardHeight,  // 面板高度
      isEmoPanel: !this.data.isEmoPanel // 显示表情面板
    });
  }
});