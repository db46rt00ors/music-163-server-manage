<template>
    <div>
        <el-table
            :data="recommend"
            style="width: 100%"
            max-height="500"
        >
            <el-table-column fixed prop="id" align='center' label="id" width='80'></el-table-column>
            <el-table-column prop="musicName" align='center' label="歌曲名称"  ></el-table-column>
            <el-table-column prop="musicSinger" align='center' label="歌手"  ></el-table-column>
            <el-table-column prop="img" align='center' label="图" >
                <template slot-scope="scope">
                    <img :src=" scope.row.singerImg" min-width="70" height="70" />
                </template>
            </el-table-column>

            <el-table-column align='center' label="操作"  >
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
        return {};
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
        del(scope) {
           
        }
    },
    created() {
        this.$store.dispatch("GETMUSIC",{
            type: 'recommend'
        });
    }
};
</script>

<style>
</style>