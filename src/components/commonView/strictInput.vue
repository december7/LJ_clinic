<template>
    <input ref="input" :value="value" @input="onInput">
</template>

<script>
    
    var format = {
        //身份证
        id: function(value) {
            if (value.length > 18)
                value = value.substr(0, 18);
            var hasX = false;
            if (value.endsWith('x') || value.endsWith('X')) {
                value = value.substr(0, value.length);
                hasX = true;
            }
            value = value.replace(/\D/g, '');
            if (hasX) value = value + "X";
            return value;
        },
        phone: function(value) {
            if (value.length > 11)
                value = value.substr(0, 11);
            if (!value.startsWith('1'))
                return '';
            value = value.replace(/\D/g, '');
            return value;
        }
    }
    
    export default {
        props: {
            check: {
                type: String,
                default: 'id'
            },
            value: {
                type: String | Number,
                default: ''
            }
        },
        methods: {
            onInput: function(event) {
                var i = event.target.value;
                var formater = format[this.check];
                var result = formater(i);
                event.target.value = result;
                this.$emit('input', result);
            }
        },
        mounted: function() {}
    }
</script>