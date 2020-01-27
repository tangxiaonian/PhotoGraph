// views/location/location.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        location: {
            latitude: 32.35317, //纬度
            longitude: 118.17138, //经度
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        wx.getLocation({

            type: 'gcj02',

            isHighAccuracy: true,

            success: (res) => {

                const latitude = res.latitude;
                const longitude = res.longitude;

                console.log(latitude, longitude);

                wx.chooseLocation({
                    latitude,longitude,
                    success:(res) => {
                        console.log(res);
                    }
                });


                this.setData({

                    location: {
                        longitude,
                        latitude
                    }

                });
            }
        });

    }
});