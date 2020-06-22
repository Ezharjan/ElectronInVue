<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <input type="file" id="read-file" name="fileContent" @click="ReadLocalFile()" />
        <input type="text" id="file-path" name="filePath" />
        <button id="should-read-as-text" @click="changeReadType()">{{readTypeMsg}}</button>
        <button id="read-file-in-nodejs" @click="ReadLocalFileInNodeJS()">Read Local File</button>
        <button id="write-file-in-nodejs" @click="WriteLocalFileInNodeJS()">Write Local File</button>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            readTypeMsg: "Read As Text",
            shouldReadAsText: false
        }
    },
    created() {
        this.initialize();
    },
    methods: {
        initialize() {
            this.shouldReadAsText = false;
        },
        changeReadType() {
            this.shouldReadAsText = !this.shouldReadAsText;
            console.log(this.shouldReadAsText);
            this.shouldReadAsText && (this.readTypeMsg = 'Read As Data')
                || ((this.readTypeMsg = 'Read As Text'));
        },
        ReadLocalFile() {
            var fileInput = document.querySelector('#read-file');
            var that = this;
            fileInput.onchange = function () {
                console.log('文件名:', this.value)
                var filereader = new FileReader();
                var fileType = this.files[0].type;
                console.log(that.shouldReadAsText);
                if (that.shouldReadAsText === true) {
                    filereader.readAsText(this.files[0], 'gbk');
                }
                else {
                    filereader.readAsDataURL(this.files[0]);
                }
                filereader.onload = function () {
                    if (/^image\[jpeg|png|gif]/.test(fileType)) {
                        console.log("Read image content: " + this.result);
                    }
                    console.log("Content read: " + this.result);
                }
            }
        },
        ReadLocalFileInNodeJS() {
            // let filePath = document.querySelector('#file-path').value;
            console.log(window.readConfig('D:/myText.txt'));
            try {
                // console.log(window.readConfig(filePath));
            } catch (err) {
                console.log(err);
                console.error('error occurred while getting the file path from input.');
            }
        },
        WriteLocalFileInNodeJS() {
            let filePath = document.querySelector('#file-path').value;
            try {
                window.writeFileConfig(filePath, 'Something you want to write in the file.');
            } catch (err) {
                console.log(err);
                console.error('error occurred while getting the file path from input.');
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
