<template>
    <div class="recommend-page">
        <el-drawer
            title="上传热门歌曲!"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="ltr"
            custom-class="drawer"
            ref="drawer"
            size="50%"
        >
            <div class="drawer-content">
                <el-form :model="form">
                    <el-form-item label="歌曲名称" :label-width="formLabelWidth">
                        <el-input v-model="form.musicName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="歌手名称" :label-width="formLabelWidth">
                        <el-input v-model="form.musicSinger" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-upload
                        class="upload-demo"
                        action="/uploadfiles"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="text"
                    >
                        
                    </el-upload>
                </el-row>
                <div class="demo-drawer__footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="$refs.drawer.closeDrawer()"
                        :loading="loading"
                    >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>

        <el-button @click="dialog = true" type="primary">上传歌曲</el-button>
        <el-table :data="recommend" style="width: 100%" max-height="500">
            <el-table-column fixed prop="id" align="center" label="id" width="80"></el-table-column>
            <el-table-column prop="musicName" align="center" label="歌曲名称"></el-table-column>
            <el-table-column prop="musicSinger" align="center" label="歌手"></el-table-column>
            <el-table-column prop="img" align="center" label="图">
                <template slot-scope="scope">
                    <img :src=" scope.row.singerImg" min-width="70" height="70" />
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click.native="del(scope)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            table: false,
            dialog: false,
            loading: false,
            fileList: [
                {
                    name: "food.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "food2.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ],
            form: {
                musicName: "",
                musicSinger: ""
            },
            formLabelWidth: "80px"
        };
    },
    computed: {
        recommend() {
            if (this.$store.state.recommend.length === 0) return;
            let _arr = [];

            this.$store.state.recommend.forEach((item, index) => {
                let albumObj = {};
                _arr.push(albumObj);
                albumObj.id = index + 1;
                albumObj.musicName = item.musicName;
                albumObj.musicSinger = item.musicSinger;
                albumObj.singerImg = item.singerImg;
            });
            return _arr;
        }
    },
    methods: {
        handleClose(done) {
            this.loading = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        del(scope) {}
    },
    created() {
        this.$store.dispatch("GETMUSIC", {
            type: "recommend"
        });
    }
};
</script>

<style scoped lang='stylus'>
.recommend-page {
    width: 100%;
    padding: 10px;

    .el-table {
        margin-top: 10px;
        border: 1px solid #EBEEF5;
    }
}

.drawer-content {
    padding : 0 30px;
}
</style>