<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal="false"
               :close-on-press-escape="false"
               :modal-append-to-body="false" width="32%" @close="close">
      <div class="form">
        <el-form ref="form" :rules="form_rules" :model="formData" label-width="120px" style="margin:10px;width:auto">
          <el-form-item prop='userName' label="用户名:">
            <el-input type="userName" v-model="formData.userName"></el-input>
          </el-form-item>

          <el-form-item prop='fullName' label="昵称:">
            <el-input type="fullName" v-model="formData.fullName"></el-input>
          </el-form-item>

          <el-form-item prop='workNum' label="职工工号:">
            <el-input type="text" v-model="formData.workNum"></el-input>
          </el-form-item>

          <el-form-item prop='phoneNumber' label="手机号:">
            <el-input type="phoneNumber" v-model="formData.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="formData.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from "axios"

  export default {
    name: "Dialog",
    props: {
      dialog: {
        type: Object,
        default() {
          return {}
        }
      },
      formData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      var validatePhone = (rule, value, callback) => {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(value)) {
          callback(new Error('手机号码必须是11位'));
        } else {
          callback();
        }
      };
      return {
        form_rules: {
          userName: [
            {required: true, message: "用户名不能为空", trigger: "blur"}
          ],
          fullName: [
            {required: true, message: "昵称不能为空", trigger: "blur"}
          ],
          workNum: [
            {required: true, message: "职工工号不能为空！", trigger: "blur"}
          ],
          phoneNumber: [
            {required: true, message: "手机号不能为空！", trigger: "blur"},
            {validator: validatePhone, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            const url = this.dialog.option === "add" ? "api/hr/person/add/v1" : `api/hr/person/edit/v1`
            const message = this.dialog.option === "add" ? "添加成功" : `修改成功`
            axios.post(`/api/${url}`, this.formData).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                  duration: 1000
                })
                this.$emit("update");
              }
            })
          }
        })
      },
      close() {
        this.$refs.form.clearValidate()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
