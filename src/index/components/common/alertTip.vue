 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class='tip_text_box'>
                <p class="tip_text">{{alertTextFirst}}</p>
                <p class="tip_text">{{alertTextSecond}}</p>
            </div>
            <div class="confrim" @click="closeTip">{{btnText}}</div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null
            }
        },
        mounted(){
      
        },
        props: {
            alertTextFirst:{
                type:String
            },
            alertTextSecond:{
                type:String
            },
            btnText:{
                type:String
            },
        },
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0,0,0,0.3);
    }
    .tip_text_container{
        position: absolute;
        //top: 50%;
        //left: 50%;
        //margin-top: -6rem;
        //margin-left: -6rem;
        left:0;
        right:0;
        margin:auto;
        top:11rem;
        width: 17rem;
        height:9rem;
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        //padding-top: .6rem;
        display: flex;
        //justify-content: center;
        //align-items: center;
        //flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(3rem, 3rem);
            border: 0.15rem solid #f8cb86;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            span:nth-of-type(1){
                @include wh(.12rem, 1.5rem);
                background-color: #f8cb86;
            }
            span:nth-of-type(2){
                @include wh(.2rem, .2rem);
                border: 1px;
                border-radius: 50%;
                margin-top: .2rem;
                background-color: #f8cb86;
            }
        }
        .tip_text_box{
            height:6.5rem;
            display: flex;
            justify-content: center;
            width: 100%;
            align-items: center;
            flex-direction:column;
        }
        .tip_text{
            @include sc(.85rem, #333);
            line-height: .9rem;
            text-align: center;
            //margin-top: .8rem;
            padding: 0 .4rem;
            margin-top:0.4rem;
        }
        .confrim{
            @include sc(.875rem, #FF4B4B);
            //font-weight: bold;
            //margin-top: .8rem;
            //background-color: #4cd964;
            width: 100%;
            text-align: center;
            line-height: 2.5rem;
            height:2.5rem;
            border: 1px;
            //border-bottom-left-radius: 0.25rem;
            //border-bottom-right-radius: 0.25rem;
            position:absolute;
            bottom:0;
            left:0;
            border-top:1px solid #e9e9e9;
        }
    }
    
</style>
