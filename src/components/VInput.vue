<template>
    <ValidationProvider :name="getLabel.toLowerCase()" :rules="getRules" :vid="named" v-slot="validationContext">
        <b-form-group :class="value ? 'mb-form-group-show' : ''" :id="'input-group-'+named" :label="getLabel" :label-for="named" :label-sr-only="labelSrOnly" class="text-left">
            <label :for="named">{{getLabel}}</label>
            <component
                v-if="type!='checkbox'"
                v-bind:is="typeSelected"
                :autocomplete="named"
                :class="value ? 'bold' : ''"
                :id="named"
                :name="named"
                :required="required===true || getRules.includes('required')"
                :value="value"
                :size="size ? size : null"
                :disabled="disabled"
                @input="$emit('input',$event)"
                :options="type=='select' ? options : null"
                :rows="type=='textarea' ? 3 : null"
                :type="getType"
                :placeholder="getPlaceholder"
                :state="getValidationState(validationContext)"
                :aria-describedby="'input-'+named+'-feedback'"
            >
            </component>

            <b-form-checkbox @input="$emit('input',$event)" v-if="type=='checkbox'"> {{getLabel}}</b-form-checkbox>
            <b-form-invalid-feedback :id="'input-'+named+'-feedback'">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
    </ValidationProvider>
</template>
<script>

function capitalize(value)
{
    return value.charAt(0).toUpperCase()+value.slice(1);
}
export default {
    props:{
        showLabel: {
            type: Boolean,
            default: function(){
                return false
            }
        },
        vid: String,
        rules: String,
        readonly: {
            type:Boolean,
            default: function(){
                return false
            }
        },
        name: String,
        label: String,
        size: String,
        value: {},
        placeholder: String,
        options: Array,
        required: {
            type: Boolean,
            default: function(){
                return false
            },
        },
        disabled: {
            type: Boolean,
            default: function(){
                return false
            },
        },
        labelSrOnly: {
            type: Boolean,
            default: function(){
                return true
            }
        },
        type:{
            type: String,
        },
    },
    computed:{
        typeSelected()
        {
            if(this.type=='select' || this.options)
            {
                return 'b-form-select'
            }
            else if(this.type=='checkbox')
            {
                return 'b-form-checkbox'
            }
            else if(this.type=='textarea')
            {
                return 'b-form-textarea'
            }
            return 'b-form-input'
        },
        named()
        {
            return this.vid ? this.vid : this.name;
        },
        getLabel()
        {
            return this.label ? this.label : capitalize(this.named);
        },
        getRules()
        {
            let rules = '';
            if(this.rules)
            {
                rules = this.rules;
            }
            else
            {
                if(this.named=='email')
                {
                    rules = 'email';
                }
                else if(this.named=='password')
                {
                    rules = 'min:4';
                }
            }
            if(this.required===true && !rules.includes('required'))
            {
                return 'required|'+rules;
            }
            return rules;
        },
        getType()
        {
            if(this.type)
            {
                return this.type;
            }
            else if(this.options)
            {
                return 'select';
            }
            else
            {
                if(this.named=='email')
                {
                    return 'email';
                }
                else if(this.named.toLowerCase().includes('password'))
                {
                    return 'password';
                }
                else
                {
                    return 'text';
                }
            }
        },
        getPlaceholder()
        {
            if(this.placeholder)
            {
                return this.placeholder;
            }
            else
            {
                return this.getLabel;
            }
        },
    },
    methods:
    {
        getValidationState({ dirty,touched,untouched, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
    }
}
</script>