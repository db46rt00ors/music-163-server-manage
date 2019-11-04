<template>
    <el-row class="content">
        <el-row class="title">上传信息</el-row>
        <el-row class="form-content">
            <el-col :span="6">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="姓名" prop="xingming">
                        <el-input v-model="ruleForm.xingming"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="xingbie">
                        <el-radio-group v-model="ruleForm.xingbie">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份证" prop="shenfenzheng">
                        <el-input v-model="ruleForm.shenfenzheng"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" prop="xuehao">
                        <el-input v-model="ruleForm.xuehao"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="banji">
                        <el-select v-model="ruleForm.banji" placeholder="请选择班级">
                            <el-option label="全栈-6-1905A" value="1905A"></el-option>
                            <el-option label="全栈-6-1906A" value="1906A"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期" prop="xueqi">
                        <el-select v-model="ruleForm.xueqi" placeholder="请选择班级">
                            <el-option label="全栈-6-P1" value="P1"></el-option>
                            <el-option label="全栈-6-P2" value="P2"></el-option>
                            <el-option label="全栈-6-P3" value="P3"></el-option>
                            <el-option label="全栈-6-P4" value="P4"></el-option>
                            <el-option label="全栈-6-P5" value="P5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="末班" prop="moban">
                        <el-switch v-model="ruleForm.moban"></el-switch>
                    </el-form-item>
                </el-form>
                <el-progress :percentage="(~~percent)" v-show="percent > 0"></el-progress>
                <el-upload
                    v-loading="$store.state.isloading"
                    class="avatar-uploader"
                    action="/api/img"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-progress="progress"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>

        <el-button
            type="primary"
            :disabled="$store.state.isloading"
            @click="submitForm('ruleForm')"
        >提交</el-button>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: "",
            percent: 0,
            lock: false,
            ruleForm: {
                xingming: "",
                xingbie: "",
                shenfenzheng: "",
                xuehao: "",
                banji: "",
                xueqi: "",
                moban: false,
                imageUrl: ""
            },
            rules: {
                xingming: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 5,
                        message: "长度在 2 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                xingbie: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "change"
                    }
                ],
                shenfenzheng: [
                    {
                        required: true,
                        message: "请填写身份证号",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        // max: 1,
                        message: "长度18字符",
                        trigger: "blur"
                    }
                ],
                xuehao: [
                    {
                        required: true,
                        message: "请填写学号",
                        trigger: "blur"
                    },
                    {
                        min: 4,
                        max: 6,
                        message: "长度在 4 到 6 个字符",
                        trigger: "blur"
                    }
                ],
                banji: [
                    { required: true, message: "请选择班级", trigger: "change" }
                ],
                xueqi: [
                    { required: true, message: "请选择学期", trigger: "change" }
                ]
            }
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.ruleForm.imageUrl = res;
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     this.$message.error("上传头像图片只能是 JPG 格式!");
            // }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        cbRouter() {
            this.$router.push({ path: "/list" });
        },
        progress(event, file, fileList) {
            this.percent = event.percent;
            if (event.percent >= 0 && !this.lock) {
                // 显示loading图
                this.$store.commit("isloading", true);
                this.lock = true;
            } 
            if (event.percent >= 99 ) {
                // 隐藏loading图
                this.$store.commit("isloading", false);
                this.lock = false;
            }
            
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit("isloading", true);
                    this.$store.dispatch("ADDSTUDENT", {
                        form: this.ruleForm,
                        // 跳转路由回调函数
                        cb: this.cbRouter
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped lang='stylus'>
.content {
    padding: 50px;

    .title {
        font-size: 26px;
        padding-bottom: 20px;
    }

    .form-content {
        padding: 20px 0;
    }

    >>>.avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    >>>.avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    >>>.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    >>>.avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>