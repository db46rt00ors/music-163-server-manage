<template>
    <div id="app"  v-height>
        <el-row>
            <el-row class="header">
                <el-col :span="4">
                    <div class="logo">LOGO</div>
                </el-col>
                <el-col :span="20">
                    <div class="header-content">xxxx管理系统</div>
                </el-col>
            </el-row>
            <el-row class="content">
                <el-col :span="4" class="nav">
                    <el-col
                        class="navlist"
                        v-for="(item, index) of navlist"
                        :key="index"
                        v-on:click.native="routerGo(item.url)"
                    >{{item.title}}</el-col>
                </el-col>
                <el-col :span="20" class="router-view">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navlist: [
                {
                    title: "专辑",
                    url: "/album"
                },{
                    title: "热门歌曲",
                    url: "/recommend"
                },
                {
                    title: "上传信息",
                    url: "/upload"
                }
            ]
        };
    },
    methods: {
        routerGo(url) {
            this.$router.push({ path: url });
        }
    }
};
</script>
<style lang='stylus' scoped>
#app{
    overflow hidden
}
.content {
    .nav {
        height: calc(100vh - 50px);
        background-color: #409EFF;
    }

    .navlist:first-child {
        border-top: none;
    }

    .navlist {
        height: 50px;
        color: #fff;
        line-height: 50px;
        padding-left: 20px;
        border-top: 1px solid #fff;
        cursor: pointer;
    }

    .router-view {
        height: calc(100vh - 50px);
    }
}

.header {
    height: 50px;
    background-color: #0c6bce;
    color: #fff;
    line-height: 50px;

    .logo {
        padding-left: 20px;
    }

    .header-content {
        text-align: center;
    }
}
</style>
