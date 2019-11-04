<template>
    <div class="album-content" v-height='50'>
        <el-table :data="album" style="width: 100%">
            <el-table-column align='center' type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="专辑名称">
                            <span>{{ props.row.albumTitle }}</span>
                        </el-form-item>
                        <el-form-item label="演唱者">
                            <span>{{ props.row.albumSinger }}</span>
                        </el-form-item>
                        <el-form-item label="歌曲名称">
                            <p
                                v-for="(item, index) in props.row.albumList"
                                :key="index"
                                class="musicList"
                            >{{index+1 }} -- {{item.musicName }}</p>
                        </el-form-item>
                        <el-form-item label="专辑图片">
                            <img :src="props.row.albumImg" alt />
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column align='center' label="序号" prop="id"></el-table-column>
            <el-table-column align='center' label="专辑名称" prop="albumTitle"></el-table-column>
            <el-table-column align='center' label="演唱者" prop="albumSinger"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        album() {
            if (this.$store.state.album.length === 0) return;
            let _arr = [];

            this.$store.state.album.forEach((item, index) => {
                let albumObj = {};
                _arr.push(albumObj);
                albumObj.id = index + 1;
                albumObj.albumTitle = item.albumTitle;
                albumObj.albumSinger = item.albumSinger;
                albumObj.albumList = item.albumList;
                albumObj.albumImg = item.albumImg;
            });

            return _arr;
        }
    },
    created() {
        this.$store.dispatch("GETMUSIC",{
            type: 'album'
        });
    },
    methods: {
        del(scope) {}
    }
};
</script>

<style scoped >
.album-content{
  overflow-y: scroll;
  padding-bottom: 50px
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.demo-table-expand .el-form-item img {
  display: block;width:200px;
}
</style>