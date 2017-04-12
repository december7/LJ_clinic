<template>
    <input ref="input" :value="value" :placeholder="placeholder" :disabled="disabled" :class="" @input="onInput">
</template>

<script>
    // 过滤除了数字和"."之外的输入
    // 过滤第二个"."
    // TODO 过滤0开头的输入
    // .之后只允许 decimals 位数字
    
    export default {
        props: {
            value: {
                type: String | Number,
                default: ''
            },
            decimals: {
                type: Number | String,
                default: 0
            },
            max: {
                type: Number,
                default: -1
            },
            placeholder: {},
            disabled: {},
            class: {}
        },
        methods: {
            onInput: function(event) {
                var i = event.target.value;
                i = i.replace(/[^\d.]/g, '');
                var result = this.format(i, this.decimals);
                event.target.value = result;
                this.$emit('input', result == '' ? undefined : Number(result));
            },
            format: function(value, decimals) {
                if (value.startsWith('.'))
                    value = '0' + value;
                var splited = value.split('.');
                var result = 0;
                if (decimals == 0 || splited.length == 1) {
                    result = splited[0];
                } else {
                    result = splited[0] + "." + splited[1].slice(0, decimals);
                }
                if (this.max != -1 && value > this.max)
                    result = this.max
                return result;
            }
        },
        mounted: function() {
    
        }
    }
</script>